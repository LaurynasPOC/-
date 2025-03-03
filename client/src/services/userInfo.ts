import axios, { AxiosError } from "axios";
export interface UserData {
  username: string;
  email: string;
  phone: string;
  address: string;
}

const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = (token: string | null) => {
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : {};
};

export const getUserProfile = async (
  token: string
): Promise<{ success: boolean; user?: UserData; message?: string }> => {
  try {
    const response = await axios.get<UserData>(`${API_BASE_URL}/users`, {
      headers: getAuthHeaders(token),
    });
    return { success: true, user: response.data };
  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    return {
      success: false,
      message: err.response?.data?.error || "Failed to fetch user data",
    };
  }
};

export const updateUserProfile = async (
  token: string,
  userData: UserData
): Promise<{ success: boolean; message?: string }> => {
  try {
    await axios.post(`${API_BASE_URL}/users`, userData, {
      headers: getAuthHeaders(token),
    });
    return { success: true, message: "User data updated successfully" };
  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    return {
      success: false,
      message: err.response?.data?.error || "Failed to update user data",
    };
  }
};
