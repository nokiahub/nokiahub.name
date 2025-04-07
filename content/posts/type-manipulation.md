---
category: "dev"
date: "2022-07-11"
title: "타입을 사용하여 타입 구성하기"
description: "타입스크립트에서 키워드, index 등을 이용해 타입을 구성하는 방법"
tags: ["all", "typescript"]
---

타입스크립트 공부를 하면서 어려운 점 중 하나는 value의 관점이 아닌 해당 value의 타입의 관점으로 봐야한다는 점 같습니다.<br/>
타입을 이용해 새로운 타입을 만드는 여러가지 방법을 타입스크립트 공식 문서를 참고하며 정리해 보았습니다.<br/>

## keyof Type Operator

object 타입의 키를 문자열, 혹은 숫자 리터럴 타입으로 반환합니다.<br/>
object 타입이 여러개의 키를 갖는다면 이를 유니온 타입으로 반환합니다.<br/>

```typescript
type Person = {
  name: string;
  age: number;
  address: string;
};

type PersonKeys = keyof Person;

const personName: PersonKeys = "name";
const personAge: PersonKeys = "age";
const personAddress: PersonKeys = "address";
// OK

const personSalary: PersonKeys = "salary";
// Error
```

위에서 선언한 타입은 PersonKeys = 'name' | 'age' | 'address'로 표현한 것과 같습니다.

## typeof Type Operator

typeof는 변수의 값의 type을 반환하는 키워드 입니다.<br/>
**타입**이 아닌 변수나 함수와 같은 **값**의 타입을 얻어내야 할 때 사용합니다.<br/>

```typescript
function foo() {
  return { x: 10, y: 3 };
}

type FooReturn = ReturnType<foo>;
// Error

type FooReturn = ReturnType<typeof foo>;
// type FooReturn = { x: number, y: number }

const coordinate1: FooReturn = { x: 10, y: 24 };
// OK
const coordinate2: FooReturn = { x: 10, y: "24" };
// Error
```

## Indexed Access Types

object 타입의 키의 타입을 참조할 수 있습니다.<br/>
배열의 index를 통해 값을 접근할 수 있듯이 object의 타입을 키를 통해 타입에 접근이 가능합니다.<br/>
키를 유니온으로 표현할 경우 키 타입들의 유니온 타입이됩니다.<br/>

```typescript
type Person = {
  name: string;
  age: number;
  isFemale: boolean;
};

type Gender = Person["isFemale"];

const bool1: Gender = true;
const bool2: Gender = false;
// OK

const num: Gender = 1;
// Error

type ObjectProperty = Person["name" | "age"];

const key1: ObjectProperty = 1;
const key2: ObjectProperty = "1";
// OK

const key3: ObjectProperty = true;
// Error
```

Person의 name키의 타입은 string, age키의 타입은 number이기 때문에 ObjectProperty 타입은 이를 union으로 표현한 number | string이 됩니다.<br/>

### 배열 요소의 타입을 'number'키를 이용하여 접근하기

```typescript
const Villagers = [
  { name: "John", age: 20 },
  { name: "Jane", age: 23 },
  { name: "James", age: 17 },
];

type Villager = (typeof Villagers)[number];
// { name: string, age: number };
type Age = (typeof Villagers)[number]["age"];
// string
type Name = (typeof Villagers)[number]["name"];
// string
```

## Conditional Types

삼항연산자를 이용하면 condition에 따라 다른 타입을 지정할 수 있습니다.<br/>

> SomeType extends OtherType ? TrueType : FalseType;
> 메서드를 여러 타입의 input을 위해 오버로딩할 때 비슷하게 생긴 여러개의 코드를 생성해야 합니다. 이 때 conditional type을 통해 이를 간결하게 표현할 수 있습니다.<br/>

```typescript
interface IdLabel {
	id: number;
}

interface NameLabel {
	name: string;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number)
	: IdLabel | NameLabel;

// using conditional type

type IdOrNameLabel<T extends string | number> =
T extends number ? IdLabel : NameLabel;
// T의 타입이 number이면 IdLabel 타입, 아니면 NameLabel 타입을 반환

function createLabel<T extend string | number>(idOrName: T)
	: IdOrNameLabel<T>
```

// to do

### 한계

### Inferring within conditional types

## Mapped Types

### 참고자료

[typescript - Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)<br/>
[typescript - Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)<br/>
