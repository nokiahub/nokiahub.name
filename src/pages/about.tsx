import * as React from 'react';
import { graphql, PageProps } from 'gatsby';
import Seo from '../components/seo';

type DataProps = {
  site: {
    siteMetadata: {
      title: string;
    }
  };
};

const About: React.FC<PageProps<DataProps>> = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <>
      <Seo title={siteTitle} description={siteTitle} />
      <p>
        안녕하세요. 1년차 프론트엔드 개발자 정형주입니다.
        <br />
        알고리즘, 클린코드, 리펙토링에 관심이 있습니다.
        <br />
        유연하고 확장 가능한 프로그램 설계를 좋아합니다.
        <br />
      </p>
      <hr />
      <h2>프로젝트</h2>
      <h3>햄치🐹</h3>
      <article>
        햄스터 분양 및 입양 모바일 어플리케이션입니다.{' '}
        <a href="https://github.com/Project-Hamchi">깃헙 링크</a>
        <h4>진행 기간</h4>
        <p>2021. 5. 3 ~ 2021.5.21(총 3주)</p>
        <h4>기술 스택</h4>
        <ul>
          <li>
            <h5>React-Native</h5>
            <p>
              React로 모바일 앱을 만들 수 있기 때문에 React-Native 기반 모바일 앱을 만들었습니다.
              <br />
              카메라 촬영 업로딩 기능, 실시간 채팅 기능을 위해 웹 보다는 모바일 앱이 더 적합하다고
              생각하였습니다.
            </p>
          </li>
          <li>
            <h5>Redux-Toolkit</h5>
            <p>
              createReducer를 통해 실제로는 immutable하게 state를 업데이트하지만, 코드로는 직접
              mutate 하듯이 reducer를 작성하여 단순한 형태의 reducer를 만들 수 있기 때문에
              선택했습니다.
              <br />
              <br />
              기존 redux에서처럼 action creator, reducer, container를 각각 다른 파일로 저장하지
              않고, 하나의 slice 파일에서 state에 대한 모든 내용이 하나의 파일에 같이 존재하는 ducks
              패턴을 적용해서 state의 흐름을 편하게 추적할 수 있도록했습니다.
              <br />
            </p>
          </li>
          <li>
            <h5>Redux-Thunk</h5>
            <p>
              데이터 비동기 처리를 하기 위해 사용했습니다.
              <br />
              <br />
              서버와의 통신 상태를 관리하여 상태에 따른 UI를 나타내고, adapter를 사용하여 정규화된
              state를 사용하기 위해 적용했습니다.
              <br />
            </p>
          </li>
          <li>
            <h5>Socket.io</h5>
            <p>
              사용자 사이에 실시간으로 메시지를 주고받을 수 있도록 하는 채팅 기능을 위해
              적용했습니다.
              <br />
            </p>
          </li>
        </ul>
      </article>
      <hr />
      <h3>플렉실리스🏃‍♀️</h3>
      <article>
        스트레칭 알람 데스크탑 어플리케이션입니다.
        <a href="https://github.com/Team-HHH">깃헙 링크</a>
        <br />
        <br />
        총 3명이 팀을 이루어 진행했고 저는 다음과 같은 기능을 구현했습니다.
        <br />
        <ul>
          <li>입력값 검증</li>
          <li>배너 업로드 및 s3 연결</li>
          <li>일렉트론 IPC 통신</li>
          <li>CSS 스타일링</li>
        </ul>
        <h4>진행 기간</h4>
        <p>2021. 4. 12 ~ 2021.4.30(총 3주)</p>
        <h4>기술 스택</h4>
        <ul>
          <li>
            <h5>Electron</h5>
            <p>
              Javascript로 개발할 수 있는 Node.js 기반의 데스크탑 어플리케이션 프레임워크입니다.
              <br />
              <br />
              사용자가 어플리케이션 창을 닫고 있어도 main 프로세스로 정해진 시간에 스트레칭 비디오
              팝업을 띄우도록 하기 위해 사용했습니다.
              <br />
            </p>
          </li>
          <li>
            <h5>react-hook-form</h5>
            <p>
              회원가입, 광고등록에 필요한 다양한 폼 데이터를 스키마에 따라 검증하기 위해
              사용했습니다.
              <br />
            </p>
          </li>
          <li>
            <h5>multer, multer-s3</h5>
            <p>
              광고주들이 광고 등록 시 함께 저장하는 이미지 파일을 별도의 이미지 서버인 s3에
              저장했습니다.
              <br />
              <br />
              node.js 서버에서 클라이언트로부터 받은 이미지 파일을 s3에 업로드 하고 이미지의 s3
              url을 응답 받아 처리할 수 있도록하기 위해 사용하였습니다.
              <br />
            </p>
          </li>
        </ul>
      </article>
      <hr />
      <p>
        <br />더 자세한 내용은{' '}
        <a href="https://drive.google.com/file/d/1yUyq9deQg2UvQRnD8rNlRCRxmSi6_NsG/view?usp=sharing">
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
