import React from 'react';
import styled from 'styled-components';
import type { PageProps } from 'gatsby';

import StyledThemeProvider from 'src/styles/StyledThemeProvider';
import GlobalStyle from 'src/styles/GlobalStyle';
import Header from './Header';
import Footer from './Footer';
import { spacing, size } from 'src/constants/styles';

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
      </Wrapper>
    </StyledThemeProvider>
  );
};

export default Layout;
