---
status: 'draft'
date: '2023-10-15'
title: 'vanilla-extract란?'
description: 'vanilla-extract에서 소개하는 type-safe한 css-in-js 알아보기'
tags: 'css, vanilla-extract'
---

아래의 두 코드는 동일한 스타일을 가진 버튼을 만드는 코드입니다.<br/>
하지만 두번째 코드가 스타일링을 할 때 더 직관적이고 가독성이 좋습니다.<br/>
`vanilla-extract`는 이런 코드를 작성할 수 있도록 도와주는 라이브러리입니다.<br />

```jsx
// 😭 as is
<button className={classNames('ml-2', 'p-2', markUnderline ? 'underline' : '', 'ml-2', 'p-2')}>
  i am button
</button>

// 😎 to be
<Button marginLeft={2} padding={2} underline={markUnderline}>
	i am button
</Button>
```

## vanilla-extract의 특징
- 제로 런타임
- type-safe하게 스타일링
- utility-first 방식의 스타일링

## type-safe
직접 css를 작성한다고 할 때 type-safe를 지원한다면 다음과 같은 실수를 줄일 수 있습니다.<br />
다음은 `vanilla-exteact` 공식 문서에서 가장 처음으로 발견한 예시입니다.<br />

```js
// styles.css.ts
import { createTheme, style } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  color: {
    brand: 'blue',
    white: '#fff'
  },
  space: {
    small: '4px',
    medium: '8px',
  }
});

// brandd를 참조할 때 빨간색 밑줄로 타입 에러가 발생함
export const hero = style({
  backgroundColor: vars.color.brandd,
  color: vars.color.white,
  padding: vars.space.large
});
```

theme에 대한 타입을 따로 지정 해주지 않아도 잘못된 property를 참조했을 때, ide를 통해 type error가 발생하는 것을 알 수 있습니다.<br />

## vanilla-extract APIs

### Sprinkles

### Recipes

### Dynamic

### CSS Utils


### 참고자료
[vanilla-extract](https://vanilla-extract.style/)<br />
[CSS in TypeScript with vanilla-extract](https://css-tricks.com/css-in-typescript-with-vanilla-extract/)