import axios, { AxiosError } from "axios";

const API_BASE_URL = "http://localhost:5000";

interface User {
  username: string;
  email: string;
  password: string;
  password2: string;
}

interface RegisterResponse {
  id: string;
  username: string;
}

interface ErrorResponse {
  message: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const register = async (newUser: User): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>("/api/register", newUser);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError && axiosError.response) {
      console.error("Register API error:", axiosError.response.data.message);
      throw new Error(
        axiosError.response.data.message || "Error during registration"
      );
    } else {
      console.error("Unknown error:", axiosError);
      throw new Error("Unknown error occurred during registration");
    }
  }
};

export default register;
