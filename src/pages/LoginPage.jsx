import { useNavigate } from "react-router-dom";
import MainButton from "../components/Commons/Buttons/MainButton";
import LoginForm from "../components/Users/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/register");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };
  return (
    <>
      <div className='flex justify-content-center align-items-center w-full h-screen bg-primary'>
        <div className='flex justify-center items-center bg-white w-30rem flex-column p-5 pb-6 align-items-center align-self-center border-round-3xl gap-3'>
          <h1 className='text-2xl font-bold text-center mb-5'>Login</h1>
          <LoginForm />
          <MainButton
            label='Forgot Password?'
            className='btn-link align-self-center'
            onClick={handleForgotPassword}
            size='small'
          />

          <MainButton
            label='New user? Create an account'
            className='btn-link align-self-center'
            onClick={handleLogin}
            size='small'
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
