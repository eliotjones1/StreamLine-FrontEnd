import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks";

export default function ProtectedRoutes(){
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (isLoggedIn) return <Outlet />;
  return <Navigate to="/signin" state={{from: location}} replace/>;
}