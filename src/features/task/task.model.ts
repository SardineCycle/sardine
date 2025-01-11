import { v4 as uuidv4 } from 'uuid';
import {
	type PomodoroSession,
	newPomodoroSession,
	type PomodoroSessionProps,
	type PomodoroSessionId,
} from '../pomodoro/models/PomodoroSession';

export type Task = {
	id: string;
	name: string;
	description: string;
	isCompleted: boolean;
	subTasks: SubTask[];
};

export type TaskProps = {
	name: string;
	description: string;
	subTasks: SubTaskProps[];
};

export function newTask(props: TaskProps): Task {
	return {
		id: uuidv4(),
		name: props.name,
		description: props.description,
		isCompleted: false,
		subTasks: props.subTasks.map((subTaskProps) => newSubTask(subTaskProps)),
	};
}

export type SubTask = {
	id: string;
	name: string;
	description: string;
	isCompleted: boolean;
	pomodoroId: PomodoroSessionId;
	pomodoroProps: PomodoroSessionProps;
};

export type SubTaskProps = {
	name: string;
	description: string;
} & PomodoroSessionProps;

export function newSubTask(props: SubTaskProps): SubTask {
	return {
		id: uuidv4(),
		name: props.name,
		description: props.description,
		isCompleted: false,
		pomodoroId: uuidv4(),
		pomodoroProps: props,
	};
}
