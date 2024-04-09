import * as React from 'react';
import { Link, graphql, PageProps } from 'gatsby';
import styled from 'styled-components';

import Pagination from 'src/components/Pagination';
import Seo from 'src/components/seo';
import { spacing, typography } from 'src/constants/styles';

const PostListItem = styled.article`
  margin-bottom: ${spacing.spacing8};
  margin-top: ${spacing.spacing8};
`;

const PostHeader = styled.header`
  margin-bottom: ${spacing.spacing4};
`;

const PostTitle = styled.h1`
  font-size: ${typography.fontSize5};
  margin-bottom: ${spacing.spacing2};
  margin-top: ${spacing.spacing0};
  transition: ease-in-out 0.1s;
`;

const PostTitleLink = styled(Link)`
  color: ${(props) => props.theme.primary};
`;

type DataProps = {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allMarkdownRemark: {
    nodes: {
      fields: {
        slug: string;
      };
      frontmatter: {
        date: string;
        title: string;
        description: string;
      };
      excerpt: string;
    }[];
  };
};

type Props = PageProps<DataProps> & {
  pageContext: {
    numPages: number;
    currentPage: number;
  };
};

const BlogPostListTemplate = ({ data, pageContext }: Props) => {
  const posts = data.allMarkdownRemark.nodes;

  return (
    <>
      <Seo title="형주의 블로그" />
      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const title = post.frontmatter.title || post.fields.slug;

          return (
            <li key={post.fields.slug}>
              <PostListItem itemScope itemType="http://schema.org/Article">
                <PostHeader>
                  <PostTitle>
                    <PostTitleLink to={post.fields.slug} itemProp="url">
                      {title}
                    </PostTitleLink>
                  </PostTitle>
                  <small style={{ fontSize: typography.fontSize2 }}>{post.frontmatter.date}</small>
                </PostHeader>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt
                    }}
                    itemProp="description"
                  />
                </section>
              </PostListItem>
            </li>
          );
        })}
      </ol>
      <Pagination totalPages={pageContext.numPages} currentPage={pageContext.currentPage} />
    </>
  );
};

export default BlogPostListTemplate;

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { status: { ne: "draft" }, category: { eq: "post" } } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
        excerpt(pruneLength: 160)
      }
    }
  }
`;
