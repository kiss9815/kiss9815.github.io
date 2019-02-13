---
title: "tomcat memory 설정"
categories:
  - tomcat
last_modified_at: 2019-02-13T13:00:00+09:00
toc: true
tags: # 태그 사용
    - tomcat

---

## 추가 방법

catalina.sh 에 설정 추가
JAVA_OPTS="$JAVA_OPTS -Xms256m -Xmx512m -XX:MaxPermSize=128m"

톰캣 시작할때 실행명령어로 메모리 설정해도 된다.
```
./startup.sh -Xms512m -Xmx1024m
```

Xms: 최초 JVM 이 로드될 때 부여할 메모리
Xmx: 최대 JVM 이 가질 수 있는 메모리
MaxPermSize: JVM 내의 클래스 정보가 담길 최대 메모리

여기서 메모리 증가시 증가되는 메모리는 힙메모리이다.
[자바 메모리](/_posts/java/java-core/2019-02-13-java-memory)

리눅스 명령어
```
ps -ef|grep java
```
로 jvm 에 설정된 메모리 확인 가능.


출처: https://mycup.tistory.com/215 [한글창제의 기쁨]
