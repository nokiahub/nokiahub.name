import * as React from 'react';
import {graphql} from "gatsby";


const ProjectTemplate = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
}

export default ProjectTemplate;

export const pageQuery = graphql`
  query ProjectByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`;
