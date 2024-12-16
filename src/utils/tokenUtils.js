import { jwtDecode } from "jwt-decode";

// Set token in local storage
export const setToken = (token) => {
  localStorage.setItem("token", token);
  // console.log("Saving token to localStorage:", token);
};

// Get token from local storage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove token from local storage
export const clearToken = () => {
  localStorage.removeItem("token");
};

// Check if token exists
export const hasToken = () => {
  return !!getToken();
};

// Check if token is expired
export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime; // Check if the token is expired
  } catch (error) {
    console.error("Invalid token:", error);
    return true; // Treat invalid tokens as expired
  }
};
