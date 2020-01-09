---
title: "docker compose mysql 실행"
categories:
  - docker
tags:
  - docker compose
last_modified_at: 2020-01-09T13:00:00+09:00
toc: true
toc_sticky: true
---


## 설치
```yml
version: '2'

services:
  mysql:
    container_name: mysql
    image: mysql:latest
    restart: always
    networks:
     - UDN_Database
    ports:
     - 30960(외부에 공개할 포트):3306
    volumes:
     - /home/ubuntu/docker/mysql/data:/var/lib/mysql
     - /home/ubuntu/docker/mysql/config:/etc/mysql/conf.d
    environment:
     - MYSQL_ROOT_PASSWORD=PassW@rd!! (Mysql 관리자 비밀번호, 관리자 계정은 root)
     - MYSQL_USER=tomcat (Mysql 사용자 계정)
     - MYSQL_PASSWORD=PassW@rd!! (Mysql 사용자 계정 비밀번호)

networks:
  UDN_Database:
    external:
      name: UDN_Database
  UDN_Service:
    external:
      name: UDN_Service
```

## 실행
```
docker-compose up -d mysql
```
docker-compose.yml에서 mysql이라는 이름을 가진 컨테이너를 백그라운드(-d)로 실행(up)하라는 의미입니다. 


참고문헌
> https://blog.knowledgebox.online/linux/lnx-mysql-with-docker/[Docker로Mysql설치하기]
