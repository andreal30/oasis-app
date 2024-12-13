// Axios instance with interceptors
import axios from "axios";
import { clearToken, getToken } from "./tokenUtils";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  // console.log("Attaching token to request:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      clearToken();
      const event = new Event("logout");
      window.dispatchEvent(event); // Notify app of logout
    }
    return Promise.reject(error);
  }
);

const token = getToken();
axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default axiosInstance;
// export { axios, instance };
