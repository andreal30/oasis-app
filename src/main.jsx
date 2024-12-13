import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import PrimeReact from "primereact/api";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Use a base theme
import "primeflex/primeflex.css";
import "primeicons/primeicons.css"; // Icons
import "primereact/resources/primereact.min.css"; // Core Styles
import "./style/index.css";
import "./style/custompanel.css";
import App from "./App.jsx";
// import { QueryClient, QueryClientProvider } from "react-query"; // Import QueryClientProvider
import { AuthProvider } from "./contexts/authContext.jsx";
// import { UserProvider } from "./contexts/userContext.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./components/Path/router.jsx";

// const queryClient = new QueryClient(); // Create the QueryClient instance

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <AuthProvider>
        {/* <QueryClientProvider client={queryClient}> */}
        <PrimeReactProvider value={{ ripple: true }}>
          <App />
        </PrimeReactProvider>
        {/* </QueryClientProvider> */}
      </AuthProvider>
    </RouterProvider>
  </StrictMode>
);
