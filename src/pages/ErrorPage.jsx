import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>Error</h1>
      <p>{error.statusText || "An unexpected error occurred."}</p>
    </div>
  );
};

export default ErrorPage;
