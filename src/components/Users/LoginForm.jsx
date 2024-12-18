import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralInput from "../Commons/Inputs/GeneralInput";
import UserSchema from "./UserSchema";
import Messages from "../Commons/Inputs/Messages";
import MessageErrors from "../Commons/Inputs/MessageErrors";
import MainButton from "../Commons/Buttons/MainButton";
import { Skeleton } from "primereact/skeleton";
import PasswordInput from "../Commons/Inputs/PaswordInput";
import useAuth from "../../hooks/useAuth";
import { getLocal } from "../../utils/localStorage";

const validationSchema = UserSchema({
  emailOrUsername: true,
  password: true,
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      emailOrUsername: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        // Pass correct field to the login function
        await login(values.emailOrUsername, values.password);
        const user = getLocal("loggedInUser");

        const name = user.firstName;
        setSuccess(`Welcome back, ${name}! You’re now logged in successfully.`);
        setTimeout(() => {
          navigate("/home");
        }, 2500);
      } catch (err) {
        console.error("Login failed:", err);
        setError(
          err.response?.data?.message ||
          "Oops! Something went wrong. Please check your credentials and try again."
        );
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <form
        id='loginForm'
        className='w-full flex flex-column gap-2'
        onSubmit={formik.handleSubmit}
      >
        {/* Display general error message after submission if login fails */}
        {error && <Messages severity='error' text={error} />}
        {success && <Messages severity='success' text={success} />}
        {/* Email */}
        <GeneralInput
          id='emailOrUsername' // Update the ID for consistency
          name='emailOrUsername' // Match the name with formik.initialValues key
          value={formik.values.emailOrUsername} // Bind to the correct formik value
          onChange={formik.handleChange} // Use formik's change handler
          iconClass='at'
          label='Email or Username'
          disabled={loading}
          style={{ marginBottom: '1rem' }} // Add margin-bottom to prevent overlap
        />

        {formik.touched.emailOrUsername && formik.errors.emailOrUsername ? (
          <MessageErrors
            error={formik.errors.emailOrUsername}
            // className="mb-1 w-full justify-content-start text-pink-300"
            touched={formik.touched.emailOrUsername}
          />
        ) : (
          <div className='mt-0'></div>
        )}

        {/* Password */}
        <PasswordInput
          id='password'
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          label='Password'
          disabled={loading}
          feedback={true}
        />
        {formik.touched.password && formik.errors.password ? (
          <MessageErrors
            error={formik.errors.password}
            // className="mb-1 w-full justify-content-start text-pink-300"
            touched={formik.touched.password}
          />
        ) : (
          <div className='mt-0'></div>
        )}
        {/* Button */}
        {loading ? (
          <Skeleton width='100%' height='3rem' borderRadius='20px' />
        ) : (
          <MainButton
            label='Log In'
            type='submit'
            icon
            iconClass='sign-in'
            loading={formik.isSubmitting || loading}
          />
        )}
      </form>
    </>
  );
};
export default LoginForm;
