import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AlertState {
  messages: Alert[];
}

interface Alert {
  id: string;
  type: "info" | "success" | "warning" | "error";
  text: string;
}

const initialState: AlertState = {
  messages: [],
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    addAlert: {
      reducer: (state, action: PayloadAction<Alert>) => {
        state.messages.push(action.payload);
      },
      prepare: (id, type: Alert["type"], text: string) => ({
        payload: {
          id,
          type,
          text,
        },
      }),
    },
    removeAlert: (state, action: PayloadAction<{ id: string }>) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload.id
      );
    },
  },
});

export const { addAlert, removeAlert } = alertSlice.actions;

export const selectNotificationMessages = (state: RootState) =>
  state.alert.messages;
export default alertSlice.reducer;
