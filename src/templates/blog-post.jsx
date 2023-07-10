import * as React from 'react';
import { Link, graphql } from 'gatsby';

import Seo from '../components/seo';
import styled from 'styled-components';
import { spacing } from '../constants/styles';

const StyledArticle = styled.article`
  margin: ${spacing.spacing4} ${spacing.spacing0} ${spacing.spacing4} ${spacing.spacing0};
`;

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark;
  const { previous, next } = data;

  return (
    <>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <StyledArticle itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} itemProp="articleBody" />
        <script src="https://utteranc.es/client.js"
          repo="nokiahub/gatsby-blog"
          issue-term="pathname"
          theme="github-light"
          crossOrigin="anonymous"
          async>
        </script>
        <hr />
      </StyledArticle>
      <footer>
        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
