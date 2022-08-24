// custom typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

// Highlighting for code blocks
import 'prismjs/themes/prism-okaidia.css';

import React from 'react';

import { ThemeProvider } from './src/contexts/themeContext';
import Layout from './src/components/Layout';

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>;
};

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
