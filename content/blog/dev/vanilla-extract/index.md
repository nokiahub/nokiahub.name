---
date: '2023-10-15'
title: 'vanilla-extract란?'
description: 'vanilla-extract란?'
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

## vanilla-extract로 type-safe하게 스타일링하기
```js
import { recipe } from '@vanilla-extract/recipes';

export const buttonStyles = recipe({
  base: {
    // default button style },
  },
  compoundVariants: {
    underline: [
        'underline',
        'ml-2',
        'p-2'
  ]}
});
```

### 참고자료
[CSS in TypeScript with vanilla-extract](https://css-tricks.com/css-in-typescript-with-vanilla-extract/)