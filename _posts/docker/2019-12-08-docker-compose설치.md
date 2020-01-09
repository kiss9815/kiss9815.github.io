---
title: "docker compose linux 설치"
categories:
  - docker
tags:
  - docker compose
last_modified_at: 2020-01-09T13:00:00+09:00
toc: true
toc_sticky: true
---


## 설치
```
sudo apt-get update && sudo apt-get install docker-ce
```
```
sudo curl -L "https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose
```

참고문헌
> 
