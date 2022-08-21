import { createGlobalStyle } from 'styled-components';
import { spacing, theme, typography } from '../constants/styles';

const GlobalStyle = createGlobalStyle`
  *,
  :after,
  :before {
    box-sizing: border-box;
  }

  html {
    line-height: ${typography.lineHeightNormal});
    font-size: ${typography.fontSizeRoot};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: 'Nanum Gothic', san-serif;
    font-size: ${typography.fontSize1};
    color: ${theme.text};
  }

  footer {
    padding: ${spacing.spacing6} ${spacing.spacing0};
  }

  hr {
    background: ${theme.accent};
    height: 1px;
    border: 0;
  }

  /* Heading */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: ${spacing.spacing1});
    margin-bottom: ${spacing.spacing6};
    line-height: ${typography.lineHeightTight});
    letter-spacing: -0.025em;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: ${typography.fontWeightBold};
    color: ${theme.heading};
  }

  h1 {
    font-weight: ${typography.fontWeightBlack};
    font-size: ${typography.fontSize6};
    color: ${theme.headingBlack};
  }

  h2 {
    font-size: ${typography.fontSize5};
  }

  h3 {
    font-size: ${typography.fontSize4};
  }

  h4 {
    font-size: ${typography.fontSize3};
  }

  h5 {
    font-size: ${typography.fontSize2};
  }

  h6 {
    font-size: ${typography.fontSize1};
  }

  h1 > a {
    color: inherit;
    text-decoration: none;
  }

  h2 > a,
  h3 > a,
  h4 > a,
  h5 > a,
  h6 > a {
    text-decoration: none;
    color: inherit;
  }

  /* Prose */

  p {
    line-height: ${typography.lineHeightRelaxed};
    --baseline-multiplier: 0.179;
    --x-height-multiplier: 0.35;
    margin: ${spacing.spacing0} ${spacing.spacing0} ${spacing.spacing8} ${spacing.spacing0};
    padding: ${spacing.spacing0};
    word-break: keep-all;
  }

  ul,
  ol {
    margin-left: ${spacing.spacing0};
    margin-right: ${spacing.spacing0};
    padding: ${spacing.spacing0};
    margin-bottom: ${spacing.spacing8};
    list-style-position: outside;
    list-style-image: none;
  }

  ul li,
  ol li {
    padding-left: ${spacing.spacing0};
    margin-bottom: calc(${spacing.spacing8} / 2);
  }

  li > p {
    margin-bottom: calc(${spacing.spacing8} / 2);
  }

  li *:last-child {
    margin-bottom: ${spacing.spacing0};
  }

  li > ul {
    margin-left: ${spacing.spacing8};
    margin-top: calc(${spacing.spacing8} / 2);
  }

  blockquote {
    color: ${theme.textLight};
    margin-left: calc(-1 * ${spacing.spacing6});
    margin-right: ${spacing.spacing8};
    padding: ${spacing.spacing0} ${spacing.spacing0} ${spacing.spacing0} ${spacing.spacing6};
    border-left: ${spacing.spacing1} solid ${theme.primary};
    font-size: ${typography.fontSize2};
    font-style: italic;
    margin-bottom: ${spacing.spacing8};
  }

  blockquote > :last-child {
    margin-bottom: ${spacing.spacing0};
  }

  blockquote > ul,
  blockquote > ol {
    list-style-position: inside;
  }

  table {
    width: 100%;
    margin-bottom: ${spacing.spacing8};
    border-collapse: collapse;
    border-spacing: 0.25rem;
  }

  table thead tr th {
    border-bottom: 1px solid ${theme.accent};
  }

  /* Link */

  a {
    color: ${theme.primary};
  }

  a:hover,
  a:focus {
    text-decoration: none;
  }

  @media (max-width: 42rem) {
    blockquote {
      padding: ${spacing.spacing0} ${spacing.spacing0} ${spacing.spacing0} ${spacing.spacing4};
      margin-left: ${spacing.spacing0};
    }
    ul,
    ol {
      list-style-position: inside;
    }
  }
`;

export default GlobalStyle
