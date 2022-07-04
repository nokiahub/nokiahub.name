---
date: '2022-07-04'
title: 'Javascript Map'
description: '자바스크립트 Map 사용하기'
tags: 'map, hashmap, javascript, data structure'
---
## 맵(Map)
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
// map의 has는 키 존재 유무를 boolean으로 반환합니다.

map.clear();
// clear는 맵의 모든 요소를 제거합니다.
map.size();
// map의 size를 반환합니다.
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
```

## 맵 복사하기


[mdn - map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)<br>
[코어 자바스크립트 - 맵과 셋](https://ko.javascript.info/map-set)<br>
