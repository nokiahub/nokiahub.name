import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Seo from '../components/seo';

type DataProps = {
  site: {
    siteMetadata: {
      title: string;
    };
  };
};

const About: React.FC<PageProps<DataProps>> = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  const startDay = new Date('2021-07');
  const today = new Date();
  const diff = today.getTime() - startDay.getTime();
  const diffYear = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

  return (
    <>
      <Seo title={siteTitle} description={siteTitle} />
      <p>
        안녕하세요. {diffYear}년차 프론트엔드 개발자 정형주입니다.
        <br />
        알고리즘, 클린코드, 리팩토링에 관심이 있습니다.
        <br />
        유연하고 확장 가능한 프로그램 설계를 좋아합니다.
        <br />
      </p>

      <p>
        <br />더 자세한 내용은{' '}
        <a target="_blank" rel="noreferrer" href="https://hazel-case-679.notion.site/29-Frontend-Developer-80d76411929b4b9e9d1cc034177385b7?pvs=4">
          이력서
        </a>
        에서 확인하실 수 있습니다.
        <br />
        감사합니다!
      </p>
    </>
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
