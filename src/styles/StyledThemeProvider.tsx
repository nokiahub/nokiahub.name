import React, { ReactNode } from 'react';

import { ThemeProvider } from 'styled-components';
import { ThemeContext } from 'src/contexts/themeContext';
import { theme as themeByMode } from '../constants/styles';

type Props = {
  children: ReactNode;
};

const StyledThemeProvider = ({ children }: Props) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme === 'dark' ? themeByMode.dark : themeByMode.light}>
      {children}
    </ThemeProvider>
  );
};

export default StyledThemeProvider;
