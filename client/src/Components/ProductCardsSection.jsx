import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Container from "./EssentialComponents/Container";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button1 from "./buttons/button1";
import { Link } from "react-router-dom";
import useFetchFuncs from "../Common/useFetchFuncs";

const ProductCardsSection = () => {
  const [products, setProducts] = useState([]);
  const { fetchProducts } = useFetchFuncs();

  useEffect(() => {
    const loadPorduct = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadPorduct();
  }, []);

  // Counts
  const productCounts = products.length;

  return (
    <>
      <section className="">
        <Container>
          <div className="mb-5 flex items-center justify-between sticky top-0">
            <div>
              <h1 className="text-5xl text-font2 font-bold">Products</h1>
              <div className="flex gap-2 items-center">
                <p className="uppercase text-font2-light">
                  "All in one market" -{" "}
                </p>
                <h1> {productCounts} Products</h1>
              </div>
            </div>
            <Link to="/shop">
              <Button1 title="See More" />
            </Link>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {products.slice(0, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProductCardsSection;
