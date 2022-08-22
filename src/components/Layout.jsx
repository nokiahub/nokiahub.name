import React from 'react';
import ThemeButton from './ThemeButton';
import { Link } from 'gatsby';
import { spacing, size, typography } from '../constants/styles';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: ${spacing.spacing0} auto;
  max-width: ${size.maxWidthWrapper};
  padding: ${spacing.spacing20} ${spacing.spacing5} ${spacing.spacing5};
`;

const StyledHeader = styled.nav`
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  padding: ${spacing.spacing5} ${spacing.spacing6};
  border-bottom: 1px solid ${(props) => props.theme.accent};
  background: ${(props) => props.theme.background};
  z-index: 1;
`;

const StyledHeading = styled.h1`
  font-size: ${typography.fontSize2};
  margin: 0;
  transition: ease-in-out 0.1s;

  $:hover {
    color: ${(props) => props.theme.text};
  }
`;

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header = (
    <StyledHeading>
      <Link to="/">형주의 블로그</Link>
    </StyledHeading>
  );
  let about = (
    <StyledHeading>
      <Link to="/about">about</Link>
    </StyledHeading>
  );

  return (
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
      <ThemeButton />
    </Wrapper>
  );
};

export default Layout;
