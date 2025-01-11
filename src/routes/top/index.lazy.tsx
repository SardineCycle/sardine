import { styled } from '@mui/system';
import { createLazyFileRoute } from '@tanstack/react-router';
import { HamburgerMenu } from '../../components/bases/HamburgerMenu/HamburgerMenu';
import ProgressBar from './-components/ProgressBar';
import { PeriodCard } from './-components/period-card/PeriodCard';
import { TaskName } from './-components/TaskName';
import { SwipeablePeriodCardsContainer } from './-components/SwipeablePeriodCardsContainer';
import { newTask } from '../../features/task/task.model';
import { pomodoroAtom } from '../../atoms/pomodoro-atom';
import { useAtom } from 'jotai';
import { taskAtom } from '../../atoms/task-atom';

export const Route = createLazyFileRoute('/top/')({
	component: TopPage,
});

const BaseArea = styled('div')(({ theme }) => ({
	// backgroundColor: theme.color.primary,
	height: '70vh',
}));

function TopPage() {
	const [task] = useAtom(taskAtom);

	const cards = task.subTasks.map((subTask) => ({
		taskId: subTask.id,
		child: (
			<PeriodCard
				taskName={subTask.name}
				durationTimeSeconds={subTask.pomodoroProps.activeDurationSeconds}
			/>
		),
	}));

	return (
		<>
			<BaseArea>
				<HamburgerMenu />
				<TaskName name={task.name} />
				<ProgressBar size={task.subTasks.length} />
				<SwipeablePeriodCardsContainer cards={cards} />
			</BaseArea>
		</>
	);
}
