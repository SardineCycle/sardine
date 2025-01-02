import { atom, useAtom } from 'jotai';
import { elapsedTimeAtom } from '../../../atoms/pomodoro-atom';

export function TimerContainer() {
	const [time] = useAtom(elapsedTimeAtom);
	return <time>{time}</time>;
}
