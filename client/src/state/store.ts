import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slices/registerSlice";
import alertSlice from "./slices/alertSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    alert: alertSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
