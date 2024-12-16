import axios from "axios";
import { clearToken, getToken, isTokenExpired } from "./tokenUtils";
import { clearLocal } from "./localStorage";
// import { clearToken } from "./tokenUtils";
// import { clearLocal } from "./localStorage";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// List of public routes
const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

// // Request Interceptor for Attaching Tokens and Validation
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken(); // Retrieve the token from localStorage

    // Check if the request URL matches a public route
    const isPublicRoute = publicRoutes.some((route) =>
      config.url?.startsWith(route)
    );

    // Skip token attachment for public routes
    if (isPublicRoute) {
      return config;
    }

    if (!token) {
      // Redirect to login if no token is found for protected routes
      clearLocal("loggedInUser");
      clearLocal("decodedUser");
      window.location.href = "/login";
      return Promise.reject(new Error("No token found"));
    }

    if (isTokenExpired(token)) {
      // Redirect to login if the token is expired
      clearLocal("loggedInUser");
      clearLocal("decodedUser");
      window.location.href = "/login";
      return Promise.reject(new Error("Token has expired"));
    }

    // Attach the token to the request headers for protected routes
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for Handling Unauthorized Responses
axiosInstance.interceptors.response.use(
  (response) => response, // Let successful responses pass through
  (error) => {
    const requestUrl = error.config?.url || ""; // Get the request URL

    // Check if the URL matches a public route
    const isPublicRoute = publicRoutes.some((route) =>
      requestUrl.startsWith(route)
    );

    // Skip token clearing or redirection for public routes
    if (isPublicRoute) {
      return Promise.reject(error); // Let the public route handle its own errors
    }

    // Handle 401 errors for protected routes
    if (error.response?.status === 401) {
      clearToken(); // Clear any existing tokens
      const event = new Event("logout");
      window.dispatchEvent(event); // Notify the app of logout
      window.location.href = "/login"; // Redirect to login
    }

    return Promise.reject(error); // Propagate the error for further handling
  }
);

export default axiosInstance;
