import React, { useState } from "react";
import BuyNowBtn from "./buttons/BuyNowBtn";
import Button3 from "./buttons/ViewMoreBtn";
import useAPICalling from "../Common/useAPICalling";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const maxStars = 5;
  const { productImagePath} = useAPICalling();

  return (
    <div className="w-full h-[480px] flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
      {/* Image */}
      <div className="w-full h-1/2 overflow-hidden">
        <img
          src={productImagePath(product.image)}
          alt={product.title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h1 className="text-gray-900 font-bold text-lg truncate">
          {product.title}
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-1 line-clamp-3">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center my-3">
          {[...Array(maxStars)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-5 h-5 ${
                i < Math.round(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-300 text-gray-300"
              }`}
            >
              <path
                fillRule="evenodd"
                d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.783 1.4 8.168L12 18.896l-7.334 3.864 1.4-8.168L.132 9.209l8.2-1.191L12 .587z"
              />
            </svg>
          ))}
          <span className="ml-2 text-sm text-gray-500">
            ({product.sold} sold)
          </span>
        </div>

        {/* Price */}
        {product.price && (
          <p className="text-lg font-semibold text-green-600 mb-3">
            ${product.price}
          </p>
        )}

        {/* Buttons */}
        <div className="flex items-center mt-auto">
          <BuyNowBtn price={product.price} product={product} />
          <Link to={`/product-detail/${product.id}`}>
            <Button3 title="View More" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
