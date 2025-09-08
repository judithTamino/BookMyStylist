import type { IToken } from '../interface/auth.interface';
import decodeToken from '../services/token.service';

export const getAuthRedirect = (decodedToken: IToken | null): string => {
  if (!decodedToken) return '/login';
  return decodedToken.isAdmin ? '/admin/dashboard' : '/my-appointments';
};

export const isAdmin = (token:string) : boolean => {
  const decodedToken = decodeToken(token);

  if(!decodedToken) return false;
  return decodedToken.isAdmin;
}
