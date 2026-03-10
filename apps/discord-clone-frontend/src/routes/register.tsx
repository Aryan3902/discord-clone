import {
  createFileRoute,
  Link,
  redirect,
  useRouter,
} from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserRegisterationSchema,
  type UserRegisterationType,
} from "@discord-clone/shared-types";
import FormLabelInput from "@/components/shared/form/FormLabelInput";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/authSlice";

export const Route = createFileRoute("/register")({
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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<UserRegisterationType>({
    resolver: zodResolver(UserRegisterationSchema),
  });
  const onSubmit = async (data: UserRegisterationType) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/register`,
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
        message: (error as Error).message || "Failed to register",
      });
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 w-[40rem] rounded-xl p-10">
        <div className="text-center">
          <h3 className="text-3xl font-bold my-2">Create an account!</h3>
        </div>
        <div>
          <form
            className="flex flex-col gap-6 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormLabelInput
              label="Email"
              type="email"
              name="email"
              register={register}
              errors={errors}
            />
            <FormLabelInput
              label="Display Name"
              type="text"
              name="name"
              register={register}
              errors={errors}
            />
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
            {errors.root && (
              <div className="w-full bg-red-500 rounded-md p-2">
                <p className="text-white font-medium text-sm">
                  {errors.root.message}
                </p>
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-500 rounded-md p-2 font-medium text-xl hover:bg-blue-600 transition-colors"
              disabled={isSubmitting}
            >
              Register
            </button>
          </form>
          <p className="text-zinc-200 text-sm my-2">
            Already have an account?{" "}
            <Link
              to="/login"
              search={{ redirect }}
              className="text-blue-300 hover:text-blue-600"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
