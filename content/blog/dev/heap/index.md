---
category: 'post'
date: '2022-06-06'
title: 'Heap, Priority Queue'
description: '최대, 최소 힙 구현하기'
tags: [ 'heap', '자료구조', '힙 구조', '최대 힙', '최대 힙 구현']
---

## 힙(Heap)

힙(heap)은 **최댓값 및 최솟값을 빠르게 찾아내기 위해 만들어진 자료구조**입니다.<br>
완전이진트리를 기본으로 다음과 같은 조건을 만족합니다.<br>

- 최대 힙: 트리의 부모 노드의 값이 자식 노드의 값보다 더 크다.
- 최소 힙: 트리의 부모 노드의 값이 자식 노드의 값보다 더 작다.
- 대소관계는 부모 노드와 자식 노드 간에만 성립하지만, sibling node 사이에는 대소관계가 성립되지 않는다.
- 최대 힙에서는 루트 노드의 값이 가장 큰 값을 갖고 최소 힙에서는 루트 노드의 값이 가장 작은 값을 갖는다. 이를 응용하여 우선순위 큐와 같은 추상적 자료형을 구현할 수 있다.

### 힙의 삽입

1. 트리의 가장 끝에 노드를 추가합니다.
2. 추가한 노드와 부모 노드의 크기를 비교하여 크기를 바꿔가며 위치를 찾습니다.(heapify)

```javascript
// heapify 과정에서 노드의 자리를 바꾸는 함수
function swap(index1, index2) {
  [heap[index1], heap[index2]] = [heap[index2], heap[index1]];
}
```

```javascript
function push(number) {
  heap.push(number);
  heapCount++;

  let child = heapCount;
  let parent = Math.floor(child / 2);

  while (child > 1 && heap[child] > heap[parent]) {
    swap(child, parent);
    child = parent;
    parent = Math.floor(child / 2);
  }
}
```

#### 시간복잡도

트리의 가장 끝에 추가할 때 O(1),
heapify를 할 때 O(logn)의 시간 복잡도가 필요합니다.

### 힙의 삭제

1. 트리의 루트 노드를 반환합니다.
2. 루트 노드와 가장 마지막 노드를 swap합니다.
3. 가장 마지막 노드가 루트 노드가 되었습니다.
4. 트리의 크기를 1 만큼 감소시킵니다.
5. 루트 노드와 부모 노드의 크기를 비교하며 크기를 바꿔가며 위치를 찾습니다.(heapify)

```javascript
function pop() {
  const value = heap[1];

  swap(1, heapCount);
  heapCount = heapCount - 1;

  let parent = 1;
  let child = parent * 2;

  // 두 자식 노드 중 값이 더 큰 자식의 index를 child로 한다.
  if (child + 1 <= heapCount) {
    child = heap[child] > heap[child + 1] ? child : child + 1;
  }

  while (child <= heapCount && heap[parent] < heap[child]) {
    swap(child, parent);

    parent = child;
    child = parent * 2;

    if (child + 1 <= heapCount) {
      child = heap[child] > heap[child + 1] ? child : child + 1;
    }
  }

  return value;
}
```

#### 시간복잡도

루트 노드에서 heapify 할 때 O(logn) 만큼의 시간복잡도가 필요합니다.

### 힙 정렬

1. 정렬하고자 하는 값들을 힙에 모두 삽입합니다.
2. 힙의 크기만큼 삭제를 합니다.
3. 삭제하면서 리턴된 값들을 출력합니다.

```javascript
const heap = [null];
let heapCount = 0;

function heapSort() {
  // 5 6 3 7 9 8 1 2 4 10
  push(5);
  push(6);
  push(3);
  push(7);
  push(9);
  push(8);
  push(1);
  push(2);
  push(4);
  push(10);

  // 10 9 8 7 6 5 4 3 2 1
  while (heapCount >= 1) {
    console.log(pop());
  }
}

heapSort();
```

#### 시간복잡도

모든 값들을 힙에 삽입할 때 O(n _ logn),<br>
모든 노드를 힙에서 삭제할 때 O(n _ logn),<br>
따라서 정렬을 할 때 시간복잡도는 O(nlogn) 만큼이 필요합니다.

worst: O(nlogn)<br>
average: O(nlogn)<br>
best: O(nlogn)<br>

## 우선순위 큐(Priority Queue)

들어가는 순서에 관계없이 나올 때는 우선순위대로 힙에서 나오게 되는 자료구조입니다.<br>
최대 힙 또한 값이 우선순위가 되는 우선순위 큐의 한 종류라고 볼 수 있습니다.<br>
이를 응용한다면 단순한 number 값만이 아니라 다양한 종류의 객체에 대해 어느 property에든 우선순위를 두어 정렬할 수 있습니다.<br>
앞서 구현한 heapify의 while문의 조건을 수정하여 우선순위 큐를 구현할 수 있습니다.<br>

### 우선순위 큐 활용

```javascript
const maxHeap = [null];
let heapCount = 0;

function swap(index1, index2) {
  [maxHeap[index1], maxHeap[index2]] = [maxHeap[index2], maxHeap[index1]];
}

function push(value) {
  maxHeap.push(value);
  heapCount++;

  let child = heapCount;
  let parent = Math.floor(child / 2);

  while (child > 1 && maxHeap[child].age > maxHeap[parent].age) {
    swap(child, parent);
    child = parent;
    parent = Math.floor(child / 2);
  }
}

function pop() {
  const value = maxHeap[1];

  swap(1, heapCount);
  heapCount = heapCount - 1;

  let parent = 1;
  let child = parent * 2;

  if (child + 1 <= heapCount) {
    child = maxHeap[child].age > maxHeap[child + 1].age ? child : child + 1;
  }

  while (child <= heapCount && maxHeap[parent].age < maxHeap[child].age) {
    swap(child, parent);
    parent = child;
    child = parent * 2;

    if (child + 1 <= heapCount) {
      child = maxHeap[child].age > maxHeap[child + 1].age ? child : child + 1;
    }
  }

  return value;
}

push({ name: 'nokia', age: 27 });
push({ name: 'heehee', age: 26 });
push({ name: 'judy', age: 14 });
push({ name: 'sophia', age: 16 });
push({ name: 'bjork', age: 32 });

for (let i = 0; i < 5; i++) {
  console.log(pop());
}
```

```shell
// age를 기준으로 객체들이 정렬된 것을 확인할 수 있었습니다.
(2) {name: "bjork", age: 32}
(2) {name: "nokia", age: 27}
(2) {name: "heehee", age: 26}
(2) {name: "sophia", age: 16}
(2) {name: "judy", age: 14}
```

### 참고자료

[위키피디아 - 힙](<https://ko.wikipedia.org/wiki/%ED%9E%99_(%EC%9E%90%EB%A3%8C_%EA%B5%AC%EC%A1%B0)>)<br>
[안경잡이개발자 - 힙 정렬](https://m.blog.naver.com/ndb796/221228342808)<br>
