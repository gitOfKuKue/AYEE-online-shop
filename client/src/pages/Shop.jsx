import React, { useEffect, useState } from "react";
import Container from "../Components/EssentialComponents/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useCategoryIcons from "../Hook/useCategoryIcons";
import Navigation from "../Components/EssentialComponents/Navigation";
import useFetchFuncs from "../Common/useFetchFuncs";

import useCartStore from "../Common/Store/useCartStore";
import AddBtn from "../Components/buttons/AddBtn";
import useUser from "../Hook/useUser";
import ProductsShop from "../Components/ProductsShop";
import ProductAddSection from "../Components/ProductAddSection";

const Shop = () => {
  const { categoryIcons, handleCategoryActive } = useCategoryIcons();

  const { data } = useUser();
  const user = data?.user;

  const [isAdding, setIsAdding] = useState(false);

  const openAddSection = () => {
    setIsAdding(true);
  };

  const closeAddSection = () => {
    setIsAdding(false);
  };

  return (
    <section className="">
      {/* Categories */}
      <aside
        className={`flex flex-col py-5 fixed h-[calc(100vh-5em)] shadow-lg w-[250px]`}
      >
        <div className="flex flex-col font-bold">
          {Object.entries(categoryIcons).map(([key, category]) => (
            <div
              key={key}
              className={`w-50 flex gap-1 text-xl items-center cursor-pointer py-3 px-5 rounded-r-[var(--standard-radius)] ${
                category.isCurrent ? "bg-iconic text-font1" : "text-font2"
              }`}
              onClick={() => {
                handleCategoryActive(key);
                closeAddSection();
              }}
            >
              <FontAwesomeIcon icon={category.icon} />
              <h1>{category.name}</h1>
            </div>
          ))}
        </div>
        {user?.role === "admin" && (
          <div className="mt-auto py-3 px-5" onClick={openAddSection}>
            <AddBtn />
          </div>
        )}
      </aside>

      <section className="w-[calc(100%-250px)] h-[calc(100vh-5em)] ml-[250px] p-5">
        <div id="product-shop" className={`${isAdding ? "hidden" : "block"}`}>
          <ProductsShop />
        </div>
        <div id="product-add-section">
          <ProductAddSection />
        </div>
      </section>
    </section>
  );
};

export default Shop;
