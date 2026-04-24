import ServerIcon from "./ServerIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { PlusIcon } from "lucide-react";

const ServerList = () => {
  const servers = useSelector((state: RootState) => state.server.servers);
  return (
    <div className="flex flex-col gap-2 bg-zinc-900 min-h-screen pt-2 z-10">
      {servers.map((server) => (
        <ServerIcon serverDetails={server} key={server.id} />
      ))}
      <div className="px-4 p-2">
        <div className="size-10 bg-zinc-700 rounded-xl flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors duration-300">
          <PlusIcon className="size-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default ServerList;
