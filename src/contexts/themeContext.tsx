import React, { createContext, ReactNode, useState } from 'react';

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: null | (() => void);
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: null
});

type Props = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<ThemeContextType['theme']>('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
