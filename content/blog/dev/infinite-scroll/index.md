---
category: 'post'
date: '2023-04-19'
title: 'useInfiniteQuery를 이용한 무한 스크롤 구현'
description: 'next.js에서 react-query의 useInfiniteQuery를 이용하여 무한 스크롤 만들기'
tags: 'react-query, useInfiniteQuery, next.js infinite query'
---

### 무한 스크롤이란?

리스트에 필요한 데이터를 한번에 요청하여 보여주는 것이 아닌, 사용자가 스크롤을 내릴 때 마다 페이지네이션 데이터를 요청하여 기존 리스트에 새로운 데이터를 붙여서 사용자에게 보여주는 방법입니다.<br>

### useInfiniteQuery

react-query의 useInfiniteQuery 훅을 사용하여 깔끔하게 무한스크롤에 필요한 데이터 상태를 관리할 수 있습니다.

### useInfiniteQuery 레시피

1. useQuery와 동일하게 queryKey와 queryFn을 정의합니다<br>
2. getNextPageParam에 다음 페이지를 불러오기 위한 params를 반환하는 함수를 정의합니다.<br>이 함수의 첫번째 파라미터는 가장 최근에 불러온 마지막 페이지 데이터를, 두번째 파라미터는 모든 페이지 데이터를 받을 수 있습니다.
3. useInfiniteQuery는 queryFn을 getNextPageParam과 함께 call하는 fetchNextPage 함수를 반환합니다. 이 함수를 호출해서 다음 페이지를 fetch할 수 있습니다.
4. react-intersection-observer 라이브러리에서 제공하는 useInView라는 훅을 통해서 엘리먼트가 view 안에 들어왔는지에 대한 상태인 inView 상태를 활용할 수 있습니다.
5. inView=true 상태가 되었을 때 fetchNextPage를 호출하는 useEffect를 만듭니다.

### 전체 소스코드

```javascript
const { ref, inView } = useInView();
const { data, fetchNextPage } = useInfiniteQuery(
  ['items'],
  async ({ pageParam }) => {
    return await fetch('/items', { ...pageParam });
  },
  {
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.length) return;

      return {
        page: allPages.length + 1,
        size: pageSize
      };
    }
  }
);

useEffect(() => {
  if (inView) {
    fetchNextPage();
  }
}, [fetchNextPage, inView]);

return (
  <>
    <ItemList items={data.pages.flat()} />
    <div ref={ref} />
  </>
);
```

### 참고자료

[react-query - useInfiniteQuery](https://tanstack.com/query/v4/docs/react/reference/useInfiniteQuery)<br>
[react-query - example](https://tanstack.com/query/v4/docs/react/guides/infinite-queries#example)<br>
[mdn - Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)<br>
[github - react-intersection-observer](https://github.com/thebuilder/react-intersection-observer#readme)<br>
