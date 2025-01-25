import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice";
import alertSlice from "./slices/alertSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    alert: alertSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
