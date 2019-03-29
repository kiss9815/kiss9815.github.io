---
title: "java executors 사용"
categories:
  - Thread
tags:
  - executors
last_modified_at: 2019-03-27T13:00:00+09:00
toc: true
toc_sticky: true
---

##1. 자바 스레드풀 관리
### newFixedThreadPool
주어진 스레드개수만큼 생성하고, 그 수를 유지한다. 이때 생성된 스레드중 일부가 작업시 종료되었다면 스레드를 다시생성하여 주어진 수를 맞춘다.

### newCachedThreadPool
처리할 작업의 스레드가 많아지면 그 만큼 스레드를 증가하여 생성한다. 만약 쉬는 스레드가 많다면 스레드를 종료시킨다. 반면 스레드를 제한두지 않기때문에 조심히 사용해야 한다.

### newSingleThreadExecutor
스레드를 단 하나만 생성한다. 만약 스레드가 비정상적으로 종료되었다면 다시 하나만 생성한다.

### newScheduledThreadPool
특정시간 이후에 실행되거나 주기적으로 작업을 실행할 수 있다.




참고문헌
> https://yookeun.github.io/java/2015/06/17/java-thread-pool/
