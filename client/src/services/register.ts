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

const register = async (
  newUser: User,
  alert: (
    type: "info" | "success" | "warning" | "error",
    message: string
  ) => void
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>(
      "/api/auth/register",
      newUser
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      console.error("Error data:", axiosError.response.data);
      console.error("Status code:", axiosError.response.status);

      switch (axiosError.response.status) {
        case 409: // Assuming 409 could mean duplicate user or similar issue
          alert("error", "Vartotojas su tokiu el. paštu jau egzistuoja");
          break;
        case 400: // Bad request, possibly validation errors
          alert("error", "Netinkamai užpildyti duomenys");
          break;
        default:
          alert("error", "Registracijos klaida. Bandykite dar kartą.");
          break;
      }
    }

    throw axiosError;
  }
};

export default register;
