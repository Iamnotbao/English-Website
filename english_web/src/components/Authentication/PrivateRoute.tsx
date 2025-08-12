
import type { ReactElement } from "react"
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const PrivateRoute = ({ children }: { children:ReactElement }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? children : <Navigate to="/login" />;
};


export default PrivateRoute;
