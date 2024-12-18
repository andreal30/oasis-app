import { clearToken, setToken } from "../utils/tokenUtils";
import {
  forgotPasswordApi,
  getLoggedUserByIdApi,
  loginApi,
  logoutApi,
  registerApi,
  resetPasswordApi,
} from "../api/authApi";
import { clearLocal } from "../utils/localStorage";

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
  clearLocal("loggedInUser");
  clearLocal("jwtToken");
  clearLocal("decodedUser");
};

export const registerUser = (userData) => {
  try {
    const response = registerApi(userData); // response is already `response.data`
    return response;
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const forgotPasswordUser = (email) => {
  return forgotPasswordApi(email); // Directly call API
};

export const resetPasswordUser = (token, password) => {
  return resetPasswordApi(token, password); // Directly call API
};

export const getLoggedUserById = async (userId) => {
  try {
    const user = await getLoggedUserByIdApi(userId);
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};
