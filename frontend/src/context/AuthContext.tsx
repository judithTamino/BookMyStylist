import { createContext, useContext, useState, type ReactNode } from 'react';
import type { IToken } from '../interface/Auth';

interface IAuth {
  token: IToken | null;
  login: (token: IToken) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuth | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<IToken | null>(null);

  const login = (token: IToken) => setToken(token);
  const logout = () => setToken(null);

  const value: IAuth = { token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): IAuth => {
  const context = useContext(AuthContext) as IAuth;
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
