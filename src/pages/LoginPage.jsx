// import GoogleAuth from "../components/Users/GoogleAuth";
import LoginForm from "../components/Users/LoginForm";

const LoginPage = () => {
  return (
    <>
      {/* <p className='text-center'>You can use one of the following methods</p> */}
      {/* <GoogleAuth /> */}
      {/* <p className='text-center'>OR</p> */}
      <LoginForm />
      <a
        href='/forgot-password'
        className='btn-main btn-link text-center	mt-3 justify-content-center'
      >
        Forgot your password?
      </a>
    </>
  );
};

export default LoginPage;
