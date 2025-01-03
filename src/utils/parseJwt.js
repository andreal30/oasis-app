import { getToken } from "./tokenUtils";

export const parseJwt = (token) => {
  token = getToken();

  if (!token) {
    token = getToken();
    console.log("Token retrieved from storage:", token);
  }

  if (!token) {
    console.error("No token provided for parsing.");
    return null;
  }

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse JWT. Token:", token, "Error:", error);
    return null;
  }
};
