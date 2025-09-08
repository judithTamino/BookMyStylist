import { jwtDecode, type JwtPayload } from 'jwt-decode';
import type { IToken } from '../interface/auth.interface';

const decodeToken = (token: string): IToken => jwtDecode(token);

export default decodeToken;
