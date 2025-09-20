import { create } from "zustand";
import { mutate } from "swr";

const useAuthStore = create((set) => ({
  isLoggedIn: Boolean(localStorage.getItem("token")),
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  performLogOut: (navigate) => {
    set({ isLoggedIn: false });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    mutate("local-user", null, false);
    navigate("/");
  },
}));

export default useAuthStore;
