import { styled } from '@mui/system';

const SubTaskNameStyled = styled('h2')({
	fontSize: '1.5rem',
	margin: '0',
});

export const SubTaskNameContainer = ({ name }: { name: string }) => {
	return <SubTaskNameStyled>{name}</SubTaskNameStyled>;
};
