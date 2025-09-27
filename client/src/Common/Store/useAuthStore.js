import { create } from "zustand";
import { mutate } from "swr";
import useAPICalling from "../useAPICalling";

const useAuthStore = create((set, get) => ({
  isLoggedIn: Boolean(localStorage.getItem("token")),
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  performLogOut: (navigate) => {
    set({ isLoggedIn: false });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    mutate("local-user", null, false);
    navigate("/");
  },
  deleteUser: async (user, baseUrl) => {
    try {
      const res = await fetch(`${baseUrl}/api/users/${user.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      return data.message;
    } catch (error) {
      return error.message;
    }
  },
}));

export default useAuthStore;
