---
category: 'post'
date: '2022-07-04'
title: 'Javascript Map & Set'
description: '자바스크립트 Map과 Set 사용하기'
tags: 'map, hashmap, javascript, data structure'
---

# 맵(Map)

맵은 key-value의 데이터를 삽입 순서대로 저장하는 자료구조입니다.

## 맵 생성하기

```javascript
const map = new Map();
```

## 저장 및 삭제

```javascript
map.set('이름', 'nokia');
map.set('나이', 38);
// 'name' = 'nokia', 'age' = 38

map.delete('age');
map.has('age');
// false
// 키 존재 유무를 boolean으로 반환

map.clear();
// 맵의 모든 요소를 제거
map.size();
// map의 size를 반환
```

## 맵 vs object

### key 타입

- object는 프로퍼티로 string 또는 symbol 타입만 사용할 수 있습니다.
- 맵은 primitive 및 함수, 객체까지 key로 사용할 수 있습니다.

### key의 순서

- Object.keys를 사용할 경우 object의 enumerable 한 프로퍼티를, Object.getOwnPropertyNames를 사용할 경우 non-enumerable 한 프로퍼티(toString, etc)를 iterate 할 수 있습니다.
- 맵은 삽입 순서대로 for-of를 사용하여 iterate합니다.

### size

- object는 Object.keys(object).length와 같이 간접적으로 크기를 구해야 합니다.
- 맵의 size 프로퍼티로 쉽게 맵의 크기를 구할 수 있습니다.

### 성능

- object는 잦은 key-value의 삽입, 삭제에 적합하지 않고 상대적으로 낮은 성능을 갖습니다.
- 맵은 key-value의 삽입, 삭제가 자주 일어나는 데이터를 다룰 때 사용하기에 더 좋은 성능을 갖습니다.

## iteration

```javascript
const map = new Map();

map.set(0, 'zero');
map.set(1, 'one');

for (const [key, value] of map) {
  console.log(key, value);
}
// 'zero' 0
// 'one' 1

for (const key of map.keys()) {
  console.log(key);
}
// 'zero'
// 'one'

for (const value of map.values()) {
  console.log(value);
}
// 0
// 1

for (const [key, value] of map.entries()) {
  console.log(key, value);
}
// 'zero' 0
// 'one' 1

map.forEach((value, key, map) => {
  console.log(key, value);
});
// 배열과 같이 forEach도 사용 가능
// 'zero' 0
// 'one' 1
```

## 맵 활용하기

object를 key로 사용할 수 있기 때문에 일반 object로는 표현하기 까다로웠던 데이터를 직관적으로 표현할 수 있습니다.<br>

```javascript
const john = { name: 'John Doe' };
const visitCountMap = new Map();

visitCountMap(john, 123);
console.log(visitCountMap.get(john));
// 123
```

# 셋(Set)

앞서 맵에 대해 알아보았습니다. 그렇다면 셋은 무엇일까요?<br>
셋이란 중복되지 않은 데이터를 담을 수 있는 자료구조입니다. 셋의 데이터 자체가 유일하기 때문에 식별자인 key가 필요하지 않습니다. 따라서 같은 값을 여러번 삽입해도 셋에는 같은 값이 1개만 존재합니다. 따라서 **유일무이함을 확인**하는데 최적화 되어있습니다.<br>
원시 값이 아닌 **객체의 경우는 참조가 다를 경우**에는 속성과 값이 모두 같더라도 다른 데이터로 볼 수 있습니다.

```javascript
const set = new Set();

set.add(1);
set.add(5);
set.add(5);

console.log(set.size);
// 2

const obj = { a: 1, b: 2 };

set.add(obj);
set.add({ a: 1, b: 2 });

console.log(set.size);
// 4
```

## iteration

forEach를 사용하여 iterate할 수 있습니다.<br>

```javascript
const set = new Set(['apple', 'oranges', 'banana']);

set.forEach((value) => {
  console.log(value);
});
// 'apple'
// 'oranges'
// 'banana'
```

- set.keys(): 셋의 모든 value를 포함하는 이터러블 객체 반환
- set.values(): set.keys()와 동일한 값 반환(맵과 호환을 위해 만들어짐)
- set.entries(): [value, value] 배열을 포함하는 이터러블 객체 반환

### 참고자료

[mdn - map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)<br>
[mdn -set](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set)<br>
[코어 자바스크립트 - 맵과 셋](https://ko.javascript.info/map-set)<br>
