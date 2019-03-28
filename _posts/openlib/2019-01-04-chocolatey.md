---
title: "Chocolatey window 패키지 매니저"
categories:
  - openlib
tags:
  - Chocolatey
last_modified_at: 2019-01-03T13:00:00+09:00
toc: true
toc_sticky: true
---

## Chocolatey window 패키지 매니저 설치 및 사용 방법

설치
cmd.exe 를 열고 다음 명령어 실행

@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))" && SET PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin
또는 powershell 을 실행한 후에 파워쉘 프롬프트에서 설치 명령어 입력

iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))


다른 경로에 설치할 경우 ChocolateyInstall 환경 변수에 설치할 폴더를 지정하고 수동으로 폴더 생성

set ChocolateyInstall=d:\devel\choco  


패키지 검색/목록 보기
https://chocolatey.org/packages 에서 패키지 검색하거나 cmd 에서 다음 명령어 입력

search
$ choco search nodejs


Chocolatey v0.10.8
nodejs.install 8.5.0 [Approved]
nodejs 8.5.0 [Approved]
nodejs.commandline 6.11.0 [Approved]
yarn 1.0.1 [Approved] Downloads cached for licensed users
nodejs-lts 6.11.3 [Approved]
nodist 0.8.8 [Approved]
nvm 1.1.5 [Approved]
nvm.portable 1.1.5 [Approved] Downloads cached for licensed users
bower 1.8.0 [Approved]
....
21 packages found.


###exact search
기본 검색은 문자열이 포함된 모든 패키지를 나열하므로 정확하게 검색하려면 -e, --exact 사용
```
$ choco search nodejs -e

nodejs 8.5.0 [Approved]
1 packages found.
```

###모든 버전 표시
-a, --all, --allversions, --all-versions 추가
$ choco search nodejs -e -a --approved-only
---
title: "jekyll 설정"
excerpt: "jekyll 설정 내용"
categories:
  - pending
tags:
  - jekyll
last_modified_at: 2019-01-03T13:00:00+09:00
toc: true
toc_sticky: true
---

nodejs 8.5.0 [Approved]
1 packages found.

###list
전체 패키지 목록
choco list


###로컬에 설치된 패키지
choco list --local-only


info
패키지에 대한 자세한 정보를 보려면 search 에 아래 옵션 추가

choco search <pkgname> --exact --detailed
또는 위 명령의 축약어인 info 명령어 사용

choco info nodejs


설치
install package 명령어 사용후 라이센스 확인창에서 'Y' 입력

choco install nodejs


The package KB3035131 wants to run 'ChocolateyInstall.ps1'.
Note: If you don't run this script, the installation will fail.
Note: To confirm automatically next time, use '-y' or consider:
choco feature enable -n allowGlobalConfirmation
Do you want to run the script?([Y]es/[N]o/[P]rint): y


명령마다 확인 클릭이 어려울 경우 항상 yes 를 하도록 전역 설정 변경

choco feature enable -n=allowGlobalConfirmation


특정 버전 설치
--version 옵션으로 설치할 버전 명시

choco install php --version 5.6.31


choco install php --version 7.0.23




패키지 삭제
choco uninstall nodejs


upgrade
cholatey self upgrade

chocolatey upgrade chocolatey




https://www.lesstif.com/pages/viewpage.action?pageId=30277941
