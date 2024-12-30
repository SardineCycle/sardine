import { styled } from '@mui/material/styles';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

export const PlayButton = () => {
	return (
		<PlayButtonStyled>
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
