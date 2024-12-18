import { useState, useEffect } from "react";
import MainButton from "../Commons/Buttons/MainButton";
// import LoginForm from "../Users/LoginForm";
// import UserForm from "../Users/UserForm";
import logoFilledWhite from "../../images/SVG/logo-filled-white.svg";

import "../../style/sliderForm.css";
import { NavLink, useLocation } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
const SliderAuth = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/";
  // const isRegisterPage = location.pathname === "/register";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (isMobile) {
      setIsRightPanelActive(false);
    }
  }, [isMobile]);

  //   const handleToggle = () => {
  //     if (isLoginPage) {
  //       navigate("/register");
  //     } else {
  //       navigate("/login");
  //     }
  //   };
  return (
    <div className='flex justify-content-center align-items-center w-full h-screen bg-main-50 p-0'>
      <img src={logoFilledWhite} alt='Logo' className='auth-logo' />

      {isMobile ? (
        <div className='slider-container'>
          <div
            className={`form-container sign-in-container ${
              !isRightPanelActive ? "active" : ""
            }`}
          >
            <div className='form-content w-full' style={{ maxWidth: "350px" }}>
              <h1 className='text-2xl font-bold mb-4'>Welcome back!</h1>
              <p className='mb-4 text-600'>
                Ready to pick up where you left off? Just log in below and
                you’re good to go.
              </p>
              <LoginPage />
            </div>
          </div>
          <div
            className={`form-container sign-up-container scrollbar-hidden ${
              isRightPanelActive ? "active" : ""
            }`}
          >
            <div className='form-content scrollbar-hidden'>
              <h1 className='text-2xl font-bold mb-4'>
                New here? Welcome aboard!
              </h1>
              <p className='mb-4 text-600'>
                Just fill in the details below, and get ready to explore.
              </p>
              <RegisterPage />
            </div>
          </div>
          <div className='mobile-toggle'>
            <MainButton
              label={isLoginPage ? "Sign Me Up" : "Log In Now"}
              className='btn-secondary'
              onClick={() => setIsRightPanelActive(!isRightPanelActive)}
            />
          </div>
        </div>
      ) : (
        <div
          className={`slider-container ${
            isRightPanelActive ? "right-panel-active" : ""
          }`}
        >
          <div className='form-container sign-up-container'>
            <div className='form-content'>
              <h1 className='text-2xl font-bold mb-4'>
                New here? Welcome aboard!
              </h1>
              <p className='mb-4 text-600'>
                Just fill in the details below, and get ready to explore.
              </p>
              <RegisterPage />
            </div>
          </div>
          <div className='form-container sign-in-container'>
            <div className='form-content'>
              <h1 className='text-2xl font-bold mb-4'>Welcome back!</h1>
              <p className='mb-4 text-600'>
                Ready to pick up where you left off? Just log in below and
                you’re good to go.
              </p>
              <LoginPage />
            </div>
          </div>
          <div className='overlay-container'>
            <div className='overlay'>
              <div className='overlay-panel overlay-left'>
                <h1 className='text-xl sm:text-3xl font-bold mb-4 text-main-100'>
                  Already Have an Account?
                </h1>
                <p className='mb-4'>
                  We missed you! Click below to head to the login page and pick
                  up where you left off.
                </p>
                <NavLink to='/login' className='nav-link'>
                  <MainButton
                    label='Log In Now'
                    className='btn-secondary'
                    onClick={() => setIsRightPanelActive(false)}
                  />
                </NavLink>
              </div>
              <div className='overlay-panel overlay-right'>
                <h1 className='text-xl sm:text-3xl font-bold mb-4 text-main-100'>
                  Ready to Join?
                </h1>
                <p className='mb-4'>
                  Sign up today and get ready to explore everything we have to
                  offer. Just click the button below to begin!
                </p>
                <NavLink to='/register' className='nav-link'>
                  <MainButton
                    label='Sign Me Up'
                    className='btn-secondary'
                    onClick={() => setIsRightPanelActive(true)}
                  />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SliderAuth;
