import { atom, useAtom } from 'jotai';
import { atomWithObservable } from 'jotai/utils';
import {
	activePeriodElapsedSeconds,
	activePeriodStatus,
	breakPeriodElapsedSeconds,
	breakPeriodStatus,
	isActivePeriod,
	newPomodoroSession,
	type PomodoroSession,
} from '../features/pomodoro/models/PomodoroSession';

import { subTaskIndexAtom, taskAtom } from './task-atom';
import {
	type ActivePeriodStatus,
	type BreakPeriodStatus,
	newStartedPeriodEvent,
	newPausedPeriodEvent,
	newResumedPeriodEvent,
	type PeriodEvent,
} from '../features/pomodoro/models/PeriodEvent';

export const pomodoroAtom = atom<PomodoroSession>((get) => {
	const task = get(taskAtom);
	const index = get(subTaskIndexAtom);
	return newPomodoroSession(task.subTasks[index].pomodoroProps);
});

const pomodoroEventsAtom = atom<PeriodEvent[]>([]);

// jotaiのobservable用
function createObservable<T>(
	producer: (emit: (value: T) => void) => () => void,
) {
	return {
		subscribe(observer) {
			const emit = (value: T) => observer.next?.(value);
			const cleanup = producer(emit);
			return {
				unsubscribe: cleanup,
			};
		},
	};
}

// 経過時間の監視Atom
// 100msごとに経過時間を更新する
export const elapsedTimeAtom = atomWithObservable<number>((get) => {
	return createObservable<number>((emit) => {
		const pomodoro = get(pomodoroAtom);
		const events = get(pomodoroEventsAtom);
		const intervalId = setInterval(() => {
			if (isActivePeriod(pomodoro, events)) {
				emit(activePeriodElapsedSeconds(pomodoro, events));
			} else {
				emit(breakPeriodElapsedSeconds(pomodoro, events));
			}
		}, 100);

		// Cleanup function for unsubscribe
		return () => clearInterval(intervalId);
	});
});

export const statusAtom = atom<ActivePeriodStatus | BreakPeriodStatus>(
	(get) => {
		const pomodoro = get(pomodoroAtom);
		const events = get(pomodoroEventsAtom);
		if (isActivePeriod(pomodoro, events)) {
			return activePeriodStatus(pomodoro, events);
		}
		return breakPeriodStatus(pomodoro, events);
	},
);

// 初回に再生ボタンを押して発火する関数
export function useStartPomodoro() {
	// 現在のポモドーロの状態(pomodoroSessionAtom)を取得
	const [pomodoro, ] = useAtom(pomodoroAtom);
	const [events, setEvents] = useAtom(pomodoroEventsAtom);

	return () =>
		setEvents([...events, newStartedPeriodEvent(pomodoro.activePeriod.id)]);
}

// 一時停止ボタンを押して発火する関数
export function usePausePomodoro() {
	// 現在のポモドーロの状態(pomodoroSessionAtom)を取得
	const [pomodoro] = useAtom(pomodoroAtom);
	const [events, setEvents] = useAtom(pomodoroEventsAtom);

	return () => {
		setEvents([...events, newPausedPeriodEvent(pomodoro.activePeriod.id)]);
	};
}

// 再開ボタンを押して発火する関数
export function useResumePomodoro() {
	// 現在のポモドーロの状態(pomodoroSessionAtom)を取得
	const [pomodoro] = useAtom(pomodoroAtom);
	const [events, setEvents] = useAtom(pomodoroEventsAtom);

	return () => {
		setEvents([...events, newResumedPeriodEvent(pomodoro.activePeriod.id)]);
	};
}

export function useChangePomodoroSession() {}
