import { createContext, useContext, useState, type ReactNode } from 'react';
import type { IUser } from '../interface/IUser';

interface IAuth {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuth | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = (userInfo: IUser) => setUser(userInfo);
  const logout = () => setUser(null);

  const value: IAuth = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): IAuth => {
  const context = useContext(AuthContext) as IAuth;
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
