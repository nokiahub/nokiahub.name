---
category: 'post'
date: '2023-05-12'
title: 'React 모달 컴포넌트 unmount 애니메이션'
description: '애니메이션을 적용하려던 컴포넌트는 이미 unmount되고 없다'
tags: [ 'react', 'animation', 'mount animation', 'unmount animation']
---

모달에서 닫기 버튼을 클릭하면 모달 컴포넌트가 unmount됩니다.<br>
unmount 될 때 slide down 애니메이션을 적용하기 위해서는 어떻게 해야 할까요?<br>

# 처음 생각한 방법

slide down 애니메이션을 0.3초 보여준다면, 닫기 버튼을 클릭후 애니메이션 시간인 0.3초 후에 모달이 unmount 되어야 합니다.<br>

1. 모달의 닫기 버튼 클릭
2. 모달에 slide down 애니메이션 css 적용
3. slide down 애니메이션의 duration만큼 `setTimeout`
4. `closeModal()` 실행

## 소스코드

```javascript
const [isUnmounting, setIsUnmounting] = useState(false);

const handleClickClose = (e: MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  setIsUnmounting(true);

  setTimeout(() => {
    onClose && onClose();
  }, 200);
};

return (
  <BottomSheet
    onClose={closeWindow}
    className={classNames(!isUnmounting && 'animate-slideUp', isUnmounting && 'animate-slideDown')}
  />
);
```

## 문제점

- 좋지 않은 가독성
- 로직을 procedural하게 작성해야 하기 때문에 functional한 리액트 구조에는 이상적이지 않은 것 같음

# react-transition-group

react-transition-group이라는 오픈소스를 통해 리액트의 구조를 funtional하게 유지하면서 unmount 애니메이션을 적용할 수 있습니다.

```javascript
const [showBottomSheet, setShowBottomSheet] = useState(false);

const closeWindow = () => {
  setShowBottomSheet(false);
};

<Transition in={showBottomSheet} timeout={200} unmountOnExit>
  {(state) => (
    <BottomSheet
      onClose={closeWindow}
      formClassnames={classNames(
        state === 'entering' && 'animate-slideUp',
        state === 'exiting' && 'animate-slideDown'
      )}
    />
  )}
</Transition>;
```

# 참고자료

[react-transition-group - Transition](https://github.com/reactjs/react-transition-group/blob/master/src/Transition.js)
