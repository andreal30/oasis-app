import { createBrowserRouter, Outlet } from "react-router-dom";
import ErrorPage from "../../pages/ErrorPage";
import HomePage from "../../pages/HomePage";
import ResetPasswordPage from "../../pages/ResetPasswordPage";
import ProfilePage from "../../pages/ProfilePage";
import FavouritesPage from "../../pages/FavouritesPage";
import NewFlatPage from "../../pages/NewFlatPage";
//import LoginPage from "../../pages/LoginPage";
import RootLayout from "../../pages/RootLayout";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
//import RegisterPage from "../../pages/RegisterPage";
import { AuthProvider } from "../../contexts/authContext";
import AllUsersPage from "../../pages/AllUsersPage";
import UpdateProfilePage from "../../pages/UpdateProfilePage";
import MyFlatsPage from "../../pages/MyFlatsPage";
import SliderAuth from "../Auth/SliderAuth";
// import UserList from "../Users/UserList";

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
          { path: "/", element: <SliderAuth /> },
          { path: "/auth", element: <SliderAuth /> },
          { path: "/forgot-password", element: <ForgotPasswordPage /> },
          { path: "/reset-password/:token", element: <ResetPasswordPage /> },
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
          { path: "/update-profile", element: <UpdateProfilePage /> },
          { path: "/all-users", element: <AllUsersPage /> },
          { path: "/my-flats", element: <MyFlatsPage /> },
          // { path: "/user-card/:userId", element: <UserList /> },
        ],
      },
    ],
  },
]);

export default router;
