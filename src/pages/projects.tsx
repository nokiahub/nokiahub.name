import * as React from 'react';
import { Link, graphql } from 'gatsby';
import type { PageProps } from 'gatsby';

import styled from 'styled-components';

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
    nodes: Node[];
  };
};

type Node = {
  frontmatter: {
    title: string;
    description: string;
  };
  fields: {
    slug: string;
  };
};

const ProjectsTemplate = ({ data }: PageProps<DataProps>) => {
  const projects = data.allMarkdownRemark.nodes;

  return (
    <>
      <Seo title="형주의 블로그" />
      <ol style={{ listStyle: `none` }}>
        {projects.map((item) => {
          const title = item.frontmatter.title || item.fields.slug;

          return (
            <li key={item.fields.slug}>
              <PostListItem itemScope itemType="http://schema.org/Article">
                <PostHeader>
                  <PostTitle>
                    <PostTitleLink to={item.fields.slug} itemProp="url">
                      {title}
                    </PostTitleLink>
                  </PostTitle>
                </PostHeader>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: item.frontmatter.description
                    }}
                    itemProp="description"
                  />
                </section>
              </PostListItem>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export default ProjectsTemplate;

export const pageQuery = graphql`
  query projectListQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { status: { ne: "draft" }, category: { eq: "project" } } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          description
        }
      }
    }
  }
`;
