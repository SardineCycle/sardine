import { styled } from '@mui/system';
import { createLazyFileRoute } from '@tanstack/react-router';
import { HamburgerMenu } from '../../components/bases/HamburgerMenu/HamburgerMenu';
import ProgressBar from './-components/ProgressBar';
import { PeriodCard } from './-components/period-card/PeriodCard';
import { TaskName } from './-components/TaskName';
import { SwipeablePeriodCardsContainer } from './-components/SwipeablePeriodCardsContainer';
import { TimerContainer } from './-components/timer';

export const Route = createLazyFileRoute('/top/')({
	component: TopPage,
});

const BaseArea = styled('div')(({ theme }) => ({
	// backgroundColor: theme.color.primary,
	height: '70vh',
}));

function TopPage() {
	return (
		<>
			<BaseArea>
				<HamburgerMenu />
				<TaskName name={'掃除'} />
				<ProgressBar size={2} />
				<SwipeablePeriodCardsContainer
					cards={[
						{
							taskId: '1',
							child: (
								<PeriodCard
									taskName='帽子'
									elapsedTimeSeconds={0}
									durationTimeSeconds={300}
								/>
							),
						},
						// {
						// 	taskId: '2',
						// 	child: (
						// 		<PeriodCard
						// 			taskName='シャツ'
						// 			elapsedTimeSeconds={1}
						// 			durationTimeSeconds={300}
						// 		/>
						// 	),
						// },
						// {
						// 	taskId: '3',
						// 	child: (
						// 		<PeriodCard
						// 			taskName='ズボン'
						// 			elapsedTimeSeconds={222}
						// 			durationTimeSeconds={300}
						// 		/>
						// 	),
						// },
					]}
				/>
				<TimerContainer />
			</BaseArea>
		</>
	);
}
