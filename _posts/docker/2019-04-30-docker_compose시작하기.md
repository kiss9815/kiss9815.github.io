---
title: "docker 시작하기"
categories:
  - docker
tags:
  - docker-compose
last_modified_at: 2019-04-30T13:00:00+09:00
toc: true
toc_sticky: true
---

## 설치
docker-compose 설치는 매우매우 쉽다. 아래를 따라하면 된다. 출처는 https://docs.docker.com/compose/install/
윈도우는

```
curl -L https://github.com/docker/compose/releases/download/1.6.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

## docker-compose 실행하기
https://docs.docker.com/compose/wordpress/
에 워드프레스 docker-compose.yml 파일이랑 실행방법 있음

yml 파일 설치된 dir 에서 실행
```
docker-compose up -d ##시작
```
```
docker-compose down -d ##내리기
```

## docker-compose.yml 설정값
http://raccoonyy.github.io/docker-usages-for-dev-environment-setup/
참고


참고문헌
> http://raccoonyy.github.io/docker-usages-for-dev-environment-setup/ --도커 docs
