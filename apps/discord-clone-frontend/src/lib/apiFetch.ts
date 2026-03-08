import { setCredentials, logout } from "@/redux/slices/authSlice";
import { Store } from "@reduxjs/toolkit";

let store: Store;

export const injectStore = (newStore: Store) => {
  store = newStore;
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const state = store.getState();
  const accessToken = state.auth.accessToken;

  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  if (!headers.get("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  let response = await fetch(
    `${import.meta.env.VITE_API_URL}${endpoint}`,
    config,
  );

  if (response.status === 401) {
    try {
      const refreshResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      if (!refreshResponse.ok) throw new Error("Failed to refresh token");

      const data = await refreshResponse.json();

      store.dispatch(setCredentials({ accessToken: data.accessToken }));

      headers.set("Authorization", `Bearer ${data.accessToken}`);
      response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        ...config,
        headers,
      });
    } catch (error) {
      store.dispatch(logout());
      throw error;
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "API request failed");
  }

  return response;
};
