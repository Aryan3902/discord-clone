import "./App.css";
import ServerList from "@/components/Servers/ServerList";

function App() {
  return (
    <main className="min-h-screen">
      <div className="flex w-full">
        <ServerList />
        <div className="w-1/6">Rooms</div>
        <div className="flex-1">Chat</div>
        <div className="w-1/6">Users</div>
      </div>
    </main>
  );
}

export default App;
