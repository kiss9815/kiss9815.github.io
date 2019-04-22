---
title: "hystrix dashboard"
categories:
  - spring
tags:
  - hystrix
last_modified_at: 2019-04-15T13:00:00+09:00
toc: true
toc_sticky: true
---

### hystrix 클라이언트 서버
여기에 actuator 와 hystrix 을 추가하고 @EnableCircuitBreaker 을 main 에 추가한다.

### hystrix 모니터서버
@EnableHystrixDashboard 를 추가하고
http://localhost:포트/hystrix url 에서 모니터링하고자 하는 서버의 주소를 등록한다.
서버주소/actuator/hystrix.stream

참고문헌
> https://multifrontgarden.tistory.com/238
