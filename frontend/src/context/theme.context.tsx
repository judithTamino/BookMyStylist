import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

export interface ITheme {
  theme: boolean;
  changeTheme: () => void;
}

export const ThemeContext = createContext<ITheme | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<boolean>(false);

  const changeTheme = useCallback(() => {
    setTheme((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  }, [theme])

  return <ThemeContext.Provider value={{theme, changeTheme}}>{children}</ThemeContext.Provider>
};

export const useTheme = () => useContext(ThemeContext) as ITheme;
