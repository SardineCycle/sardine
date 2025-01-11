import { styled } from '@mui/system';
import { Card } from '../../../../components/bases/Card/Card';
import { TimeDisplay } from './TimeDisplay';
import { DurationTimeContainer } from './DurationTime';
import { SubTaskNameContainer } from './SubTaskName';
import { PlayButton } from './PlayButton';

type CardProps = {
	taskName: string; // カード(タスク)のタイトル
	durationTimeSeconds: number; // カード(タスク)の時間
};

export const PeriodCard: React.FC<CardProps> = ({
	taskName,
	durationTimeSeconds,
}) => {
	return (
		<>
			<PeriodCardStyled>
				<SubTaskNameContainer name={taskName} />
				<DurationTimeContainer durationTime={durationTimeSeconds} />
				<TimeDisplay
					durationTimeSeconds={durationTimeSeconds}
				/>
				<SpaceStyle />
				<PlayButton />
			</PeriodCardStyled>
		</>
	);
};

const PeriodCardStyled = styled(Card)({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'start',
	alignItems: 'center',
	width: '80%',
	height: '100%',
	padding: '1rem',
	margin: '0 1rem',
});

const SpaceStyle = styled('div')({
	height: '1rem',
});
