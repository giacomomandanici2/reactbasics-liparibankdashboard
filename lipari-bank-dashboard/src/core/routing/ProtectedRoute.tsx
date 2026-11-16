import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import {
  selectAuthLoading,
  selectIsAuthenticated,
} from "../../store/slices/authSlice";

export function ProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const location = useLocation();

  if (isLoading) return <div>Caricamento...</div>;
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
