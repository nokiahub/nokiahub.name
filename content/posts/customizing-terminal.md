---
category: "dev"
date: "2025-02-02"
title: "oh-my-zsh + powerlevel10k 설정하기"
description: "터미널을 더 친숙하게 내 입맛대로 설정하기"
tags: ["all"]
---

세부적으로 터미널을 설정하지 않아도 IDE만으로 개발이 가능해서 설정을 미루고 있었습니다.<br />
터미널 설정은 터미널에서 자동완성, git 상태와 같이 있으면 편한 기능을 이용하기 위해서 필요한데 최근까지는 하지 않고 있다가, 페어 프로그래밍을 할 때 일일히 command line을
입력하는 것이 생각보다 비효율적인 일이라는 것을 체감했기 때문입니다.<br />

## Iterm
가장 심플하게 터미널 테마를 변경하는 방법은 iterm의 기본 세팅을 사용하는 것 입니다.<br/>

Terminal 앱을 실행 후, `Settings > Profiles > Colors > Color Presets` 에서 원하는 테마를 설정하면 됩니다.<br />
제가 애용하는 solarized 테마 또한 iterm이 기본적으로 제공합니다.<br />

터미널의 테마는 변경했지만 터미널에서 좀 더 다양한 플러그인을 사용하고 싶거나, 구성요소들을 커스텀하고 싶다면 oh-my-zsh와 powerlevel10k를 사용합니다.<br />

## Oh-my-zsh

### Installation

  ```bash title="terminal"
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
  ```

### 사용법
- 빌트인 플러그인으로 여러 플러그인들을 확인 후 필요한 플러그인을 사용합니다.<br />
- 이 예시에서는 [chucknorris](https://en.wikipedia.org/wiki/Chuck_Norris) 플러그인을 설치 후 사용해보겠습니다.<br />


```bash title="terminal"
vi ~/.zshrc
```

.zshrc 파일에 plugin을 다음과 같이 추가합니다.<br />
```bash title="terminal"
plugins=(chucknorris)
```

[chucknorris Requirements](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/chucknorris)대로 기타 requirements를 설치합니다.<br />

터미널 재시작 후 플러그인에서 제공하는 명령어를 입력하면 chucknorris의 명언을 볼 수 있습니다.<br />

<img src="https://d28uuyslcox01d.cloudfront.net/work/chucknorris.gif" alt="chucknorris terminal plugin" />

이 외에도 유용한 플러그인([zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md), [git](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git))들이 있으니 필요한 플러그인을 추가하여 사용하면 됩니다.<br />
> [oh-my-zsh plugin 목록](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins)

## Powerlevel10k
powerlevel10k로 터미널의 여러 구성요소들을 마법사를 사용하여 커스텀할 수 있습니다.<br />

### Installation
```bash title="terminal"
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k
echo 'source ~/powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc
```

터미널을 재시작하고 `p10k configure` 커맨드로 마법사를 시작합니다.<br />

```bash title="terminal"
p10k configure
```

<img src="https://d28uuyslcox01d.cloudfront.net/work/p10k_configure.png" alt="powerlevel10k configure" />


## Reference
- [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh)
- [powerlevel10k](https://github.com/romkatv/powerlevel10k?tab=readme-ov-file#manual)
- [더 이상 zsh theme로 고통받지 마세요 - Powerlevel10k](https://devocean.sk.com/blog/techBoardDetail.do?ID=165667&boardType=techBlog)