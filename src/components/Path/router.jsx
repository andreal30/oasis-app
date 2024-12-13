import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorPage from "../../pages/ErrorPage";
import HomePage from "../../pages/HomePage";
import ResetPassword from "../../pages/ResetPassword";
import ProfilePage from "../../pages/ProfilePage";
import FavouritesPage from "../../pages/FavouritesPage";
import NewFlatPage from "../../pages/NewFlatPage";
import LoginPage from "../../pages/LoginPage";
import RootLayout from "../../pages/RootLayout";
import ForgotPassword from "../../pages/ForgotPassword";
import RegisterPage from "../../pages/RegisterPage";
import { AuthProvider } from "../../contexts/authContext";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        // Public routes
        element: <Outlet />,
        children: [
          { path: "/", element: <LoginPage /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/register", element: <RegisterPage /> },
          { path: "/forgot-password", element: <ForgotPassword /> },
          { path: "/reset-password/:token", element: <ResetPassword /> },
        ],
      },
      {
        // Private routes with shared layout
        element: <RootLayout />,
        children: [
          { path: "/home", element: <HomePage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/favourites", element: <FavouritesPage /> },
          { path: "/new-flat", element: <NewFlatPage /> },
        ],
      },
    ],
  },
]);

export default router;
