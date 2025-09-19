import React from "react";

import IntroSection from "../Components/IntroSection";
import SpecialSales from "../Components/SpecialSales";
import Container from "../Components/EssentialComponents/Container";
import ProductCardsSection from "../Components/ProductCardsSection";
import DiscountSection from "../Components/DiscountSection";
import InfoDetailSection from "../Components/InfoDetailSection";
import ProcessInfos from "../Components/ProcessInfos";

const MainPage = () => {
  return (
    <section id="home">
      <IntroSection />
      {/* <SpecialSales /> */}
      <DiscountSection />
      <InfoDetailSection />
      <ProcessInfos />
      <ProductCardsSection />
      <div className="w-100 mx-auto my-32">
        <h1 className="font-bold text-xl border-b border-border text-center">AYEE Online Shop</h1>
        <p className="text-sm text-font2-light border-t border-border text-center">Your trusted Heaven</p>
      </div>
    </section>
  );
};

export default MainPage;
