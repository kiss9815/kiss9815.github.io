---
title: "spring-boot banner 넣기"
categories:
  - spring-boot
tags:
  - springboot banner
last_modified_at: 2019-01-12T13:00:00+09:00
toc: true
toc_sticky: true
---

## 스프링 부트 배너 만들기

src/main/resources 경로에 banner.txt 파일을 만들고, 그 안에 글자를 적는다.

멋진 banner 만들어주는 사이트
https://beyondj2ee.wordpress.com/2017/03/17/springboot-%EB%B0%B0%EB%84%88-%EB%A7%8C%EB%93%A4%EA%B8%B0/

스프링 부트 안에 환경변수 적을 수 있다.

## Banner variables

변수 설명
${application.version}
The version number of your application, as declared in MANIFEST.MF. For example, Implementation-Version: 1.0 is printed as 1.0.

${application.formatted-version}
The version number of your application, as declared in MANIFEST.MF and formatted for display (surrounded with brackets and prefixed with v). For example (v1.0).

${spring-boot.version}
The Spring Boot version that you are using. For example 2.1.1.RELEASE.

${spring-boot.formatted-version}
The Spring Boot version that you are using, formatted for display (surrounded with brackets and prefixed with v). For example (v2.1.1.RELEASE).

${Ansi.NAME} (or ${AnsiColor.NAME}, ${AnsiBackground.NAME}, ${AnsiStyle.NAME})
Where NAME is the name of an ANSI escape code. See AnsiPropertySource for details.

${application.title}
The title of your application, as declared in MANIFEST.MF. For example Implementation-Title: MyApp is printed as MyApp.

## custom

application.properties 에서 banner 를 끌 수 있다.
spring.main.banner-mode:"off"

또는 자바코드로 설정 가능

```java
public static void main(String[] args) {
	SpringApplication app = new SpringApplication(MySpringConfiguration.class);
	app.setBannerMode(Banner.Mode.OFF);
	app.run(args);
}
```
