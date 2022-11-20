import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { spacing, typography } from '../../constants/styles';

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

const Header = () => {
  return (
    <StyledHeader>
      <StyledHeading>
        <Link to="/">형주의 블로그</Link>
      </StyledHeading>
      <StyledHeading>
        <Link to="/about">about</Link>
      </StyledHeading>
    </StyledHeader>
  );
};

export default Header;
