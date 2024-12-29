import { styled } from '@mui/material/styles';

type ProgressBarProps = {
	size: number;
};

function ProgressBar({ size }: ProgressBarProps) {
	const max = 100;
	const base = 6;
	const width = max / size;

	return (
		<ProgressBarContainer>
			{[...Array(size).keys()].map((key) => (
				<SegmentContainer key={key} width={width}>
					<ProgressSegment isDone={key === 0} />
					<RemainingSegment />
				</SegmentContainer>
			))}
		</ProgressBarContainer>
	);
}

export default ProgressBar;

const SegmentContainer = styled('li')<{ width: number }>(({ width }) => ({
	display: 'flex',
	flex: 1,
	width: `${width}%`,
}));

const ProgressSegment = styled('div')<{ isDone: boolean }>(
	({ theme, isDone }) => ({
		backgroundColor: isDone ? "#46EBA1" : '#C4C4C4',
		width: '80%',
		height: '100%',
		borderRadius: '2rem',
	}),
);

const RemainingSegment = styled('div')(({ theme }) => ({
	backgroundColor: theme.color.neutral,
	width: '20%',
	height: '100%',
	borderRadius: '2rem',
}));

const ProgressBarContainer = styled('ul')(({ theme }) => ({
	display: 'flex',
	width: '70%',
	margin: '1rem auto',
	height: '2rem',
	backgroundColor: 'oklab(from #6B6B9B l a b / 0.5)',
	borderRadius: '20px',
	padding: '0.5rem 0.75rem',
	boxSizing: 'border-box',
}));
