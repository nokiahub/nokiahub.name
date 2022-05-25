---
date: '2022-05-29'
title: 'Webpack'
description: '웹팩에 대한 정리글'
tags: 'webpack'
---
브라우저에서는 script 태그에 js 파일을 로드하여 자바스크립트를 실행합니다.<br>
필요한 js파일이 많아질수록 많은 js 파일을 로드해야 하고, 이는 부하를 발생시킵니다.<br>
그렇다고 실행시킬 모든 자바스크립트 코드를 단 하나의 js 파일에서 관리한다면 코드의 가독성, 스코프, 유지보수성 등 여러 문제가 발생할 수 있습니다.<br>

## 웹팩의 도입 이유
- 웹 어플리케이션에 필요한 많은 js 파일을 합쳐줍니다.
- 개발 후 배포할 때 리소스들을 유리한 형태로 가공하는 것이 웹팩을 사용하는 흐름입니다.

## 웹팩의 4가지 주요 속성
### Entry
엔트리 포인트를 설정할 수 있습니다.<br>
엔트리 포인트로 지정되면 웹팩은 지정한 js 파일이 사용하는 라이브러리, 모듈을 파악합니다.<br>
지정된 파일이 emitted 됩니다.<br>

### Output
번들링된 파일 결과물의 파일 경로를 의미합니다.<br>
entry 속성과는 다르게 객체 형태로 옵션을 추가해야 합니다.<br>
지정된 경로로 built 됩니다.<br>

### Loader
웹팩은 자바스크립트와 JSON 파일만 번들링할 수 있습니다.<br>
loader를 사용하여 다른 자원(html, css, images, 폰트 등)을 웹팩이 다룰 수 있는 모듈로 변환시켜줍니다.<br>

### Plugin
로더는 번들링 프로세스에서 아웃풋을 만드는 반면, 플러그인은 번들링된 결과물을 변형합니다.<br>

## Code Splitting
코드를 여러 개의 번들로 쪼개고, 필요할 때 로드할 수 있도록 합니다.<br>
code splitting에는 보통 3가지 방법이 있습니다.<br>
### Entry Points

### Prevent Duplication
### Dynamic Imports

## Lazy Loading

## Dev Server
[생활코딩-웹팩](https://opentutorials.org/module/4566)<br>
[webpack-concepts](https://webpack.js.org/concepts/)<br>
[webpack-code splitting](https://webpack.js.org/guides/code-splitting/)<br>
