import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/app/store";
import { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
