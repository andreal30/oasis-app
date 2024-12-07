import { NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/login'>Login</NavLink>
      </li>
    </>
  );
};
export default MainNavigation;
