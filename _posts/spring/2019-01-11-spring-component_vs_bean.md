---
title: "spring Component vs bean"
categories:
  - spring
tags:
  - Component
  - bean
last_modified_at: 2019-01-11T13:00:00+09:00
toc: true
toc_sticky: true
---


## Bean 과 Component 의 차이점

@Bean의 경우 개발자가 컨트롤이 불가능한 외부 라이브러리들을 Bean으로 등록하고 싶은 경우에 사용된다.
@Bean은 @Configuration으로 선언된 클래스 내에 있는 메소드를 정의할 때 사용한다. 이 메소드가 반환하는 객체가 bean이 되며 default로 메소드 이름이 bean의 이름이 된다.

개발자가 생성한 Class에 @Bean은 선언은 안된다.

개발자가 생성한 class에 @Component 를 선언한다.
@Component 의 종류에는  @Repository	 @Service	 @Controller 로 나뉜다.
