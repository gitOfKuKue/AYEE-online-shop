import React, { useState } from "react";

import {
  faUser,
  faShoppingCart,
  faStore,
  faCog,
  faSignOutAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useNavigate } from "react-router";
import UserProfile from "../Components/ProfileComponents/UserProfile";
import LogOutBtn from "../Components/buttons/LogOutBtn";
import { Link } from "react-router-dom";
import UsersInfos from "../Components/ProfileComponents/UsersInfos";
import useUser from "../Hook/useUser";

const ProfilePage = () => {
  const { data } = useUser();
  const user = data?.user;
  const [menus, setMenus] = useState([
    {
      id: 1,
      title: "Profile",
      icon: faUser,
      link: "/profile",
      isCurrent: true,
    },
    {
      id: 2,
      title: "Shop",
      icon: faStore,
      link: "/shop",
      isCurrent: false,
    },
    {
      id: 3,
      title: "Cart",
      icon: faShoppingCart,
      link: "/cart",
      isCurrent: false,
    },
    {
      id: 4,
      title: "Users",
      icon: faUsers,
      link: "/profile/users",
      isCurrent: false,
    },
    {
      id: 5,
      title: "Logout",
      icon: faSignOutAlt,
    },
  ]);

  const handleMenuClick = (id) => {
    setMenus(
      menus.map((menu) =>
        menu.id === id
          ? { ...menu, isCurrent: true }
          : { ...menu, isCurrent: false }
      )
    );
  };

  return (
    <section>
      {/* Menus */}
      <aside className={`py-5 fixed h-[calc(100vh-5rem)] shadow-lg w-[250px]`}>
        <div className="flex flex-col h-full font-bold">
          {menus.map((menu) =>
            menu.title === "Logout" ? (
              <div key={menu.id} className="mt-auto py-3 px-5">
                <LogOutBtn />
              </div>
            ) : menu.title === "Users" ? (
              <Link to={menu.link}
                key={menu.id}
                className={`w-50 py-3 px-5 flex items-center gap-2 rounded-r-md cursor-pointer ${
                  menu.isCurrent && "bg-iconic text-font1"
                } ${user?.role === "admin" ? "block" : "hidden"}`}
                onClick={() => handleMenuClick(menu.id)}
              >
                <FontAwesomeIcon icon={menu.icon} className="text-xl" />
                <h1 className="text-xl">{menu.title}</h1>
              </Link>
            ) : (
              <Link
                to={menu.link}
                key={menu.id}
                className={`w-50 py-3 px-5 flex items-center gap-2 rounded-r-md ${
                  menu.isCurrent && "bg-iconic text-font1"
                }`}
                onClick={() => handleMenuClick(menu.id)}
              >
                <FontAwesomeIcon icon={menu.icon} className="text-xl" />
                <h1 className="text-xl">{menu.title}</h1>
              </Link>
            )
          )}
        </div>
      </aside>

      <section className="ml-[250px] p-5">
        {/* {menus[0].isCurrent && <UserProfile />}
        {menus[3].isCurrent && <UsersInfos />} */}
        <Outlet />
      </section>
    </section>
  );
};

export default ProfilePage;
