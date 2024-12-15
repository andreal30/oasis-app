import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./hooks/useAuth";
import { getToken } from "./utils/tokenUtils";

function App() {
  const navigate = useNavigate();
  const { logout, user } = useAuthContext();

  // Add global logout listener
  useEffect(() => {
    console.log("User state updated in App:", user);
    const token = getToken();

    const handleLogout = () => {
      logout(); // Ensure logout clears user and redirects appropriately
      navigate("/login");
    };
    if (!token) {
      handleLogout();
    }

    // Add the logout event listener
    window.addEventListener("logout", handleLogout);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("logout", handleLogout);
    };
  }, [logout, navigate, user]); // Add 'logout', 'navigate', and 'user' to dependencies

  return null; // App.jsx doesn't need to return UI, as the router handles rendering
}

export default App;
