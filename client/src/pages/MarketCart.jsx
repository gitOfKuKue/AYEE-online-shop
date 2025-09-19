// src/pages/MarketCart.jsx
import React, { useEffect, useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import emptyPic from "../assets/images/Empty-bro.svg";
import PayBtn from "../Components/buttons/PayBtn";
import useFetchFuncs from "../Common/useFetchFuncs";
import ClearBtn from "../Components/buttons/ClearBtn";

const MarketCart = () => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser).user : null;

  const [shippingFee] = useState(10);
  const [discount] = useState(20);
  const [tax] = useState(0);

  const [products, setProducts] = useState([]);
  // keep original cart raw data (from user) — may be array of ids or objects
  const [cartItems] = useState(user?.cart || []);

  // This is the state we actually render / update quantities on
  const [productsInCart, setProductsInCart] = useState([]);

  const { fetchProducts } = useFetchFuncs();
  const maxStars = 5;

  // fetch product list
  useEffect(() => {
    let mounted = true;
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (mounted) setProducts(data || []);
      } catch (error) {
        console.error(error?.message || error);
      }
    };
    loadProducts();
    return () => {
      mounted = false;
    };
  }, [fetchProducts]);

  // normalize cart (accepts numbers or objects) and merge with product details
  useEffect(() => {
    if (!products || products.length === 0) {
      setProductsInCart([]);
      return;
    }

    // Normalize cart entries -> { id: Number, quantity: Number }
    const normalized = (cartItems || [])
      .map((c) => {
        if (typeof c === "number") return { id: Number(c), quantity: 1 };
        if (typeof c === "string" && !Number.isNaN(Number(c)))
          return { id: Number(c), quantity: 1 };
        if (c && typeof c === "object") {
          // try common keys
          const id = Number(
            c.productId ?? c.id ?? c.product_id ?? c.productIdNumber
          );
          const quantity = Number(c.quantity ?? c.qty ?? 1);
          return {
            id: Number.isNaN(id) ? null : id,
            quantity: Number.isNaN(quantity) ? 1 : Math.max(1, quantity),
          };
        }
        return { id: null, quantity: 1 };
      })
      .filter((n) => n.id !== null);

    // Merge with products array; ensure quantity exists
    const merged = products
      .filter((p) => normalized.some((n) => Number(p.id) === Number(n.id)))
      .map((p) => {
        const n = normalized.find((x) => Number(x.id) === Number(p.id));
        return {
          ...p,
          quantity: n?.quantity ?? 1,
        };
      });

    setProductsInCart(merged);
  }, [products, cartItems]);

  // helpers to change quantities
  const addQuantity = (id) => {
    setProductsInCart((prev) =>
      prev.map((item) =>
        Number(item.id) === Number(id)
          ? { ...item, quantity: (Number(item.quantity) || 0) + 1 }
          : item
      )
    );
  };

  const subtractQuantity = (id) => {
    setProductsInCart((prev) =>
      prev
        .map((item) =>
          Number(item.id) === Number(id)
            ? {
                ...item,
                quantity: Math.max((Number(item.quantity) || 0) - 1, 0),
              }
            : item
        )
        .filter((item) => (Number(item.quantity) || 0) > 0)
    );
  };

  const handleQuantityChange = (id, rawValue) => {
    const value = Math.max(0, Number(rawValue) || 0);
    setProductsInCart((prev) =>
      prev.map((item) =>
        Number(item.id) === Number(id) ? { ...item, quantity: value } : item
      )
    );
  };

  // safe total calculation from productsInCart
  const calculateTotal = () =>
    parseFloat(
      productsInCart
        .reduce(
          (acc, i) => acc + (Number(i.price) || 0) * (Number(i.quantity) || 0),
          0
        )
        .toFixed(2)
    );

  const estimatedTotal = (
    calculateTotal() +
    shippingFee +
    (calculateTotal() * discount) / 100 +
    (calculateTotal() * tax) / 100
  ).toFixed(2);

  return (
    <section className="h-[calc(100vh-5em)] px-4 py-6 lg:px-10 bg-background">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <ShoppingCart size={40} />
        <h1 className="text-4xl font-bold">
          My <span className="text-iconic">Cart</span>
        </h1>
      </div>

      {/* Main Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-lg">
              There are{" "}
              <span className="text-iconic font-semibold">
                {productsInCart.length}
              </span>{" "}
              items in your cart.
            </h1>
            {productsInCart.length === 0 || <ClearBtn />}
          </div>

          {productsInCart.length > 0 ? (
            <div className="relative">
              {/* Table Header */}
              <table className="w-full border border-border">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="border border-border py-2 px-3 text-left w-12">
                      No
                    </th>
                    <th className="border border-border py-2 px-3 text-left">
                      Items
                    </th>
                    <th className="border border-border py-2 px-3 text-center w-40">
                      Quantity
                    </th>
                    <th className="border border-border py-2 px-3 text-right w-32">
                      Total
                    </th>
                  </tr>
                </thead>
              </table>

              {/* Scrollable Body */}
              <div className="max-h-[50vh] overflow-y-auto hide-y-scrollbar">
                <table className="w-full border border-border border-t-0">
                  <tbody>
                    {productsInCart.map((item, index) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="border border-border p-3 text-center w-12">
                          {index + 1}
                        </td>
                        <td className="border border-border p-3">
                          <div className="flex gap-4">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                            />
                            <div>
                              <h2 className="text-xl font-semibold mb-1">
                                {item.title}
                              </h2>
                              <p className="text-gray-600 text-sm mb-2">
                                {item.description}
                              </p>
                              <div className="flex items-center">
                                {[...Array(maxStars)].map((_, i) => (
                                  <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className={`w-5 h-5 ${
                                      i < Math.round(item.rating)
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
                                  ({item.sold} sold)
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="border border-border p-3 text-center w-40">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                              onClick={() => subtractQuantity(item.id)}
                              type="button"
                            >
                              <Minus size={16} />
                            </button>

                            <input
                              type="number"
                              min="0"
                              value={Number(item.quantity) || 0}
                              onChange={(e) =>
                                handleQuantityChange(item.id, e.target.value)
                              }
                              className="w-12 text-center border rounded
                                         appearance-none
                                         [&::-webkit-inner-spin-button]:appearance-none
                                         [&::-webkit-outer-spin-button]:appearance-none
                                         [-moz-appearance:textfield]"
                            />

                            <button
                              className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                              onClick={() => addQuantity(item.id)}
                              type="button"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>

                        <td className="border border-border p-3 text-right text-lg font-semibold w-32">
                          $
                          {(
                            Number(item.quantity) * Number(item.price) || 0
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Fixed Total Row */}
              <table className="w-full border border-border">
                <tbody>
                  <tr className="bg-gray-100 font-bold text-lg">
                    <td colSpan={3} className="p-3 text-center">
                      Total
                    </td>
                    <td className="p-3 text-right w-32 border ">
                      ${calculateTotal()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center py-10">
              <img src={emptyPic} alt="Empty" className="w-48 mb-4" />
              <p className="text-xl font-semibold">
                There is no item in <span className="text-iconic">Cart</span>!
              </p>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow p-6 h-fit flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-1">Products Cost</td>
                <td className="py-1 text-right">${calculateTotal()}</td>
              </tr>
              <tr>
                <td className="py-1">Shipping Cost</td>
                <td className="py-1 text-right">${shippingFee}</td>
              </tr>
              <tr>
                <td className="py-1">Discount</td>
                <td className="py-1 text-right">{discount}%</td>
              </tr>
              <tr>
                <td className="py-1">Tax</td>
                <td className="py-1 text-right">{tax}%</td>
              </tr>
              <tr className="border-t font-bold text-lg">
                <td className="py-2">Estimated Total</td>
                <td className="py-2 text-right">${estimatedTotal}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end">
            <PayBtn />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketCart;
