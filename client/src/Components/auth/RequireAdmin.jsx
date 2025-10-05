// src/components/Auth/RequireAdmin.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUser from "../../Hook/useUser";
import useAPICalling from "../../Common/useAPICalling";

export default function RequireAdmin({ children }) {
  const { data } = useUser(); // might be undefined at first
  const { fetchUsers } = useAPICalling();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // wait until we actually know the logged-in user id
    if (!data?.user?.id) return;

    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        const foundUser = usersData.find(
          (u) => String(u.id) === String(data.user.id)
        );
        setUser(foundUser || null);
      } catch (err) {
        console.error("Failed to load users:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [fetchUsers, data?.user?.id]);

  console.log(user);


  // 🔹 Wait for the effect to finish
  if (loading) return <p>Checking permissions…</p>;

  // 🔹 If no user was found, redirect to sign-in
  if (!user) return <Navigate to="/sign-in" replace />;

  // 🔹 If user exists but isn’t admin, block access
  if (user.role !== "admin") return <Navigate to="/" replace />;

  // ✅ Only now render protected content
  return children;
}
