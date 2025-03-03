import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number; // Expiration timestamp (seconds)
}

/**
 * Checks if a JWT token is still valid
 * @param token JWT Token string
 * @returns `true` if valid, `false` if expired or missing
 */
export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp > currentTime; // Check if token is still valid
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};
