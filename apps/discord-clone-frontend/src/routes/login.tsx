import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserLoginSchema, UserLoginType } from "@discord-clone/shared-types";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/authSlice";
import FormLabelInput from "@/components/shared/form/FormLabelInput";

export const Route = createFileRoute("/login")({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || "/",
  }),
  beforeLoad: ({ context, search }) => {
    // Redirect if already authenticated
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { redirect } = Route.useSearch();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<UserLoginType>({
    resolver: zodResolver(UserLoginSchema),
  });
  const onSubmit = async (data: UserLoginType) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const responseJson = await response.json();
      if (!response.ok) {
        throw new Error(responseJson.error);
      }
      const { accessToken } = responseJson;
      dispatch(setCredentials({ accessToken }));
      router.navigate({ to: redirect });
    } catch (error) {
      console.error(error);
      setError("root", {
        message: (error as Error).message || "Failed to login",
      });
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 w-[40rem] rounded-xl p-10">
        <div className="text-center">
          <h3 className="text-3xl font-bold my-2">Welcome back!</h3>
          <p className="text-md text-zinc-200">
            We're so excited to have you back!
          </p>
        </div>
        <div>
          <form
            className="flex flex-col gap-6 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormLabelInput
              label="Username"
              type="text"
              name="username"
              register={register}
              errors={errors}
            />
            <FormLabelInput
              label="Password"
              type="password"
              name="password"
              register={register}
              errors={errors}
            />
            <button
              type="submit"
              className="bg-blue-500 rounded-md p-2 font-medium text-xl hover:bg-blue-600 transition-colors"
              disabled={isSubmitting}
            >
              Login
            </button>
          </form>
          <p className="text-zinc-200 text-sm my-2">
            Don't have an account?{" "}
            <Link
              to="/register"
              search={{ redirect }}
              className="text-blue-300 hover:text-blue-600"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
