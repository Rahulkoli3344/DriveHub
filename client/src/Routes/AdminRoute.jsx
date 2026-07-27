import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const AdminRoute = ({ children }) => {
  const { isLoggedIn, isAdmin } = useAuth();

  // User is not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in but is not an admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Admin can access the page
  return children;
};

export default AdminRoute;