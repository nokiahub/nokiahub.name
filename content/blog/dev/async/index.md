---
date: '2022-05-20'
title: 'Promise, async and await'
description: '비동기함수를 순서대로 처리하는 여러가지 방법'
tags: 'asynchronous'
---

자바스크립트에서 비동기 함수를 순차적으로 호출하는 방법 중에는 콜백, Promise, async 함수를 이용한 방법이 있습니다.

## 콜백을 이용하는 방법

```javascript
function pickApple(callback) {
  setTimeout(() => {
    console.log('picking an apple...');
    callback('apple');
  }, 1000);
}

function eat(food, callback) {
  setTimeout(() => {
    console.log(`eating ${food}...`);
    callback(food);
  }, 3000);
}

function goToSleep(food) {
  setTimeout(() => {
    console.log(`ate ${food}...going to bed`);
  }, 3000);
}

pickApple((food) => {
  eat(food, (food) => goToSleep(food));
});
```

콜백으로 비동기 로직을 처리하기 위해서는 비동기 로직 후에 그 다음 함수가 실행되도록 전의 비동기 함수에 callback 파라미터를 받아 함수 안에서 비동기 로직이 모두 실행된 다음 callback으로 다음 함수를 실행할 수 있도록 해야합니다.

다음과 같은 문제가 있었습니다.

- 비동기 함수 다음 처리해야 하는 로직이 있을 때마다 콜백을 argument로 넘겨줘야 한다.
- 에러 처리를 할 경우 에러 핸들링 함수도 콜백으로 넘겨주어야 한다.
- 순서대로 진행되어야 하는 함수가 많을수록 더 깊은 콜백이 필요하다.

### Promise를 쓰는 이유

- Promise의 resolve를 통해 다음 순서에 필요한 콜백을 parameter로 넘겨줄 필요 없이 호출된 코드 라인으로 값을 넘겨줄 수 있다.
- resolve를 통해 전달된 결과 값을 then으로 받아 처리할 수 있다.
- reject를 통해 에러를 전달받아 핸들링 할 수 있다.

## Promise를 이용하는 방법

```javascript
function pickApple() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('picking an apple...');
      resolve('apple');
    }, 1000);
  });
}

function eat(food) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`eating ${food}...`);
      resolve(food);
    }, 3000);
  });
}

function goToSleep(food) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`ate ${food}...going to bed`);
    }, 3000);
  });
}

pickApple().then((food) => {
  eat(food).then(() => {
    pickApple().then((food) => {
      eat(food).then((food) => {
        goToSleep(food);
      });
    });
  });
});
```

### 콜백 지옥과 Promise.then 중첩의 차이점

- 콜백과 달리 promise로 순서가 있는 비동기 함수를 실행할 때 promise의 리턴값이 then으로 넘겨지기 때문에 then이 계속해서 중첩되게 된다.

## async await 키워드를 이용하는 방법

```javascript
function hello () {
	return Promise.resolve(‘hello’);
}

async function hello () {
	return ‘hello’;
}
```

위의 두 코드는 같습니다. 두 번째 코드는 첫 번째 코드의 syntatic sugar라고 할 수 있습니다.

```javascript
function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

async function pickApple() {
  await delay();
  return 'apple';
}

async function pickBanana() {
  await delay();
  return 'banana';
}

async function asyncPickAllFruits() {
  const applePromise = pickApple();
  const bananaPromise = pickBanana();
  const apple = await applePromise;
  const banana = await bananaPromise;

  console.log([apple, banana].join(' + '));
}

function pickAllFruits() {
  Promise.all([pickApple(), pickBanana()]).then((fruits) => {
    console.log(fruits.join(' + '));
  });
}

pickAllFruits();
```

await
await연산자는 Promise를 기다리기 위해 사용됩니다. 연산자는 async function 내부에서만 사용할 수 있습니다.

### await vs return vs return await

다음 예제를 통해 async await이 어떻게 동작하게 되는지 예측해보며 개념에 대한 이해를 더 정확하게 체크할 수 있었습니다. 해당 예제는 [여기](https://jakearchibald.com/2017/await-vs-return-vs-return-await/)에서 가져왔습니다.

```javascript
async function waitAndMaybeReject() {
  // Wait one second
  await new Promise((r) => setTimeout(r, 1000));
  // Toss a coin
  const isHeads = Boolean(Math.round(Math.random()));

  if (isHeads) return 'yay';
  throw Error('Boo!');
}
```

#### just calling

```javascript
async function foo() {
  try {
    waitAndMaybeReject();
  } catch (e) {
    return 'caught';
  }
}
```

waitAndMaybeReject는 async 함수이기 때문에 무조건 Promise를 반환합니다.<br>
일반 함수였다면 50퍼센트의 확률로 'yay'라는 문자열을 반환했겠지만,<br>
async 함수이기 때문에 50퍼센트의 확률로 **'yay'를 resolve하는 Promise** 혹은 **Error('Boo!')로 reject하는 Promise** 가 반환됩니다.<br>
두 값 모두 resolve, reject가 되지 않은 pending 상태의 Promise이기 때문에 위의 코드에서 절대 에러가 발생하지 않게 됩니다.<br>

#### awaiting

```javascript
async function foo() {
  try {
    await waitAndMaybeReject();
  } catch (e) {
    return 'caught';
  }
}
```

await 키워드를 사용하므로써, pending상태의 Promise가 resolve 또는 reject 처리가 됩니다.<br>
waitAndMaybeReject에서 isHeads가 true이면 foo에서 resolve처리가 되고, isHeads가 false이면 foo에서 error가 발생하게 됩니다.<br>

#### returning

```javascript
async function foo() {
  try {
    return waitAndMaybeReject();
  } catch (e) {
    return 'caught';
  }
}
```

await 키워드 없이 waitAndMaybeReject를 바로 return할 경우에도 첫번째 just calling의 경우와 같이 pending 상태의 Promise이기 때문에 catch 블록이 절대 실행되지 않습니다.

#### return-awaiting

```javascript
async function foo() {
  try {
    return await waitAndMaybeReject();
  } catch (e) {
    return 'caught';
  }
}
```

그렇다면 Promise를 받아 await 처리를 하고, 이를 return하는 async 함수는 어떻게 동작할까요?

**isHeads = true로 나왔다면**<br>

1. waitAndMaybeReject로부터 pending 상태의 Promise를 받는다.
2. await를 통해 resolve 처리한다.
3. resolve 된 경우 이 값을 다시 Promise.relove('yay')로 반환한다.

**isHeads = false로 나왔다면**<br>

1. waitAndMaybeReject로부터 pending 상태의 Promise를 받는다.
2. await를 통해 reject 처리한다.
3. Error('Boo!')로 인해 catch 블록이 실행된다.

try-catch 문이 없다면 Promise의 resolve, reject 처리가 된 결과값을 다시 Promise로 반환하는 것은 redundant한 일입니다.<br>
그렇기 때문에 try-catch 블록을 사용하지 않는 경우에 한에 이를 제한하는 eslint 규칙이 존재합니다.<br>

### 참고자료

[Guide on using promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises/)<br>
[Promise apis](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)<br>
[await vs return vs return await](https://jakearchibald.com/2017/await-vs-return-vs-return-await/)<br>
