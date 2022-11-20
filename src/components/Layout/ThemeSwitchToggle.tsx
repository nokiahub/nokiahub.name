import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/themeContext';

import styled from 'styled-components';

const StyledBtn = styled.button`
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 54px;
  height: 54px;
  border: none;
  border-radius: 100px;
`;

const ThemeSwitchToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return <StyledBtn onClick={toggleTheme}>{theme === 'dark' ? 'light' : 'dark'}</StyledBtn>;
};

export default ThemeSwitchToggle;
