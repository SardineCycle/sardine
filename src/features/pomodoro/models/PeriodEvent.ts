import { v4 as uuidv4 } from 'uuid';
import type { PeriodType, PeriodId } from './Period';
import { match } from 'ts-pattern';

export interface PeriodEvent {
	id: string;
	periodId: string;
	type: (typeof PeriodEventType)[keyof typeof PeriodEventType];
	createdAt: Date; // イベントの生成時刻（同じ？まとめてもOK）
}

export const PeriodEventType = {
	Started: 'started',
	Paused: 'paused',
	Resumed: 'resumed',
	Finished: 'finished',
} as const;

export const PeriodStatus = {
	None: 'none',
	Active: 'active',
	Paused: 'paused',
	Completed: 'completed',
} as const;

interface PeriodStatus {
	status: (typeof PeriodStatus)[keyof typeof PeriodStatus];
}

export interface ActivePeriodStatus extends PeriodStatus {
	type: typeof PeriodType.Active;
}

export interface BreakPeriodStatus extends PeriodStatus {
	type: typeof PeriodType.Break;
}

/**
 * Periodイベントの基本情報を生成する
 *
 * id: ID
 * createdAt: 作成日時
 * periodId: 対象のPeriodのID
 */
const generateBaseEventDetails = (periodId: PeriodId) => ({
	id: uuidv4(),
	periodId,
	createdAt: new Date(),
});

export interface StartedPeriodEvent extends PeriodEvent {
	type: typeof PeriodEventType.Started;
}

/**
 * Periodが開始されたことを示すイベント
 */
export function newStartedPeriodEvent(periodId: PeriodId): StartedPeriodEvent {
	return {
		...generateBaseEventDetails(periodId),
		type: PeriodEventType.Started,
	};
}

export interface PausedPeriodEvent extends PeriodEvent {
	type: typeof PeriodEventType.Paused;
}

/**
 * Periodが一時停止されたことを示すイベント
 */
export function newPausedPeriodEvent(periodId: PeriodId): PausedPeriodEvent {
	return {
		...generateBaseEventDetails(periodId),
		type: PeriodEventType.Paused,
	};
}

export interface ResumedPeriodEvent extends PeriodEvent {
	type: typeof PeriodEventType.Resumed;
}

/**
 * Periodが再開されたことを示すイベント
 */
export function newResumedPeriodEvent(periodId: PeriodId): ResumedPeriodEvent {
	return {
		...generateBaseEventDetails(periodId),
		type: PeriodEventType.Resumed,
	};
}

export interface FinishedPeriodEvent extends PeriodEvent {
	type: typeof PeriodEventType.Finished;
}

/**
 * Periodが終了したことを示すイベント
 */
export function newFinishedPeriodEvent(
	periodId: PeriodId,
): FinishedPeriodEvent {
	return {
		...generateBaseEventDetails(periodId),
		type: PeriodEventType.Finished,
	};
}

/**
 * Period の経過時間（秒）を計算して返します。
 *
 * 「Started」「Resumed」イベントから次の「Paused」「Finished」イベントまでをアクティブ区間とみなし、
 * それらの区間の合計時間を求めます。計測区間は次のとおりです。
 *
 * - Start → Pause
 * - Resume → Pause
 * - Resume → Finish
 *
 * イベントの順序が不正 (例: Pause/Finish が先に来る、Start/Resume が重複する など)
 * な場合はエラーをスローします。
 *
 * @param period - 計測対象の Period
 * @returns アクティブ区間の合計時間（秒）
 * @throws {Error} イベントの順序が不正な場合
 */
export function periodElapsedSeconds(events: PeriodEvent[]): number {
	if (events.length === 0) {
		return 0;
	}

	let elapsedMs = 0;
	let activeStartTime: Date | undefined;

	const handleStartEvent = (event: PeriodEvent) => {
		if (activeStartTime) {
			if (event.type === PeriodEventType.Started) {
				throw new Error(
					'Period の状態が不正です (重複した開始が検出されました)。',
				);
			}
			throw new Error(
				'Period の状態が不正です (重複した開始が検出されました)。',
			);
		}
		activeStartTime = event.createdAt;
	};

	const handleStopEvent = (event: PeriodEvent) => {
		if (!activeStartTime) {
			if (event.type === PeriodEventType.Paused) {
				throw new Error(
					'Period の状態が不正です (開始していないのに停止イベントが検出されました)。',
				);
			}
			throw new Error(
				'Period の状態が不正です (開始していないのに停止イベントが検出されました)。',
			);
		}
		elapsedMs += event.createdAt.getTime() - activeStartTime.getTime();
		activeStartTime = undefined;
	};

	for (const event of events) {
		match(event)
			.with({ type: PeriodEventType.Started }, handleStartEvent)
			.with({ type: PeriodEventType.Resumed }, handleStartEvent)
			.with({ type: PeriodEventType.Paused }, handleStopEvent)
			.with({ type: PeriodEventType.Finished }, handleStopEvent)
			.exhaustive();
	}

	if (activeStartTime) {
		// 最後のイベントが Pause または Finish でない場合、現在時刻までの経過時間を加算
		elapsedMs += Date.now() - activeStartTime.getTime();
	}

	return elapsedMs / 1000;
}

/**
 * ActivePeriodの状態を返す
 *
 * 状態
 * - Active: 開始された状態
 * - Paused: 一時停止された状態
 * - Completed: 終了した状態
 */
export function periodStatus(events: PeriodEvent[]): PeriodStatus {
	if (events.length === 0) {
		return { status: PeriodStatus.None };
	}
	// 最後のイベントを取得
	const lastEvent = events[events.length - 1];
	return match(lastEvent)
		.with({ type: PeriodEventType.Started }, () => {
			return { status: PeriodStatus.Active };
		})
		.with({ type: PeriodEventType.Resumed }, () => {
			return { status: PeriodStatus.Active };
		})
		.with({ type: PeriodEventType.Paused }, () => {
			return { status: PeriodStatus.Paused };
		})
		.with({ type: PeriodEventType.Finished }, () => {
			return { status: PeriodStatus.Completed };
		})
		.exhaustive();
}
