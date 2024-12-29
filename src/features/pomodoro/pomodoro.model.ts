export type PomodoroSession = {
	id: string;
	activePeriod: ActivePeriod;
	breakPeriod: BreakPeriod;
};

export type ActivePeriod = {
	id: string;
	pomodoroId: string; // 紐づくPomodoro
	durationSeconds: number; // 設定時間
	events: ActivePeriodEvent[];
	createdAt: Date;
	updatedAt: Date;
};

/**
 * ActivePeriodの状態を返す
 *
 * 状態
 * - Active: 開始された状態
 * - Paused: 一時停止された状態
 * - Completed: 終了した状態
 */
function activeStatus(session: PomodoroSession): ActiveStatus {
	const activePeriod = session.activePeriod;
	// 最後のイベントを取得
	const lastEvent = activePeriod.events[activePeriod.events.length - 1];
	switch (lastEvent.type) {
		case ActivePeriodEventType.Started:
			return ActiveStatus.Active;
		case ActivePeriodEventType.Paused:
			return ActiveStatus.Paused;
		case ActivePeriodEventType.Finished:
			return ActiveStatus.Completed;
		default:
			return ActiveStatus.Completed;
	}
}

export enum ActiveStatus {
	Active = 'active',
	Paused = 'paused',
	Completed = 'completed',
}

/**
 * ActivePeriod の経過時間（分）を計算して返します。
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
 * @returns アクティブ区間の合計時間（分）
 * @throws {Error} イベントの順序が不正な場合
 */
export function activePeriodElapsedMinutes(session: PomodoroSession): number {
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
			case ActivePeriodEventType.Started:
			case ActivePeriodEventType.Resumed: {
				if (activeStartTime) {
					throw new Error(
						'ActivePeriod の状態が不正です (重複した開始が検出されました)。',
					);
				}
				activeStartTime = event.createdAt;
				break;
			}
			case ActivePeriodEventType.Paused:
			case ActivePeriodEventType.Finished: {
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

	return elapsedMs / 60000;
}

export type ActivePeriodEvent = {
	id: string;
	activePeriodId: string;
	type: ActivePeriodEventType;
	createdAt: Date; // イベントの生成時刻（同じ？まとめてもOK）
};

export enum ActivePeriodEventType {
	Started = 'started',
	Paused = 'paused',
	Resumed = 'resumed',
	Finished = 'finished',
}

export type BreakPeriod = {
	id: string;
	pomodoroId: string; // 紐づくPomodoroセッションのID
	type: 'short' | 'long'; // 短い休憩 or 長い休憩
	durationMinutes: number;
	elapsedMinutes: number;
	status: BreakStatus;
	createdAt: Date;
	updatedAt: Date;
};

export enum BreakStatus {
	Active = 'active',
	Paused = 'paused',
	Completed = 'completed',
}
