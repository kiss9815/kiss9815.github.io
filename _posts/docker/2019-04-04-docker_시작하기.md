---
title: "docker 시작하기"
categories:
  - docker
tags:
  - docker
last_modified_at: 2019-04-04T13:00:00+09:00
toc: true
toc_sticky: true
---

## 도커 로컬에 설치

## docker hub 생성

## docker push

docker login 명령어로 로컬에서 login 먼저
```
$ docker login
```
-->
docker hub 에 생성된 repo 이름과 똑같은 이름으로 docker tag 명령어로 docker 명을 바꾼다.
```
$ docker tag my_image $DOCKER_ID_USER/my_image   --my_image 에는 docker 이름, DOCKER_ID_USER 에는 계정명
```
이름 변경 뒤 docker push 명령어로 바로 푸쉬 가능. -hub에 생성된 repo 네임과 tag명령어로 바뀐 이름이 동일하면 바로 push가 됨.
```
$ docker push $DOCKER_ID_USER/my_image
```

참고문헌
> https://docs.docker.com/v17.12/docker-cloud/builds/push-images/ --도커 docs
