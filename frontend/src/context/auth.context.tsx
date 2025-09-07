import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

interface IAuth {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuth | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = sessionStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  const login = (userToken: string) => {
    sessionStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
  };

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
