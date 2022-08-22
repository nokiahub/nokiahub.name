// custom typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

// Highlighting for code blocks
import 'prismjs/themes/prism-okaidia.css';

import React from 'react';
import { graphql } from 'gatsby';

import { ThemeProvider } from './src/contexts/themeContext';
import StyledThemeProvider from './src/styles/StyledThemeProvider';
import GlobalStyle from './src/styles/GlobalStyle';

import Layout from './src/components/Layout';

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

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

