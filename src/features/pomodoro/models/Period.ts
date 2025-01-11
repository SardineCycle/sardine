import {
	PeriodEventType,
	type PeriodEvent,
	type StartedPeriodEvent,
} from './PeriodEvent';
import { match } from 'ts-pattern';

export type PeriodId = string;

interface Period {
	id: PeriodId;
	pomodoroId: string; // 紐づくPomodoro
	durationSeconds: number; // 設定時間
	createdAt: Date;
}

export const PeriodType = {
	Active: 'active',
	Break: 'break',
} as const;


export interface ActivePeriod extends Period {}

export interface BreakPeriod extends Period {
	type: 'short' | 'long';
}
