import { Suspense, useEffect } from "react";
import "./App.css";
import ServerList from "@/components/Servers/ServerList";
import { useAppDispatch } from "./redux/hooks";
import { fetchServersAsync } from "./redux/slices/serverSlice";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import ChannelList from "./components/Channels/ChannelList";

function App() {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.server);
  useEffect(() => {
    dispatch(fetchServersAsync());
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="min-h-screen">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex w-full">
            <ServerList />
            <div className="w-1/6">
              <ChannelList />
            </div>
            <div className="flex-1">Chat</div>
            <div className="w-1/6">Users</div>
          </div>
        )}
        {error && <div>Error: {error}</div>}
      </main>
    </Suspense>
  );
}

export default App;
