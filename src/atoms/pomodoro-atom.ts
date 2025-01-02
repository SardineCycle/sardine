import { v4 as uuidv4 } from 'uuid';
import { atom, useAtom } from 'jotai';
import { atomWithObservable } from 'jotai/utils';

import {
	type PeriodEvent,
	type PomodoroSession,
	PeriodEventType,
	newPomodoroSession,
	activePeriodElapsedSeconds,
	isActivePeriod,
	activePeriodStatus,
	breakPeriodStatus,
	type ActivePeriodStatus,
	type BreakPeriodStatus,
} from '../features/pomodoro/pomodoro.model';

const _pomodoroAtom = atom<PomodoroSession>(
	newPomodoroSession({
		activeDurationSeconds: 25 * 60,
		breakDurationSeconds: 5 * 60,
	}),
);

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
export const elapsedTimeAtom = atomWithObservable((get) => {
	return createObservable<number>((emit) => {
		const pomodoro = get(_pomodoroAtom);
		const intervalId = setInterval(() => {
			const elapsedTime = activePeriodElapsedSeconds(pomodoro);
			emit(elapsedTime);
		}, 100);

		// Cleanup function for unsubscribe
		return () => clearInterval(intervalId);
	});
});

const _eventPomodoroAtom = atom<null, PeriodEvent[], void>(
	null,
	(get, set, update) => {
		const pomodoro = get(_pomodoroAtom);
		console.log('event', update);
		if (pomodoro.activePeriod.id === update.periodId) {
			pomodoro.activePeriod.events.push(update);
		} else if (pomodoro.breakPeriod.id === update.periodId) {
			pomodoro.breakPeriod.events.push(update);
		}
		set(_pomodoroAtom, pomodoro);
	},
);

export const statusAtom = atom<ActivePeriodStatus | BreakPeriodStatus>(
	(get) => {
		const pomodoro = get(_pomodoroAtom);

		if (isActivePeriod(pomodoro)) {
			return activePeriodStatus(pomodoro);
		}
		return breakPeriodStatus(pomodoro);
	},
);

export function useStartPomodoro() {
	const [pomodoro] = useAtom(_pomodoroAtom);
	const [, setEventPomodoro] = useAtom(_eventPomodoroAtom);

	const startPomodoro = () => {
		const event = {
			id: uuidv4(),
			periodId: pomodoro.activePeriod.id,
			type: PeriodEventType.Started,
			createdAt: new Date(),
		} satisfies PeriodEvent;
		setEventPomodoro(event);
	};

	return startPomodoro;
}
