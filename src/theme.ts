import { createTheme } from '@mui/system';

export const customTheme = createTheme({
	color: {
		primary: '#83DBD6',
		secondary: '#D3E0E1',
		tertiary: '#FF5289',
		neutral: '#9CA0A1',
		text: 'black',
	},
	size: {
		menuSize: 48,
	},
});

declare module '@mui/system' {
	interface Theme {
		color: {
			primary: string;
			secondary: string;
			tertiary: string;
			neutral: string;
			text: string;
		};
		size: {
			menuSize: number;
		};
	}
	interface ThemeOptions {
		color?: {
			primary?: string;
			secondary?: string;
			tertiary: string;
			neutral?: string;
			text?: string;
		};
		size?: {
			menuSize?: number;
		};
	}
}
