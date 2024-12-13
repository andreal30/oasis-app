import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PasswordInput from "../components/Commons/Inputs/PaswordInput";
import MainButton from "../components/Commons/Buttons/MainButton";
import MessageErrors from "../components/Commons/Inputs/MessageErrors";
import UserSchema from "../components/Users/UserSchema";
import { useFormik } from "formik";
import Messages from "../components/Commons/Inputs/Messages";

const validationSchema = UserSchema({
  password: true,
  confirmPassword: true,
});

const ResetPassword = () => {
  const [serverMessage, setServerMessage] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  // Always call useFormik
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setServerError(null);
      setServerMessage(null);

      if (values.password !== values.confirmPassword) {
        setServerError(
          "Oops! The passwords don’t match. Double-check and try again."
        );
        return;
      }

      try {
        const response = await axios.put(
          `http://localhost:8080/auth/reset-password/${token}`,
          // `http://flat-finder-back.andrealvarezcis.com/auth/reset-password/${token}`,
          { password: values.password }
        );

        if (response.status === 200) {
          setServerMessage(
            "Your password has been reset successfully! Redirecting to login..."
          );
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        }
      } catch (error) {
        if (!error.response) {
          setServerError(
            "We’re having trouble connecting to the server. Please try again later."
          );
        } else if (error.response.status === 401) {
          setServerError(
            "This reset link is no longer valid. Please request a new one."
          );
        } else if (error.response.status === 404) {
          setServerError("No account found for the provided link.");
        } else {
          setServerError(
            error.response.data.message ||
              "An unexpected error occurred. Please try again."
          );
        }
      } finally {
        setLoading(false);
      }
    },
  });

  // Conditionally render based on token validity
  if (!token) {
    return (
      <div className='flex justify-content-center align-items-center w-full h-screen bg-primary'>
        <div className='flex flex-column items-center bg-white p-5 border-round-3xl'>
          <h1 className='text-3xl font-bold'>Invalid Reset Link</h1>
          <p className='text-400 mt-2'>
            It seems the reset link is missing or invalid. Please try requesting
            a new one.
          </p>
          <MainButton
            label='Go Back to Login'
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className='flex justify-content-center align-items-center w-full h-screen bg-primary'>
      <div className='flex justify-center items-center bg-white w-30rem flex-column p-5 align-items-center align-self-center border-round-3xl gap-3'>
        {serverError && <Messages severity='error' text={serverError} />}
        {serverMessage && <Messages severity='success' text={serverMessage} />}

        <h1 className='text-3xl font-bold text-center w-20rem'>
          Out with the old, in with the secure!
        </h1>
        <h4 className='text-400 mt-0'>
          Reset your password below, and you’re back in action. Easy peasy.
        </h4>
        <form
          onSubmit={formik.handleSubmit}
          className='flex flex-column gap-3 w-full'
        >
          <PasswordInput
            id='password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            label='New password'
            disabled={loading}
          />
          {formik.touched.password && formik.errors.password && (
            <MessageErrors
              touched={formik.touched.password}
              error={formik.errors.password}
            />
          )}
          <PasswordInput
            id='confirmPassword'
            name='confirmPassword'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            label='Confirm password'
            disabled={loading}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <MessageErrors
              touched={formik.touched.confirmPassword}
              error={formik.errors.confirmPassword}
            />
          )}

          <MainButton label='Ready, Set, Password!' type='submit' />
        </form>
        <p className='text-xs text-400'>
          Keep it strong: Combine at least 8 characters with letters, numbers,
          and a special character for extra security.
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
