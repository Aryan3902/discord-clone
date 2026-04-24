import { createFileRoute, Outlet } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/_authenticated/channels/$guildId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <React.Fragment>
      <Outlet />
      {/* <div className="w-1/6">
        <Suspense fallback={<div>Users List Loading</div>}>
          <UsersList />
        </Suspense>
      </div> */}
    </React.Fragment>
  );
}
