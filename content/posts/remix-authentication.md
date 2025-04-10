---
category: "dev"
date: "2024-04-15"
title: "Remix로 authentication 화면 만들기"
description: "remix로 로그인을 구현하여 전체적인 동작방식과 간단한 file convention을 알아보았습니다."
tags:
  ["all", "remix"]
---

# 구현목표

다음과 같은 flow로 로그인과 회원가입 기능을 만듭니다.<br />

<img src="https://d28uuyslcox01d.cloudfront.net/work/auth-flow.png" alt="auth-flow" aria-describedby={"this is remix authentication flow chart" />

유저인증 방식은 세션을 사용하고, 쿠키로 관리합니다.<br/>
세션의 동작 방법에 대해서 간단하게 설명하자면 다음과 같을 것 같습니다.<br/>

- remix 서버가 시작될 때 유저의 세션 id를 저장하는 저장소를 생성한다.
- 유저가 로그인을 하면, 서버는 유저의 세션 id를 저장소에 저장한다.
- 유저가 로그아웃을 하면, 서버는 유저의 세션 id를 저장소에서 삭제한다.
- 유저가 페이지를 요청할 때마다, 서버는 유저의 세션 id를 저장소에서 찾아서 유저를 식별한다.

## 1. 로그인 정보 입력 UI

Remix에서 페이지를 만들 때 프로젝트 최상단에 `/routes` 디렉토리에 `login.tsx` 파일을 생성합니다.
UI는 리액트의 jsx 문법을 사용하여 다음과 같이 만듭니다.

```tsx title="routes/login.tsx"
export async function Login() {
  // 로그인 페이지 UI
}
```

## 2. 로그인 요청 action 핸들러

remix에서는 사용자 입력을 `<form action="post>` 폼을 통해 입력값을 다룹니다.<br />
form submit 이벤트가 발생할 때 로그인 페이지 파일의 action 함수를 호출합니다.<br />
action 함수가 사용자의 입력값을 받고, 내부에서 입력값 검증 및 서버 로직을 수행할 수 있습니다.<br />

### 2-1. request에서 사용자 입력값 검증하기.

```ts title="routes/login.tsx"
export async function action(request) {
  const form = request.form;
  const username = await form.get("username");
  const password = await form.get("password");

  // validate
}
```

### 2-2. 입력한 아이디와 비밀번호가 회원가입된 정보인지 확인하기.

사용자가 입력한 아이디와 비밀번호가 db를 조회하여 확인합니다.

```ts title="utils/session.server.ts"
export const login = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return null;
  }

  const isPasswordCorrect = bcrypt.compare(password, user.passwordHash);

  if (!isPasswordCorrect) {
    return null;
  }

  return { id: user.id, username };
};
```

### 2-3. 스토리지에 사용자의 새로운 세션 생성하기.

action에서 세션을 새로 생성하는 `createSession()` 함수를 완성해 봅시다. `createSession()` 또한 서버와 관련된 코드임으로 `/utils/server` 디렉토리 하위의 `session.server.ts` 내에 작성합니다.<br/>
기존에 세션이 있는 경우에는 새로운 세션 id가 이전 값을 덮어쓰게 됩니다.

```ts title="utils/session.server.ts"
async function createSession(userId, redirectTo) {
  const session = await storage.getSession();
  session.set("sessionId", userId);

  redirect(redirectTo);
}
```

## 3. 인증되지 않은 유저가 인증이 필요한 화면 요청을 할 때

내 프로필 정보 수정하기 같은 화면은 인증이 꼭 필요한 화면이겠죠.<br/>
일반적으로 인증이 필요한 화면같은 경우 미들웨어를 통해 redirect하는 것이 일반적이라 구글링해 본 결과 관련 이슈를 remix 깃헙의 Issues에서 처리하는 방법을 확인해 볼 수 있었습니다.<br/><br/>

[관련 이슈](https://github.com/remix-run/remix/discussions/1432)에 따르면 유저가 인증되지 않은 상태, 즉 세션에 아이디가 등록되지 않은 유저가 인증이 필요한 화면을 요청할 때에는 `loader` 내부에서 바로 유저의 role을 검사하도록 합니다.<br />

```ts title="utils/session.server.ts"
async function verifyUserRole(request: Request, expectedRole: string) {
  const user = await getAuthenticatedUser(request); // somehow get the user
  if (user.role === expectedRole) return user;
  throw json({ message: "Forbidden" }, { status: 403 });
}
```

```ts title="routes/profile.tsx"
let loader: LoaderFunction = async ({ request }) => {
  const user = await verifyUserRole(request, "userWithAccount");
  // code here will only run if user has account and logged in.
  // and you'll also get the user object at the same time
};
```

_Each route can define a loader function that provides data to the route when rendering._<br/>

_This function is only ever run on the server. On the initial server render, it will provide data to the HTML document._<br/>
_On navigations in the browser, Remix will call the function via fetch from the browser._<br/>

_This means you can talk directly to your database, use server-only API secrets, etc. Any code that isn't used to render the UI will be removed from the browser bundle._<br/>

remix에서 `loader`는 페이지 요청 전에 init을 하듯이 로드, 또는 실행되는 함수를 실행하는 장치라고 이해를 했습니다.<br/>
더 나은 이해를 위해 문서를 찾아보니 loader 는 각 페이지의 라우트에서 렌더러에 데이터를 제공하는 역할을 하고,
서버에서만 동작한다고 합니다. next.js의 `getServerSideProps`와 흡사한 기능을 하는 것 같습니다.

# Remix로 풀스택 개발을 하려면

- 서버, action, ui 3가지 레이어를 잘 구분하고 파일 컨벤션에 맞게 로직을 분리해야한다.

# 참고자료

- [Remix - Joke tutorial](https://remix.run/docs/en/main/tutorials/jokes#authentication)
- [How to Implement Middleware in Remix?](https://github.com/remix-run/remix/discussions/1432)
