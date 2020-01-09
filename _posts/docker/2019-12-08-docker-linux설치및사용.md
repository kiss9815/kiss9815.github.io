---
title: "docker linux에 설치하고 사용하기"
categories:
  - docker
tags:
  - docker linux
last_modified_at: 2019-12-08T13:00:00+09:00
toc: true
toc_sticky: true
---


## 설치
```
curl -fsSL https://get.docker.com/ | sudo sh
```

## sudo 없이 사용하기 
```
sudo usermod -aG docker $USER # 현재 접속중인 사용자에게 권한주기
sudo usermod -aG docker your-user # your-user 사용자에게 권한주기
```
참고문헌
> https://subicura.com/2017/01/19/docker-guide-for-beginners-2.html [도커linux설치및사용]
