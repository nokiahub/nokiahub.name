import React from 'react';

import { ThemeProvider } from 'styled-components';
import { ThemeContext } from '../contexts/themeContext';
import { theme as themeByMode } from '../constants/styles';

const StyledThemeProvider = ({ children }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme === 'dark' ? themeByMode.dark : themeByMode.light}>
      {children}
    </ThemeProvider>
  );
};

export default StyledThemeProvider;
