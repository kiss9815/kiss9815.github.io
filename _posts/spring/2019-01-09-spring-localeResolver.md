---
title: "spring localeResolver란"
categories:
  - spring
tags:
  - localeResolver
last_modified_at: 2019-01-09T13:00:00+09:00
toc: true
toc_sticky: true
---

## 스프링 localeResolver

### 기본설정
```java
@Configuration
@EnableAutoConfiguration
@ComponentScan
public class I18nConfig extends WebMvcConfigurerAdapter {
	@Bean
	public LocaleResolver localeResolver() {
		// 쿠키를 사용한 예제
		CookieLocaleResolver resolver = new CookieLocaleResolver();
		resolver.setCookieName("lang");
		return resolver;
	}

    /** 언어 변경시 아래 코드 추가  */
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		LocaleChangeInterceptor localeChangeInterceptor = new LocaleChangeInterceptor();
		localeChangeInterceptor.setParamName("lang"); // ?lang={언어코드} 로 언어를 바꿀 수 있습니다.
		registry.addInterceptor(localeChangeInterceptor);
	}

	@Bean
	public MessageSource messageSource() {
		ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
		messageSource.setBasename("classpath:/i18n/messages");
		messageSource.setDefaultEncoding("UTF-8");
		return messageSource;
	}
}
```

### 메시지 소스 설정 파일
리소스/i18n/messages.properties (기본값)
리소스/i18n/messages_ko.properties (한국어)
리소스/i18n/messages_{언어코드}.properties

### 메시지 설정
리소스/i18n/messages_ko.properties
    title: 타이틀(한국어)
    hello: 안녕
    home: 홈

리소스/i18n/messages_en.properties
    hello: hello
    home: home

### 뷰(타임리프)
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
	<title th:text="#{title}"></title>
</head>
<body>
<div>
	<h1 th:text="#{home}"></h1>
	<h2 th:text="#{hello}"></h2>
	<a href="?lang=ko">한국어</a>
	<a href="?lang=en">영어</a>
</div>
</body>
</html>
```

### Locale Resolever
```java
@Bean
public LocaleResolver localeResolver() {
	// 세션을 사용한 예제
//		SessionLocaleResolver resolver = new SessionLocaleResolver();
//		resolver.setDefaultLocale(Locale.KOREAN);
	// 쿠키를 사용한 예제
	CookieLocaleResolver resolver = new CookieLocaleResolver();
//	resolver.setDefaultLocale(Locale.KOREAN); // 기본값 강제 한국어 설정.
	resolver.setCookieName("lang");
	return resolver;
}
```
http의 해더의 Accept-Language 에 의해 선택됩니다.
특이하게 setLocale 가 지원되지않습니다. 오직 브라우저 설정에 의해서만 설정된다고 합니다.

SessionLocaleResolver
처음 들어갈때에는 AcceptHeaderLocaleResolver 처럼 브라우저의 언어 설정에 의한 Accept-Language 로 값이 결정됩니다.
물론 setDefaultLocale 을 설정한다면 해당 기본값이 최우선입니다. (다음 문단에서 설명)
세션으로 저장되며, 필자의 버전기준으로 org.springframework.web.servlet.i18n.SessionLocaleResolver.LOCALE 라는 세션 속성이름으로 클래스를 시리얼라이징 되어 저장됩니다.

CookieLocaleResolver
SessionLocaleResolver와 속성이 동일하지만 lang 값이 바뀔경우 세션이 아닌 쿠키에 저장합니다.
때문에 세션의 경우 세션이 끊어지면 언어설정이 되돌아오지만 이 리졸버를 이용할 경우 쿠키에 값을 우선으로 불러옴.
CookieLocaleResolver추천

### LocaleResolver.setDefaultLocale
SessionLocaleResolver 에서도 설명했지만 setDefaultLocale 을 설정할 땐 주의해야 함.
setDefaultLocale을 설정하게되면 해당 값이 의도적으로 설정된다.
즉, setDefaultLocale 의 값이 Accept-Language 보다 더 높은 우선순위에 있다.
예를들어 영어로 설정한다면 한국어 브라우저로 접속하더라도 기본값이 영어로 설정이 된다.
다만 아에 디폴트를 설정하지 않을 경우 Accept-Language 에서 가장 높은 우선순위 값이 기본값으로 설정됨.
기본값이 없을때 브라우저별 기본값을 확인해보고 싶으신경우 의도적으로 Accept-Language 값을 바꿔서 보내거나,
브라우저 설정의 인터페이스 언어 같은 것 을 다른언어로 바꾼뒤에 접근하면 된다.
