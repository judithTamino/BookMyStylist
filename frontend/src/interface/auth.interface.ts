import type { JwtPayload } from "jwt-decode";

export interface IToken extends JwtPayload {
  _id: string;
  isAdmin: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoggedUserProps {
  toggleProfile: () => void;
  openProfile: boolean;
}
