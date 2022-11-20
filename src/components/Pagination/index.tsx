import * as React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { spacing, typography } from '../../constants/styles';

const StyledList = styled.ul`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  margin-right: ${spacing.spacing4};
  font-size: ${typography.fontSize1};
  font-weight: ${({ fontWeight }) => fontWeight};
`;

type Props = {
  totalPages: number;
  currentPage: number;
};

const Pagination = ({ totalPages, currentPage }: Props) => {
  const items = Array.from(Array(totalPages).keys());

  return (
    <StyledList>
      {items.map((_, index) => (
        <StyledLink
          fontWeight={
            index + 1 === currentPage ? typography.fontWeightBold : typography.fontWeightNormal
          }
          key={index}
          to={index === 0 ? '/' : `/${index + 1}`}
        >
          {index + 1}
        </StyledLink>
      ))}
    </StyledList>
  );
};

export default Pagination;
