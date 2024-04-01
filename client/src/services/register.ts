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

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const register = async (newUser: User): Promise<RegisterResponse> => {
  return api
    .post<RegisterResponse>("/api/register", newUser)
    .then((response) => response.data)
    .catch((error: AxiosError) => {
      console.log(error);
      throw error;
    });
};

export default register;
