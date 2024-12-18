import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Use a base theme
import "primeflex/primeflex.css";
import "primeicons/primeicons.css"; // Icons
import "primereact/resources/primereact.min.css"; // Core Styles
import "./style/index.css";
import "./style/custompanel.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/authContext.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./components/Path/router.jsx";
// import { GoogleOAuthProvider } from "@react-oauth/google";

// const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      {/* <GoogleOAuthProvider clientId={clientId}> */}
      <AuthProvider>
        <PrimeReactProvider value={{ ripple: true }}>
          <App />
        </PrimeReactProvider>
      </AuthProvider>
      {/* </GoogleOAuthProvider> */}
    </RouterProvider>
  </StrictMode>
);
