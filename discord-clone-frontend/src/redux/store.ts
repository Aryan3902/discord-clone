import { configureStore } from "@reduxjs/toolkit";
import serverReducer from "./slices/serverSlice";

const store = configureStore({
  reducer: {
    server: serverReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
