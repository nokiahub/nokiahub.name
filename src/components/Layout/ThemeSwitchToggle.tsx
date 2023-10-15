import React, { useContext } from 'react';
import { Contrast } from '@carbon/icons-react';

import { ThemeContext } from 'src/contexts/themeContext';

const ThemeSwitchToggle = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <span onClick={toggleTheme}>
      <Contrast size={24} className="my-custom-class" />
    </span>
  );
};

export default ThemeSwitchToggle;
