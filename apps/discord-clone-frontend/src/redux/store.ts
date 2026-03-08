import { configureStore } from "@reduxjs/toolkit";
import serverReducer from "./slices/serverSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    server: serverReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
