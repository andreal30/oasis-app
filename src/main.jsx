import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import PrimeReact from "primereact/api";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Use a base theme
import "primeflex/primeflex.css";
import "primeicons/primeicons.css"; // Icons
import "primereact/resources/primereact.min.css"; // Core Styles
import App from "./App.jsx";
// import { AuthProvider } from './contexts/authContext.tsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AuthProvider> */}
    <PrimeReactProvider value={{ ripple: true }}>
      <App />
    </PrimeReactProvider>
    {/* </AuthProvider> */}
  </StrictMode>
);
