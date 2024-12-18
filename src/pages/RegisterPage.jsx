// import { useNavigate } from "react-router-dom";
import UserForm from "../components/Users/UserForm";
// import MainButton from "../components/Commons/Buttons/MainButton";

const RegisterPage = () => {
  // const navigate = useNavigate();

  // const handleLogin = () => {
  //   navigate("/login");
  // };

  return (
    <>
      {/* <div className='flex justify-content-center align-items-center w-full h-screen bg-primary'>
        <div className='flex justify-center items-center bg-white w-9 scrollbar-hidden max-h-75vh overflow-y flex-column p-5 pb-6 align-items-center align-self-center border-round-3xl gap-3'>
          <h1>Register Page</h1>
          <UserForm />
          <MainButton
            label='New user? Create an account'
            className='btn-link align-self-center'
            onClick={handleLogin}
            size='small'
          />
        </div>
      </div> */}
      <div>
        <h1>Register</h1>
        <UserForm />
      </div>
    </>
  );
};

export default RegisterPage;
