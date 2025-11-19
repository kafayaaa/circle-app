import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import threadReducer from "./slices/threadSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadReducer,
  },
});

// Types untuk seluruh app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
