---
category: 'post'
date: '2022-08-09'
title: '인증과 인가, OAuth'
description: '웹에서 사용자 인증하기, 다른 서비스를 통해 인증받기'
tags: 'OAuth, OAuth2 token, authentication, web'
---

웹사이트에서 사용되는 http는 상태를 저장하지 않는 stateless입니다. 상태를 기억하지 않는다는 것은 사용자가 로그인을 한 상태인지, 쇼핑몰에서 사용자가 어떤 물건을 장바구니에 담았는지에 대한 정보를 기억하지 못하는 것을 뜻합니다.<br>
그렇기 때문에 사용자가 페이지와 일관적인 상호작용을 하길 원할 때 stateless한 특징이 문제가 됩니다. 그렇다면 이러한 문제를 어떻게 해결을 하는 것일까요?<br>
이 글은 유튜브의 [10분 테크톡의 인증과 인가](https://www.youtube.com/watch?v=y0xMXlOAfss), [생활 코딩님의 OAuth 강의](https://www.youtube.com/watch?v=hm2r6LtUbk8&list=PLuHgQVnccGMA4guyznDlykFJh28_R08Q-) 내용을 보고 정리한 글 입니다.<br>

## 인증하기

### Request Header 활용

사용자 인증(로그인) 후에 응답 받을 수 있는 보호되는 데이터를 요청할 때 브라우저에서 request header 값을 통해 사용자의 식별 정보인 아이디와 비밀번호를 함께 담아 요청하는 방법이 있습니다.<br>
하지만 이런 방식에는 매번 요청을 보낼 때 마다 인증 요청을 해야한다는 단점이 존재합니다.<br>

## 인증 유지하기

### Browser Storage 활용

browser storage에 사용자 인증 정보를 저장하고 요청 시에 browser storage에서 인증 정보를 가져와 요청을 보낼 수 있습니다.<br>
이를 통해 매번 사용자가 인증 정보와 함께 요청을 하는 문제점은 해결되었지만 계정 비밀번호와 같이 중요한 데이터를 인증 시 함께 보내는 것은 보안 관점에서 매우 취약할 수 있습니다.<br>

## 안전하게 인증하기

### Session 활용

사용자가 로그인 후에 session id를 생성하여 쿠키에 저장하는 방법입니다. 발급된 session id는 **서버측에서 저장하고 관리**합니다. session id에는 유효기간이 존재하고, 서버 측에서 해당 session id를 삭제한다면 더이상 인증이 필요한 데이터에 대한 요청을 할 수 없게 됩니다.<br>
하지만 서버가 여러 대 존재하여 로드 밸런서를 사용할 경우에 문제가 발생합니다. A 서버와 B 서버가 있고 사용자가 session id를 A 서버에서 발급 받았을 때, 서버 B는 이 session id를 갖지 않기 때문에 다음 요청이 로드 밸런서로 인해 서버 B로 요청되었을 때 사용자는 분명히 발급받은 session id가 있음에도 불구하고 적절한 요청을 받을 수 없습니다.<br>
서버에서 관리하는 모든 session들을 하나의 storage에서 관리하는 저장소를 별도로 둘 수 있습니다. 하지만 클라이언트가 많아질 경우 이 하나의 저장소에 장애가 생길 경우 모든 사용자들이 서비스를 사용할 수 없는 상황이 오게됩니다.<br>

## 효율적으로 인증하기

### JWT(JSON Web Token) 활용

JWT를 사용하여 응답과 요청에 **암호화된 사용자 인증 정보**를 담을 수 있습니다.<br>
사용자가 로그인을 하여 토큰을 발급 받고, **클라이언트에 토큰을 저장**하여 요청을 할 때 함께 전송이 됩니다. 서버가 요청을 받으면 토큰의 유효성을 검사합니다. 토큰을 통해 사용자의 정보를 가져와 권한을 체크 후 응답합니다. 서버가 여러 대 존재하더라도 각각 토큰을 해독하고 인증할 수 있습니다.<br>
단점은 액세스 토큰이 탈취당하면 사용자가 아닌 다른 사람이 데이터에 접근할 수 있기 때문에 만료 기간을 정해놓습니다. 이를 보완하기 위해 refresh 토큰을 사용합니다.<br>

### JWT 구조

#### Header

- 토큰의 타입(JWT)
- 사용된 알고리즘(HMAC, SHA256, RSA SHA256)
  위의 두 요소로 구성되고 base64Url로 인코딩되어있습니다.

#### Payload

payload에는 claim을 포함합니다.

- iss(issuer): 토큰 발급자
- exp(expiration time): 토큰 만료시간
- sub(subject): 토큰 제목
- aud(audience): 토큰 대상자
  보통 위의 요소들로 구성되고 header와 마찬가지로 base64Url로 인코딩됩니다.

#### Signature

signature는 JWT의 issuer를 인증하고 메시지가 바뀌지 않았는지 검증할 때 사용합니다.

## OAuth

제 3의 서비스(google, facebook, twitter)에서 데이터를 받아와 사용할 경우 사용자에게 아이디와 비밀번호를 받아와 사용자의 계정에 공유와 같은 기능을 사용할 수 있습니다.<br>
제 3의 서비스가 액세스 토큰을 발급하여 특정 요청에 대한 접근 권한을 부여합니다.<br>

### Role

- Resource Owner: 우리 서비스의 유저
- Client: 우리의 서버
- Resource Server: google, facebook, twitter와 같은 제 3의 서비스

### Register

client가 resource server의 승인을 받는 과정입니다.<br>

- client id(애플리케이션 식별 id)
- client secret(id에 대한 비밀번호)
- authorized redirect url
  승인 신청을 하면 위와 같은 정보를 받습니다.<br>

### Authorize

1. resource owner가 resource server에게 아이디와 비밀번호를 제공합니다.
2. resource server가 resource owner에게 authorization code를 응답 주소(ex. https://client/callback?code=3)에 포함하여 응답합니다.
3. 응답 주소로 client에게 요청이 가게됩니다.
4. client가 authorization code를 알게 됩니다.
5. client가 authorization code와 register 단계에서 발급받은 정보를 함께 resource server에 전송합니다.
6. resource server가 register에서 발급한 정보, authorization code가 모두 일치하는지 확인합니다.
7. resource server가 client에게 액세스 토큰을 발급합니다.

### API

resource가 발급한 액세스 토큰과 함께 온 요청에 대해서 응답을 하게 됩니다.<br>

### 참고자료

[mdn - http 개요](https://developer.mozilla.org/ko/docs/Web/HTTP/Overview)<br>
[10분 테크톡 - 인증과 인가](https://www.youtube.com/watch?v=y0xMXlOAfss)<br>
[생활 코딩 - OAuth](https://www.youtube.com/watch?v=hm2r6LtUbk8&list=PLuHgQVnccGMA4guyznDlykFJh28_R08Q-)<br>
[jwt - introduction](https://jwt.io/introduction)<br>
[ibm - JSON Web Token (JWT)](https://www.ibm.com/docs/en/cics-ts/6.1?topic=cics-json-web-token-jwt)<br>
