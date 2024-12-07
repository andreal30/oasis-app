import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import GeneralInput from "../components/Commons/Inputs/GeneralInput";
import MainButton from "../components/Commons/Buttons/MainButton";
import MessageErrors from "../components/Commons/Inputs/MessageErrors";
import Messages from "../components/Commons/Inputs/Messages";
import { useNavigate } from "react-router-dom";
import UserSchema from "../components/Users/UserSchema";

const validationSchema = UserSchema({
  email: true,
});

const ForgotPassword = () => {
  const [serverMessage, setServerMessage] = useState(null);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/login");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setServerError(null);
      setServerMessage(null);

      try {
        const response = await axios.post(
          `http://localhost:8080/auth/forgot-password`,
          // `http://flat-finder-back.andrealvarezcis.com/auth/forgot-password`,
          { email: values.email }
        );

        if (response.status === 200) {
          setServerMessage(
            `We’ve sent a reset link to ${values.email}. Check your inbox (or spam folder), and follow the steps to reset your password! Redirecting to login...`
          );
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        }
      } catch (error) {
        if (!error.response) {
          setServerError(
            "We couldn’t connect to the server. Please check your internet connection and try again."
          );
        } else if (error.response.status === 404) {
          setServerError(
            `Hmm, we couldn’t find an account with the email ${values.email}. Double-check and try again!`
          );
        } else {
          setServerError(
            error.response.data.message ||
              "Whoops! Something went wrong on our end. Please try again later."
          );
        }
      }
    },
  });

  return (
    <div className='flex justify-content-center align-items-center w-full h-screen bg-primary'>
      <div className='flex justify-center items-center bg-white w-30rem flex-column p-5 pb-6 align-items-center align-self-center border-round-3xl gap-3'>
        <MainButton
          label='Go back to login'
          className='btn-link align-self-start'
          icon
          iconClass='arrow-left'
          onClick={handleGoBack}
        />

        {serverError && <Messages severity='error' text={serverError} />}
        {serverMessage && <Messages severity='success' text={serverMessage} />}

        <h1 className='text-3xl font-bold text-center w-25rem'>
          Forgot your password? Don’t sweat it!
        </h1>
        <h4 className='text-400 mt-0'>
          Just enter your email below, and we’ll send a reset link faster than
          you can say &quot;oops!&quot;
        </h4>

        <form
          onSubmit={formik.handleSubmit}
          className='flex flex-column gap-3 w-full'
        >
          <GeneralInput
            id='email'
            name='email'
            type='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            iconClass='pi pi-at text-500'
            label='Recovery email'
          />
          {formik.touched.email && formik.errors.email ? (
            <MessageErrors
              touched={formik.touched.email}
              // error={`Oops! There’s an issue with the email address "${formik.values.email}". Double-check and try again!`}
              error={formik.errors.email}
            />
          ) : (
            <div className='mt-0'></div>
          )}
          {/* <MessageErrors
            touched={formik.touched.email}
            error={
              formik.errors.email
                ? `Oops! There’s an issue with the email address "${formik.values.email}". Double-check and try again!`
                : null
            }
          /> */}
          <MainButton label='Recover My Account' type='submit' />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
