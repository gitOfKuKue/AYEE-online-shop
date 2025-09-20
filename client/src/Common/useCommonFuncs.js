// src/Common/useCommonFuncs.js
import { mutate } from "swr";
import { create } from "zustand";

// --- keep a reference to the alert timer so we can clear it if needed
let alertTimer;

/**
 * Global utility store providing:
 *  • Authentication helpers
 *  • Date formatting
 *  • Cart item management
 *  • Global alert & confirmation popups
 */
const useCommonFuncs = create((set, get) => ({
  // ---------- Alert ----------
  /** Global alert state */
  isAlert: false,
  alertMessage: "",
  alertStatus: null,

  /** Toggle the global alert flag directly. */
  setIsAlert: (value) => set({ isAlert: value }),

  /**
   * Show a global alert for 5 seconds.
   * @param {string} message
   * @param {number|string} status – e.g. 200 / "success"
   */
  handleAlert: (message, status) => {
    clearTimeout(alertTimer); // prevent multiple overlapping timers
    set({
      isAlert: true,
      alertMessage: message,
      alertStatus: status,
    });
    alertTimer = setTimeout(() => set({ isAlert: false }), 2000);
  },

  // ---------- Auth ----------
  /** Whether the user is currently logged in */
  isLoggedIn: Boolean(localStorage.getItem("token")),

  /** Set the logged-in state manually. */
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),

  /**
   * Perform the full logout sequence:
   * 1. Clear auth tokens from localStorage
   * 2. Reset the logged-in state
   * 3. Clear cached SWR user data
   * 4. Navigate back to the home page
   */
  performLogOut: (navigate) => {
    set({ isLoggedIn: false });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    mutate("local-user", null, false);
    navigate("/");
  },

  // ---------- Utils ----------
  /** Format a date string into “1st January, 2025” style. */
  formatDate: (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getFullYear();

    const getSuffix = (n) => {
      if (n % 10 === 1 && n % 100 !== 11) return "st";
      if (n % 10 === 2 && n % 100 !== 12) return "nd";
      if (n % 10 === 3 && n % 100 !== 13) return "rd";
      return "th";
    };

    return `${day}${getSuffix(day)} ${month}, ${year}`;
  },
  // ---------- Cart ----------
  searchQuery: "",
  setSearchQuery: (value) => set({ searchQuery: value }),

  // ---------- Cart ----------
  /**
   * Add a product to the user’s cart.
   * • If product is not already in the cart → POST
   * • If product already in the cart → PATCH quantity
   */
  handleAddCartItem: async (user, product, navigate, baseUrl) => {
    const { handleAlert } = get();
    const productId = Number(product.id); // ✅ normalize type

    const alreadyInCart = user?.cart?.find(
      (item) => Number(item.productId) === productId
    );

    if (!user) {
      handleAlert("Please sign in first!", 404);
      setTimeout(() => navigate("/sign-in"), 1000);
      return;
    }

    try {
      if (!alreadyInCart) {
        // --- Add a brand-new cart item
        const newCartItem = { productId, quantity: 1 };
        const res = await fetch(`${baseUrl}/api/users/${user.id}/cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCartItem),
        });
        const data = await res.json();

        // ✅ update localStorage + SWR cache
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
        // --- Increase quantity for existing cart item
        const res = await fetch(
          `${baseUrl}/api/users/${user.id}/cart/quantity`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              productId: product.id,
              action: "increment",
            }),
          }
        );
        const data = await res.json();

        // ✅ Update the local cart quantity
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
      }
    } catch (error) {
      console.error(error);
      handleAlert(error.message, 500);
    }
  },

  /**
   * Subtract quantity from cart and delete item if quantity is 0.
   */
  handleSubtractCartItem: async (user, product, baseUrl) => {
    const { handleAlert } = get();
    const productId = Number(product.id);

    try {
      const res = await fetch(`${baseUrl}/api/users/${user.id}/cart/quantity`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, action: "decrement" }),
      });

      const data = await res.json();

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
            .filter((item) => item.quantity > 0); // ✅ remove items with 0 quantity

          const updatedUser = { ...current.user, cart: updatedCart };
          localStorage.setItem("user", JSON.stringify({ user: updatedUser }));

          return { ...current, user: updatedUser };
        },
        false
      );
    } catch (error) {
      console.log(error.message);
      handleAlert(error.message, 400);
    }
  },

  // ---------- Confirmation ----------
  /** Global confirmation popup state */
  isConfirmation: false,
  isConfirm: false,
  confirmMessage: "",
  confirmStatus: null,

  setIsConfirmation: (value) => set({ isConfirmation: value }),
  setIsConfirm: (value) => set({ isConfirm: value }),

  /**
   * Show a confirmation popup with a custom message & status type.
   * Example: handleConfirmation("Delete this item?", "delete")
   */
  handleConfirmation: (message, status) => {
    set({
      isConfirmation: true,
      confirmMessage: message,
      confirmStatus: status,
    });
  },
}));

export default useCommonFuncs;
