// src/router/index.jsx
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import MainPage from "../pages/MainPage";
import MainLayout from "../Components/EssentialComponents/MainLayout";
import LoginPage from "../pages/SignIn-SignUp/SigninPage";
import SignupPage from "../pages/SignIn-SignUp/SignupPage";
import MarketCart from "../pages/MarketCart";
import Shop from "../pages/Shop";
import Maintenance from "../pages/Maintenance";
import ProfilePage from "../pages/ProfilePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import ProductDetails from "../Components/ProductDetail";
import UserProfile from "../Components/ProfileComponents/UserProfile";
import UsersInfos from "../Components/ProfileComponents/UsersInfos";

import "../index.css";
import RequireAdmin from "../Components/auth/RequireAdmin";
import Setting from "../Components/ProfileComponents/Setting";
import AccountSetting from "../Components/ProfileComponents/setting/AccountSetting";
import SecuritySetting from "../Components/ProfileComponents/setting/SecuritySetting";

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
          element: <MainLayout />,
          errorElement: <ErrorPage />,
          children: [
            { path: "sign-in", element: <LoginPage /> },
            { path: "sign-up", element: <SignupPage /> },
            { path: "", element: <MainPage /> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "cart", element: <MarketCart /> },
            { path: "shop", element: <Shop /> },
            { path: "product-detail/:id", element: <ProductDetails /> },

            // Profile Routes
            {
              path: "profile",
              element: <ProfilePage />,
              children: [
                { path: "", element: <UserProfile /> }, // default profile
                {
                  path: "users",
                  element: (
                    <RequireAdmin>
                      <UsersInfos />
                    </RequireAdmin>
                  ),
                },
                {
                  path: "users/:id",
                  element: (
                    <RequireAdmin>
                      <UserProfile />
                    </RequireAdmin>
                  ),
                },
                {
                  path: "setting",
                  element: <Setting />,
                  children: [
                    { path: "account", element: <AccountSetting /> },
                    { path: "security", element: <SecuritySetting /> },
                  ],
                },
              ],
            },
          ],
        },
      ]
);

export default router;
