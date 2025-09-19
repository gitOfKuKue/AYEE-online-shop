import React, { useEffect, useState } from "react";
import Container from "../Components/EssentialComponents/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCard from "../Components/ProductCard";
import useCategoryIcons from "../Hook/useCategoryIcons";
import Navigation from "../Components/EssentialComponents/Navigation";
import useFetchFuncs from "../Common/useFetchFuncs";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { categoryIcons, handleCategoryActive } = useCategoryIcons();
  const {fetchProducts} = useFetchFuncs();

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProduct();
  }, []);

  // Find the active category key
  const activeCategoryKey = Object.keys(categoryIcons).find(
    (key) => categoryIcons[key].isCurrent
  );

  // Filter products based on active category
  const filteredProducts =
    activeCategoryKey === "all"
      ? products
      : products.filter((product) => product.category === activeCategoryKey);

  // Counts
  const productCounts = filteredProducts.length;

  return (
    <section className="h-screen">
      {/* Categories */}
      <aside className={`py-5 fixed h-screen shadow-lg w-[250px]`}>
        <div className="flex flex-col font-bold">
          {Object.entries(categoryIcons).map(([key, category]) => (
            <div
              key={key}
              className={`w-50 flex gap-1 text-xl items-center cursor-pointer py-3 px-5 rounded-r-[var(--standard-radius)] ${
                category.isCurrent ? "bg-iconic text-font1" : "text-font2"
              }`}
              onClick={() => handleCategoryActive(key)}
            >
              <FontAwesomeIcon icon={category.icon} />
              <h1>{category.name}</h1>
            </div>
          ))}
        </div>
      </aside>

      <section className="w-[calc(100%-250px)] ml-[250px] p-5">
        {/* Heading */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl text-font2 font-bold">Products</h1>
            <div className="flex gap-2 items-center">
              <p className="uppercase text-font2-light">
                "All in one market" -{" "}
              </p>
              <h1>{productCounts} Products</h1>
            </div>
          </div>
        </div>

        {/* Products List */}
        <div className="grid grid-cols-5 gap-2">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default Shop;
