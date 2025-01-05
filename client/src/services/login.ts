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

const login = async (
  credentials: Credentials,
  alert: (
    type: "info" | "success" | "warning" | "error",
    message: string
  ) => void
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(
      "/api/auth/login",
      credentials
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError);

    if (axiosError.response) {
      console.error("Error data:", axiosError.response.data);
      console.error("Status code:", axiosError.response.status);

      switch (axiosError.response.status) {
        case 401:
          alert("error", "Blogi prisijungimo duomenys");
          break;
        case 400:
          alert("error", "Toks vartotojas nera registruotas");
          break;
        default:
          alert("error", "Klaida jungiantis prasome bandyti veliau");
          break;
      }
    }

    throw axiosError;
  }
};

export default login;
