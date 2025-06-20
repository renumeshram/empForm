import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, adminRequired }) => {
  const { isAuthenticated, sessionExpired, loggedOut } = useAuth();
  const location = useLocation();

  if (adminRequired) {
    const adminToken = sessionStorage.getItem("adminToken");
    const adminUser = sessionStorage.getItem("adminUser");
    // const token = localStorage.getItem("token");
    // if (token) {
    //   return (
    //     <Navigate
    //       to="/"
    //       replace
    //       state={{ from: location, reason: "ACCESS_DENIED" }}
    //     />
    //   );
    // }
    if (!adminToken || !adminUser) {
      return <Navigate to="/admin/login" replace />;
    }

    return children;
  }

  return isAuthenticated || sessionExpired || loggedOut ? (
    children
  ) : (
    <Navigate to="/" replace state={{ from: location, reason: "NO_TOKEN" }} />
  );
};

export default PrivateRoute;
