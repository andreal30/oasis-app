import LoginForm from "../components/Users/LoginForm";

const LoginPage = () => {
  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <div className='w-96 p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
          <h1 className='text-2xl font-bold text-center mb-5'>Login</h1>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
