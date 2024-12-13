import { clearToken, setToken } from "../utils/tokenUtils";
import {
  forgotPasswordApi,
  loginApi,
  logoutApi,
  registerApi,
  resetPasswordApi,
} from "../api/authApi";

export const loginUser = async (emailOrUsername, password) => {
  try {
    const response = await loginApi(emailOrUsername, password); // response is already `response.data`

    const { token } = response; // Access token directly from `response`

    if (!token) {
      console.error("No token received from login API.");
      throw new Error("Login failed: No token provided.");
    }

    setToken(token);
    console.log("Token saved to localStorage.");

    return response; // Return the full response
  } catch (error) {
    console.error(
      "Login failed:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const LogoutUser = async () => {
  await logoutApi();
  clearToken();
};

export const registerUser = (userData) => {
  return registerApi(userData); // Directly call API (no extra logic needed here)
};

export const forgotPasswordUser = (email) => {
  return forgotPasswordApi(email); // Directly call API
};

export const resetPasswordUser = (token, password) => {
  return resetPasswordApi(token, password); // Directly call API
};
