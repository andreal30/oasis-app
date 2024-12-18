import { useState, useEffect } from 'react';
import MainButton from '../Commons/Buttons/MainButton';
import LoginForm from '../Users/LoginForm';
import UserForm from '../Users/UserForm';
import logo from '../../images/SVG/logo-filled-white.svg';
import '../../style/sliderForm.css';

const SliderAuth = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (isMobile) {
            setIsRightPanelActive(false);
        }
    }, [isMobile]);

    return (
        <div className="flex justify-content-center align-items-center w-full h-screen bg-main-50">
            <img src={logo} alt="Logo" className="auth-logo" />

            {isMobile ? (
                <div className="slider-container">
                    <div className={`form-container sign-in-container ${!isRightPanelActive ? 'active' : ''}`}>
                        <div className="form-content">
                            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
                            <LoginForm />
                        </div>
                    </div>

                    <div className={`form-container sign-up-container ${isRightPanelActive ? 'active' : ''}`}>
                        <div className="form-content">
                            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
                            <UserForm />
                        </div>
                    </div>

                    <div className="mobile-toggle">
                        <MainButton
                            label={isRightPanelActive ? "Sign In" : "Sign Up"}
                            className="btn-secondary"
                            onClick={() => setIsRightPanelActive(!isRightPanelActive)}
                        />
                    </div>
                </div>
            ) : (
                <div className={`slider-container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
                    <div className="form-container sign-up-container">
                        <div className="form-content">
                            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
                            <UserForm />
                        </div>
                    </div>
                    <div className="form-container sign-in-container">
                        <div className="form-content">
                            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
                            <LoginForm />
                        </div>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1 className="text-2xl font-bold mb-4">Welcome Back!</h1>
                                <p className="mb-4">Already have an account? Sign in here</p>
                                <MainButton
                                    label="Sign In"
                                    className="btn-secondary"
                                    onClick={() => setIsRightPanelActive(false)}
                                />
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1 className="text-2xl font-bold mb-4">Dont have an Account!</h1>
                                <p className="mb-4">Enter your details and start your journey with us</p>
                                <MainButton
                                    label="Sign Up"
                                    className="btn-secondary"
                                    onClick={() => setIsRightPanelActive(true)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SliderAuth;
