// src/Common/useCommonFuncs.js
import { mutate } from "swr";
import { create } from "zustand";
import useUser from "../Hook/useUser";

const useCommonFuncs = create((set, get) => ({
  // ---------- Auth ----------
  isLoggedIn: !!localStorage.getItem("token"),
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),

  /**
   * Perform the real logout action
   */
  performLogOut: (navigate) => {
    const { setIsLoggedIn } = get();
    set({ isLoggedIn: false });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    mutate("local-user", null, false);
    navigate("/");
  },

  // ---------- Utils ----------
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
  handleAddCartItem: async (product, navigate) => {
    const {data} = useUser();
    const user = data?.user;
    const token = data?.token;
    const { handleAlert } = get();

    if (!user) {
      handleAlert("Please log in first!", 404);
      navigate("/sign-in");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/cartItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await res.json();

      handleAlert(res.message, 200);
    } catch (error) {
      console.error(error);
      handleAlert(error.message, 500);
    }
  },

  // ---------- Alert ----------
  isAlert: false,
  alertMessage: "",
  alertStatus: null,

  setIsAlert: (value) => set({ isAlert: value }),

  handleAlert: (message, status) => {
    set({
      isAlert: true,
      alertMessage: message,
      alertStatus: status,
    });
    setTimeout(() => set({ isAlert: false }), 5000);
  },

  // ---------- Confirmation ----------
  isConfirmation: false,
  isConfirm: false,
  confirmMessage: "",
  confirmStatus: null,

  setIsConfirmation: (value) => set({ isConfirmation: value }),
  setIsConfirm: (value) => set({ isConfirm: value }),

  /**
   * Show a confirmation popup with a custom message & status type
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
