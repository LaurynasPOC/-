import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isTokenValid } from "../../utils/auth"; // Import utility function

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  username: string | null;
}

const storedToken = localStorage.getItem("token");
const storedUsername = localStorage.getItem("username");

const initialState: AuthState = {
  isAuthenticated: isTokenValid(storedToken),
  token: isTokenValid(storedToken) ? storedToken : null,
  username: isTokenValid(storedToken) ? storedUsername : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ token: string; username: string }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.username = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
    setAuthState: (state, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
  },
});

export const { login, logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
