import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    // Redirige al login si no está autenticado
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.rolId)) {
    // Redirige al dashboard o a otra página si el rol no está permitido
    
    return <Navigate to="/dashboard" replace /> ;
  }

  return children;
}

export default ProtectedRoute;
