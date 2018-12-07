---
title: "스프링 5.0 master"
excerpt: "스프링 5.0 master"
categories:
  - blogging
tags:
  - spring
last_modified_at: 2018-12-07T19:00:00+09:00
toc: true
toc_sticky: true
---

# 스프링 프레임워크 5.0의 발전

## EJB 문제점
    Servlet 클래스 상속받아 구현

## 스프링 프레임워크 인기 있는 이유
    POJO 라는 개념때문
    일반 객체로 웹 애플리케이션 구축 가능
    스프링에도 Servelt 클래스가 있지만 추상화되어 라이브러리로 있어 xml 또는 다른 설정으로 Servlet 이용


## 복잡한 코드 감소

## 아키텍처의 유연성

## 스프링 코어 컨테이너
    - 스프링 컨테이너 종류
        1) BeanFactory
            기본적인 의존성 주입을 지원하는 가장 간단한 형태의 컨테이너

        2) ApplicationContext  
            BeanFactory 와 유사하지만 기능이 더 많음


## 횡단 관심

## 웹

## 데이터
## 스프링 프로젝트

## 스프링 부트

## 스프링 클라우드

## 스프링 데이터

## 스프링 배치

## 스프링 시큐리티

## 스프링 HETEOAS

## 스프링 프레임워크 5.0
    - 1. Spring 3.0
        java 5 지원
        (1) 전체 프레임워크를 하나의 spring.jar 파일로 제공하던 부분을 여러개의 jar 파일로 나누어 제공한다.
        (2) SPEL(Spring Expression Language)가 도입되었다.
        (3) Rest API 에 대한 지원이 추가되었다.
        (4) OXM(Object Xml Mapping) 기능이 추가되어 설정을 Xml 형태로 할 수 있게 지원한다.
        (5) Java annotation 을 이용해서 DI 의 지원이 가능하다.

    - 2. Spring 4.0
        Spring 4.0 버전은 Java 8 의 특징들을 적용할 수 있게 지원한다.
        (1) Starter Pack 이 생겨서 초보 개발자들에게 큰 진입장벽인 POM 설정을 도와준다.
        (2) 기존에 사용하지 않지만 호환성을 위해 남겨져있던 Deprecated Package 들이 제거되었으며 Hibernate 3.6 이상, EhCache 2.1 이상, Groovy 1.8 이상, Joda-Time 2.0 이상 등 새로운 Dependency 들에 대해 지원한다.
        (3) Java6, Java7, Java8 의 고유 기능들에 대해 지원한다. 람다식, Optional, Callback Interface 등의 기능을 Spring framework 레벨에서 사용할 수 있다.
        (4) Java EE 6, 7 에 대해 고려되어 있다. JPA 2.0 과 Servlet 3.0 에 대한 지원이 포함되어 있다는 뜻이다.
        (5) Groovy 를 이용한 Bean 설정이 가능하다. 자세한 사용법은 GroovyBeanDefinitionReader 문서 참조 [문서 링크](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/beans/factory/groovy/GroovyBeanDefinitionReader.html)

        ```python
        def reader = new GroovyBeanDefinitionReader(myApplicationContext)
        reader.beans {
            dataSource(BasicDataSource) {
                driverClassName = "org.hsqldb.jdbcDriver"
                url = "jdbc:hsqldb:mem:grailsDB"
                username = "sa"
                password = ""
                settings = [mynew:"setting"]
            }
            sessionFactory(SessionFactory) {
                dataSource = dataSource
            }
            myService(MyService) {
                nestedBean = { AnotherBean bean ->
                    dataSource = dataSource
            }
        ```   

        (6) Core 컨테이너들의 기능 지원이 확대되어있다. 먼저 Repository 들이 좀 더 쉽게 Inject 될 수 있으며, 각종 Metadata Annotation 들을 이용한 Custom Annotation 작성이 가능하다. @Lazy 를 이용한 Lazy Injection 이나 @Order 을 통한 Ordered Interface, @Profile 을 통한 프로필 버전 관리가 쉬워졌다.
        - Spring은 Bean을 injecting할 때, generic type을 다룰 수 있다. 예를 들어, Spring Data “Repository”를 사용할 때, 정의된 구현제를 쉽게 사용할 수 있다.
        - Spring의 meta-annotation을 사용한다면, Source annotation에서 attribute를 재정의하는 것이 가능하다.
        Bean들은 list나 array에 autowired 될 때, 정렬이 될 수 있다. @Order 혹은 Ordered interface를 사용
        - @Lazy annotation도 injection 시점에서 사용될 수 있다.
        Java-based configuration을 사용하는 개발자들을 위해 @Description annotation이 추가되었다.
        (7) Web 을 개발하기 위한 도구들이 생겼다. @RestController 같은 것들이 그것이다. -> view가 전혀 필요없는, API만 지원하는 서비스,  @ResponseBody 를 이미 포함
        @RequestMapping method에 @ResponseBody를 붙이지 않아도 된다.
        (8) Web Socket 이나 STOMP 등의 프로토콜을 같이 지원한다.
        (9) 테스트 환경이 개선되었다. Framework 레벨에서 Mock 을 위한 ServletContext 를 별도로 지원한다.
    - 3. Spring 5.0
        Spring 5.0 은 JDK 8+, 9 등에 대해서 지원하며 Java8을 표준으로 사용한다.
        (1) 코어로직에 있어서 JDK 8의 특징들이 강화되었다.
        (2) HTTP 메시지 코덱의 XML과 JSON 지원에 대한 구현이 Encoder 와 Decoder 의 사용을 통해 추상화 되었다.
        (3) 웹에 대한 지원이 향상되었다. 특히 Protobuf 3.0 지원이 적용되었다.
        (4) Reactive Programming

        (5) 코틀린 지원
