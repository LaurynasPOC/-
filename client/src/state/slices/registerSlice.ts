import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface FormData {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
}

interface RegisterState {
  formData: FormData;
  errors: FormErrors;
}

const initialState: RegisterState = {
  formData: {
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  },
  errors: {},
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setField: (
      state,
      action: PayloadAction<{ field: keyof FormData; value: string }>
    ) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
      state.errors[field] = undefined;
    },
    setErrors: (state, action: PayloadAction<FormErrors>) => {
      state.errors = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { setField, setErrors, resetForm } = registerSlice.actions;

export const selectFormData = (state: RootState) => state.register.formData;
export const selectFormErrors = (state: RootState) => state.register.errors;

export default registerSlice.reducer;
