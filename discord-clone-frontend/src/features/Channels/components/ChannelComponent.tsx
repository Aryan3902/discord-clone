import { cn } from "@/lib/utils";
import { selectChannel } from "@/redux/slices/serverSlice";
import { Hash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { ChannelDetails } from "@/types/channel";
import MentionBadge from "@/components/MentionBadge";
import { selectCurrentServer } from "@/redux/selectors";

const ChannelComponent = ({
  channel,
  selectedChannelId,
}: {
  channel: ChannelDetails;
  selectedChannelId: number | null;
}) => {
  const dispatch = useDispatch();
  const currServer = useSelector(selectCurrentServer);
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
          size={22}
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

export default ChannelComponent;
