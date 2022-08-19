---
date: '2022-08-19'
title: 'Next.js의 빌트인 Image 컴포넌트'
description: 'next.js의 Image 컴포넌트 사용법과 사이즈를 설정하는 방법'
tags: 'next, next.js, next/image, Image, image optimization, 이미지 최적화'
---

next에서 제공하는 Image 컴포넌트는 HTML의 `<img>` 엘리먼트를 기반으로 성능을 최적화 시킨 빌트인 컴포넌트입니다.<br>

`<img>` 태그에 src, width, height와 같은 attribute를 설정하는 방법은 유사합니다.<br>
하지만 `<img>`는 width 또는 height중 하나의 값만 설정해주어도 다른 하나의 값이 default로 'auto'값을 갖기 때문에 이미지의 비율을 유지하지만, next의 Image 컴포넌트에 다음과 같이 설정하면 에러가 발생합니다.

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

#### Use `layout='fill'`

`layout='fill'`을 사용하여 이미지의 사이즈를 부모 엘리먼트의 사이즈에 따라서 조절할 수 있습니다.<br>
그리고 Image의 props인 **objectFit**과 **objectPosition**을 지정하여 이미지의 비율을 유지하면서 이미지를 포함하는 컨테이너 내부에서 컨테이너를 기준으로 이미지의 사이즈와 위치를 설정할 수 있습니다.

#### object-fit

object-fit은 `<img>`, `<video>` 의 사이즈가 컨테이너 내부에서 어떻게 조절되는지를 나타냅니다.

`object-fit: contain`: 내부 콘텐츠의 비율을 유지하면서 컨테이너에 fit 되도록 내부 콘텐츠의 사이즈가 조정됩니다. 컨테이너 배율과 콘텐츠 비율이 서로 다를 경우 [letterbox](<https://en.wikipedia.org/wiki/Letterboxing_(filming)>) 처리가 됩니다.<br>

#### object-position

object-position은 컨테이너 내부에서 `<img>`, `<video>` 의 위치를 나타냅니다.

`object-position: center`: 내부 컨텐츠가 컨테이너를 기준으로 중심에 위치하게 됩니다.<br>

### 소스 코드

```javascript
const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
  min-width: 200px;
  margin-right: 10px;
`

<ImageWrapper>
  <Image
    priority={true}
    layout="fill"
    objectFit="contain"
    objectPosition="center"
    src={image_url}
    alt={alt_name}
  />
</ImageWrapper>
```

[next.js - api reference](https://nextjs.org/docs/api-reference/next/image)<br>
[next.js - basic features](https://nextjs.org/docs/basic-features/image-optimization)<br>
[mdn - object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)<br>
[mdn - object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position)<br>
