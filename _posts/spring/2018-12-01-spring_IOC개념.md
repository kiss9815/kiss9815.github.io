---
title: "스프링 IOC개념"
categories:
  - spring
tags:
  - spring
last_modified_at: 2018-12-01T13:00:00+09:00
toc: true
toc_sticky: true
---

## IoC란 프로그램의 제어 흐름 구조가 바뀌는 것
일반적인 프로그램의 흐름 구조는 main()과 같은 프로그램이 시작되는 지점에서 사용할 오브젝트를 결정, 생성하고, 생성된 오브젝트 내의 메소드를 호출하는 작업을 반복하는 구조이다.
즉, 모든 종류의 작업을 사용하는 쪽에서 제어하는 구조

** __IoC는 제어 흐름의 개념을 거꾸로 뒤집는 개념__ 이다.
오브젝트는 자신이 사용할 오브젝트를 스스로 생성하거나 선택하지 않는다.

모든 제어 권한을 자신이 아닌 다른 대상에게 위임하는 것

프로그램의 시작을 담당하는 main()같은 엔트리 포인트를 제외하면 모든 오브젝트는 제어 권한을 위임받은 특별한 오브젝트에 의해 결정되고 만들어지는 것

<IoC 개념 정리>
- 작업을 수행하는 쪽에서 Object를 생성하는 제어 흐름의 개념을 거꾸로 뒤집는 것.
- IoC에서는 Object가 자신이 사용할 Object를 생성하거나 선택하지 않는다.
- Object는 자신이 어떻게 생성되고 어떻게 사용되는 지 알 수 없다.
- 모든 Object는 제어권한을 위임받은 특별한 Object에 의해서 만들어지고 사용된다.    


## IoC 구현방법
.DL (Dependency Lookup)  - 의존성 검색
   저장소에 저장되어 있는 빈(Bean)에 접근하기 위해서 개발자들이 컨테이너에서 제공하는 API를 이용하여
   빈(Bean)을 Lookup 하는 것
.DI(Dependency Injection) - 의존성 주입
   DL을 사용시에는 컨테이너에 대한 종속성이 증가하기 때문에, 이러한 종속성을 줄이기 위해서 DI를 사용
       각 계층 사이, 각 객체(클래스)사이에 필요로 하는 의존 관계를 컨테이너가 자동으로 연결 해주는 것
   각 클래스 사이의 의존 관계를 빈 설정(Bean Definition) 정보를 바탕으로 컨테이너가 자동으로 연결해주는 것

    - setter Injection
    - constructor Injection


## IoC 용어 정리
.bean - 스프링에서는 제어권을 가지고 직접 만들고 관계를 부여하는 오브젝트
   자바빈, EJB의 빈과 비슷한 오브젝트 단위의 어플리케이션 컴포넌트를 의미.
   스프링 빈은 스프링 컨테이너가 생성, 관계설정, 사용등을 제어해주는 오브젝트를 가리킨다.

 .bean factory : 스프링의 IoC를 담당하는 핵심 컨테이너
     빈을 등록/ 생성/조회/반환/관리 한다. bean factory를 바로 사용하지 않고 이를 확장한 Application Context를 이용한다.  

  BeanFactory는 bean factory가 구현하는 Interface 이다. (getBean()등의 메소드가 정의)  

 .application Context - bean Factory를 확장한 IoC 컨테이너 	
     빈을 등록/생성/조회/반환/관리 기능과 함께 스프링의 각종 부가 서비스를 추가로 제공한다.

  ApplicationContext는 interface이며 BeanFactory를 상속한다.

 .configuration metadata(설정정보/ 설정 메타정보)
  application context 혹은 bean factory 가 Ioc를 적용하기 위해 사용하는 메타정보

     스프링의 설정정보는 컨테이너에 어떤 기능을 설정하거나 조정하는 경우에 사용되기 하고, 주로  bean을 생성/구성하는 용도로 사용된다.

 . container(IoC container)    
   IoC 방식으로 bean을 관리한다는 의미에서 bean factory나 application context를 가리킨다.
   (spring container = application context)
   application context는 그 자체로는 ApplicationContext인터페이스를 구현한 오브젝트를 의미한다.
       하나의 어플리케이션에서는 보통 여러 개의 ApplicationContext Object가 만들어진다.
       이를 통칭해서 spring container라고 부른다.
       객체를 관리하는 컨테이너

 . spring framework : IoC container, application context를 포함해서 스프링에서 제공하는 모든 기능을 통칭  
