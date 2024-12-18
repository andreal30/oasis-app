import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to='/login' />;
};

const PublicLayout = () => <Outlet />;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PrivateRoute, PublicLayout };
