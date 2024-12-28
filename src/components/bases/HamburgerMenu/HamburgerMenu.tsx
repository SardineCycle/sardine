import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { styled } from '@mui/system';

const StyledMenuIcon = styled(MenuRoundedIcon)(({ theme }) => ({
  color: theme.palette.secondary,
	fontSize: theme.size.menuSize,
}));

export const HamburgerMenu: React.FC = () => {
  return (
    <StyledMenuIcon />
  );
};
