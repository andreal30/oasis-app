// import { useQuery } from "react-query";
import MainButton from "../components/Commons/Buttons/MainButton";
import useAuthContext from "../hooks/useAuth";
import { getLocal } from "../utils/localStorage";

const HomePage = () => {
  const { logout } = useAuthContext();

  const user = getLocal("loggedInUser");

  if (!user) {
    logout();
    throw new Error("User not found.");
  }
  const handleLogout = async () => {
    await logout();
  };

  if (!user) {
    return <div>Loading...</div>; // Handle undefined user gracefully
  }

  return (
    <>
      <div>Welcome, {user.firstName}</div>;
      <MainButton label='Logout' onClick={handleLogout} />
    </>
  );
};

export default HomePage;
