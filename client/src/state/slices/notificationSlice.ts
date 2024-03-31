import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface NotificationState {
  messages: Notification[];
}

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  text: string;
}

const initialState: NotificationState = {
  messages: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: {
      reducer: (state, action: PayloadAction<Notification>) => {
        state.messages.push(action.payload);
      },
      prepare: (type: Notification["type"], text: string) => ({
        payload: {
          id: new Date().getTime().toString(),
          type,
          text,
        },
      }),
    },
    removeNotification: (state, action: PayloadAction<{ id: string }>) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload.id
      );
    },
  },
});

export const { addNotification, removeNotification } =
  notificationSlice.actions;

export const selectNotificationMessages = (state: RootState) =>
  state.notifications.messages;
export default notificationSlice.reducer;
