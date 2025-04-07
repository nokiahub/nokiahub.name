---
category: "dev"
date: "2024-09-23"
title: "한번에 여러개 commit revert 하기"
description: "나 돌아갈래..."
tags: ["git"]
---

여러개 commit을 revert하고 싶을 때는 `git revert`를 여러번 사용해야 한다.
하지만 `git revert`를 커밋 갯수만큼 여러번 사용하면 힘들기 때문에 때문에 한번에 여러 커밋을 revert하는 방법을 알아보자.

```
gitGraph
commit id: "이전 커밋"
commit id: "의존성 설치"
commit id: "config.ts 파일 추가"
commit id: "Feature A 구현"
commit id: "Feature B 구현"
commit id: "Feature C 구현"
commit id: "코드 포맷"
commit id: "성능 이슈 발생!"
```

"이전 커밋"으로 git history는 남기면서 돌아가고 싶을 때는 revert를 쓰면 된다.<br/>
커밋이 많을 때는 커밋 이전의 hash만으로도 revert가 가능하다.

```bash title="terminal"
git revert --no-commit <"이전 커밋"의 hash>..HEAD
git commit -m "Revert changes after '이전 커밋'"
```

### Example
```bash title="terminal"
git revert --no-commit 3d1f4e..HEAD
git commit -m "Revert changes after '이전 커밋'"
```

# 참고자료
- [ChatGPT - Reverting Multiple Git Commits](https://chatgpt.com/c/66f0c008-a1e0-8011-af7d-02b7d38ba3a0)

