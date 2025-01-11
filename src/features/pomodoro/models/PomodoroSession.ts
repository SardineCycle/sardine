import { PeriodType, type ActivePeriod, type BreakPeriod } from './Period';
import { v4 as uuidv4 } from 'uuid';
import {
	type BreakPeriodStatus,
	periodElapsedSeconds,
	PeriodStatus,
	periodStatus,
	type ActivePeriodStatus,
	type PeriodEvent,
} from './PeriodEvent';

export type PomodoroSessionId = string;

export type PomodoroSession = {
	id: PomodoroSessionId;
	activePeriod: ActivePeriod;
	breakPeriod: BreakPeriod;
};

export type PomodoroSessionProps = {
	pomodoroId?: PomodoroSessionId;
	// アクティブ継続時間
	activeDurationSeconds: number;
	// 休憩時間
	breakDurationSeconds: number;
};

export function newPomodoroSession(
	params: PomodoroSessionProps,
): PomodoroSession {
	const pomodoroId = params.pomodoroId ?? uuidv4();
	const activePeriod = {
		id: uuidv4(),
		pomodoroId: pomodoroId,
		durationSeconds: params.activeDurationSeconds,
		createdAt: new Date(),
	} satisfies ActivePeriod;

	const breakPeriod = {
		id: uuidv4(),
		pomodoroId: pomodoroId,
		durationSeconds: params.breakDurationSeconds,
		type: 'short',
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
export function isActivePeriod(
	session: PomodoroSession,
	events: PeriodEvent[],
): boolean {
	return (
		periodStatus(events.filter((e) => e.periodId === session.activePeriod.id))
			.status !== PeriodStatus.Completed
	);
}

/**
 * 現在のactive-periodの状態を返します。
 */
export function activePeriodStatus(
	session: PomodoroSession,
	events: PeriodEvent[],
): ActivePeriodStatus {
	return {
		...periodStatus(
			events.filter((e) => e.periodId === session.activePeriod.id),
		),
		type: PeriodType.Active,
	};
}

/**
 * 現在のbreak-periodの状態を返します。
 */
export function breakPeriodStatus(
	session: PomodoroSession,
	events: PeriodEvent[],
): BreakPeriodStatus {
	return {
		...periodStatus(
			events.filter((e) => e.periodId === session.breakPeriod.id),
		),
		type: PeriodType.Break,
	};
}

export function activePeriodElapsedSeconds(
	session: PomodoroSession,
	events: PeriodEvent[],
): number {
	return periodElapsedSeconds(
		events.filter((e) => e.periodId === session.activePeriod.id),
	);
}

export function breakPeriodElapsedSeconds(
	session: PomodoroSession,
	events: PeriodEvent[],
): number {
	return periodElapsedSeconds(
		events.filter((e) => e.periodId === session.breakPeriod.id),
	);
}
