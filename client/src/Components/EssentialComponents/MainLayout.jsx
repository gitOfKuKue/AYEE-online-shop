import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import AlertCard from "./AlertCard";
import Confirmation from "./Confirmation";
import useConfirmationStore from "../../Common/Store/useConfirmationStore";

const MainLayout = () => {
  const { pathname } = useLocation();

  // ✅ Put the routes you want to hide each component on in arrays
  const navigationHiddenRoutes = ["/sign-up", "/sign-in"];
  const footerHiddenRoutes = [
    "/sign-up",
    "/sign-in",
    "/cart",
    "/shop",
    "/profile",
  ];

  // ✅ Check if current route is in those arrays
  const hideNavigation = navigationHiddenRoutes.includes(pathname);
  const hideFooter = footerHiddenRoutes.includes(pathname);

  const {isConfirmation} = useConfirmationStore();

  return (
    <main>
      <div className={`${isConfirmation && "blur-md fixed w-full"}`}>
        {!hideNavigation && <Navigation />}
        <Outlet />
        {!hideFooter && <Footer />}
      </div>
      <AlertCard />
      <Confirmation />
    </main>
  );
};

export default MainLayout;
