// src/components/Auth/RequireAdmin.jsx
import { Navigate } from "react-router-dom";
import useUser from "../../Hook/useUser"; // or your auth hook/context

export default function RequireAdmin({ children }) {
  const { data } = useUser();         // data?.user?.role is assumed

  if (!data?.user) {
    // Not logged in → redirect to sign-in page
    return <Navigate to="/sign-in" replace />;
  }

  if (data.user.role !== "admin") {
    // Logged in but not admin → show error or redirect
    return <Navigate to="/" replace />;
    // or: return <ErrorPage message="Unauthorized" />;
  }

  // ✅ User is admin → show the protected content
  return children;
}
