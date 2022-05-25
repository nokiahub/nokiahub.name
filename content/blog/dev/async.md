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
    console.log("picking an apple...");
    callback("apple");
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

pickApple(
  (food) => {
    eat(
      food,
      (food) => goToSleep(food),
    );
  }
);
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
      console.log("picking an apple...")
      resolve("apple");
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

pickApple()
.then((food) => {
  eat(food)
    .then(() => {
      pickApple()
        .then((food) => {
          eat(food)
            .then((food) => {
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
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
}

async function pickApple() {
  await delay();
  return "apple";
}

async function pickBanana() {
  await delay();
  return "banana";
}

async function asyncPickAllFruits() {
  const applePromise = pickApple();
  const bananaPromise = pickBanana();
  const apple = await applePromise;
  const banana = await bananaPromise;

  console.log([apple, banana].join(" + "));
}

function pickAllFruits() {
  Promise.all([pickApple(), pickBanana()])
    .then(fruits => {
      console.log(fruits.join(" + "));
  });
}

pickAllFruits();
```

await
await연산자는 Promise를 기다리기 위해 사용됩니다. 연산자는 async function 내부에서만 사용할 수 있습니다.

https://github.com/tc39/proposal-async-await/issues/9
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

