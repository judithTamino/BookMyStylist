import type { FunctionComponent } from 'react';
import { useAuth } from '../context/auth.context';
import { Navigate, Outlet } from 'react-router-dom';
import decodeToken from '../services/token.service';

interface PrivateRouteProps {
  roles: string[];
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ roles }) => {
  const { token } = useAuth();
  const decode = token ? decodeToken(token) : null;

  if (!decode) return <Navigate to='/login' />;

  const isAdmin = decode.isAdmin;
  if (roles.includes('admin') && !isAdmin)
    return <Navigate to='/my-appointments' replace />;

  if (roles.includes('user') && isAdmin)
    return <Navigate to='/admin/dashboard' replace />;

  return <Outlet />;
};

export default PrivateRoute;
