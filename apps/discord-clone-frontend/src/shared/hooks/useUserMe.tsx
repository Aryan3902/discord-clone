// features/auth/api/queries.ts
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/apiFetch";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const useUserMe = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return useQuery({
    queryKey: ["users", "@me"],
    queryFn: () => apiFetch(`${import.meta.env.VITE_API_URL}/users/@me`),
    // ONLY run this fetch if Redux says we have an access token
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
