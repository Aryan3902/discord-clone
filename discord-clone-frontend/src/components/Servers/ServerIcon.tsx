import { ServerDetails } from "@/types/server";
import { useDispatch, useSelector } from "react-redux";
import { selectServer } from "@/redux/slices/serverSlice";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getNameInitials } from "@/lib/utils";
import { RootState } from "@/redux/store";
import MentionBadge from "../shared/MentionBadge";

const ServerIcon = ({ serverDetails }: { serverDetails: ServerDetails }) => {
  const { selectedServerId } = useSelector((state: RootState) => state.server);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectServer(serverDetails.id));
  };

  return (
    <div
      className={cn(
        "relative group px-4 py-2 transition-all duration-300",
        selectedServerId === serverDetails.id &&
          "bg-gradient-to-r from-white/20"
      )}
      onClick={handleClick}
    >
      <Avatar className="size-14">
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
            "absolute group-hover:h-6 group-hover:w-3 transition-all duration-300 size-3 -left-1.5 bg-white rounded-full",
            selectedServerId === serverDetails.id
              ? "!h-12"
              : !serverDetails.unread && "size-0"
          )}
        />
      </div>
    </div>
  );
};

export default ServerIcon;
