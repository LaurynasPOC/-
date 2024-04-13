import axios, { AxiosError } from "axios";

const API_BASE_URL = "http://localhost:5000";

interface Credentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const login = async (credentials: Credentials): Promise<LoginResponse> => {
  return await api
    .post<LoginResponse>("/api/login", credentials)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.log(error);
      throw error;
    });
};

export default login;
