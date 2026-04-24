import Chat from "@/features/Chat/components/Chat";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute(
    "/_authenticated/channels/$guildId/$channelId",
)({
    component: RouteComponent,
});

function RouteComponent() {
    const { channelId } = useParams({
        from: "/_authenticated/channels/$guildId/$channelId",
    });
    return (
        <div className="flex-1">
            <Chat currSelectedChannel={channelId} />
        </div>
    );
}
