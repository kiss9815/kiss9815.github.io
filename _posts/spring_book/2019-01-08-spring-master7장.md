---
title: "스프링 5.0 master 7장"
categories:
  - spring
tags:
  - spring-master책
last_modified_at: 2019-01-08T19:00:00+09:00
toc: true
toc_sticky: true
---

## 고급 스프링 부트 기능

## application.properties
시큐러티 커스터마이징
```
security.basic.enabled=false
management.security.enabled=false
security.user.name=user-name
security.user.password=user-password
security.oauth2.client.clientId: clientId
security.oauth2.client.clientSecret: clientSecret
security.oauth2.client.authorized-grant-types:
authorization_code,refresh_token,password
security.oauth2.client.scope: openid
```

로깅 커스터마이징
```
# 로깅 구성 파일의 위치
logging.config=
# 로깅 파일 이름
logging.file=
# 로깅 레벨 수성
logging.level.*
```

임베디드 서버 설정
```
# 에러 컨트롤러 경로
server.error.path=/error
# 서버 HTTP 포트
server.port=8080
# SSL 지원 가능 여부
server.ssl.enabled=
# SSL 인증서 key strore 경로
server.ssl.key-store=
# SSL Stroe 암호
server.ssl.key-store-password=
# SSL Stroe 프로바이더
server.ssl.key-store-provider=
# SSL Stroe 타입
server.ssl.key-store-type=
# 톰캣 access log 활성화 여부
server.tomcat.accesslog.enabled=false
# 서버가 허용할 수 있는 최대 연결 수
server.tomcat.max-connections=
```

스프링 MVC
```
# 사용할 날짜 형식. 예를 들어  'dd/MM/yyyy'
spring.mvc.date-format
# 사용할 로케일
spring.mvc.locale=
# 로케일을 해결할 방법을 정의
spring.mvc.locale-resolver=accept-header
# 핸들러를 찾을 수 없을 때 "NohandlerFoundException" 을 발생할지 여부
spring.mvc.thorow-exception-if-no-handler-found=false
# 스프링 MVC 뷰 접두사. 뷰 리졸버에서 사용됨
spring.mvc.view.prefix
# 스프링 MVC 뷰 접미사. 뷰 리졸버에서 사용됩.
spring.mvc.view.suffix=
```

데이터 소스, JDBC와 JPA
```
# JDBC 드라이버의 정규화된 이름
spring.datasource.driver-class-name=
# 'data.sql' 을 사용해 데이터배우스 채우기
spring.datasource.initialize=true
# 데이터 소소의 JNDI 위치
spring.datasource.jndi-name=
# 데이터 소스의 이름
spring.datasource.name=testdb
# 데이터베이스의 로그인 암호
spring.datasource.password
# 스키마(DDL) 스크립트 리소스 참조
spring.datasource.schema=
# DDL 스크립트를 실행하는 데 사용할 DB 사용자
spring.datasource.schema-username=
# DDL 스크립트를 실행하는 DB 암호
spring.datasource.schema-password=
# 데이터베이스의 JDBC url
spring.datasource.url
# JPA - 시작할 때 스키마를 초기화함
spring.jpa.generate-ddl=false
# AUTO, TABLE 및 SEQUENCE를 위해 Hibernate의 새로운 IdentifierGenerator를 사용
spring.jpa.hibernate.use-new-id-generator-mappings=
# SQL 스테이트먼트의 로깅을 사용
spring.jpa.show-sql=false
```

기타 구성 옵션
```
# 액티브 프로파일의 쉼표로 구분된 목록(또는 YAML을 사용하는 경우의 목록)
spring.profiles.active
# HTTP 메시지 변환. jackson 또는 gson
spring.http.converters.prefered-json-mapper-jackson   
# JACKSON 날짜 형식 문자열, 예 'yyyy-MM-dd HH : mm :ss'
spring.jackson.date-format=
# 기본 트랜잭션 시간 초과(초)
spring.transaction.default-timeout=
# 커밋 실패 시 롤백을 수행
spring.transaction.rollback-on-commit-failure=
# 국제화: 쉼표로 구분도 베이스 목록
spring.message.basename=messages
# 리소스 번들의 캐시 만료(초). -1은 영원히 캐시함.
spring.messages.cache-seconds=-1
```

커스텀 속성
```
somedataservice.url=http://abc.service.com/something
```
```java
@Component
public class SomeDataService {
    @Value(${somedataservice.url})
    private String url;
    public String retrieveSomeData(){
        return "data from service";
    }
}
```
somedataservice.url 값은 빈의 메소드에서 사용될 수 있다.
@Value 단점
    - 한 서비스에서 3개의 속성값을 사용하려면 @Value 를 사용해 세 가지 속성값을 오토와이어해야 한다.
    - @Value 어노테이션과 메시지의 키는 애플리케이션 전체에 분산. 값 찾으려면 프로젝트 전체에서 @Value 어노테이션을 검색해야 함


ConfigurationProperties 기능
```java
@Component
@ConfigurationProperties("application")
public class ApplicationConfiguration {
    private boolean enableSwitchForService1;
    private String service1Url;
    private int service1Timeout;
    public boolean isEnableSwitchForService1() {
        return enableSwitchForService1;
    }
    public void setEnableSwitchForService1(boolean enableSwitchForService1) {
        this.enableSwitchForService1 = enableSwitchForService1;
    }
    public String getService1Url() {
        return service1Url;
    }
    public void setService1Url(String service1Url) {
        this.service1Url = service1Url;
    }
    public int getService1Timeout() {
        return service1Timeout;
    }
    public void setService1Timeout(int service1Timeout) {
        this.service1Timeout = service1Timeout;
    }
}
```
ConfigurationProperties 기능을 통해 애플리케이션 구성에 더 나은 접근 방식 제공
위 빈은 모든 애플리케이션 속성에 대한 중앙 리포지토리 역할 수행
@ConfigurationProperties("application") 은 외부화된 구성에 대한 어노테이션으로 이 어노테이션을 모든 클래스에 추가하면

---
war 파일 생성

---
스프링 개발자 도구

---
스프링 부트 액추에이터

---
HAL 브라우저

---
빈즈

---
메트릭스

---
클라우드 파운드리

---
