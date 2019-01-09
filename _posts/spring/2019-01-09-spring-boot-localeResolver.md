---
title: "spring-boot localeResolver 설정"
categories:
  - spring-boot
tags:
  - localeResolver
last_modified_at: 2019-01-09T13:00:00+09:00
toc: true
toc_sticky: true
---

## 스프링 부트 localeResolver

```java
@SpringBootApplication
public class UserServiceApplication implements WebMvcConfigurer {

    ...
    @Bean
    public LocaleChangeInterceptor localeChangeInterceptor() {
        LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
        return lci;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(localeChangeInterceptor());
    }
}
```
메소드 이름에서 짐작하겠지만 첫 번째 메소드는 LocaleChangeInterceptor를 bean으로 등록하는 것이고 두 번째 메소드는 등록된 LocaleChangeInterceptor bean을 Interceptor로 등록(추가).
한 가지 더 추가로 얘기하자면 스프링 5.0 이전 버전에서는 WebMvcConfigurerAdapter를 상속해야 했지만 5.0부터는 WebMvcConfigurer 인터페이스에 default method가 추가되어 WebMvcConfigurer 인터페이스를 직접 구현하도록 바뀌었으므로 참고.
