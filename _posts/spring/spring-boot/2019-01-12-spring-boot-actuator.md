---
title: "spring-boot Actuator로 모니터링 만들기"
categories:
  - spring-boot
tags:
  - actuator
last_modified_at: 2019-01-12T13:00:00+09:00
toc: true
toc_sticky: true
---

## spring boot actuator란

스프링부트 애플리케이션에서 제공하는 여러가지 정보를 모니터링하기 쉽게 해주는 기능
정보 - 컨텍스트 빈, 환경 설정, 자동설정, JVM 상태

## Actuator setting

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

```python
dependencies {
    compile("org.springframework.boot:spring-boot-starter-actuator")
}
```
SpringBoot 2.x 부터는 default로 대부분의 정보를 노출하지 않는다
application.properties 변경
```
management.endpoints.web.exposure.include=*
#모든것을 노출 하겠다.
```
```
management.endpoints.web.exposure.exclude=env,beans
#환경 설정 정보와 스프링 빈들은 제외하고 노출하겠다.
```
exclude 설정이 include 속성보다 우선순위
```
#actuator 경로 url 설정 - 디폴트로 actuator 로 접근됨
management.endpoints.web.base-path=/application
management.endpoints.web.path-mapping.health=healthcheck
```
