import { styled } from '@mui/system';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Card } from '../../../components/bases/Card/Card';
import { TimeDisplay } from './TimeDisplay';

type CardProps = {
	taskName?: string; // カード(タスク)のタイトル
	durationTimeSeconds?: number; // カード(タスク)の時間
	elapsedTimeSeconds?: number; // カード(タスク)の経過時間
};

export const PeriodCard: React.FC<CardProps> = ({
	taskName,
	durationTimeSeconds,
	elapsedTimeSeconds,
}) => {
	const isEmpty = !taskName || !elapsedTimeSeconds || !durationTimeSeconds;
	function formatTime(time: number) {
		const minute = (time / 60).toFixed(0);
		const seconds = time % 60;
		let text = '';
		// 0の場合は表示しない
		if (minute !== '0') {
			text += `${minute}`;
		}
		if (seconds !== 0) {
			text += `:${seconds}`;
		}
		return text;
	}
	return (
		<>
			{isEmpty ? (
				<_Card>タスクがありません</_Card>
			) : (
				<_Card>
					<TaskNameHeader>{taskName}</TaskNameHeader>
					<DurationTime>
						{formatTime(durationTimeSeconds)}
						<span>min</span>
					</DurationTime>
					<TimeDisplay  elapsedTimeSeconds={elapsedTimeSeconds} durationTimeSeconds={durationTimeSeconds}/>
					<PlayButton>
						<PlayIcon />
					</PlayButton>
				</_Card>
			)}
		</>
	);
};

const _Card = styled(Card)({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'start',
	alignItems: 'center',
	height: '100%',
	padding: '1rem',
	margin: '0 1rem',
});

const TaskNameHeader = styled('h2')({
	fontSize: '1.5rem',
	margin: '0',
});

const DurationTime = styled('p')({
	fontSize: '1.5rem',
	margin: '0',
	'& span': {
		fontSize: '1rem',
	},
	width: '80%',
	textAlign: 'right',
});

const PlayButton = styled('button')(({ theme }) => ({
	width: '4em',
	height: '4rem',
	marginBottom: '1rem',
	backgroundColor: theme.color.primary,
	cursor: 'pointer',
	borderRadius: '50%',
	border: 'none',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
}));

const PlayIcon = styled(PlayArrowRoundedIcon)(({ theme }) => ({
	fontSize: '2rem',
	color: theme.color.tertiary,
}));
