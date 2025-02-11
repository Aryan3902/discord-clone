import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { cn, groupIntoCategories } from "@/lib/utils";

import { CategoryChannelDetails, ChannelDetails } from "@/types/channel";
import { ChevronDown, ChevronRight, Hash } from "lucide-react";
import { useEffect, useState } from "react";
import { selectChannel } from "@/redux/slices/serverSlice";
import MentionBadge from "../shared/MentionBadge";

const ChannelComponent = ({
  channel,
  selectedChannelId,
}: {
  channel: ChannelDetails;
  selectedChannelId: number | null;
}) => {
  const dispatch = useDispatch();
  const currServer = useSelector((state: RootState) =>
    state.server.servers.find((x) => x.id === state.server.selectedServerId)
  );
  const handleChannelClick = () => {
    dispatch(
      selectChannel({ serverId: currServer?.id || 0, channelId: channel.id })
    );
  };
  const isSelected = selectedChannelId === channel.id;
  const isUnread = channel.unread;
  return (
    <div
      key={channel.id}
      className={cn(
        "flex items-center gap-2 p-1 cursor-pointer hover:bg-zinc-700/50 group rounded-sm relative",
        isSelected && "bg-zinc-700"
      )}
      onClick={handleChannelClick}
    >
      <div className="flex-1 flex items-center gap-2">
        {isUnread && (
          <div className="absolute size-2 -left-3 bg-white rounded-full overflow-hidden z-0" />
        )}
        <Hash
          size={24}
          className={cn(
            "channel-text",
            (isUnread || isSelected) && "text-white"
          )}
        />
        <h3
          className={cn(
            "text-zinc-400 text-base font-medium group-hover:text-zinc-300",
            (isUnread || isSelected) && "text-white"
          )}
        >
          {channel.name}
        </h3>
      </div>
      {channel.mentions > 0 && <MentionBadge mentions={channel.mentions} />}
    </div>
  );
};

const CategoryComponent = ({
  channels,
  selectedChannelId,
}: {
  channels: CategoryChannelDetails;
  selectedChannelId: number | null;
}) => {
  const [open, setOpen] = useState(true);

  const handleCategoryClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div>
      <div
        className="flex items-center gap-1 group cursor-pointer"
        onClick={handleCategoryClick}
      >
        {open ? (
          <ChevronDown size={14} className="channel-text" />
        ) : (
          <ChevronRight size={14} className="channel-text" />
        )}
        <h1 className="channel-text text-xs font-bold">
          {channels.name.toUpperCase()}
        </h1>
      </div>

      <div className="flex flex-col gap-1 my-2">
        {channels.channels?.map((channel) => {
          if (open || channel.unread || channel.id === selectedChannelId)
            return (
              <ChannelComponent
                key={channel.id}
                channel={channel}
                selectedChannelId={selectedChannelId || null}
              />
            );
        })}
      </div>
    </div>
  );
};

const ChannelList = () => {
  const currServer = useSelector((state: RootState) =>
    state.server.servers.find((x) => x.id === state.server.selectedServerId)
  );
  console.log(currServer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (currServer) {
      dispatch(selectChannel({ serverId: currServer.id }));
    }
  }, [currServer, dispatch]);

  const selectedChannelId = useSelector(
    (state: RootState) =>
      state.server.selectedChannelIds[
        currServer?.id ?? state.server.servers[0].id
      ]
  );

  const channels = currServer?.channels;
  const groupedChannels = groupIntoCategories(channels || []);

  return (
    <div className="bg-zinc-800 h-full select-none">
      <div className="flex p-4 shadow-md">
        <h1 className="text-white text-lg font-bold">{currServer?.name}</h1>
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
