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
            { path: "/sign-in", element: <LoginPage /> },
            { path: "/sign-up", element: <SignupPage /> },
            { path: "/", element: <MainPage /> },
            { path: "/about", element: <AboutPage /> },
            { path: "/contact", element: <ContactPage /> },
            { path: "/cart", element: <MarketCart /> },
            { path: "/shop", element: <Shop /> },
            { path: "/product-detail/:id", element: <ProductDetails /> },

            {
              path: "/profile",
              element: <ProfilePage />,
              children: [
                {
                  path: "/profile",
                  element: <UserProfile />,
                },
                {
                  // ✅ Protect admin-only route
                  path: "/profile/users",
                  element: (
                    <RequireAdmin>
                      <UsersInfos />
                    </RequireAdmin>
                  ),
                },
                {
                  // ✅ Also protect individual user profile under admin section
                  path: "/profile/users/:id",
                  element: (
                    <RequireAdmin>
                      <UserProfile />
                    </RequireAdmin>
                  ),
                },
              ],
            },
          ],
        },
      ]
);

export default router;
