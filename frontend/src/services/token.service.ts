import { jwtDecode, type JwtPayload } from 'jwt-decode';

const decodeToken = (token: any): JwtPayload => jwtDecode(token as string);

export default decodeToken;
