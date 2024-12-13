import useAuthContext from "../hooks/useAuth";

const UserContext = () => {
  const { user } = useAuthContext();
  if (user?.isAdmin) {
    // Show admin UI
  }
};

export default UserContext;
