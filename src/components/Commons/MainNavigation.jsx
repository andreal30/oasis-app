import { Avatar } from "primereact/avatar";
import { Ripple } from "primereact/ripple";
import { NavLink, useNavigate } from "react-router-dom";
import { LogoutUser } from "../../services/authService";
import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";

const MainNavigation = ({ setVisible }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    LogoutUser();
    setVisible(false);
    navigate("/login");
  };

  const handleVisible = () => {
    setVisible(false);
  };

  return (
    <>
      <div className='overflow-y-auto'>
        <ul className='list-none p-0 m-0 overflow-hidden'>
          <li>
            <NavLink
              to='/home'
              className='no-underline'
              onClick={handleVisible}
            >
              <div className='p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full'>
                <i className='pi pi-home mr-2'></i>
                <span className='font-medium text-700'>Home</span>
                <Ripple />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/favourites'
              className='no-underline'
              onClick={handleVisible}
            >
              <div className='p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full'>
                <i className='pi pi-heart mr-2'></i>
                <span className='font-medium text-700'>Favourites</span>
                <Ripple />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/my-flats'
              className='no-underline'
              onClick={handleVisible}
            >
              <div className='p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full'>
                <i className='pi pi-face-smile mr-2'></i>
                <span className='font-medium text-700'>My Flats</span>
                <Ripple />
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/new-flat'
              className='no-underline'
              onClick={handleVisible}
            >
              <div className='p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full'>
                <i className='pi pi-plus mr-2'></i>
                <span className='font-medium text-700'>New Flat</span>
                <Ripple />
              </div>
            </NavLink>
          </li>
          {user && user.isAdmin === true && (
            <li>
              <NavLink
                to='/all-users'
                className='no-underline'
                onClick={handleVisible}
              >
                <div className='p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full'>
                  <i className='pi pi-user mr-2'></i>
                  <span className='font-medium text-700'>All Users</span>
                  <Ripple />
                </div>
              </NavLink>
            </li>
          )}
          <li>
            <button
              type='button'
              onClick={handleLogout}
              className='p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-200 transition-duration-150 transition-colors w-full surface-100 border-noround border-none font-medium text-700 text-base'
              style={{ fontWeight: 700 }}
            >
              <i className='pi pi-sign-out mr-2'></i>
              {/* <span className="font-medium no-underline text-700"> */}
              Sign Out
              {/* </span> */}
              <Ripple />
            </button>
          </li>
        </ul>
      </div>
      <div className='mt-auto'>
        <hr className='mb-3 mx-3 border-top-1 border-none surface-border' />
        <NavLink to='/profile' className='no-underline' onClick={handleVisible}>
          <div className='m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple'>
            <div className='mt-4 flex gap-2 align-items-center'>
              <Avatar
                image={user.profileImage}
                imageAlt='{user.firstName} {user.lastName}'
                className='mr-2'
                size='large'
                shape='circle'
              />
              <div>
                <p className='font-bold m-0'>
                  {user.firstName} {user.lastName}
                </p>
                <p className='text-sm text-gray-500 m-0'>{user.email}</p>
              </div>
            </div>
          </div>
        </NavLink>
      </div>
    </>
  );
};

MainNavigation.propTypes = {
  setVisible: PropTypes.func,
};

export default MainNavigation;
