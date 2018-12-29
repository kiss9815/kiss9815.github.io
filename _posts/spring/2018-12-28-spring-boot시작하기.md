---
title: "spring-boot 프로젝트 시작하기"
excerpt: "spring-boot 프로젝트 시작하기"
categories:
  - blogging
tags:
  - spring-boot
last_modified_at: 2018-12-29T13:00:00+09:00
toc: true
toc_sticky: true
---

# 부트 시작하기

STS > File > New > Spring Starter Project

프로젝트 생성하기
![시작하기](/assets/image/spring-boot1.PNG)
java 버젼및 빌드버젼, package명 설정

프로젝트명 확인 후 spring-boot 에서 사용할 기능을 바로 선택 가능
web 만 선택하고, 나중에 라이브러리 추가해도 됨.
![시작하기2](/assets/image/spring-boot2.PNG)

# maven으로 프로젝트 빌드
프로젝트 우클릭 > Run as > maven clean > maven install > maven build.. > Spring boot app 으로 프로젝트 시작

SpringBootBoilerPlateApplication 클래스의 main 메소드가 시작된다.
이 때 해당 클래스 명이 아니더라도 @SpringBootApplication 어노테이션이 있는 클래스의 main 메소드가 실행됨

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootBoilerPlateApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootBoilerPlateApplication.class, args);
	}

}
```
