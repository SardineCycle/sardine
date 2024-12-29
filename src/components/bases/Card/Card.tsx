import { styled } from '@mui/system';

export const Card = styled('div')(({ theme }) => ({
	backgroundColor: theme.color.secondary,
	borderRadius: '2rem',
	padding: '2rem',
	boxShadow: '-4px 4px 10px 2px rgb(0 0 0 / 0.25)',
}));
