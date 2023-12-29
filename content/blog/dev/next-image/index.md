---
category: 'post'
date: '2022-08-19'
title: 'Next.js의 빌트인 Image 컴포넌트'
description: 'next.js의 Image 컴포넌트 사용법과 사이즈를 설정하는 방법'
tags: [ 'next, next.js, next/image, Image, image optimization, 이미지 최적화']
---

[해당 글은 next.js v12.0.0 기준으로 작성되었습니다.]

next에서 제공하는 Image 컴포넌트는 HTML의 `<img>` 엘리먼트를 기반으로 성능을 최적화 시킨 빌트인 컴포넌트입니다.<br>

Image 컴포넌트에 src, width, height를 설정하는 방법은 `<img>` 태그에 src, width, height attribute를 설정하는 방법과 설정하는 방법은 유사합니다.<br>

하지만 `<img>`와 다른 점은 Image에 layout prop을 따로 지정하지 않고 default layout값을 사용할 때 width와 height에 'auto' 값을 지정할 수 없고, 렌더링 되었을 때의 크기를 px 값인 숫자로 나타내야 한다는 점 입니다.

`<img>`는 width 또는 height 하나의 값만 설정해도 나머지의 값이 default로 'auto'값을 갖기 때문에 이미지의 비율을 유지하지만, next의 Image 컴포넌트에 다음과 같이 설정하면 에러가 발생합니다.

### native <img> 태그 사용할 때

```javascript
<img src="https://picsum.photos/200" width="300" height="auto">
// OK
```

### 빌트인 Image 컴포넌트 사용할 때

```javascript
<Image width={300} height="auto" src="https://picsum.photos/200" />
```

> Unhandled Runtime Error<br>
> Error: Image with src "ht<span></span>tps://picsum.photos/200" has invalid "width" or "height" property. These should be numeric values.

### 해결 방법

#### Use layout='fill'

<strong>layout='fill'</strong>을 사용하여 이미지의 사이즈를 부모 엘리먼트의 사이즈에 따라서 조절할 수 있습니다.<br>
그리고 Image의 props인 **objectFit**과 **objectPosition**을 지정하여 이미지의 비율을 유지하면서 이미지를 포함하는 컨테이너 내부에서 컨테이너를 기준으로 이미지의 사이즈와 위치를 설정할 수 있습니다.

#### object-fit

object-fit은 `<img>`, `<video>` 의 사이즈가 컨테이너 내부에서 어떻게 조절되는지를 나타냅니다.<br>
<strong>object-fit이 'contain'</strong>이면 내부 콘텐츠의 비율을 유지하면서 컨테이너에 fit 되도록 내부 콘텐츠의 사이즈가 조정됩니다. 컨테이너 배율과 콘텐츠 비율이 서로 다를 경우 [letterbox](<https://en.wikipedia.org/wiki/Letterboxing_(filming)>) 처리가 됩니다.<br>

#### object-position

object-position은 컨테이너 내부에서 `<img>`, `<video>` 의 위치를 나타냅니다.<br>
<strong>object-position이 'center'</strong>면 내부 컨텐츠가 컨테이너를 기준으로 중심에 위치하게 됩니다.<br>

### 소스 코드

```jsx
import Image from 'next/image';

const wrapperStyle = {
  position: relative,
  height: '200px',
  minWidth: '200px',
  marginRight: '10px'
};

<div styles={wrapperStyle}>
  <Image
    priority={true}
    layout="fill"
    objectFit="contain"
    objectPosition="center"
    src={image_url}
    alt={alt_name}
  />
</div>;
```

[next.js v13.0.0]

### next/image 컴포넌트의 fill 속성 사용

<Image />의 fill 속성을 사용하여 width와 height를 이미지 태그에 적용하지 않고 부모 엘리먼트에 맞출 수 있습니다.<br />
이미지의 비율 유지를 위해 style로 <code>objectFit: 'contain'</code> 이라는 값을 추가합니다.<br />

**주의! fill 속성을 사용하기 위해서는 부모 엘리먼트의 position이 'relative', 'fixed' 또는 'absolute'중 하나여야 합니다.**<br />

### 소스코드

```jsx
import Image from 'next/image';

const wrapperStyle = {
  position: relative,
  height: '200px',
  minWidth: '200px',
  marginRight: '10px'
};

<div styles={wrapperStyle}>
  <Image priority={true} fill src={image_url} alt={alt_name} styles={{ objectFit: 'contain' }} />
</div>;
```

### 참고자료

[next.js - api reference](https://nextjs.org/docs/api-reference/next/image)<br>
[next.js - basic features](https://nextjs.org/docs/basic-features/image-optimization)<br>
[next/image - github](https://github.com/vercel/next.js/blob/canary/docs/api-reference/next/image.md)<br>
[mdn - object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)<br>
[mdn - object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position)<br>
