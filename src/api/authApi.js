import axiosInstance from "../utils/axios";
import { setToken } from "../utils/tokenUtils";

export const loginApi = async (emailOrUsername, password) => {
  const response = await axiosInstance.post("/auth/login", {
    email: emailOrUsername.includes("@") ? emailOrUsername : undefined,
    username: !emailOrUsername.includes("@") ? emailOrUsername : undefined,
    password,
  });

  if (!response.data || !response.data.token) {
    throw new Error("Invalid response from the API. No token received.");
  }

  setToken(response.data.token);
  return response.data;
};

export const logoutApi = async () => {
  return await axiosInstance.post("/auth/logout"); // Raw API interaction
};

export const registerApi = async (userData) => {
  console.log("REGISTER API userData", userData);
  const response = await axiosInstance.post("/auth/register", userData); // Raw API interaction
  console.log("REGISTER API response.data", response.data);
  if (!response.data) {
    throw new Error("Invalid response from the API. No token received.");
  }
  return response.data;
};

export const forgotPasswordApi = async (email) => {
  return await axiosInstance.post("/auth/forgot-password", { email }); // Raw API interaction
};

export const resetPasswordApi = async (token, password) => {
  return await axiosInstance.post(`/auth/reset-password/${token}`, {
    password,
  }); // Raw API interaction
};

export const getLoggedUserByIdApi = async (userId) => {
  try {
    const response = await axiosInstance.get(`/auth/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user by ID:",
      error.response?.data || error.message
    );
    throw error;
  }
};
