import { TaskList } from './components/TaskList';
import type { Task } from '../../types/task/Task';
import { styled } from '@mui/system';

const BaseArea = styled('div')(({ theme }) => ({
	backgroundColor: theme.color.primary,
}));

export const HomePage = () => {
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
				<TaskList taskList={items} />
			</BaseArea>
		</>
	);
};
