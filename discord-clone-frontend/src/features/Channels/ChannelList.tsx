import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectChannel } from "@/redux/slices/serverSlice";
import ChannelComponent from "./components/ChannelComponent";
import CategoryComponent from "./components/CategoryComponent";
import {
  selectCurrentServer,
  selectSelectedChannelId,
} from "@/redux/selectors";
import { selectGroupedChannels } from "./store/selectors";

const ChannelList = () => {
  const dispatch = useDispatch();
  const currServer = useSelector(selectCurrentServer);
  const selectedChannelId = useSelector(selectSelectedChannelId);
  const groupedChannels = useSelector(selectGroupedChannels);
  console.log(currServer);

  useEffect(() => {
    if (currServer) {
      dispatch(selectChannel({ serverId: currServer.id }));
    }
  }, [currServer, dispatch]);

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
