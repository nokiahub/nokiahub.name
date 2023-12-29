---
category: 'post'
date: '2022-10-02'
title: '리액트 쿼리(react-query)'
description: '리액트 쿼리 라이브러리 문서를 위주로 내용을 정리한 글입니다.'
tags: [ 'react-query, async, state management, 비동기 상태관리, 상태관리']
---

react-query는 리액트에서 비동기로 받아오는 데이터의 상태, 즉 서버에 대한 상태관리를 도와주는 라이브러리입니다.<br>
아래와 같은 데이터의 흐름에 대한 정보를 쉽고 가독성있는 코드로 관리해 줄 수 있습니다.<br>

- fetching(가져오기)
- caching(캐싱하기)
- synchronizing(동기화하기)
- updating server state(서버 데이터 업데이트하기)

| **서버 관련 상태 예시** | **클라이언트 관련 상태 예시** |
| ----------------------- | ----------------------------- |
| isLoading               | isToggled                     |
| requestSuccess          | isButtonClicked               |
| requestFailure          | isCursorDragging              |
| isInitialRequest        | isModalShown                  |
| isUserLoggedIn          |

react query는 클라이언트에서 필요한 위의 두 종류의 상태중 서버 관련 상태에 대해 다룹니다.<br>

# 3 core concepts

## queries

> query is a declarative dependency on an asynchronous source of data that is tied to a unique key.<br>

useQuery는 컴포넌트 또는 커스텀 훅에서 query를 구독할 수 있도록 하는 훅입니다.<br>
useQuery를 사용하려면 유니크 키와 데이터를 resolve 하거나, 에러를 throw하는 프로미스를 반환하는 함수와 같이 사용해야 합니다.<br>

useQuery가 isLoading, isError, isSuccess, error, data와 같은 데이터를 반환하여 서버 관련 상태에 대한 정보를 제공합니다.<br>

- enabled: 자동으로 쿼리를 실행할지 여부
- select: 성공 시 가져온 데이터를 가공해 전달
- keepPreviousData: 새롭게 fetching시 이전 데이터 유지 여부
- etc

##### status & fetchStatus

두 값 모두 useQuery가 제공하는 또 다른 상태입니다. status는 데이터에 대한 상태로, 실제로 데이터를 가지고 있는지를 나타내고 fetchStatus는 queryFn이 동작하고 있는지를 나타냅니다.<br>

#### query keys

react-query는 query key를 사용하여 캐싱을 합니다.<br>
배열 안에 key를 넣어 useQuery의 첫 번째 파라미터로 사용합니다. 가장 일반적인 형태로 배열 안에 string으로 정의할 수 있고, 키에 대한 추가적인 설명이 필요하다 하는 경우에는 배열의 다음 요소로 해당 키를 설명하는 변수를 넣고 사용할 수 있습니다.<br>

```javascript
// todo key
useQuery(['todo']);

// todo key with variables
useQuery(['todo'], { type: 'done' });

// query function depends on todoId variable
useQuery(['todo', todoId], () => fetchTodoById(todoId));
```

#### query functions

흔히 서버요청을 위한 fetch 함수를 query function으로 사용합니다.<br>
서버에 대한 데이터를 데이터를 resolve 하거나, react query가 에러에 대한 상태를 반환할 수 있으려면 query function은 반드시 에러를 throw하는 함수여야 합니다.<br>
query key의 변수는 QueryFunctionContext에 포함되어 query functions에 전달됩니다.<br>

#### Parallel Queries

서버 요청을 병렬적으로 보낼 수 있도록 하는 쿼리입니다.<br>

#### Dependent Queries

이전 쿼리 실행이 끝난 다음 실행되어야 하는 쿼리입니다. enabled option에 이전 쿼리에서 참조하는 값을 적어주면 값이 오기 전까지 쿼리는 실행되지 않습니다.<br>

#### Background Fetching Indicators

데이터가 refetching되는지를 알 수 있습니다.<br> isLoading은 initial fetch일 때 true이고 그 이후에 refetch는 isFetch가 true입니다. 이를 활용하여 각각 초기 로딩과 이후 다시 데이터를 요청했을 때 로딩에 각각 다른 UI를 보여줄 수 있습니다.<br>

#### Window Focus Refetching

window focus 이벤트가 발생할 때 refetchOnWindowFocus 옵션을 사용하여 최신 데이터를 받아올 수있도록 합니다.<br>

#### Disabling/Pausing Queries

페이지가 마운트될 때 자동으로 요청되는 쿼리를 enabled=false를 통해 막을 수 있습니다.<br>
enabled 옵션에 요청을 보내고자 하는 특정 조건(사용자가 필터를 입력했을 때 등)을 boolean으로 적어주면 해당 조건을 만족했을 때만 요청을 보낼 수 있도록 하는 lazy query를 만들 수 있습니다.<br>

#### Query Retries

useQuery가 요청에 실패할 때 에러를 보여주기까지 최대 요청 시도 횟수를 설정할 수 있습니다.<br>

#### Paginated Queries

페이지네이션이 있는 화면에 대해서 새로운 페이지로 갈 때 'loading'과 'success' state가 반복됩니다.<br>
새로운 페이지 데이터를 요청하는 동안, 'loading'이기 때문에 이전의 데이터를 볼 수 없고 데이터가 fetch되고 나서야 데이터를 보여줄 수 있다면 페이지를 옮길 때마다 깜빡일것입니다.<br>
keepPreviousData 옵션을 사용하여 이 문제를 해결할 수 있습니다.<br>

#### Infinite Queries

무한 스크롤 페이지를 구현할 때 useInfiniteQuery를 사용할 수 있습니다.<br>

#### Placeholder Query Data

placeholder 쿼리는 데이터를 fetch하기 전에 유저에게 임시로 보여줄 데이터를 저장할 수 있습니다.<br>
initialData와는 달리 캐싱되지 않습니다.<br>

#### Initial Query Data

데이터를 fetch하기 전 보여줄 초기 데이터입니다. placeholder와는 달리 캐싱이됩니다.<br>

#### Prefetching

서버 데이터를 미리 fetching하여 클라이언트에서 로딩시간 없이 미리 요청한 데이터를 보여줄 수 있습니다.<br>

## mutations

데이터를 create/update/delete 할 때 쓰입니다.<br>
useMutation의 콜백함수에 변수를 넘겨서 업데이트할 수 있습니다.<br>
자동으로 실행되는 쿼리와는 다르게 mutate 함수를 실행해주어야 합니다.<br>

```javascript
const mutation = useMutation((newTodo) => {
  return axios.post('/todos', newTodo);
});
```

- mutate: mutation을 실행하는 함수
- mutateAsync: mutate에서 반환된 프로미스를 반환
- reset: 데이터나 에러를 clean
- onMutate: mutation 동작 전에 미리 동작하는 함수. optimistic update에 유용
- etc

**Mutation 상태 리셋하기**
mutation 요청으로부터 응답받은 데이터나 에러를 리셋하려면 <code>mutation.reset()</code>을 호출합니다.<br>

**Mutation 사이드 이펙트 처리하기**
mutation후 업데이트된 데이터 fetching이나 기존 데이터 invalidate 처리 또는 [optimistic ui](https://www.apollographql.com/docs/react/v2/performance/optimistic-ui/)를 구현하는데 사용할 수 있습니다.<br>

또한 추가적인 콜백이 필요한 경우에 mutation의 mutate함수에 변수의 다음 argument로 mutate후 실행될 수 있는 추가적인 콜백을 넘겨줄 수 있습니다.<br>

## Query Invalidation

query invalidation을 통해 쿼리 클라이언트가 갖는 더 이상 유효하지 않은 값들을 invalidate 처리할 수 있습니다.<br>

queryClient의 invalidateQueries 함수를 통해 쿼리를 유효하지 않게 하고 새로운 데이터를 fetch해올 수 있습니다.<br>

```
// todos로 시작하는 쿼리를 유효하지 않게 만듭니다.
queryClient.invalidateQueries(['todos']);
```

1. 타겟 쿼리가 stale로 표시하고 관련 쿼리의 staleTime을 오버라이드합니다.<br>
2. 쿼리가 useQuery를 통해 렌더링되는중이라면, 백그라운드 refetching이 실행됩니다.<br>

#### Invalidation from Mutations

어떤 포스팅을 업데이트하는 쿼리를 수행했을 때, 이전 상태의 포스팅 쿼리는 invalidate 처리가 된 후 업데이트된 새로운 데이터를 refetch해와야 합니다.<br>

#### Updates from Mutation Responses

서버 데이터를 업데이트 후 해당 api 요청의 반환값을 이용해 쿼리 상태를 업데이트 할 수 있습니다.<br>

#### Optimistic Updates

데이터 업데이트 요청시, 업데이트를 미리 성공할 것으로 예상하고 미리 클라이언트측에서 UI를 업데이트합니다.<br>
업데이트가 실패했을 경우 refetch를 통해 과거의 상태로 돌아갈 수 있고, 네트워크 실패의 경우 rollback을 통해 과거 상태로 돌아갑니다.<br>

useMutation의 onMutate에 onError, onSettled뒤에 실행시킬수있는 함수를 넘겨줄 수 있습니다.<br>

**ex) todo list에 새로운 todo를 추가할 때**
onMutate 내부에서,

1. optimistic update를 오버라이드할 수 있는 백그라운드 refetch를 막는다.
2. optimistic update를 실행한다.
3. previous snapshot을 previous변수에 저장하여 이전 값을 저장한다.
4. 함수 마지막에 previous를 리턴한다.
5. onError에서 context.previous로 이전 값에 접근하여 에러가 발생한 경우 이전 값으로 rollback할 수 있다.

**ex) 하나의 todo를 업데이트할 때**

1. optimistic update를 오버라이드할 수 있는 백그라운드 refetch를 막는다.
2. previous snapshot을 저장하여 이전 값을 저장한다.
3. 업데이트 값을 저장한다.
4. 함수 마지막에 이전 값, 업데이트 값을 리턴한다.
5. onError에서 이전 값에 접근하여 에러가 발생했을 경우 이전 값을 set한다.
6. OnSettled에서 업데이트 값에 접근하여 성공했을 경우 성공 값(업데이트 값)을 set한다.

#### Query Cancellation

쿼리함수 하나당 AbortSignalInstance가 부여됩니다.<br>
일반적인 쿼리는 Promise가 진행될 때 unmount해도 없어지지 않고, 결과값이 캐싱됩니다.<br>
그리하여 다시 mount되었을 때 캐싱된 값을 사용할 수있습니다.<br>

Promise에 cancel 함수를 추가하면 진행중인 Promise를 중단할 수 있습니다.<br>

#### Scroll Restoration

사용자가 렌더링된 데이터를 스크롤하고 다른 화면으로 이동 후, 다시 데이터를 보던 화면으로 돌아갔을 때 스크롤을 기억하고 있는 것입니다.<br>

react-query에서는 쿼리의 결과가 캐싱되고 렌더링될 때 쿼리의 결과에 접근할 수 있기 때문에 사용자의 스크롤 포지션 또한 기억하고 있습니다.<br>

### 참고자료

[react-query - document](https://tanstack.com/query/v4/docs)<br>
[axios - cancellation](https://axios-http.com/docs/cancellation)<br>
