export interface PomodoroSession {
	id: string;
	taskName: string; // タスク名を具体的に
	description?: string; // 必須でない場合はoptionalに
	durationMinutes: number; // 単位を明示
	progressPercentage: number; // 進捗率
	status: SessionStatus; // active, paused, completed
	createdAt: Date;
	updatedAt: Date;
}

export enum SessionStatus {
    Active = 'active',
    Paused = 'paused',
    Completed = 'completed',
  }

export interface BreakPeriod {
	id: string;
	pomodoroId: string; // 紐づくPomodoroセッションのID
	type: 'short' | 'long'; // 短い休憩 or 長い休憩
	description?: string;
	durationMinutes: number;
	isActive: boolean; // 実際に進行中かどうか
	isPaused: boolean;
	isCompleted: boolean;
	createdAt: Date;
	updatedAt: Date;
}
