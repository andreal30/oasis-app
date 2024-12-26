import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorPage from "../../pages/ErrorPage";
import HomePage from "../../pages/HomePage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import ProfilePage from "../../pages/ProfilePage";
import FavouritesPage from "../../pages/FavouritesPage";
import NewFlatPage from "../../pages/NewFlatPage";
// import LoginPage from "../../pages/LoginPage";
import RootLayout from "../../pages/RootLayout";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
// import RegisterPage from "../../pages/RegisterPage";
import { AuthProvider } from "../../contexts/authContext";
import AllUsersPage from "../../pages/AllUsersPage";
import UpdateProfilePage from "../../pages/UpdateProfilePage";
import MyFlatsPage from "../../pages/MyFlatsPage";
import EditFlatPage from "../../pages/EditFlatPage";
import FlatDetailsPage from "../../pages/FlatDetailsPage";
import UpdatePasswordPage from "../../pages/UpdatePasswordPage";
import { PrivateRoute, PublicLayout } from "./PrivateRoute";
import LoginRegisterPage from "../../pages/LoginRegisterPage";
// import { GoogleOAuthProvider } from "@react-oauth/google";

// const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        // Public Routes Layout
        element: (
          <AuthProvider>
            {/* <GoogleOAuthProvider clientId={clientId}> */}
            <PublicLayout />
            {/* </GoogleOAuthProvider> */}
          </AuthProvider>
        ),
        children: [
          {
            // Public routes
            element: <Outlet />,
            children: [
              { path: "/", element: <LoginRegisterPage /> },
              // { path: "/", element: <SliderAuth /> },
              // { path: "/auth", element: <SliderAuth /> },
              { path: "/login", element: <LoginRegisterPage /> },
              { path: "/register", element: <LoginRegisterPage /> },
              { path: "/forgot-password", element: <ForgotPasswordPage /> },
              {
                path: "/reset-password/:token",
                element: <ResetPasswordPage />,
              },
            ],
          },
          {
            // Private routes with shared layout
            element: (
              <PrivateRoute>
                <RootLayout />
              </PrivateRoute>
            ),
            children: [
              // Dashboard routes
              { path: "/home", element: <HomePage /> },
              { path: "/my-flats", element: <MyFlatsPage /> },
              { path: "/favourites", element: <FavouritesPage /> },

              // Flat management routes
              { path: "/new-flat", element: <NewFlatPage /> },
              { path: "/flats/edit/:id", element: <EditFlatPage /> },
              { path: "/flats/:id", element: <FlatDetailsPage /> },

              // User management routes
              { path: "/profile", element: <ProfilePage /> },
              { path: "/update-profile", element: <UpdateProfilePage /> },
              { path: "/all-users", element: <AllUsersPage /> },

              // Additional routes as needed
              { path: "/update-password", element: <UpdatePasswordPage /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
