---
date: '2022-07-08'
title: 'Javascript 메모리'
description: '자바스크립트 엔진은 어떻게 메모리 관리를 할까?'
tags: 'javascript memory, garbage collection, stack, heap memory'
---

처음 자바스크립트를 배우기 시작했을 때 직접 메모리 관리를 하지 않고도 자유롭게 동적인 객체나 배열을 사용할 수 있어 다른 언어들에 비해 자유로운 언어라는 것을 느꼈습니다.<br>
배열의 크기, object의 property를 미리 정하지 않고도 자유롭게 추가할 수 있고, 메모리 사용 후에 free() 처리를 해주지 않아도 자바스크립트 엔진이 자동으로 메모리를 해제합니다. 자바스크립트가 어떻게 메모리 관리를 하는지 궁금해져서 정리해보려고 합니다.<br>

## 데이터의 타입과 메모리 사용의 관계

원시 타입 데이터(string, number, boolean, undefined, null)는 코드가 실행되기 전인 **컴파일 단계에서 필요한 메모리의 할당량**을 알 수 있습니다. 데이터 값이 저장될 수 있도록 선언된 변수의 데이터 타입이 필요한 메모리만큼 stack에 할당됩니다. object를 가리키는 reference 또한 stack에 저장됩니다.<br>
원시 타입이 아닌 object와 function은 코드가 실행되기 전인 컴파일 타임에는 얼만큼의 메모리가 필요한지 알 수 없습니다. 예를 들어 100번 for문을 돌리면서 object의 property를 추가하는 코드가 있다고 하면 for문 실행 전에는 property에 할당해야하는 메모리를 알 수 없듯이 컴파일 타임에는 object에 필요한 메모리를 결정할 수 없습니다. 코드가 실행되는 시점인 런타임이 되서야 필요한 메모리의 량을 알 수 있기 때문에 heap에 저장됩니다.<br>

## 정적 메모리 할당

- 원시타입 데이터 및 객체 참조값
- stack을 사용
- size가 정해진 데이터를 저장
- 코드 실행 전인 컴파일 타임에 필요한 메모리를 할당
- size가 정해져 있기 때문에 저장할 데이터 크기에 limit이 존재

## 동적 메모리 할당

- 객체 및 함수
- heap을 사용
- 코드 실행 후인 런타임에 필요한 만큼 메모리를 할당받아 사용 가능

## Garbage Collection

heap에 저장된 데이터가 더 이상 사용되지 않을 때 해당 메모리를 해제하기 위해 garbage collection이라는 자동 메모리 관리 방법을 사용합니다. 이 때 **더 이상 사용되지 않을 때**를 결정짓는 방식에 따라 두 가지 방법이 있었습니다.<br>

### Reference Counting

object를 참조하는 변수가 없을 때 메모리를 해제하는 방법입니다.<br>

```javascript
// heap에 obj 객체 생성
let obj = {
  a: 'apple',
  b: 123
};

// 참조인 obj = null이므로 더 이상 obj 객체를 가리키는 참조가 없어집니다.
obj = null;
```

이 방법에는 서로가 참조를 할 때 메모리가 해제되지 않는 cycle 문제가 발생합니다.<br>

```javascript
function foo() {
  const dad = {};
  const son = {};

  dad.son = son;
  son.dad = dad;
}

foo();
```

foo 함수 실행 후에는 foo의 스코프가 사라지기 때문에 내부의 dad, son 객체의 메모리도 해제되어야 합니다. 하지만 둘은 서로를 참조하기 때문에 garbage collection이 일어나지 않습니다.<br>

### Mark and Sweep algorithm

reference counting에서 발생한 cycle 문제를 해결할 수 있습니다.<br>
mark and sweep 알고리즘은 root(node.js 환경에서는 global, browser 환경에서는 window 객체)에 object를 더 이상 접근할 수 없을 때를 기준으로 하여 garbage collection을 수행하도록 합니다.<br>

## 자동으로 실행되는 Garbage Collection의 한계점

코드를 짤 때 메모리를 직접 관리하지 않아도 자동으로 동적 메모리가 할당되고, 더 이상 메모리가 쓰이지 않을 때 자동으로 해제한다는 점은 분명 편리하고 좋은 장점입니다.<br>
하지만 주기적으로 실행되는 garbage collection도 결국에는 컴퓨터가 해결해야 하는 일이기 때문에 자주 실행될 경우 성능에 영향을 끼칠 수 있습니다.<br>

### 참고자료

[Javascript memory explained](https://felixgerschau.com/javascript-memory-management/)<br>
[modern javascript tutorial - garbage collection](https://javascript.info/garbage-collection)<br>
[mdn - 자바스크립트의 메모리 관리](https://developer.mozilla.org/ko/docs/Web/JavaScript/Memory_Management)<br>
