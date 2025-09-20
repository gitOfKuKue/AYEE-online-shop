import { create } from "zustand";
import { mutate } from "swr";
import useAlertStore from "./useAlertStore";

const useCartStore = create((set, get) => ({
  searchQuery: "",
  setSearchQuery: (value) => set({ searchQuery: value }),

  handleAddCartItem: async (user, product, navigate, baseUrl) => {
    const { handleAlert } = useAlertStore.getState();
    const productId = Number(product.id);

    if (!user) {
      handleAlert("Please sign in first!", 404);
      setTimeout(() => navigate("/sign-in"), 1000);
      return;
    }

    const alreadyInCart = user?.cart?.find(
      (item) => Number(item.productId) === productId
    );

    try {
      if (!alreadyInCart) {
        const newCartItem = { productId, quantity: 1 };
        const res = await fetch(`${baseUrl}/api/users/${user.id}/cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCartItem),
        });
        const data = await res.json();

        const updatedUser = {
          ...user,
          cart: [...(user.cart || []), newCartItem],
        };
        localStorage.setItem("user", JSON.stringify({ user: updatedUser }));
        mutate(
          "local-user",
          { user: updatedUser, token: localStorage.getItem("token") },
          false
        );

        handleAlert(data.message ?? "Item added to cart", 200);
      } else {
        await fetch(`${baseUrl}/api/users/${user.id}/cart/quantity`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product.id, action: "increment" }),
        });

        const updatedCart = user.cart.map((item) =>
          Number(item.productId) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        const updatedUser = { ...user, cart: updatedCart };
        localStorage.setItem("user", JSON.stringify({ user: updatedUser }));
        mutate(
          "local-user",
          { user: updatedUser, token: localStorage.getItem("token") },
          false
        );

        handleAlert("Quantity updated!", 200);
      }
    } catch (error) {
      console.error(error);
      handleAlert(error.message, 500);
    }
  },

  handleSubtractCartItem: async (user, product, baseUrl) => {
    const { handleAlert } = useAlertStore.getState();
    const productId = Number(product.id);

    try {
      await fetch(`${baseUrl}/api/users/${user.id}/cart/quantity`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, action: "decrement" }),
      });

      mutate(
        "local-user",
        (current) => {
          if (!current?.user) return current;

          const updatedCart = current.user.cart
            .map((item) =>
              Number(item.productId) === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0);

          const updatedUser = { ...current.user, cart: updatedCart };
          localStorage.setItem("user", JSON.stringify({ user: updatedUser }));

          return { ...current, user: updatedUser };
        },
        false
      );

      handleAlert("Quantity updated!", 200);
    } catch (error) {
      console.log(error.message);
      handleAlert(error.message, 400);
    }
  },
}));

export default useCartStore;
