import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice";
import notificationSlice from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    notifications: notificationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
