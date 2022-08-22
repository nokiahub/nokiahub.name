import React from 'react';

import { ThemeProvider } from './src/contexts/themeContext';
import StyledThemeProvider from './src/styles/StyledThemeProvider';
import GlobalStyle from './src/styles/GlobalStyle';

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      <StyledThemeProvider>
        <GlobalStyle />
        {element}
      </StyledThemeProvider>
    </ThemeProvider>
  );
};
