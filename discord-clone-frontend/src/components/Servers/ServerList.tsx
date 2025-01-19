import ServerIcon from "./ServerIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ServerList = () => {
  const servers = useSelector((state: RootState) => state.server.servers);
  return (
    <div className="flex flex-col gap-2 bg-zinc-900 min-h-screen pt-2 z-10">
      {servers.map((server) => (
        <ServerIcon serverDetails={server} key={server.id} />
      ))}
    </div>
  );
};

export default ServerList;
