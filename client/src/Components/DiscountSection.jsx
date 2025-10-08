import React from "react";
import Container from "./EssentialComponents/Container";
import Lottie from "lottie-react";

import packages from "../assets/animation-pics/Shop-icon.json";

const DiscountSection = () => {
  return (
    <section id="discount-section">
      <Container className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white py-10 px-6 text-center rounded-2xl shadow-lg">
        <div className="flex items-center gap-5">
          <Lottie animationData={packages} loop autoPlay className="w-100" />
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              🎉 Big Weekend Sale – 50% OFF!
            </h2>
            <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
              Grab your favorite products at half price. Limited time offer –
              don’t miss out!
            </p>
            <a
              href="/shop"
              className="inline-block bg-white text-pink-600 font-semibold py-3 px-8 rounded-full shadow hover:bg-gray-100 transition duration-300"
            >
              Shop Now
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DiscountSection;
