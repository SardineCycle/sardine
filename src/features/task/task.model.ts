import type { PomodoroSession } from '../pomodoro/pomodoro.model';

export type  Task = {
	id: string;
	name: string;
	description: string;
	isCompleted: boolean;
	subTasks: SubTask[];
}

type SubTask=  {
	id: string;
	name: string;
	description: string;
	isCompleted: boolean;
	pomodoros: PomodoroSession[];
}
