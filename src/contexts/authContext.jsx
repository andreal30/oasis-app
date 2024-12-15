import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { loginApi } from "../api/authApi";
import { loginUser, logoutUser } from "../services/authService";
import { getToken, setToken } from "../utils/tokenUtils";
import { parseJwt } from "../utils/parseJwt";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decodedUser = parseJwt(token);
      console.log("Decoded user from token:", decodedUser);
      setUser(decodedUser);
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    const { token } = data;
    setToken(token);
    const decodedUser = parseJwt(token);
    console.log("User logged in:", decodedUser);
    setUser(decodedUser);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider };
export default AuthContext;
