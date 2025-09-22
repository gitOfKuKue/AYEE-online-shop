import React, { useEffect, useState } from "react";
import { Check, ChevronDown, Edit, WandSparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import defaultProfilePic from "../../assets/profiles/defaultProfilePic.png";
import useFetchFuncs from "../../Common/useAPICalling";

import bronze from "../../assets/icons/bronze.png";
import silver from "../../assets/icons/silver.png";
import gold from "../../assets/icons/gold.png";
import platinum from "../../assets/icons/platinum.png";
import emptyWish from "../../assets/images/empty-box.svg";
import orderNow from "../../assets/images/order-now.svg";

import BuyNowBtn from "../buttons/BuyNowBtn";
import useUser from "../../Hook/useUser";
import useCartStore from "../../Common/Store/useCartStore";
import formatDate from "../../Common/Utils/formatDate";

const UserProfile = () => {
  const profilePath = "/src/assets/profiles/";
  const maxStars = 5;

  const { data } = useUser();
  const user = data?.user;
  const token = data?.token;

  const { handleAddCartItem } = useCartStore();
  const { fetchProducts } = useFetchFuncs();

  const tierIcons = { bronze, silver, gold, platinum };

  const [wishList, setWishList] = useState(user ? user.wishlist : []);
  const [recentOrders, setRecentOrders] = useState(
    user ? user.recentOrders : []
  );
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadProducts();
  }, [fetchProducts]);

  if (!user) return <p>No user logged in</p>;

  const productsWishList = products.filter((product) =>
    wishList.some((id) => id === product.id)
  );

  const productsRecentOrders = products.filter((product) =>
    recentOrders.some((id) => id === product.id)
  );

  return (
    <section>
      <div className="max-h-[calc(100vh-5em)]">
        <h1 className="mb-6 text-2xl font-bold">My Profile</h1>

        {/* Two equal columns on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ---- Left column ---- */}
          <div className="shadow-lg bg-[var(--pure-white)] p-6 rounded-[var(--standard-radius)]">
            <div className="border-b border-border pb-5 mb-5">
              <div className="flex justify-between items-center mb-5">
                <p className="font-light text-font2-light">
                  Joined: {formatDate(user.createdAt)}
                </p>
                <button className="flex gap-1 items-center text-primary hover:underline">
                  <Edit size={15} />
                  <span className="text-md">Edit</span>
                </button>
              </div>

              <div className="w-40 h-40 overflow-hidden mx-auto rounded-full border border-border mb-4">
                <img
                  src={`${profilePath}${
                    user?.profileImage || "defaultProfilePic.png"
                  }`}
                  alt={`${user.firstName} - profile pic`}
                  className="h-full w-full object-cover"
                />
              </div>

              <h1 className="text-center text-2xl font-bold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-center text-font2-light text-sm">
                {user.role}
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center">
              Personal Info
            </h2>
            <div className="grid sm:grid-cols-2 gap-y-5 gap-x-6">
              <div>
                <p className="text-font2-light">Email</p>
                <h2 className="text-lg font-bold break-words">{user.email}</h2>
              </div>

              <div>
                <p className="text-font2-light">Phone No</p>
                <h2 className="text-lg font-bold">{user.phone}</h2>
              </div>

              <div className="sm:col-span-2">
                <p className="text-font2-light">Address</p>
                <h2 className="text-lg font-bold break-words">
                  {user.shippingAddress}
                </h2>
              </div>
            </div>
          </div>

          {/* ---- Right column ---- */}
          <div className="flex flex-col gap-6">
            {/* Level */}
            <div className="shadow-lg bg-[var(--pure-white)] rounded-[var(--standard-radius)] p-6">
              <div className="flex justify-center gap-2 items-center mb-6">
                <Check size={30} />
                <h1 className="text-2xl font-bold text-center">Level</h1>
              </div>
              <div className="grid grid-cols-2 gap-6 items-center">
                <div className="flex flex-col items-center">
                  <h2 className="text-6xl font-extrabold text-iconic">
                    {user.loyaltyPoints}
                  </h2>
                  <p className="text-sm text-font2 mt-2">Loyalty Points</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 flex items-center justify-center rounded-full bg-background shadow-inner mb-2">
                    <img
                      src={
                        tierIcons[String(user.membershipTier).toLowerCase()] ||
                        bronze
                      }
                      alt="Membership Tier"
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <p className="text-sm text-font2">Membership Tier</p>
                </div>
              </div>
            </div>

            {/* Wishlist */}
            <div className="shadow-lg bg-[var(--pure-white)] rounded-[var(--standard-radius)] p-6 flex-1">
              <div className="flex justify-center gap-2 items-center mb-6">
                <WandSparkles size={30} />
                <h1 className="text-2xl font-bold text-center">Wish List</h1>
              </div>

              <div className="max-h-96 overflow-scroll hide-y-scrollbar">
                {productsWishList.length === 0 && (
                  <div>
                    <img
                      src={emptyWish}
                      alt="No Wish List Pic"
                      className="w-30 mx-auto"
                    />
                    <p className="text-center text-gray-500">
                      No products found in wish list.
                    </p>
                  </div>
                )}

                {productsWishList.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4
                               rounded-xl shadow-md
                               border border-gray-200
                               p-4 mb-4
                               bg-background
                               transition-transform duration-200
                               hover:scale-[1.02] hover:shadow-lg
                              "
                  >
                    <div className="w-24 h-30 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={`${product.title} - picture`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex flex-col justify-between w-full h-30">
                      <h2 className="font-semibold text-lg text-gray-800">
                        {product.title}
                      </h2>

                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex justify-between items-center mt-auto">
                        <p className="text-xl font-bold text-green-600 mt-2">
                          ${product.price}
                        </p>
                        <div onClick={() => handleAddCartItem(product)}>
                          <BuyNowBtn price={product.price} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mt-5">
        <h1 className="mb-6 text-2xl font-bold">Recent Orders</h1>

        {productsRecentOrders.length === 0 && (
          <div>
            <img
              src={orderNow}
              alt="No Wish List Pic"
              className="w-30 mx-auto"
            />
            <p className="text-center text-gray-500">No recent orders.</p>
          </div>
        )}

        <div className="shadow-lg bg-[var(--pure-white)] rounded-[var(--standard-radius)] p-6 flex-1">
          {productsRecentOrders.map((product) => (
            <div
              key={product.id}
              className="w-full bg-white rounded-xl shadow-md flex flex-col sm:flex-row overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-6"
            >
              <div className="sm:w-1/4 w-full sm:h-52 overflow-hidden flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="sm:w-3/4 w-full p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-2xl font-semibold text-gray-800">
                    {product.title}
                  </h1>
                  <span className="text-xs bg-blue-100 text-blue-600 font-medium px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
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

                <div className="flex justify-between items-center">
                  <p className="text-xl font-bold text-green-600">
                    ${product.price}
                  </p>
                  <button
                    disabled={!product.valid}
                    className={`px-5 py-2 rounded-lg text-white font-medium transition
                      ${
                        product.valid
                          ? "bg-iconic hover:bg-green-600"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    onClick={() => handleAddCartItem(product)}
                  >
                    {product.valid ? "Buy again" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
