import useAuth from "../hooks/useAuth";

const UserContext = () => {
  const { user } = useAuth();
  if (user?.isAdmin) {
    // Show admin UI
  }
};

export default UserContext;
