// hooks/useUser.js
import useSWR from "swr";
import { useEffect } from "react";
import useAuthStore from "../Common/Store/useAuthStore";

export default function useUser() {
  const { setIsLoggedIn } = useAuthStore();
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  useEffect(() => {
    if (token && userData) {
      setIsLoggedIn(true);
    }
  }, [token, userData, setIsLoggedIn]);

  return useSWR("local-user", () => {
    if (!token || !userData) return null;
    return {
      user: JSON.parse(userData).user,
      token, // ✅ include token
    };
  });
}
