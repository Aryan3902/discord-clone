import { ServerDetails } from "@/types/server";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getNameInitials } from "@/lib/utils";
import MentionBadge from "../../../components/MentionBadge";

const ServerIcon = ({ serverDetails }: { serverDetails: ServerDetails }) => {
  const selectedServerId = null;
  return (
    <div
      className={cn(
        "relative group px-4 py-2 transition-all duration-300",
        selectedServerId === serverDetails.id &&
          "bg-gradient-to-r from-white/20",
      )}
    >
      <Avatar className="size-12">
        <AvatarImage
          src={serverDetails.icon}
          className="p-2 bg-zinc-700 cursor-pointer hover:bg-highlight transition-colors duration-300"
        />
        <AvatarFallback>{getNameInitials(serverDetails.name)}</AvatarFallback>
      </Avatar>
      {serverDetails.mentions > 0 && (
        <MentionBadge
          mentions={serverDetails.mentions}
          className="absolute bottom-0 right-1 border-4 border-zinc-900"
        />
      )}
      <div className="absolute left-0 h-full top-0 bottom-0 flex items-center justify-center">
        <div
          className={cn(
            "absolute group-hover:h-6 group-hover:w-2.5 transition-all duration-300 size-2.5 -left-1.5 bg-white rounded-full",
            selectedServerId === serverDetails.id
              ? "!h-12"
              : !serverDetails.unread && "size-0",
          )}
        />
      </div>
    </div>
  );
};

export default ServerIcon;
