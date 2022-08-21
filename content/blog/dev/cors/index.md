---
date: '2022-05-09'
title: 'CORS'
description: 'CORS란?'
tags: 'CORS'
---

http를 통해 웹 어플리케이션이 서버로 자원 요청을 보낼 때, 웹 어플리케이션의 origin(protocol, domain, port)과 자원 요청을 보내는 서버의 origin이 서로 다를 시에 발생되는 메커니즘이다.
CORS 요청에는 simple request와 preflight request 두 가지 타입이 있다.<br />

## CORS 배경

Ajax와 같은 cross domain request는 same-origin security policy에 의해 같은 origin끼리만 리소스를 전송할 수 있도록 한다.<br />
same-origin policy는 CSRF를 방지하기 위해서 꼭 필요하다. 예를 들어 facebook 사용자를 https://faceboook.com (o가 하나 더 포함된) 도메인으로 접속하도록 유도한 다음, ajax 요청을 통해 사용자의 개인 정보를 얻어내거나 변경, 삭제할 수 있다.

## Simple requests

- GET, POST 또는 HEAD 메서드를 사용
- CORS safe-listed header로 정의된 헤더 외에 수동으로 설정한 헤더가 없어야 함
- 헤더의 Content-Type이 application/x-www-form-urlencoded, multipart/form-data 또는 text/plain
- 요청에 ReadableStream 객체를 사용하지 않음

위와 같은 조건이 모두 만족할 때 브라우저는 요청을 simple request로 정한다.

### Headers

**Origin** 헤더에 요청을 보내는 origin의 값을 사용한다.<br />
**Access-Control-Allow-Origin** 헤더에 리소스를 허용하는 origin값을 통해 origin을 제한할 수 있다.<br />
**Access-Control-Allow-Origin** 값 이외의 도메인은 cross-site 방식으로 리소스에 접근할 수 없게 된다.(서버가 지정한 origin 이외에 다른 요청에는 응답을 하지 않기 때문)<br />

## Preflight requests

simple request 조건이 충족되지 않았을 때 브라우저가 자동으로 OPTIONS 메서드를 사용하여 preflight request를 만든다.
OPTIONS 호출에 대한 결과가 요청을 보낼 수 없다고 하면 실제 해당 요청이 이루어지지 않는다.

### Headers

**Access-Control-Request-Method**: simple request에서 허용하지 않는 메서드를 사용할 때 이를 서버에 알려주기 위해 사용<br />
**Access-Control-Request-Headers**: simple request에서 허용하지 않았던 수동 설정 헤더에 대해 서버가 검토할 수 있도록 요청 헤더를 알려주는 용도<br />

서버는 요청된 preflight request header를 보고 리소스를 허용할지 결정할 수 있다.

### 참고자료

[mdn-CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)<br/>
[wikipedia-Cross-origin resource sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)<br />
[hackedu-same-origin policy](https://www.hackedu.com/blog/same-origin-policy-and-cross-origin-resource-sharing-cors)
