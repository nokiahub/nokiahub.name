---
category: "dev"
date: "2024-12-06"
title: "Apollo client's fetch policies"
description: "아폴로 클라이언트에서 제공하는 다양한 fetch policy"
tags: ["all", "web", "react"]
---

```js
import { useQuery } from '@apollo/client';

const { data, loading, error } = useQuery(GET_TODOS, {
  fetchPolicy: '???'
});
```

Apollo Client executes the query against your GraphQL server

### fetch policies

문서에 쓰였던 표현을 빌리자면,
> executes the query against the cache(캐시에 대한 쿼리를 실행합니다.)


캐시를 확인한다? 네트워크 요청을 보낸다?? 캐시에 대해 쿼리를 실행한다..?! 말이 참 헷갈리는 것 같습니다.<br />

fetch policy는 다음과 같이 4가지 방식이 있습니다.

- **cache-first**
  - 캐시에 대한 쿼리를 먼저 실행. 캐시에 request data가 있을 경우 그 data를 리턴
  - 캐시에 request data가 없을 경우 graphql 서버에 대한 쿼리 실행
  - default fetch policy이고 네트워크 요청을 줄이는 것이 중점을 둔 방식이다.

- **cache-only**
  - graphql 서버에 대한 쿼리를 실행하지 않고 캐시에 대한 쿼리만 실행
  - 캐시에 request data가 없을 경우 에러를 발생


- **cache-and-network**
  - 캐시와 graphql 서버 모두에 대한 쿼리를 실행
  - 캐시와 서버 리턴 값을 비교하고, 서버와 캐시가 다를 경우 서버에서 가져온 데이터로 캐시를 업데이트

- **network-only**
  - 첫 요청시 캐시 쿼리를 실행하지 않고 graphql 서버에 대한 쿼리를 실행

- **no-cache**
  - network-only와 비슷한 방식으로 no-cache의 경우 쿼리 결과를 cache에 저장하지 않는다.

- **standby**
  - cache-first와 비슷하게 동작
  - 데이터 필드가 변경되어도 업데이트 하지 않는다.(수동으로 해야 함)

<br />



### react-query's staleTime & gcTime

staleTime과 gcTime을 직접 설정하여 좀더 디테일하게 조정할 수 있는 듯 하다.<br />
cacheTime이라고 알고 있었는데 5버전업 후 gcTime으로 변경되었다.

- staleTime
  - Default: 0
  - 데이터가 stale할 때까지 걸리는 시간
  - If set to Infinity, the data will never be considered stale
  - If set to a function, the function will be executed with the query to compute a staleTime

- gcTime
  - Defaults to 5 * 60 * 1000(5 minutes) or Infinity during SSR
  - The time in milliseconds that unused/inactive cache data remains in memory. When a query's cache becomes unused or inactive, that cache data will be garbage collected after this duration. When different garbage collection times are specified, the longest one will be used.
  - Note: the maximum allowed time is about 24 days. See more.

https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout#maximum_delay_value

* If set to Infinity, will disable garbage collection



https://www.apollographql.com/docs/react/data/queries#supported-fetch-policies
