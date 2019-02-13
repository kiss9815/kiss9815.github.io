---
title: "java heap memory 정의 및 늘리기"
categories:
  - java-core
last_modified_at: 2019-02-13T13:00:00+09:00
toc: true
tags: # 태그 사용
    - heap memory

---


- JVM이 관리하는 프로그램 상에서 데이터를 저장하기 위해 런타임 시 동적으로 할당하여 사용하는 영역이다.
- New 연산자로 생성된 객체 또는 객체(인스턴스)와 배열을 저장한다.
- 힙 영역에 생성된 객체와 배열은 스택 영역의 변수나 다른 객체의 필드에서 참조한다.
- 참조하는 변수나 필드가 없다면 의미 없는 객체가 되어 GC의 대상이 된다.
- 힙 영역의 사용기간 및 스레드 공유 범위
- 객체가 더 이상 사용되지 않거나 명시적으로 null 선언 시
- GC(Garbage Collection) 대상
- 구성 방식이나 GC 방법은 JVM 벤더마다 다를 수 있다.
- 모든 스레드에서 공유한다.


[tomvat 메모리 설정](/_posts/java/tomcat/2019-02-13-tomcat-memory)

참고문헌
> https://hoonmaro.tistory.com/19
