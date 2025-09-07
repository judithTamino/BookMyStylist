import type { FunctionComponent } from "react";
import { useAuth } from "../context/auth.context";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  roles: string[];
}
 
const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({roles}) => {
  const {token} = useAuth();
  return token && roles ? <Outlet /> : <Navigate to='/login' />;
}
 
export default PrivateRoute;