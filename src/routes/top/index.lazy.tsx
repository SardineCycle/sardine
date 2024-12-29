import { styled } from '@mui/system';
import { createLazyFileRoute } from '@tanstack/react-router';
import { HamburgerMenu } from '../../components/bases/HamburgerMenu/HamburgerMenu';
import ProgressBar from './-components/ProgressBar';
import { PeriodCard } from './-components/PeriodCard';
import { TaskName } from './-components/TaskName';

export const Route = createLazyFileRoute('/top/')({
	component: TopPage,
});

const BaseArea = styled('div')(({ theme }) => ({
	// backgroundColor: theme.color.primary,
	height: '70vh',
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
	];
	return (
		<>
			<BaseArea>
				<HamburgerMenu />
				<TaskName name={'掃除'} />
				<ProgressBar size={2} />
				<PeriodCard
					taskName='ズボン'
					elapsedTimeSeconds={272}
					durationTimeSeconds={300}
				/>
			</BaseArea>
		</>
	);
}
