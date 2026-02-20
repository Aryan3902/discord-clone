import { createFileRoute } from "@tanstack/react-router";
import {  } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-700 size-[36rem] rounded-xl">
        <div className="p-12">
        <form className="flex flex-col gap-6 ">
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium text-xl">Username</label>
            <input type="text" placeholder="Username" className="bg-zinc-600 rounded-md p-2 font-medium text-xl" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium text-xl">Password</label>
            <input type="password" placeholder="Password" className="bg-zinc-600 rounded-md p-2 font-medium text-xl" />
          </div>
          <button type="submit" className="bg-zinc-600 rounded-md p-2 font-medium text-xl hover:bg-zinc-800 transition-colors">Login</button>
        </form>
        </div>
      </div>
    </div>
  );
}
