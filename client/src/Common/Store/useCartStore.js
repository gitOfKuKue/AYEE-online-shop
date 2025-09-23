import { create } from "zustand";
import { mutate } from "swr";
import useAlertStore from "./useAlertStore";

const useCartStore = create((set, get) => ({
  searchQuery: "",
  setSearchQuery: (value) => set({ searchQuery: value }),

  handleAddCartItem: async (user, product, navigate, baseUrl) => {
    const { handleAlert } = useAlertStore.getState();
    const productId = String(product.id); // productId is always a string

    // ✅ check user login
    if (!user) {
      handleAlert("Please sign in first!", 404);
      setTimeout(() => navigate("/sign-in"), 1000);
      return;
    }

    // ✅ quick front-end stock check (optional, still need backend check)
    if (product.quantity <= 0) {
      handleAlert("This product is out of stock.", 404);
      return;
    }

    // ✅ compare as string
    const alreadyInCart = user?.cart?.find(
      (item) => String(item.productId) === productId
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

        // ✅ handle “out of stock” or other server errors
        if (!res.ok) {
          handleAlert(data.message || "Unable to add item. Possibly out of stock.", 404);
          return;
        }

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
        const res = await fetch(`${baseUrl}/api/users/${user.id}/cart/quantity`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, action: "increment" }),
        });
        const data = await res.json();

        // ✅ handle “out of stock” or other server errors
        if (!res.ok) {
          handleAlert(data.message || "Unable to increase quantity. Possibly out of stock.", 404);
          return;
        }

        const updatedCart = user.cart.map((item) =>
          String(item.productId) === productId
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
    const productId = String(product.id); // keep it as string

    try {
      const res = await fetch(`${baseUrl}/api/users/${user.id}/cart/quantity`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, action: "decrement" }),
      });
      const data = await res.json();

      if (!res.ok) {
        handleAlert(data.message || "Unable to decrease quantity.", 400);
        return;
      }

      mutate(
        "local-user",
        (current) => {
          if (!current?.user) return current;

          const updatedCart = current.user.cart
            .map((item) =>
              String(item.productId) === productId
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
