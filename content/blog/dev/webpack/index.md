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

### Prevent Duplication

webpack.config의 entry 에서 엔트리 포인트간에 공통으로 사용되는 모듈을 설정합니다.<br>

```javascript
module.exports = {
  entry: {
    index: {
      import: './src/index.js',
      dependOn: 'shared'
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'shared'
    },
    shared: 'lodash'
  }
};
```

index.js와 another-module.js 파일에서 공통적으로 사용되는 lodash 모듈이 있습니다.<br>
entry point의 dependOn과 shared 프로퍼티를 통해 공통 모듈을 따로 번들링 할 수 있습니다.<br>

#### shared module 설정 전

```bash
asset index.bundle.js 555 KiB [emitted] (name: index)
asset another.bundle.js 555 KiB [emitted] (name: another)
asset index.html 292 bytes [emitted]
runtime modules 2.5 KiB 12 modules
cacheable modules 532 KiB
  ./src/index.js 520 bytes [built] [code generated]
  ./src/another-module.js 174 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
  ./src/obj.js 27 bytes [built] [code generated]
webpack 5.72.1 compiled successfully in 538 ms
```

#### shared module 설정 후

```shell
asset shared.bundle.js 557 KiB [compared for emit] (name: shared)
asset index.bundle.js 2.83 KiB [compared for emit] (name: index)
asset another.bundle.js 2.44 KiB [compared for emit] (name: another)
asset index.html 338 bytes [compared for emit]
runtime modules 3.65 KiB 8 modules
cacheable modules 532 KiB
  ./node_modules/lodash/lodash.js 531 KiB [built] [code generated]
  ./src/another-module.js 174 bytes [built] [code generated]
  ./src/index.js 520 bytes [built] [code generated]
  ./src/obj.js 27 bytes [built] [code generated]
webpack 5.72.1 compiled successfully in 580 ms
```

shared 모듈 설정 후 공통 모듈이 따로 번들링 된 것을 확인할 수 있었습니다.<br>

만약 **하나의 html 페이지에 여러 개의 entry 파일**을 사용한다면 webpack.config에서 opimization.runtimeChunk를 'single'로 설정해야 합니다.<br>
[Multiple Entry Points Per Page](https://bundlers.tooling.report/code-splitting/multi-entry/)<br>

```javascript
optimization: {
  runtimeChunk: 'single',
},
```

위와 같이 설정하면 공통 모듈이 여러번 초기화 되는 일을 방지할 수 있습니다. 공통 모듈의 예로 count: 0 속성을 갖는 객체 obj 모듈이 있다고 가정할 때, 이를 전역 state로 사용할 수 있습니다. index.js에서 obj의 count에 1을 더하고 another.js에서 obj의 count를 호출했을 때 count: 0이 아니라 1이 더해진 count: 1인 값을 확인 할 수 있습니다.<br>

### Dynamic Imports & Lazy Loading

import() 구문을 사용하여 필요할 때(ex. 버튼을 클릭 할 때, 로딩이 완료 되었을 때 등) 모듈을 import 해올 수 있습니다. 필요한 시점에 모듈을 로드해 올 수 있기 때문에 로딩 속도를 개선할 수 있습니다. 다음 코드는 dynamic imports를 사용하여 isCurrentDateShown이 true 인 경우에만 'moment'라는 모듈을 import해 올 수 있도록 하는 코드입니다.<br>

```javascript
async function getComponent() {
  const element = document.createElement('div');
  const isCurrentDateShown = false;

  if (isCurrentDateShown) {
    const { default: moment } = await import('moment');

    element.innerHTML = moment().format();
  }

  return element;
}

getComponent().then((component) => {
  document.body.appendChild(component);
});
```

다음 코드는 버튼을 클릭 했을 경우 동적으로 moment 모듈을 import해오는 코드입니다.<br>
페이지 초기 로드시에는 moment 모듈에 대한 chunk를 로드하지 않고, 버튼을 클릭했을 때만 개발자 도구의 네트워크 창에서 moment 모듈이 로드되는 것을 확인하였습니다.<br>

```javascript
async function getButtonComponent() {
  const button = document.createElement('button');

  button.innerText = 'click me';
  button.onclick = async () => {
    const { default: moment } = await import('moment');

    alert(moment().format());
  };

  return button;
}

getButtonComponent().then((component) => {
  document.body.appendChild(component);
});
```

[생활코딩-웹팩](https://opentutorials.org/module/4566)<br>
[webpack-concepts](https://webpack.js.org/concepts/)<br>
[webpack-code splitting](https://webpack.js.org/guides/code-splitting/)<br>
