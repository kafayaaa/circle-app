import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export function AuthCheck({ children }: ProtectedRouteProps) {
  const { token, loading } = useSelector((state: RootState) => state.auth);
  if (loading) return null;
  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
