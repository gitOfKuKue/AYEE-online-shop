import React, { useEffect, useState } from "react";
import useUser from "../Hook/useUser";
import AddBtn from "../Components/buttons/AddBtn";
import ProductsShop from "../Components/ProductsShop";
import ProductAddSection from "../Components/ProductAddSection";
import useCategory from "../Common/useCategory";
import useAPICalling from "../Common/useAPICalling";

const Shop = () => {
  const { data } = useUser();
  const user = data?.user;

  const { products, fetchProducts } = useAPICalling();
  const { categories, handleCategoryActive, categoryMenus, setCategoryMenus } =
    useCategory();

  const [isAdding, setIsAdding] = useState(false);

  // ✅ Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ✅ Build category menu whenever products change
  useEffect(() => {
    const newCategories = categories(products);
    if (Array.isArray(newCategories)) {
      setCategoryMenus([
        { title: "All", isCurrent: true },
        ...newCategories.map((c) => ({ title: c, isCurrent: false })),
      ]);
    }
  }, [products, categories, setCategoryMenus]);

  // ✅ When a new product is added, refetch products
  const handleProductAdded = async () => {
    await fetchProducts();
    setIsAdding(false);
  };

  return (
    <section>
      <aside className="flex flex-col py-5 fixed h-[calc(100vh-5em)] shadow-lg w-[250px]">
        <div className="flex flex-col font-bold">
          {categoryMenus.map((menu) => (
            <div
              key={menu.title}
              className={`w-50 flex gap-1 text-xl items-center cursor-pointer py-3 px-5 rounded-r-[var(--standard-radius)] ${
                menu.isCurrent ? "bg-iconic text-font1" : "text-font2"
              }`}
              onClick={() => {
                handleCategoryActive(menu.title);
                setIsAdding(false);
              }}
            >
              <h1>{menu.title}</h1>
            </div>
          ))}
        </div>

        {user?.role === "admin" && (
          <div className="mt-auto py-3 px-5" onClick={() => setIsAdding(true)}>
            <AddBtn />
          </div>
        )}
      </aside>

      <section className="w-[calc(100%-250px)] h-[calc(100vh-5em)] ml-[250px] p-5">
        {!isAdding && (
          <ProductsShop products={products} categoryMenus={categoryMenus} />
        )}
        {isAdding && <ProductAddSection onProductAdded={handleProductAdded} />}
      </section>
    </section>
  );
};

export default Shop;
