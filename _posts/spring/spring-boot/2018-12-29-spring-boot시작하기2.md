---
title: "spring-boot 프로젝트 시작하기2"
excerpt: "spring-boot 프로젝트 시작하기2"
categories:
  - spring
tags:
  - spring-boot
last_modified_at: 2018-12-29T13:00:00+09:00
toc: true
toc_sticky: true
---

# 부트 시작하기 2

@SpringBootApplication
어노테이션은

@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan
이 3개의 어노테이션을 모두 담고 있는 어노테이션이다.

스프링부트가 나오기 전까지는 ViewResolver를 설정하기 위해서 application-context.xml이  servlet-context.xml에
추가하거나, JavaConfig 기반의 환경일 경우, @Configuration 클래스 - WebMvcConfig등의 클래스 - 에 ViewResolver설정을 해줘야 했었다.

먼저 간단한 Controller 클래스를 만드는데, 클래스가 만들어지는 위치가 중요하다.
스프링부트는 메인클래스의 설정에 의해 컴포넌트스캔을 한다고 했었는데,
스프링부트는 컴포넌트 스캔을 할 때, 기본적으로 메인클래스가 있는 위치를 기준으로 스캔을 하게된다.
만약, AutoScan이 되어야 하는 컴포넌트 클래스들 - 대표적으로 @Controller, @Service, @Repository, @Component등-의 위치가
메인클래스가 위치한 패키지보다  상위 패키지에 있거나, 하위가 아닌 다른 패키지에 있는 경우, 스캔이 되지 않는다.

이런 문제를 해결하기 위해서는,
명시적으로 ComponentScan을 할 Base Package를 지정해주면 된다.

@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
SpringBoot 메인클래스에 Annotation을 추가함으로써
SpringBoot시작시 실행되는 Auto Configuration 작업중 DatatSource 설정부분을
제외시킬 수 있다.

```java
@SpringBootApplication
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})  // Datasource설정은 자동설정에서 제외
@ComponentScan(basePackages = "com.boilerPlate.app")
```
