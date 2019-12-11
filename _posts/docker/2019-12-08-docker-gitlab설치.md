---
title: "docker 로 gitlab설치하기"
categories:
  - docker
tags:
  - gitlab
last_modified_at: 2019-12-08T13:00:00+09:00
toc: true
toc_sticky: true
---

## 도커 실행
```
sudo docker run --detach \
  --hostname gitlab.example.com \
  --publish 8929:8929 --publish 2289:22 \
  --name gitlab \
  --restart always \
  --volume /srv/gitlab/config:/etc/gitlab \
  --volume /srv/gitlab/logs:/var/log/gitlab \
  --volume /srv/gitlab/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest
```
gitlab/gitlab-ce:latest -> 도커이미지 repostory명:tag

서버에서 8929 포트만 추가로 열어주자. 위의 경우

## port 설정
```
external_url "http://gitlab.example.com:8929"
```
여기에서 gitlab.example.com 은 본인 domain 이 아니여도 host_name 으로 사용해도 됨

## 로그 보기
docker logs -f gitlab



GitLab 서버의 요구 사양은 2Core, 4G RAM 입니다.

참고문헌
> https://devyurim.github.io/development%20environment/docker/2018/06/27/docker-1.html[gitlab도커설치및설정]
> https://docs.gitlab.com/omnibus/docker/ [공식gitlab도커문서]
> https://dejavuqa.tistory.com/7[Ubuntu에GitLab설치]