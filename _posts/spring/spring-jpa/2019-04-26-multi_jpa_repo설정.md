---
title: "스프링부트 jpa db 여러개 설정"
categories:
  - spring
tags:
  - jpa
last_modified_at: 2019-04-26T13:00:00+09:00
toc: true
toc_sticky: true
---

## jpa 여러개 설정하기
yml 에서만으로는 불가능하고, 설정값으로 등록후 코드에서 datasource 를 생성

```java
@EnableJpaRepositories(
	basePackages = "com.example.repo.beta",
	entityManagerFactoryRef = "betaEntityManager",
	transactionManagerRef = "betaTransactionManager"
)
```
다음과 같이 각각 db 마다 config 파일을 따로 만들고, EnableJpaRepositories 의 설정값을 각각 만들어준다.
메인이 되는 db에 @Primary 라는 어노테이션 추가해야함. (아마 해당 db의 테이블정보를 먼저 scan 하는것 같다.)


참고문헌
> https://cpdev.tistory.com/74
> https://hojak99.tistory.com/498
> https://jogeum.net/2   -- 제일 자세함
