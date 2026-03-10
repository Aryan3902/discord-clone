import { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./redux/hooks";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { routeTree } from "./routeTree.gen";
import { logout, setCredentials } from "./redux/slices/authSlice";
import { createRouter, RouterProvider } from "@tanstack/react-router";

const router = createRouter({
  routeTree,
  context: { auth: { isAuthenticated: false } },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isInitialized } = useSelector(
    (state: RootState) => state.auth,
  );

  // const { loading, error } = useSelector((state: RootState) => state.server);

  useEffect(() => {
    const attemptSlientRefresh = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        if (response.ok) {
          const data = await response.json();
          dispatch(setCredentials({ accessToken: data.accessToken }));
        } else {
          dispatch(logout());
        }
      } catch {
        dispatch(logout());
      }
    };
    attemptSlientRefresh();
  }, [dispatch]);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    // <main className="min-h-screen">
    //   {loading ? (
    //     <AppFallback />
    //   ) : (
    //     <div className="flex w-full">
    //       <ServerList />
    //       <div className="w-1/6">
    //         <Suspense fallback={<div>Channel List Loading</div>}>
    //           <ChannelList />
    //         </Suspense>
    //       </div>
    //       <div className="flex-1">
    //         <Chat />
    //       </div>
    //       <div className="w-1/6">
    //         <Suspense fallback={<div>Users List Loading</div>}>
    //           <UsersList />
    //         </Suspense>
    //       </div>
    //     </div>
    //   )}
    //   {error && <div>Error: {error}</div>}
    // </main>
    <RouterProvider router={router} context={{ auth: { isAuthenticated } }} />
  );
}

export default App;
