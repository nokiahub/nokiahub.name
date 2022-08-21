import * as React from 'react';
import { Link } from 'gatsby';
import GlobalStyle from '../styles/GlobalStyle';
import styled from 'styled-components';
import { spacing, size, theme, typography } from '../constants/styles';

const Wrapper = styled.div`
  margin: ${spacing.spacing0} auto;
  max-width: ${size.maxWidthWrapper};
  padding: ${spacing.spacing20} ${spacing.spacing5} ${spacing.spacing5};
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  backdrop-filter: blur(1px);
  background: rgba(255, 255, 255, 0.9);
  padding: ${spacing.spacing5} ${spacing.spacing6};
  border-bottom: 1px solid ${theme.accent};
  z-index: 1;
`;

const StyledHeading = styled.h1`
  font-size: ${typography.fontSize2};
  margin: 0;
  transition: ease-in-out 0.1s;

  $:hover {
    color: ${theme.text};
  }
`;

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header = (
    <StyledHeading>
      <Link to="/">{title}</Link>
    </StyledHeading>
  );
  let about = (
    <StyledHeading>
      <Link to="/about">about</Link>
    </StyledHeading>
  );

  return (
  <>
    <GlobalStyle />
    <Wrapper data-is-root-path={isRootPath}>
      <StyledHeader>
        {header}
        {about}
      </StyledHeader>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </Wrapper>
  </>
  );
};

export default Layout;
