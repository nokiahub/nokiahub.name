import React from 'react';
import styled from 'styled-components';

import StyledThemeProvider from 'src/styles/StyledThemeProvider';
import GlobalStyle from 'src/styles/GlobalStyle';
import Header from './Header';
import Footer from './Footer';
import { spacing, size } from 'src/constants/styles';
import { ArrowIcon } from 'src/assets/icons/ArrowIcon';

const Wrapper = styled.div`
  margin: ${spacing.spacing0} auto;
  max-width: ${size.maxWidthWrapper};
  padding: ${spacing.spacing20} ${spacing.spacing5} ${spacing.spacing5};
`;

const ScrollToTop = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 32px;
  right: 32px;
  cursor: pointer;
  z-index: 1000;
  border-radius: 100%;
  width: 36px;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.background};
  font-size: 1.2rem;
`;

type PageProps = {
  location: {
    pathname: string;
  };
  children: React.ReactElement;
};

const Layout = ({ location, children }: PageProps) => {
  const isRootPath = location.pathname === '/';
  const handleClickScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StyledThemeProvider>
      <GlobalStyle />
      <Wrapper data-is-root-path={isRootPath}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollToTop onClick={handleClickScrollToTop} aria-label="scroll to top">
          <ArrowIcon />
        </ScrollToTop>
      </Wrapper>
    </StyledThemeProvider>
  );
};

export default Layout;
