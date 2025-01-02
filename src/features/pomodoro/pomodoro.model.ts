import { v4 as uuidv4 } from 'uuid';

export type PomodoroSession = {
	id: string;
	activePeriod: ActivePeriod;
	breakPeriod: BreakPeriod;
};

interface Period {
	id: string;
	pomodoroId: string; // 紐づくPomodoro
	durationSeconds: number; // 設定時間
	events: PeriodEvent[];
	createdAt: Date;
}

const PeriodStatus = {
	Active: 'active',
	Paused: 'paused',
	Completed: 'completed',
} as const;
export interface PeriodEvent {
	id: string;
	periodId: string;
	type: PeriodEventType;
	createdAt: Date; // イベントの生成時刻（同じ？まとめてもOK）
}

export enum PeriodEventType {
	Started = 'started',
	Paused = 'paused',
	Resumed = 'resumed',
	Finished = 'finished',
}

const PeriodType = {
	Active: 'active',
	Break: 'break',
} as const;

export interface ActivePeriod extends Period {}
export type ActivePeriodStatus =
	(typeof PeriodStatus)[keyof typeof PeriodStatus] & {
		type: typeof PeriodType.Active;
	};
export type BreakPeriodStatus =
	(typeof PeriodStatus)[keyof typeof PeriodStatus] & {
		type: typeof PeriodType.Break;
	};

type PomodoroSessionProps = {
	// アクティブ継続時間
	activeDurationSeconds: number;
	// 休憩時間
	breakDurationSeconds: number;
};

export function newPomodoroSession(
	params: PomodoroSessionProps,
): PomodoroSession {
	const pomodoroId = uuidv4();
	const activePeriod = {
		id: uuidv4(),
		pomodoroId: pomodoroId,
		durationSeconds: params.activeDurationSeconds,
		events: [],
		createdAt: new Date(),
	} satisfies ActivePeriod;

	const breakPeriod = {
		id: uuidv4(),
		pomodoroId: pomodoroId,
		durationSeconds: params.breakDurationSeconds,
		type: 'short',
		events: [],
		createdAt: new Date(),
	} satisfies BreakPeriod;

	return {
		id: pomodoroId,
		activePeriod,
		breakPeriod,
	} satisfies PomodoroSession;
}
/**
 * ActivePeriod がアクティブかどうかを返します。
 */
export function isActivePeriod(session: PomodoroSession): boolean {
	return periodStatus(session.activePeriod) !== PeriodStatus.Completed;
}

/**
 * 現在のactive-periodの状態を返します。
 */
export function activePeriodStatus(
	session: PomodoroSession,
): ActivePeriodStatus {
	return periodStatus(session.activePeriod);
}

/**
 * 現在のbreak-periodの状態を返します。
 */
export function breakPeriodStatus(session: PomodoroSession): BreakPeriodStatus {
	return periodStatus(session.breakPeriod);
}

/**
 * ActivePeriodの状態を返す
 *
 * 状態
 * - Active: 開始された状態
 * - Paused: 一時停止された状態
 * - Completed: 終了した状態
 */
function periodStatus(
	period: Period,
): (typeof PeriodStatus)[keyof typeof PeriodStatus] {
	// 最後のイベントを取得
	const lastEvent = period.events[period.events.length - 1];
	switch (lastEvent.type) {
		case PeriodEventType.Started:
			return PeriodStatus.Active;
		case PeriodEventType.Paused:
			return PeriodStatus.Paused;
		case PeriodEventType.Finished:
			return PeriodStatus.Completed;
		default:
			return PeriodStatus.Completed;
	}
}

export enum ActiveStatus {
	Active = 'active',
	Paused = 'paused',
	Completed = 'completed',
}

/**
 * ActivePeriod の経過時間（秒）を計算して返します。
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
 * @param session - 計測対象の PomodoroSession
 * @returns アクティブ区間の合計時間（秒）
 * @throws {Error} イベントの順序が不正な場合
 */
export function activePeriodElapsedSeconds(session: PomodoroSession): number {
	const activePeriod = session.activePeriod;
	if (
		!activePeriod ||
		!activePeriod.events ||
		activePeriod.events.length === 0
	) {
		return 0;
	}

	let elapsedMs = 0;
	let activeStartTime: Date | undefined;

	for (const event of activePeriod.events) {
		switch (event.type) {
			case PeriodEventType.Started:
			case PeriodEventType.Resumed: {
				if (activeStartTime) {
					throw new Error(
						'ActivePeriod の状態が不正です (重複した開始が検出されました)。',
					);
				}
				activeStartTime = event.createdAt;
				break;
			}
			case PeriodEventType.Paused:
			case PeriodEventType.Finished: {
				if (!activeStartTime) {
					throw new Error(
						'ActivePeriod の状態が不正です (開始していないのに停止イベントが検出されました)。',
					);
				}
				elapsedMs += event.createdAt.getTime() - activeStartTime.getTime();
				activeStartTime = undefined;
				break;
			}
			// その他のイベントがある場合は適宜処理または無視します。
			default:
				break;
		}
	}

	if (activeStartTime) {
		// 最後のイベントが Pause または Finish でない場合、現在時刻までの経過時間を加算
		elapsedMs += Date.now() - activeStartTime.getTime();
	}

	return elapsedMs / 1000;
}

export interface BreakPeriod extends Period {
	type: 'short' | 'long';
}
