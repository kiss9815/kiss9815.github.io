---
title: "스프링 5.0 master 1장"
excerpt: "스프링 5.0 master 1장"
categories:
  - blogging
tags:
  - spring
last_modified_at: 2018-12-07T19:00:00+09:00
toc: true
toc_sticky: true
---

# DispatcherServlet 순서도
    ![DispatcherServlet](/assets/image/spring_mvc_dispatcherServelt.png)
    1. 클라이언트(사용자)의 모든 요청은 DispatcherServlet이 받는다.
    2. DispatcherServlet은 hanlderMapping을 통해서 요청에 해당하는 Controller를 실행 시킨다.
    3. Controller는 적절한 서비스 객체를 호출 시킨다.
    4. Service는 DB처리를 위해  DAO를 이용하여 데이터를 요청 한다.
    5. DAO는 mybatis를 이용하는 Mapper를 통해 작업 처리를 한다.
    6. 결과(처리한 데이터)가 mapper->DAO->Service->Controller로 전달된다.
    7. Contorller는 전달된 결과(처리된 데이터)를 View Resolver를 통해
    전달 받을 View가 있는지 검색한다.
    8. 전달 받은 View가 있다면 View에게 전달된 결과(처리된 데이터)를 전달한다.
    9. View는 전달받은 결과(처리된 데이터)를 다시 DispatcherServlet에게 전달한다.
    10. DispatcherServlet은 전달받은 결과(처리된 데이터)를 클라이언트에게 전달한다.

    Front Controller의 역할은 서버로 들어오는 모든 요청을 받아서 처리합니다.

    스프링에서 제공하는 FrontController인 DispatcherServlet의 역할은 무엇일까요??

    DispatcherServlet의 등장으로 엄청나게 web.xml의 역할이 축소 된 것입니다.

    DispatcherServlet가 있기전에는 사용자의 URL을 일일이 요청을 처리하기 위해
    web.xml에 등록(서블릿과 매핑시켜주는 작업)을 반드시 해야했었습니다.

    그렇다고 web.xml이 안쓰이는 것은 아닙니다.

    web.xml에서 자주 쓰이는 서블릿 매핑을 DispatcherServlet이 한다고 생각하시면 되고

    나머지 web.xml의 기능들은 그대로 web.xml을 이용하신다고 생각하시면됩니다.

    (web.xml의 기능은 DispatcherServlet등록, 객체의 URL범위 , 필터 등이 있습니다.)

# 스프링 MVC Controller의 특징

    1. 파라미터 수집

    -사용자의 요청에 필요한 데이터를 추출하고
    VO(DB의 레코드와 상응되는 클래스) 나 DTO(컨트롤러,뷰,비즈니스등의 계층간 데이터 교환을 위한 자바빈즈)로 변환하는 파라미터의 수집 작업을 합니다.


    2. 애노테이션을 통한 간편 설정
    -스프링 MVC 설정은 MVC나 애노테이션을 사용가능하고, 주로
    애노테이션을 이용하여 클래스나 메소드의 선언에 필요한 애노테이션을 추가하는
    작업을 통해 요청이나 응답에 필요한 모든 처리를 완료할 수 있습니다.



    3.테스트의 편리

    -WAS의 실행없이도 테스트할 수 있는 편리한 방법을 제공

# servlet-context.xml 사용

    프로젝트 생성시 DispatcherServlet인
    servlet-context.xml에 대해 알아보겠습니다.

    spring-servlet-context-xml
    ![servelt-context](/assets/image/spring-servlet-context-xml.png)
    <annotation-driven>
    -클래스 선언에 애노테이션을 이용해서 컨트롤러를 작성 가능하게 합니다.

    <resources>
    -웹 이미지/CSS/javaScript 파일과 같이 고정된 자원들의 위치

    (스프링 MVC패턴 자체가 디스패처 서블릿이 모든 요청을 컨트롤러에게 넘겨주는 방식인데 css등의 요청들도 컨트롤러에게 넘겨주면 컨트롤러가 해야할 일도 아니지만 컨트롤러는 해당하는 요청이 없기 때문에 에러가 날 것입니다. 만약 정상작동 하더라도 JSP안의 CSS나 자바스크립트등을 디스패처 서블릿이 가로채가서 원하는 화면이 안나올 것입니다. 이를 해결하기위해 resources가 있는것이죠)

    <component-scan>

    -패키지 내부의 클래스(클래스 패스에 위치해있는 클래스)들을 조사하는 것으로
    만약 <annotation-driven>과 같이 사용하게 된다면
    특정한 애노테이션이 붙은 클래스를 자동으로 빈으로 등록하는 기능을 제공합니다.
