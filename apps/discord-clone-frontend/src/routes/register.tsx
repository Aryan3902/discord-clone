import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 w-[40rem] rounded-xl p-10">
        <div className="text-center">
          <h3 className="text-3xl font-bold my-2">Create an account!</h3>
        </div>
        <div>
          <form className="flex flex-col gap-6 ">
            <div className="flex flex-col gap-2">
              <label className="text-white font-normal text-lg">Email</label>
              <input
                type="email"
                className="bg-zinc-900 rounded-md p-2 font-normal text-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white font-normal text-lg">
                Display Name
              </label>
              <input
                type="text"
                className="bg-zinc-900 rounded-md p-2 font-normal text-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white font-normal text-lg">Username</label>
              <input
                type="text"
                className="bg-zinc-900 rounded-md p-2 font-normal text-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white font-normal text-lg">Password</label>
              <input
                type="password"
                className="bg-zinc-900 rounded-md p-2 font-normal text-lg"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 rounded-md p-2 font-medium text-xl hover:bg-blue-600 transition-colors"
            >
              Register
            </button>
          </form>
          <p className="text-zinc-200 text-sm my-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-300 hover:text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
