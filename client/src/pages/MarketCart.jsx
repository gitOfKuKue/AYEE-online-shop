// src/pages/MarketCart.jsx
import React, { useEffect, useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import emptyPic from "../assets/images/Empty-bro.svg";
import PayBtn from "../Components/buttons/PayBtn";
import useAPICalling from "../Common/useAPICalling";
import { useNavigate } from "react-router";
import useCartStore from "../Common/Store/useCartStore";
import useUser from "../Hook/useUser";
import { mutate } from "swr";

const MarketCart = () => {
  const navigate = useNavigate();
  const { data } = useUser();
  const user = data?.user;

  const [shippingFee, setShippingFee] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);

  const [cartItems, setCartItems] = useState([]);
  const { products, setProducts, fetchProducts, baseUrl, productImagePath } =
    useAPICalling();
  const { handleAddCartItem, handleSubtractCartItem } = useCartStore();

  useEffect(() => {
    if (user?.cart.length > 0) {
      setCartItems(user.cart);
      setDiscount(5);
      setShippingFee(10);
      setTax(10);
    } else {
      setCartItems([]);
      setDiscount(0);
      setShippingFee(0);
      setTax(0);
    }
  }, [user]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fetchProducts();
      if (mounted) setProducts(data);
    })();
    return () => {
      mounted = false;
    };
  }, [fetchProducts, setProducts]);

  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
    if (!products || !cartItems) return;
    const merged = products
      .filter((product) =>
        cartItems.some((item) => String(item.productId) === String(product.id))
      )
      .map((product) => {
        const cartItem = cartItems.find(
          (item) => String(item.productId) === String(product.id)
        );
        return { ...product, ...cartItem };
      });
    setProductsInCart(merged);
  }, [products, cartItems]);

  const subtractQuantity = async (product) => {
    try {
      await handleSubtractCartItem(user, product, baseUrl);
      mutate("local-user");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleQuantityChange = (productId, rawValue) => {
    const value = Math.max(0, Number(rawValue) || 0);
    setCartItems((prev) =>
      prev.map((item) =>
        String(item.productId) === String(productId)
          ? { ...item, quantity: value }
          : item
      )
    );
  };

  const addQuantity = async (product) => {
    try {
      await handleAddCartItem(user, product, navigate, baseUrl);
      mutate("local-user");
    } catch (err) {
      console.error(err);
    }
  };

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
    (calculateTotal() * tax) / 100 -
    (calculateTotal() * discount) / 100
  ).toFixed(2);

  return (
    <section className="h-[calc(100vh-5em)] px-4 py-6 lg:px-10 bg-background">
      <div className="flex items-center justify-center gap-3 mb-8">
        <ShoppingCart size={40} />
        <h1 className="text-4xl font-bold">
          My <span className="text-iconic">Cart</span>
        </h1>
      </div>

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
          </div>

          {productsInCart.length > 0 ? (
            <div className="relative">
              <table className="w-full border border-border">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="border py-2 px-3 text-left w-12">No</th>
                    <th className="border py-2 px-3 text-left">Items</th>
                    <th className="border py-2 px-3 text-center w-40">
                      Quantity
                    </th>
                    <th className="border py-2 px-3 text-right w-32">Total</th>
                  </tr>
                </thead>
              </table>

              <div className="max-h-[50vh] overflow-y-auto hide-y-scrollbar">
                <table className="w-full border border-border border-t-0">
                  <tbody>
                    {productsInCart.map((item, index) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="border p-3 text-center w-12">
                          {index + 1}
                        </td>
                        <td className="border p-3">
                          <div className="flex gap-4">
                            <img
                              src={productImagePath(item.image)}
                              alt={item.title}
                              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                            />
                            <div>
                              <h2 className="text-xl font-semibold mb-1">
                                {item.title}
                              </h2>
                              <p className="text-gray-600 text-sm mb-2 line-clamp-3">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="border p-3 text-center w-40">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                              onClick={() => subtractQuantity(item)}
                              type="button"
                            >
                              <Minus size={16} />
                            </button>

                            <input
                              type="number"
                              min="0"
                              value={Number(item?.quantity) || 0}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.productId,
                                  e.target.value
                                )
                              }
                              className="w-12 text-center border rounded"
                            />

                            <button
                              className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                              onClick={() => addQuantity(item)}
                              type="button"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>

                        <td className="border p-3 text-right text-lg font-semibold w-32">
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

              <table className="w-full border border-border">
                <tbody>
                  <tr className="bg-gray-100 font-bold text-lg">
                    <td colSpan={3} className="p-3 text-center">
                      Total
                    </td>
                    <td className="p-3 text-right w-32 border">
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
