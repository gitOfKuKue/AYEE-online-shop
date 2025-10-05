import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

import noSearchFoundPic from "../assets/images/no-search-found.svg";
import useAPICalling from "../Common/useAPICalling";
import useCategory from "../Common/useCategory";
import useCommon from "../Common/Store/useCommon";

const ProductsShop = () => {
  const { categoryMenus } = useCategory();
  const { products, setProducts, fetchProducts } = useAPICalling();
  const { searchQuery } = useCommon();


  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, [fetchProducts]);

  // Find the active category key
  const activeCategoryKey = categoryMenus.find((key) => key.isCurrent);

  // Filter products based on active category
  const filteredProducts = (
    activeCategoryKey.title === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategoryKey.title
        )
  )?.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Counts
  const productCounts = filteredProducts?.length;
  return (
    <div>
      {/* Heading */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl text-font2 font-bold">Products</h1>
          <div className="flex gap-2 items-center">
            <p className="uppercase text-font2-light">"All in one market" - </p>
            <h1>{productCounts} Products</h1>
          </div>
        </div>
      </div>

      {/* Products List */}
      {filteredProducts?.length === 0 && (
        <div className="">
          <img
            src={noSearchFoundPic}
            alt="No Search Found Pic"
            className="w-60 m-auto"
          />
          <h1 className="text-center text-2xl font-light">
            No search item found!
          </h1>
        </div>
      )}
      <div className="grid md:grid-cols-3 2xl:grid-cols-5 gap-2">
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsShop;
