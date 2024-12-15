import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getToken, clearToken } from "../utils/tokenUtils";
import { loginUser, LogoutUser } from "../services/authService";
import { parseJwt } from "../utils/parseJwt";
import { getUserById } from "../services/userService";
import { clearLocal, getLocal, setLocal } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import mapUserData from "../utils/mapUserData";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getLocal("loggedInUser") || null); // Initial state from localStorage
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const hydrateUser = async () => {
    try {
      setLoading(true);

      const token = getToken();
      if (!token) {
        console.log("No token found. User remains logged out.");
        clearLocal("loggedInUser");
        setUser(null);
        return;
      }

      const storedUser = getLocal("loggedInUser");
      if (storedUser) {
        setUser(storedUser);
        console.log("User hydrated from localStorage:", storedUser);
        return;
      }

      // Token exists but no stored user, fetch from DB
      const decodedUser = parseJwt(token);
      setLocal("decodedUser", decodedUser);

      const userDb = await getUserById(decodedUser.user_id);
      if (userDb.status === 200) {
        const loggedInUser = mapUserData(userDb.data);
        setLocal("loggedInUser", loggedInUser);
        setUser(loggedInUser);
        console.log("User fetched and hydrated from DB:", loggedInUser);
      } else {
        console.error("Failed to fetch user from DB during hydration.");
        clearToken();
        clearLocal("loggedInUser");
      }
    } catch (error) {
      console.error("Error hydrating user:", error);
      clearToken();
      clearLocal("loggedInUser");
    } finally {
      setLoading(false);
    }
  };

  const login = async (emailOrUsername, password) => {
    try {
      if (!emailOrUsername || !password) {
        throw new Error("Please provide both email/username and password.");
      }

      const authUser = await loginUser(emailOrUsername, password);
      if (!authUser) {
        throw new Error("Login failed: User not found.");
      }

      const token = getToken();
      if (token) {
        const decodedUser = parseJwt(token);
        setLocal("decodedUser", decodedUser);

        const userDb = await getUserById(decodedUser.user_id);
        if (userDb) {
          const loggedInUser = mapUserData(userDb);
          setLocal("loggedInUser", loggedInUser);
          setUser(loggedInUser);
          console.log("User logged in and data stored:", loggedInUser);
          return loggedInUser;
        } else {
          throw new Error("Login failed: User not found in the database.");
        }
      } else {
        throw new Error("Login failed: Invalid token.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      throw new Error(error.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      await LogoutUser();
      setUser(null);
      clearToken();
      clearLocal("loggedInUser");
      clearLocal("decodedUser");
      navigate("/login");
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    hydrateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider };
export default AuthContext;
