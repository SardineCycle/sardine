import { type Task, newTask } from '../features/task/task.model';
import { atom, useAtom } from 'jotai';

export const taskAtom = atom(
	newTask({
		name: '掃除',
		description: '部屋を掃除する',
		subTasks: [
			{
				name: '帽子',
				description: '帽子を掃除する',
				activeDurationSeconds: 300,
				breakDurationSeconds: 60,
			},
			{
				name: 'シャツ',
				description: 'シャツを掃除する',
				activeDurationSeconds: 1500,
				breakDurationSeconds: 60,
			},
			{
				name: 'ズボン',
				description: 'ズボンを掃除する',
				activeDurationSeconds: 900,
				breakDurationSeconds: 60,
			},
		],
	}),
);

export const subTaskIndexAtom = atom<number>(0);
