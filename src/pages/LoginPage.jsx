// import GoogleAuth from "../components/Users/GoogleAuth";
import LoginForm from "../components/Users/LoginForm";

const LoginPage = () => {
  return (
    <>
      <p className='text-center'>You can use one of the following methods</p>
      {/* <GoogleAuth /> */}
      <p className='text-center'>OR</p>
      <LoginForm />
    </>
  );
};

export default LoginPage;
