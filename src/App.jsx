import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  // redirect,
  // useLoaderData,
  // useRouteError,
} from "react-router-dom";
import "./style/index.css";
import "./style/custompanel.css";
import ErrorPage from "./pages/ErrorPage"; // Correct extension
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import FavouritesPage from "./pages/FavouritesPage";
import NewFlatPage from "./pages/NewFlatPage";
import LoginPage from "./pages/LoginPage";
import RootLayout from "./pages/RootLayout";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterPage from "./pages/RegisterPage";

// Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    // loader: authLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        // Public Routes Layout
        element: <Outlet />,
        children: [
          { path: "/", element: <LoginPage /> }, // Default Login Page
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
          { path: "/forgot-password", element: <ForgotPassword /> },
          { path: "/reset-password/:token", element: <ResetPassword /> },
        ],
      },
      {
        // Private Routes Layout with Header and Footer
        element: <RootLayout />,
        children: [
          {
            children: [
              { path: "/home", element: <HomePage /> }, // Home Page
              { path: "/profile", element: <ProfilePage /> },
              { path: "/favourites", element: <FavouritesPage /> },
              { path: "/new-flat", element: <NewFlatPage /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
