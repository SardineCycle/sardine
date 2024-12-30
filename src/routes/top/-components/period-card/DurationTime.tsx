import { styled } from '@mui/system';

const DurationTimeStyled = styled('p')({
	fontSize: '1.5rem',
	margin: '0',
	'& span': {
		fontSize: '1rem',
	},
	width: '80%',
	textAlign: 'right',
});
export const DurationTimeContainer = ({ durationTime }: { durationTime: number }) => {
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
		<DurationTimeStyled>
			{formatTime(durationTime)}
			<span>min</span>
		</DurationTimeStyled>
	);
};