import ChannelComponent from "./components/ChannelComponent";
import CategoryComponent from "./components/CategoryComponent";
import { groupIntoCategories } from "@/lib/utils";
import { ChannelDetails } from "@/types/channel";

const ChannelList = ({
  serverName,
  selectedChannelId,
}: {
  serverName: string;
  selectedChannelId: number | null;
}) => {
  const channels: ChannelDetails[] = [];
  const groupedChannels = groupIntoCategories(channels);

  return (
    <div className="bg-zinc-800 h-full select-none">
      <div className="flex p-4 shadow-md">
        <h1 className="text-white text-lg font-bold">{serverName}</h1>
      </div>
      <div className="flex flex-col gap-2 p-4 px-2">
        {groupedChannels.map((groupChannel) => {
          if (groupChannel.category) {
            return (
              <CategoryComponent
                key={groupChannel.id}
                channels={groupChannel}
                selectedChannelId={selectedChannelId || null}
              />
            );
          }
          return (
            <ChannelComponent
              key={groupChannel.id}
              channel={groupChannel}
              selectedChannelId={selectedChannelId || null}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChannelList;
