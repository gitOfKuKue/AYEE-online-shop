import { createBrowserRouter } from "react-router";
import ErrorPage from "../pages/ErrorPage";
import MainPage from "../pages/MainPage";
import MainLayout from "../Components/EssentialComponents/MainLayout";
import LoginPage from "../pages/SignIn-SignUp/SigninPage";
import SignupPage from "../pages/SignIn-SignUp/SignupPage";
import MarketCart from "../pages/MarketCart";
import Shop from "../pages/Shop";
import Maintenance from "../pages/Maintenance";
import ProfilePage from "../pages/ProfilePage";

import "../index.css";

const isMaintenance = false;

const router = createBrowserRouter(
  isMaintenance
    ? [
        {
          path: "*",
          element: <Maintenance />,
        },
      ]
    : [
        {
          path: "/",
          errorElement: <ErrorPage />,
          element: <MainLayout />,
          children: [
            {
              path: "/sign-in",
              element: <LoginPage />,
            },
            {
              path: "/sign-up",
              element: <SignupPage />,
            },
            {
              path: "/",
              element: <MainPage />,
            },
            ,
            {
              path: "/cart",
              element: <MarketCart />,
            },
            {
              path: "/shop",
              element: <Shop />,
            },
            {
              path: "/profile",
              element: <ProfilePage />,
            },
          ],
        },
      ]
);

export default router;
