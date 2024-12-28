import { createTheme } from '@mui/system';

export const customTheme = createTheme({
  color: {
    primary: '#83DBD6',
    secondary: '#529793',
    neutral: '#808B9F',
    text: 'black',
  },
  size: {
    menuSize: 30, // メニューアイコンのサイズ（例: 30px）
  },
});

declare module '@mui/system' {
  interface Theme {
    color: {
      primary: string;
      secondary: string;
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
      neutral?: string;
      text?: string;
    };
    size?: {
      menuSize?: number;
    };
  }
}
