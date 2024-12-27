import { createTheme } from "@mui/system";

export const customTheme = createTheme({
  color: {
    primary: "#1976d2",
    text: "black",
  },
});

declare module "@mui/system" {
  // TODO(char5742): テーマを設定する
  interface Theme {
    color: {
      primary: string;
      text: string;
    };
  }
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    color?: {
      primary?: string;
      text: string;
    };
  }
}
