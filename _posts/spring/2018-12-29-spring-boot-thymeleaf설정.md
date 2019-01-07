---
title: "spring-boot 프로젝트 thymeleaf 설정"
excerpt: "spring-boot 프로젝트 thymeleaf 설정"
categories:
  - spring
tags:
  - spring-boot
last_modified_at: 2018-12-29T13:00:00+09:00
toc: true
toc_sticky: true
---

# Thymeleaf란?
- "타임 리프"라고 읽는다.
- 텍스트, HTML, XML, Javascript, CSS 그리고 텍스트를 생성할 수 있는 템플릿 엔진이다.
- 순수 HTML로 템플릿을 작성할 수 있다.
- Spring Boot에서 사용이 권장되고 있다. (Spring Boot에서는 JSP를 추천하지 않는다.)

gradle
    compile 'org.springframework.boot:spring-boot-starter-thymeleaf'

maven
    <dependency>
    	<groupId>org.springframework.boot</groupId>
    	<artifactId>spring-boot-starter-thymeleaf</artifactId>
    </dependency>

# view 매핑

```java
@Controller
public class MainController {
	@RequestMapping(value="/main", method=RequestMethod.GET)
	public String main() {
		return "main";
	}
}
```

return 값이 String 이면 templates 라는 경로에서 같은 이름의 main.html 을 찾아서 view 를 브라우져에 return 한다.
Spring 처럼 ViewResolver 설정을 굳이 하지 않아도 된다.

html 파일은 src/main/resources 에 templates 라는 이름으로 html 파일을 만든다. 폴더명을 templates 가 아니라 다른 명으로 정하면 defaults 상태에서는 error 리턴.

---
참고문헌
<https://www.thymeleaf.org/doc/tutorials/3.0/thymeleafspring.html>
