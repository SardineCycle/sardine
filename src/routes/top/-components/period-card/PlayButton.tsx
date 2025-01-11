import { styled } from '@mui/material/styles';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { statusAtom, useStartPomodoro } from '../../../../atoms/pomodoro-atom';
import { usePausePomodoro } from '../../../../atoms/pomodoro-atom';
import { useResumePomodoro } from '../../../../atoms/pomodoro-atom';
import { useAtom } from 'jotai';
import { match } from 'ts-pattern';
import { PeriodStatus } from '../../../../features/pomodoro/models/PeriodEvent';

export const PlayButton = () => {
	const startPomodoro = useStartPomodoro();
	const pausePomodoro = usePausePomodoro();
	const resumePomodoro = useResumePomodoro();

	// 現在のポモドーロの状態(statusAtom)を取得
	const [status] = useAtom(statusAtom);

	const changeStatus = () => {
		return match(status)
			.with({ status: PeriodStatus.None }, () => {
				startPomodoro();
			})
			.with({ status: PeriodStatus.Paused }, () => {
				resumePomodoro();
			})
			.with({ status: PeriodStatus.Active }, () => {
				pausePomodoro();
			})
			.with({ status: PeriodStatus.Completed }, () => {})
			.exhaustive();
	};

	return (
		<PlayButtonStyled onClick={changeStatus}>
			<PlayIcon />
		</PlayButtonStyled>
	);
};

const PlayButtonStyled = styled('button')(({ theme }) => ({
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
