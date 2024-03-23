import axios from "axios";

interface Credentials {
  email: string;
  password: string;
}

interface User {
  username: string;
  email: string;
  password: string;
  password2: string;
}

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  id: string;
  username: string;
}

const login = async (credentials: Credentials): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>("/api/login", credentials);
  return response.data;
};

const register = async (newUser: User): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>("/api/register", newUser);
  return response.data;
};

export default { login, register };
