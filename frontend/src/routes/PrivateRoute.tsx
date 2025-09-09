import type { FunctionComponent } from 'react';
import { useAuth } from '../context/auth.context';
import { Navigate, Outlet } from 'react-router-dom';
import decodeToken from '../services/token.service';

interface PrivateRouteProps {
  roles: string[];
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ roles }) => {
  const { token, loading } = useAuth();
  const decode = token ? decodeToken(token) : null;

  if(loading) return 

  if (!decode) return <Navigate to='/'/>;

  const isAdmin = decode.isAdmin;
  if (roles.includes('admin') && !isAdmin)
    return <Navigate to='/' replace />;

  return token && roles ? <Outlet /> : <Navigate to='/login'/>;
};

export default PrivateRoute;
