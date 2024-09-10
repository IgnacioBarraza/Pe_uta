import { ReactNode, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  roles?: string[];
  children?: ReactNode
}

function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string | null>(null);
  const isAuthenticated = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } 
  }, [isAuthenticated, userId, roles, userRole, navigate]);

  return isAuthenticated ? (children ? children : <Outlet />) : null;
}

export default ProtectedRoute;