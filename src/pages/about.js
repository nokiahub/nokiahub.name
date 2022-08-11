import * as React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import Seo from '../components/seo';

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={siteTitle} description={siteTitle} />
      <p>
        안녕하세요. 1년차 프론트엔드 개발자 정형주입니다.
        <br />
        알고리즘, 클린코드, 리펙토링에 관심이 있습니다.
        <br />
        유연하고 확장 가능한 프로그램 설계를 좋아합니다.
        <br />
        자세한 내용은{' '}
        <a href="https://drive.google.com/file/d/1yUyq9deQg2UvQRnD8rNlRCRxmSi6_NsG/view?usp=sharing">
          이력서
        </a>
        에서 확인하실 수 있습니다.
      </p>
    </Layout>
  );
};

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default About;
