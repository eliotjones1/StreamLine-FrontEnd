import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (isLoggedIn) return <Outlet />;
  return <Navigate to="/signin" state={{from: location}} replace/>;
};

export default ProtectedRoutes;