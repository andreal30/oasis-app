import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useTokenWatcher = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "token" && !event.newValue) {
        // Token removed from localStorage
        navigate("/login");
      }
    };

    // Listen to storage events
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);
};

export default useTokenWatcher;
