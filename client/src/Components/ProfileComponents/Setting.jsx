import { faUser, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

const Setting = () => {
  const location = useLocation();
  const [settings, setSettings] = useState([
    {
      id: 1,
      title: "Account",
      link: "./account",
      icon: faUser,
      isCurrent: false,
    },
    {
      id: 2,
      title: "Security",
      link: "./security",
      icon: faUserShield,
      isCurrent: false,
    },
  ]);

  useEffect(() => {
    setSettings((prev) =>
      prev.map((menu) => ({
        ...menu,
        isCurrent: location.pathname.includes(menu.link.split("/")[1]),
      }))
    );
  }, [location.pathname]);

  const handleMenus = (id) => {
    setSettings((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isCurrent: true }
          : { ...item, isCurrent: false }
      )
    );
  };
  return (
    <section>
      <aside className="w-60 py-5 shadow-xl fixed h-[calc(100vh-7.5em)] transition-colors duration-200">
        {settings.map((s) => (
          <Link
            to={s.link}
            key={s.id}
            className={`px-5 py-3 w-50 rounded-r-[var(--standard-radius)] flex items-center gap-2 ${
              s.isCurrent ? "bg-iconic text-font1" : " text-font2 "
            }`}
            onClick={() => handleMenus(s.id)}
          >
            <FontAwesomeIcon icon={s.icon} />
            <h1>{s.title}</h1>
          </Link>
        ))}
      </aside>

      <div className="ml-[270px] bg-white p-5 rounded-[var(--standard-radius)] shadow-xl">
        <Outlet />
      </div>
    </section>
  );
};

export default Setting;
