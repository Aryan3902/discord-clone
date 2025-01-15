import reactIcon from "@/assets/react.svg";
import viteIcon from "@/assets/vite.svg";
import ServerIcon from "./ServerIcon";

const servers = [
  {
    id: 1,
    name: "React",
    icon: reactIcon,
    mentions: 10,
  },
  {
    id: 2,
    name: "Vite Server",
    icon: viteIcon,
    mentions: 0,
  },
];

const ServerList = () => {
  return (
    <div className="flex flex-col gap-4 bg-zinc-900 min-h-screen p-2">
      {servers.map((server) => (
        <ServerIcon serverDetails={server} />
      ))}
    </div>
  );
};

export default ServerList;
