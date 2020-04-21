---
title: "docker window에 설치하고 사용하기"
categories:
  - docker
tags:
  - docker window
last_modified_at: 2020-04-12T13:00:00+09:00
toc: true
toc_sticky: true
---


## logs volume 생성
```
docker volume create gitlab-logs
```

## data volume 생성 
```
docker volume create gitlab-data
```

## GitLab Container 생성 
```
docker run --detach ` --name gitlab ` --restart always ` --hostname localhost ` --publish 443:443 --publish 80:80 --publish 4422:22 ` --volume C:\Docker-GitLab:/etc/gitlab ` --volume gitlab-logs:/var/log/gitlab ` --volume gitlab-data:/var/opt/gitlab ` gitlab/gitlab-ce
```



참고문헌
> https://forgiveall.tistory.com/552 [도커window설치]
