import React, { useEffect, useState } from "react";
import Container from "./EssentialComponents/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useCategoryIcons from "../Hook/useCategoryIcons";
import useFetchFuncs from "../Common/useFetchFuncs";

const InfoDetailSection = () => {
  const [products, setProducts] = useState([]);
  const { categoryIcons } = useCategoryIcons();
  const { fetchProducts } = useFetchFuncs();

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProduct();
  }, []);

  //   Counts
  const productCounts = products.length;

  const categories = products.reduce((acc, item) => {
    const cat = item.category;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});
  const categoryCounts = Object.keys(categories).length;

  return (
    <section className="mt-5 mb-10">
      <Container>
        {/* First Section */}
        <div className="flex justify-between items-center mb-32">
          <h1 className="text-5xl flex-wrap w-2/3">
            Explore millions of offerings tailored to your business needs
          </h1>
          {/* Info Counts */}
          <div className="grid grid-cols-2 gap-5">
            <div className="py-1 px-5 border-l-4 border-border">
              <h1 className="text-iconic text-6xl font-bold">
                {productCounts}+
              </h1>
              <p className="text-font2 text-xl">products</p>
            </div>
            <div className="py-1 px-5 border-l-4 border-border">
              <h1 className="text-iconic text-6xl font-bold">
                {categoryCounts}+
              </h1>
              <p className="text-font2 text-xl">product categories</p>
            </div>
            <div className="py-1 px-5 border-l-4 border-border">
              <h1 className="text-iconic text-6xl font-bold">
                {products.length}+
              </h1>
              <p className="text-font2 text-xl">products</p>
            </div>
            <div className="py-1 px-5 border-l-4 border-border">
              <h1 className="text-iconic text-6xl font-bold">
                {products.length}+
              </h1>
              <p className="text-font2 text-xl">products</p>
            </div>
          </div>
        </div>

        {/* Second Section */}
        <div className="grid grid-cols-7">
          {Object.values(categoryIcons)
            .slice(1)
            .map((category, index) => (
              <div
                key={index}
                className="relative border rounded-full h-30 w-30 mx-auto"
              >
                {/* Center content horizontally & vertically */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <FontAwesomeIcon
                    icon={category.icon}
                    className="text-4xl mb-2"
                  />
                  <h1 className="text-sm">{category.name}</h1>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </section>
  );
};

export default InfoDetailSection;
