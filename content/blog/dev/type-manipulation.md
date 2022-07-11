---
date: '2022-07-11'
title: '타입스크립트에서 타입 구성하기'
description: '타입스크립트에서 키워드, index 등을 이용해 타입을 구성하는 방법'
tags: 'javascript memory, garbage collection, stack, heap memory'
---

타입스크립트 공부를 하면서 어려운 점 중 하나는 value의 관점이 아닌 해당 value의 타입의 관점으로 봐야한다는 점 같습니다.<br>
예를 들면 string 타입의 name을 키로 갖는 Person이라는 타입을 보았을 때, Person["name"]과 같이 "name"으로 접근하면 Person의 name에 대한 값을 참조하고 있는 것과 값의 타입을 참조하는 것, 이 두 가지 개념이 헷갈립니다.<br>
타입을 이용해 새로운 타입을 만드는 여러가지 방법을 타입스크립트 공식 문서에서 정리해보았습니다.<br>

## keyof Type Operator

object 타입을 받아 object의 key를 string 리터럴 혹은 numeric 리터럴의 union 타입으로 반환합니다.

Object 타입에 index로 number 시그니처가 있을 때 keyof operator를 사용하면 해당 시그니처의 타입인 number 타입을 반환하고, string 타입의 시그니처일 경우 string 타입을 반환합니다.<br>
keyof 는 mapped type에서 유용하게 쓰일 수 있습니다.

## typeof type operator

자바스크립트에서도 expression context에 쓰이는 typeof operator가 존재합니다.<br> 타입스크립트에서 typeof는 변수의 type을 참조하여 type context내에서 사용할 수 있습니다.<br>

## Indexed Access Types

index로 접근하여 index에 해당하는 값의 type을 접근할 수 있습니다.<br>

```typescript
Type Person = {
	age: number;
	name: string;
}

Type I1 = Person[“age” | “name”];
```

Person의 age 타입은 number, Person의 name의 타입은 string이기 때문에 I1 타입은 이를 union으로 표현한 number | string이 됩니다.<br>

```typescript
Type I2 = Person[keyof Person];
```

앞서 keyof 키워드는 타입을 object 타입을 받아 key를 string literal 타입을 반환하는 것을 알았습니다. Keyof Person은 Person 타입의 key인 age, name의 타입을 리터럴로 표현하면 number | string이 됩니다.

```typescript
Type AliveOrName = “alive” | “name”;
Type I3 = Person[AliveOrName];
```

## Mapped Types

[typescript - Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)<br>
[typescript - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)<br>
