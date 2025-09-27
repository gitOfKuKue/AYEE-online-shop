import React, { useEffect, useState } from "react";
import Container from "./EssentialComponents/Container";
import useAPICalling from "../Common/useAPICalling";

const InfoDetailSection = () => {
  const { products, fetchProducts, users, fetchUsers } = useAPICalling();

  useEffect(() => {
    const loadProducts = async () => {
      await fetchProducts();
    };
    loadProducts();
    const loadUsers = async () => {
      await fetchUsers();
    };
    loadUsers();
  }, [fetchProducts, fetchUsers]);

  //   Counts
  const productCounts = products.length;

  const categories = products.reduce((acc, item) => {
    const cat = item.category;
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});
  const categoryCounts = Object.keys(categories).length;
  const userCounts = users.length;

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
              <p className="text-font2 text-xl">Products</p>
            </div>
            <div className="py-1 px-5 border-l-4 border-border">
              <h1 className="text-iconic text-6xl font-bold">
                {categoryCounts}+
              </h1>
              <p className="text-font2 text-xl">Product categories</p>
            </div>
            <div className="py-1 px-5 border-l-4 border-border">
              <h1 className="text-iconic text-6xl font-bold">
                {userCounts}+
              </h1>
              <p className="text-font2 text-xl">Users</p>
            </div>
            <div className="py-1 px-5 border-l-4 border-border">
              <h1 className="text-iconic text-6xl font-bold">
                {products.length}+
              </h1>
              <p className="text-font2 text-xl">products</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default InfoDetailSection;
