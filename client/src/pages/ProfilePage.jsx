import React, { useEffect, useState } from "react";
import {
  faUser,
  faShoppingCart,
  faStore,
  faSignOutAlt,
  faUsers,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, Link, useLocation } from "react-router-dom";
import LogOutBtn from "../Components/buttons/LogOutBtn";
import useUser from "../Hook/useUser";
import useAPICalling from "../Common/useAPICalling";

const ProfilePage = () => {
  const location = useLocation();
  const { data } = useUser();
  const [user, setUser] = useState();
  const { fetchUsers } = useAPICalling();

  const [menus, setMenus] = useState([
    { id: 1, title: "Profile", icon: faUser, link: "/profile" },
    { id: 2, title: "Shop", icon: faStore, link: "/shop" },
    { id: 3, title: "Cart", icon: faShoppingCart, link: "/cart" },
    { id: 4, title: "Users", icon: faUsers, link: "/profile/users" },
    { id: 5, title: "Setting", icon: faGear, link: "/profile/setting/account" },
    { id: 6, title: "Logout", icon: faSignOutAlt },
  ]);

  // --- Load correct user ---
  useEffect(() => {
    if (!data?.user?.id) return;

    const loadUsers = async () => {
      const users = await fetchUsers();
      const user = users.find((u) => String(u.id) === String(data.user.id));
      setUser(user);
    };

    loadUsers();
  }, [fetchUsers, data?.user?.id]);

  useEffect(() => {
    setMenus((items) =>
      items.map((item) =>
        item.title === "Setting"
          ? {
              ...item,
              isCurrent: location.pathname.startsWith("/profile/setting"),
            }
          : {
              ...item,
              isCurrent: item.link && location.pathname === item.link, // exact match to avoid substring issues
            }
      )
    );
  }, [location.pathname]);

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
      {/* Sidebar */}
      <aside className="py-5 fixed h-[calc(100vh-5rem)] shadow-lg w-[250px]">
        <div className="flex flex-col h-full font-bold">
          {menus.map((menu) => {
            // Hide "Users" menu if not admin
            if (menu.title === "Users" && user?.role !== "admin") return null;

            // Render Logout separately
            if (menu.title === "Logout") {
              return (
                <div key={menu.id} className="mt-auto py-3 px-5">
                  <LogOutBtn />
                </div>
              );
            }

            return (
              <Link
                key={menu.id}
                to={menu.link}
                onClick={() => handleMenuClick(menu.id)}
                className={`w-[250px] py-3 px-5 flex items-center gap-2 rounded-r-md cursor-pointer transition-colors duration-200 ${
                  menu.isCurrent ? "bg-iconic text-font1" : ""
                }`}
              >
                <FontAwesomeIcon icon={menu.icon} className="text-xl" />
                <h1 className="text-xl">{menu.title}</h1>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main content */}
      <section className="ml-[250px] p-5">
        <Outlet />
      </section>
    </section>
  );
};

export default ProfilePage;
