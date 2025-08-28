import { createContext, useContext, useState, type ReactNode } from 'react';

interface IAuth {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuth | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = (token: string) => setToken(token);
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
