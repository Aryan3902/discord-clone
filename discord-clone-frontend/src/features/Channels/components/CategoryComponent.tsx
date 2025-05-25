import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CategoryChannelDetails } from "@/types/channel";
import ChannelComponent from "./ChannelComponent";

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

export default CategoryComponent;
