import { useState } from "react";
import { useFormik } from "formik";
import GeneralInput from "../components/Commons/Inputs/GeneralInput";
import MainButton from "../components/Commons/Buttons/MainButton";
import MessageErrors from "../components/Commons/Inputs/MessageErrors";
import Messages from "../components/Commons/Inputs/Messages";
import { useNavigate } from "react-router-dom";
import UserSchema from "../components/Users/UserSchema";
import { forgotPasswordUser } from "../services/authService";

// Validation YUP - revisar UserSchema para ver completo
const validationSchema = UserSchema({
  email: true,
});

// Aqui comienza el componente
const ForgotPassword = () => {
  // mensaje de server (casi siempre de success)
  const [serverMessage, setServerMessage] = useState(null);
  // mensaje de error
  const [serverError, setServerError] = useState(null);
  // loading
  const [loading, setLoading] = useState(false);
  // crea esta constante para redireccionar
  const navigate = useNavigate();

  // si tienes alguna funcion adicional que no sea de formik o el submit del form
  const handleGoBack = () => {
    navigate("/login");
  };

  // Aqui comienza el formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    // mismo nombre de validationSchema - si le decides cambiar el nombre va validationSchema: validationName
    validationSchema,
    // Todas las funciones que irian dentro de handleSubmit
    onSubmit: async (values) => {
      // resetear los mensajes y valores iniciales
      setServerError(null);
      setServerMessage(null);
      setLoading(true);

      try {
        // aqui llama al authService -> el authService llama al api
        const response = await forgotPasswordUser(values.email);

        // si el status es 200 (success), envia mensaje de error, y luego de un tiempo, redirecciona al home
        // si no necesitas redireccionar puedes quitar el setTimeout
        if (response.status === 200) {
          setServerMessage(
            `We’ve sent a reset link to ${values.email}. Check your inbox (or spam folder), and follow the steps to reset your password! Redirecting to login...`
          );
          setTimeout(() => {
            navigate("/login");
          }, 5000);
        }
      } catch (error) {
        // diferentes respuestas de error que pueden llegar. Verifica con GPT si estas respuestas son validas para ti
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
        // finalmente, termina el loading
      } finally {
        setLoading(false);
      }
    },
  });

  // Aqui termina el formik y comienza el return (aqui se pone lo que se va a ver en el navegador)
  return (
    // puedes ir a PrimeFlex para ver todas las clases
    <div className='flex justify-content-center align-items-center w-full h-screen bg-primary'>
      <div className='flex justify-center items-center bg-white w-30rem flex-column p-5 pb-6 align-items-center align-self-center border-round-3xl gap-3'>
        <MainButton
          label='Go back to login'
          className='btn-link align-self-start'
          icon
          iconClass='arrow-left'
          onClick={handleGoBack}
        />

        {/* Mensaje de error */}
        {serverError && <Messages severity='error' text={serverError} />}
        {/* Mensaje de exito */}
        {serverMessage && <Messages severity='success' text={serverMessage} />}

        {/* Titulo */}
        <h1 className='text-3xl font-bold text-center w-25rem'>
          Forgot your password? Don’t sweat it!
        </h1>
        {/* texto descriptivo (opcional) */}
        <h4 className='text-400 mt-0'>
          Just enter your email below, and we’ll send a reset link faster than
          you can say &quot;oops!&quot;
        </h4>

        {/* Formulario - siempre formik.handleSubmit */}
        <form
          onSubmit={formik.handleSubmit}
          className='flex flex-column gap-3 w-full'
        >
          {/* input - acepta texto y num - especificar (text, number, email) */}
          <GeneralInput
            id='email'
            name='email'
            type='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            iconClass='pi pi-at text-500'
            label='Recovery email'
            disabled={loading}
          />

          {/* Mensaje de error para el input - esto deberias poder copiar y pegar */}
          {formik.touched.email && formik.errors.email ? (
            <MessageErrors
              touched={formik.touched.email}
              error={formik.errors.email}
            />
          ) : (
            <div className='mt-0'></div>
          )}

          {/* Boton */}
          <MainButton
            label='Recover My Account'
            type='submit'
            loading={loading}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
