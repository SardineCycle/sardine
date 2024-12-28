import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ThemeProvider } from '@mui/system';
import { customTheme } from '../theme';

export const Route = createRootRoute({
	component: () => (
		<>
			<ThemeProvider theme={customTheme}>
				<Outlet />
				<TanStackRouterDevtools />
			</ThemeProvider>
		</>
	),
});
