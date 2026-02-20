import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import ServerList from "@/features/Servers/components/ServerList";
import { useAppDispatch } from "./redux/hooks";
import { fetchServersAsync } from "./redux/slices/serverSlice";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Chat from "./features/Chat/components/Chat";

const ChannelList = lazy(() => import("./features/Channels/ChannelList"));
const UsersList = lazy(() => import("./features/Users/UsersList"));

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
          <div className="w-1/6">
            <Suspense fallback={<div>Users List Loading</div>}>
              <UsersList />
            </Suspense>
          </div>
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </main>
  );
}

export default App;
