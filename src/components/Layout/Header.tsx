import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import GithubIcon from 'src/assets/icons/GithubIcon';
import { spacing, typography } from 'src/constants/styles';
import ThemeSwitchToggle from 'src/components/Layout/ThemeSwitchToggle';
import { AboutIcon } from 'src/assets/icons/AboutIcon';

const StyledHeader = styled.nav`
  display: flex;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  padding: ${spacing.spacing3} ${spacing.spacing5} ${spacing.spacing2};
  border-bottom: 1px solid ${(props) => props.theme.accent};
  background: ${(props) => props.theme.background};
  z-index: 1;
`;

const RightSection = styled.div`
  display: flex;
  gap: ${spacing.spacing6};
`;

const StyledHeading = styled.h1`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: ${typography.fontSize2};
  margin: 0;
  transition: ease-in-out 0.1s;
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledHeading>
        <Link to="/">형주의 블로그</Link>
      </StyledHeading>
      <RightSection>
        <StyledHeading>
          <Link to="/projects">Projects</Link>
        </StyledHeading>
        <StyledHeading>
          <ThemeSwitchToggle />
        </StyledHeading>
        <StyledHeading>
          <Link target="_blank" to="https://github.com/nokiahub" aria-label="my github account">
            <GithubIcon />
          </Link>
        </StyledHeading>
        <StyledHeading>
          <Link to="/about" aria-label="about me">
            <AboutIcon />
          </Link>
        </StyledHeading>
      </RightSection>
    </StyledHeader>
  );
};

export default Header;
