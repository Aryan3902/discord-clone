import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import ServerList from "@/components/Servers/ServerList";
import { useAppDispatch } from "./redux/hooks";
import { fetchServersAsync } from "./redux/slices/serverSlice";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Chat from "./components/Chat/Chat";

const ChannelList = lazy(() => import("./components/Channels/ChannelList"));

const AppFallback = () => {
  console.log("App Fallback");
  return <div>Loading...</div>;
};

function App() {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.server);
  useEffect(() => {
    dispatch(fetchServersAsync());
  }, [dispatch]);

  return (
    <main className="min-h-screen">
      {loading ? (
        <AppFallback />
      ) : (
        <div className="flex w-full">
          <ServerList />
          <div className="w-1/6">
            <Suspense fallback={<div>Channel List Loading</div>}>
              <ChannelList />
            </Suspense>
          </div>
          <div className="flex-1">
            <Chat />
          </div>
          <div className="w-1/6">Users</div>
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </main>
  );
}

export default App;
