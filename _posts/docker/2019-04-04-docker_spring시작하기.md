---
title: "spring docker 시작하기"
categories:
  - docker
tags:
  - docker
last_modified_at: 2019-04-04T13:00:00+09:00
toc: true
toc_sticky: true
---
## 도커 빌드 명령어
```
mvn package docker:build 으로 실행
```


## 도커 jar 이미지 띄우기
docker run -p $HOSTPORT:$CONTAINERPORT -t $IMAGE

$HOSTPORT 가 80 이면 브라우져의 port 가 80
$CONTAINERPORT 는 임베디드 톰캣의 사용하는 포트
```
docker run -p 80:9090 -t spring/docker_start
```

## 사용할만한 명령어
docker images : 이미지를 보여준다.
docker ps -a : 모든 컨테이너 정보다.
docker rm $CONTAINER_ID : 컨테이너를 삭제한다.
docker start $CONTAINER_ID : 컨테이너를 시작한다.
docker stop $CONTAINER_ID : 컨테이너를 중지한다.
docker logs $CONTAINER_ID : 로그를 확인한다.
docker logs -f $CONTAINER_ID : 실시간 로그를 확인한다.
docker top $CONTAINER_ID : 프로세서 정보를 확인한다.
docker inspect $CONTAINER_ID : 컨테이너의 모든 정보를 보여준다.(JSON)
docker port $CONTAINER_ID : 포트가 어디로 연결 되었있는지 보여준다.




참고문헌
> http://wonwoo.ml/index.php/post/268
