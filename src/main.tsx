import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { router } from './route';
import ReactDOM from 'react-dom/client';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>
	);
}
