import * as React from "react";
import {
  Link,
  Outlet,
  createRootRoute,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      {/* <Link to="/login">Login</Link> */}
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  );
}
