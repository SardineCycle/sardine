import { createRootRoute, createRouter } from "@tanstack/react-router";
import { App } from "./App";

const rootRoute = createRootRoute({
  component: () => <App />,
});

const routeTree = rootRoute;

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}