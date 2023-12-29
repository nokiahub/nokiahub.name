---
category: 'post'
date: '2022-08-24'
title: 'Gatsby 프로젝트에 다크모드 적용하기'
description: 'gatsby styled-components, context API'
tags: [ '개츠비, 개츠비 다크모드, gatsby, gatsby dark mode, styled-components, context API']
---

제 블로그에 다크모드를 적용해본 과정을 정리합니다.<br>
예전에 프로젝트를 진행하면서 styled-components로 웹사이트의 테마를 적용해본 경험이 있었지만, 개츠비 블로그(SSG)에 CSR 프로젝트에서 적용했던 것과 같은 방법으로 테마를 적용했을 때 마주쳤던 문제점들과 이를 해결하는 과정을 정리해보겠습니다.<br>

### 1. ThemeContext, ThemeProvider 생성

```javascript
// themeContext.js
import { createContext, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: null
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
```

테마 데이터는 웹사이트에 전역적으로 적용해야하는 데이터이기 때문에 context API를 사용하여 현재의 테마를 가리키는 theme 데이터와 테마를 switch 할 수 있는 toggleTheme에 대한 context를 생성했습니다.<br>

ThemeProvider를 통해 theme의 state와 toggleTheme을 해당 컴포넌트 하위 자식 컴포넌트가 useContext를 통해 theme에 대한 정보를 알 수 있게하고, theme의 값을 업데이트 할 수 있도록 했습니다.<br>

### 2. StyledThemeProvider 컴포넌트

styled-components의 ThemeProvider는 props를 통해 theme을 제공하는 컴포넌트입니다.<br>
CSR의 경우 이 컴포넌트를 앤트리 파일의 최상단 컴포넌트로 지정하면 전역적으로 styled 컴포넌트의 props로 props.theme에 접근하여 ThemeProvider의 theme 값을 사용할 수 있습니다.<br>
ThemeProvider를 랩핑하여 위에서 만들어둔 ThemeContext의 값에 따라 다른 theme을 props로 내려주는 StyledThemeProvider라는 컴포넌트를 만들었습니다.<br>

```javascript
// StyledThemeProvider.js

import { ThemeProvider } from 'styled-components';
import { ThemeContext } from '../contexts/themeContext';
import { theme as themeByMode } from '../constants/styles';

const StyledThemeProvider = ({ children }) => {
  const { theme } = React.useContext(ThemeContext);

  return (
    <ThemeProvider theme={theme === 'dark' ? themeByMode.dark : themeByMode.light}>
      {children}
    </ThemeProvider>
  );
};
```

### 3. 공통 Layout 컴포넌트에 ThemeProvider 적용

개츠비는 CSR처럼 index.js같은 앤트리 파일이 따로 없고 각각의 페이지가 최상단 파일이기 때문에 모든 페이지에 wrapper로 적용되어있는 Layout 컴포넌트에 위의 두 컴포넌트 ThemeProvider, StyledThemeProvider를 적용해봤습니다.

```javascript
// Layout.jsx
import ThemeProvider from '../contexts/themeContext';
import StyledThemeProvider from '../styles/StyledThemeProvider';
import GlobalStyle from '../styles/GlobalStyle';

const Layout = ({ children }) => {
  // ...
  return (
    <ThemeProvider>
      <StyledThemeProvider>
        <GlobalStyle />
        <Wrapper>{children}</Wrapper>
      </StyledThemeProvider>
    </ThemeProvider>
  );
};
```

#### 문제점

SSG는 페이지를 이동할 때마다 해당 페이지를 서버로 요청합니다. 그럴 경우 클라이언트에 context API와 Layout 컴포넌트 모두 초기화되기 때문에 사용자가 테마를 업데이트해도 페이지를 이동하면 theme이 초기화되는 문제가 발생합니다.<br>

그렇다면 개츠비에서는 페이지를 이동할 때마다 context가 초기화되니 상태관리를 할 수 없는 것일까요? 구글링한 결과 개츠비 공식 사이트에서 wrapRootElement라는 API를 사용하여 위의 문제를 해결할 수 있었습니다.<br>

### 4. Gatsby Server Rendering APIs

**wrapRootElement**

> Allow a plugin to wrap the root element.
> This is useful to set up any Provider components that will wrap your application. For setting persistent UI elements around pages use wrapPageElement.

wrapRootElement는 SSG에서 처리하기 어려웠던 root 엘리먼트를 랩핑할 때 사용됩니다.<br>
context API, Redux store에서 사용하는 Provider 컴포넌트를 내부에서 사용하면 전역 state관리가 가능합니다.<br>

> For setting persistent UI elements around pages use wrapPageElement.

wrapPageElement는 Layout과 같이 어플리케이션 내에서 UI를 일관적으로 나타낼 수 있습니다.<br>

```javascript
// gatsby-ssr.js, gatsby-browser.js
import { ThemeProvider } from './src/contexts/themeContext';
import Layout from './src/components/Layout';

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider>{element}</ThemeProvider>;
};

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
```

전역 **state와 관련된 Provider는 wrapRootElement**, **UI는 wrapPageElement**로 처리할 수 있습니다.<br>

서버에서 렌더링된 결과와 브라우저에서 hydration된 후를 일치할 수 있도록,<br>
gatsby-ssr.js, gatsby-browser.js 파일에 동일하게 wrapRootElement, wrapPageElement를 각각 동일한 코드로 적용했습니다.

Context Provider를 gatsby-ssr.js로 옮겼기 때문에 Layout에서 ThemeProvider를 삭제합니다.<br>

```javascript
// Layout.jsx
import StyledThemeProvider from '../styles/StyledThemeProvider';
import GlobalStyle from '../styles/GlobalStyle';

const Layout = ({ children }) => {
  // ...
  return (
    <StyledThemeProvider>
      <GlobalStyle />
      <Wrapper>{children}</Wrapper>
    </StyledThemeProvider>
  );
};
```

### To Do

**가시성 좋은 다크 모드 컬러 조사 후 적용하기**<br>
현재 다크모드 컬러는 라이트모드와 똑같은 primary 컬러를 사용하는데 배경색과 대비가 잘 되지 않아 더 잘 보이는 컬러로 업데이트 할 예정입니다.<br>

**사용자가 다시 블로그를 방문해도 theme 유지하기**<br>
사용자가 블로그를 껐다가 다시 방문하거나 새로고침하면 theme이 초기화가 됩니다. localStorage등에 theme 데이터를 저장해서 다시 방문하여도 이전 사용자가 설정했던 theme이 적용되도록 해야겠습니다.

### 참고자료

[gatsbyjs - Gatsby Server Rendering APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/)<br>
[styled components - Theming](https://styled-components.com/docs/advanced)<br>
[react - context](https://ko.reactjs.org/docs/context.html)<br>
