import React from 'react';
import styled from 'styled-components';
import type { PageProps } from 'gatsby';

import StyledThemeProvider from '../../styles/StyledThemeProvider';
import GlobalStyle from '../../styles/GlobalStyle';
import Header from './Header';
import Footer from './Footer';
import ThemeSwitchToggle from './ThemeSwitchToggle';
import { spacing, size } from '../../constants/styles';

const Wrapper = styled.div`
  margin: ${spacing.spacing0} auto;
  max-width: ${size.maxWidthWrapper};
  padding: ${spacing.spacing20} ${spacing.spacing5} ${spacing.spacing5};
`;

const Layout = ({ location, children }: PageProps) => {
  const isRootPath = location.pathname === '/';

  return (
    <StyledThemeProvider>
      <GlobalStyle />
      <Wrapper data-is-root-path={isRootPath}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ThemeSwitchToggle />
      </Wrapper>
    </StyledThemeProvider>
  );
};

export default Layout;
