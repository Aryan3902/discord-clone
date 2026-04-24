import ChannelList from "@/features/Channels/ChannelList";
import ServerList from "@/features/Servers/components/ServerList";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/_authenticated/channels")({
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="flex w-full">
        <ServerList />
        <div className="w-1/6">
          <Suspense fallback={<div>Channel List Loading</div>}>
            <ChannelList serverName="Server Name" selectedChannelId={null} />
          </Suspense>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
