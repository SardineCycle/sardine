import "./App.css";
import { AddButton } from "./components/cases/AddButton";
import { HomePage } from "./pages/home/HomePage";
import { customTheme } from "./theme";
import { ThemeProvider } from "@mui/system";

export const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <AddButton />
      <HomePage></HomePage>
    </ThemeProvider>
  );
};
