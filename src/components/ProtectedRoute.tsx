
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, hasRole, isLoading } = useAuth();
  const location = useLocation();
  
  // Check for the expected role ID
  const expectedRoleId = localStorage.getItem("discord_role_id");
  
  if (isLoading) {
    // Could add a loading spinner here
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }
  
  if (!isAuthenticated) {
    toast.error("Debes iniciar sesión para acceder a esta página");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (expectedRoleId && !hasRole(expectedRoleId)) {
    toast.error("No tienes los permisos necesarios para acceder a esta página");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
