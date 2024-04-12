import React, { useContext } from 'react';

import { ThemeContext } from 'src/contexts/themeContext';
import ThemeIcon from 'src/assets/icons/ThemeIcon';

const ThemeSwitchToggle = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <span onClick={() => toggleTheme?.()}>
      <ThemeIcon />
    </span>
  );
};

export default ThemeSwitchToggle;
