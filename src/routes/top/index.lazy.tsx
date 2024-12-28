import { TaskList } from './-components/TaskList';
import type { Task } from '../../types/task/Task';
import { Card } from '../../components/bases/Card/Card';
import { styled } from '@mui/system';
import { createLazyFileRoute } from '@tanstack/react-router';
import { HamburgerMenu } from '../../components/bases/HamburgerMenu/HamburgerMenu';
import ProgressBar from './-components/ProgressBar';

export const Route = createLazyFileRoute('/top/')({
	component: TopPage,
});

const BaseArea = styled('div')(({ theme }) => ({
	// backgroundColor: theme.color.primary,
}));

function TopPage() {
	const items = [
		{
			id: '1',
			title: 'Item 1',
			description: 'Description 1',
			completed: false,
		},
		{
			id: '2',
			title: 'Item 2',
			description: 'Description 2',
			completed: false,
		},
		{
			id: '3',
			title: 'Item 3',
			description: 'Description 3',
			completed: false,
		},
	] satisfies Task[];
	return (
		<>
			<BaseArea>
				<HamburgerMenu />
				<ProgressBar size={4} />
				<TaskList taskList={items} />
				<Card isEmpty={true} />
			</BaseArea>
		</>
	);
}
