import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // useLocation for active menu

// Icons / Profile Pic import
import logo from "../../assets/logo/AYEE_onlyLOGO.svg";
import defaultProfilePic from "../../assets/profiles/defaultProfilePic.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faContactBook,
  faHome,
  faInfo,
  faMagnifyingGlass,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import SignInUpBtn from "../buttons/SingInUpBtn";
import DropDownBtn from "../buttons/DropDownBtn";
import useUser from "../../Hook/useUser";
import useAuthStore from "../../Common/Store/useAuthStore";
import CustomBtn from "../buttons/CustomBtn";
import useCommon from "../../Common/Store/useCommon";
import useAPICalling from "../../Common/useAPICalling";

const Navigation = () => {
  const location = useLocation(); // current path
  const [menus, setMenus] = useState([
    { id: 1, menu: "Home", icon: faHome, link: "/", isCurrent: false },
    { id: 2, menu: "About", icon: faInfo, link: "/about", isCurrent: false },
    { id: 3, menu: "Shop", icon: faShop, link: "/shop", isCurrent: false },
    {
      id: 4,
      menu: "Contact",
      icon: faContactBook,
      link: "/contact",
      isCurrent: false,
    },
    {
      id: 5,
      menu: "Cart",
      icon: faCartShopping,
      link: "/cart",
      isCurrent: false,
    },
  ]);

  const { setSearchQuery } = useCommon();
  const { isLoggedIn } = useAuthStore();
  const { userProfilePath, fetchUsers } = useAPICalling();

  const { data } = useUser();
  const user = data?.user;

  // Update active menu on route change
  useEffect(() => {
    setMenus((items) =>
      items.map((item) => ({
        ...item,
        isCurrent: location.pathname === item.link,
      }))
    );
  }, [location.pathname]);

  return (
    <>
      <nav className="fixed flex items-center justify-between text-font2 px-5 w-full bg-background z-10 shadow-md">
        {/* Logo and Menus */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex justify-start items-center">
            <img src={logo} alt="AYEE Logo" className="w-20" />
            <div className="flex items-baseline gap-2">
              <h1 className="font-bold text-4xl">AYEE</h1>
              <p className="font-light">Online Shop</p>
            </div>
          </Link>

          {/* Menu Links */}
          <div className="flex items-center justify-between gap-5 w-[400px]">
            {menus.slice(0, 4).map((el) => (
              <Link
                key={el.id}
                to={el.link}
                className={`text-xl hover:border-b-3 border-iconic w-[100px] text-center ${
                  el.isCurrent ? "text-iconic font-bold" : "font-light"
                }`}
              >
                {el.menu}
              </Link>
            ))}
          </div>
        </div>

        {/* Search Bar / Auth / Cart */}
        <div className="flex items-center gap-5">
          {(location.pathname === "/shop" ||
            location.pathname === "/profile/users") && (
            // {/* Search Bar */}
            <div className="relative flex items-center py-2 w-[30rem]">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute px-2 text-xl"
              />
              <input
                type="text"
                className="bg-[#F9F6F3] pl-12 py-2 rounded-full w-full text-lg border border-border"
                placeholder="Search what you want ..."
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
          {isLoggedIn ? (
            <div className="flex items-center gap-5">
              <Link
                to="/profile"
                className="
    relative w-12 h-12 rounded-full overflow-hidden 
    border border-gray-300 shadow-sm 
    transition-all duration-200
    hover:ring-2 hover:ring-iconic hover:shadow-md
  "
              >
                <img
                  src={userProfilePath(user?.profileImage)}
                  alt={`${user?.firstName || "User"} - profile picture`}
                  className="w-full h-full object-cover"
                />
              </Link>

              <Link
                to="/cart"
                className={`relative ${menus[4].isCurrent && "text-iconic"}`}
              >
                <FontAwesomeIcon icon={faCartShopping} className="text-3xl" />
                {user?.cart?.length > 0 && (
                  <span className="text-xs text-font1 bg-red-500 px-2 py-1 rounded-full absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                    {user?.cart?.length}
                  </span>
                )}
              </Link>
              <DropDownBtn />
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/sign-in">
                <CustomBtn title="Sign In" status="200" />
              </Link>
              <Link to="/sign-up">
                <CustomBtn title="Sign Up" status="200" />
              </Link>
            </div>
          )}
        </div>
      </nav>

      <div className="h-20"></div>
    </>
  );
};

export default Navigation;
