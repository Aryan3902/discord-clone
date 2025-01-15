import { ServerDetails } from "types/server";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameInitials } from "@/lib/utils";

const ServerIcon = ({ serverDetails }: { serverDetails: ServerDetails }) => {
  return (
    <div className="relative cursor-pointer group">
      <Avatar className="size-14 ">
        <AvatarImage
          src={serverDetails.icon}
          className="p-2 bg-zinc-700 group-hover:bg-highlight transition-colors duration-300"
        />
        <AvatarFallback>{getNameInitials(serverDetails.name)}</AvatarFallback>
      </Avatar>
      {serverDetails.mentions > 0 && (
        <div className="absolute -bottom-1  -right-1 p-0.5 px-1.5 text-xs text-white font-extrabold bg-red-500 border-4 border-zinc-900 rounded-full flex items-center justify-center">
          {serverDetails.mentions}
        </div>
      )}
    </div>
  );
};

export default ServerIcon;
