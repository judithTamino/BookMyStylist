import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { hoursToMilliseconds } from 'date-fns';

interface IAuth {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<IAuth | undefined>(undefined);

const inactivityLimit = hoursToMilliseconds(24);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load token and check expiration
  useEffect(() => {
    const savedToken = sessionStorage.getItem('token');
    const lastActivity = localStorage.getItem('lastActivity');

    if (savedToken && lastActivity) {
      const now = Date.now();
      const timeSinceLastActivity = now - parseInt(lastActivity, 10);

      if (timeSinceLastActivity < inactivityLimit) setToken(savedToken);
      else {
        sessionStorage.removeItem('token');
        localStorage.removeItem('lastActivity');
      }
    }

    setLoading(false);
  }, []);

    // Update activity timestamp on user actions
  useEffect(() => {
    const updateActivity = () => {
      localStorage.setItem('lastActivity', Date.now().toString());
    };

    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('click', updateActivity);

    return () => {
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('click', updateActivity);
    };
  }, []);

  // Periodically check inactivity
  useEffect(() => {
    const interval = setInterval(() => {
      const lastActivity = localStorage.getItem('lastActivity');
      if (token && lastActivity) {
        const now = Date.now();
        const timeSinceLastActivity = now - parseInt(lastActivity, 10);

        if (timeSinceLastActivity >= INACTIVITY_LIMIT) {
          logout();
        }
      }
    }, 60 * 1000); // check every minute

    return () => clearInterval(interval);
  }, [token]);

  const login = (userToken: string) => {
    sessionStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    setToken(null);
  };

  const value: IAuth = { token, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): IAuth => {
  const context = useContext(AuthContext) as IAuth;
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
