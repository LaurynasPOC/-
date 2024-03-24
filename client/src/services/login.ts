import axios from "axios";

interface Credentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const login = async (credentials: Credentials): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>("/api/login", credentials);
  return response.data;
};

export default login;
