---
title: "리눅스 alias setting"
categories:
  - linux
tags:
  - alias
last_modified_at: 2019-05-20T13:00:00+09:00
toc: true
toc_sticky: true
---

## 방법

Step1. 설정파일 열기
```
# vim ~/.bashrc
```
Step2. .bashrc 편집
 - 맨 윗줄에 아래와 같이 추가합니다.
```
alias tomcat_log='tail -f /var/log/tomcat5/catalina.out'
```
저장하고 빠져나옵니다.

Step3. 설정 파일 적용
```
# source ~/.bashrc
```
Step4. 실행
```
# tomcat_log
```

참고문헌
> https://okky.kr/article/198492
