---
title: "스프링 5.0 master 5장"
excerpt: "스프링부트"
categories:
  - blogging
tags:
  - spring
last_modified_at: 2018-12-07T19:00:00+09:00
toc: true
toc_sticky: true
---


SpringMaster 5장의 내용은 스프링 부트를 이용해서 마이크로서비스를 구축하는 방법에 관한 것이다. 스프링 부트의 목적은 마이크로서비스를 빠르게 개발하는 것이다. 이를 위해서는 웹 개발 환경을 빠르게 구축하는 것이다.

스프링 부트
스프링 부트는 코드를 생성하지 않음
스프링 부트는 애플리케이션 및 웹 서버와의 통합 제공
특정 프레임워크가 스펙을 구현하지 않음
프로토타입 구축에 필요한 12단계
사용할 스프링 MVC, JPA, 하이버네이트의 버전 결정
스프링 콘텍스트 설정
웹 레이어 설정
데이터 레이어에서 하이버네이트 설정
애플리케이션 구성 구현
단위 테스트 전략
트랜젝션 전략 구현
보안을 구현
로깅 프레임워크 설정
프로덕션 환경에서 애플리케이션 모니터링 구현
애플리케이션 통계 메트릭스 관리 시스템 결정 및 구현
애플리케이션을 패포하는 방법을 결정하고 구현
스프링 부트의 목표
스프링 기반 프로젝트 구축
기본값 제공
비기능 특징 제공
코드생성을 피하고, 과도한 XML 구성 피함
비기능적 특징
프레임워크, 서버 및 스펙의 버전 관리 및 설정에 대한 기본 처리
애플리케이션 보안을 위한 기본 옵션
확장 가능성이 있는 기본 애플리케이션 메트릭스
상태 확인을 사용한 기본 애플리케이션 모니터링
외부화된 설정을 위한 여러 옵션
스프링 부트 Hello World
스프링 부트 애플리케이션 시작하기
pom.xml 파일에서 spring-boot-starter-parent 설정하기
spring-boot-starter-parent 의존성은 사용할 자바 기본 버전, 스프링 부트가 사용하는 의존성의 기본 버전 및 메이븐 플러그인의 기본 설정을 포함
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.0.0.M1</version>
    </parent>
의존성의 특정 버전을 덮어쓰려면 pom.xml 파일에 적절한 이름을 가진 등록 정보를 제공해야 함
    <properties>
        <mockito.version>1.10.20</mockito.version>
    </properties>
필요한 스타터 프로젝트로 pom.xml 파일 구성하기
스타터는 커스텀이 단순화된 의존성 생성자
스프링 MVC를 사용해 웹 애플리케이션을 개발하고 싶다면 의존성에 spring-boot-starter-web을 포함시켜야 함
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-tomcat</artifactId>
    <scope>provided</scope>
</dependency>
애플리케이션 실행하려면 spring-boot-maven-plugin 설정함
다음과 같은 2가지 상황을 지원함

JAR 또는 WAR을 빌드하지 않고 애플리케이션을 실행하고 싶다.
나중에 배포할 수 있도록 JAR 및 WAR를 빌드하고자 한다.
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
실행할 때는 mvn spring-boot:run 을 통해 실행한다.
첫번째 스프링 부트 실행 클래스 만들기
package noryang;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;



@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(Application.class, args);
    }
}
SpringApplication 클래스
SpringApplication 클래스는 자바 메인 메서드에서 스프링 애플리케이션을 구동하고 부트스트랩을 사용

스프링의 ApplicationContext 인스턴스 생성
명령줄 인수를 받아들이고, 이를 스프링 속성으로 노출하는 기능을 활성화
설정에 따라 모든 스프링 빈을 로드
@SpringBootApplication은 3가지 Annotation에 대한 바로 가기를 제공

@EnableAutoConfiguration : 자동 설정을 가능하게 함
@Configuration : 스프링 애플리케이션 콘텍스트 구성 파일
@ComponentScan : 이 클래스의 패키지와 모든 서브패키지에서 스프링 빈을 검색
자동 설정
아래 코드는 스프링 애플리케이션 콘텍스트에 정의된 모든 빈의 이름을 출력하는 것이다.

package noryang;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        ApplicationContext ctx = SpringApplication.run(Application.class, args);
        String[] beanNames = ctx.getBeanDefinitionNames();
        Arrays.sort(beanNames);

        for (String beanName : beanNames) {
            System.out.println(beanName);
        }
    }
}
REST (Representational State Transfer)
기본적인 웹 아키텍쳐 스타일로, 일련의 제약 조건을 지정한다.

서버 : 서비스 공급자. 클라이언트에게 서비스 제공
클라이언트 : 서비스 소비자. 브라우저 또는 다른 시스템일 수 있음.
자원 : 모든 정보는 자원(사람, 이미지, 비디오)이 될 수 있다.
리프리젠테이션 : 자원을 표현하는 구체적인 방법, 예를 들면, JSON, XML, HTML등등
REST 제약 조건 중 일부는 다음과 같다.

클라이언트-서버 : 서버(서비스 공급자)와 클라이언트(서비스 소비자)가 있어야 한다.
무상태 : 각 서비스는 무상태여야 하며, 메시지는 자기설명적이어야 한다.
통일된 인터페이스 : 각 리소스에는 리소스 식별자가 있다.
캐시 가능 : 서비스 응답은 캐시가 가능해야 한다.
레이어 시스템 : 서비스 소비자를 서비스 공급자와 직접 연결하면 안된다. 요청을 캐시할 수 있다.
리프리젠테이션을 통한 자원 조작 : 자원은 여러 리프리젠테이션을 가질 수 있다.
HATEOAS : RESTful 애플리캐이션의 소비자는 단 하나의 고정 서비스 URL을 알아야 한다.

참고

  * RESTful : https://nesoy.github.io/articles/2017-02/REST
  * HATEOAS : http://blog.woniper.net/219
자동 설정 확인
자동 설정의 대부분은 spring-boot-autoconfigure-{version}.jar에서 유래한다.
스프링 부트 애플리케이션을 시작하면 다수의 빈이 자동으로 설정한다.
@ConditionalOnClass : 언급된 클래스 중 하나라도 클래스 패스에 있으면 자동 설정이 사용
@ConditionalOnMissingBean : 자동 설정은 애플리케이션이 WebMvcConfigureationSupport.class 클래스의 빈을 명시적으로 선언하지 않은 경우에만 활성화
@AutoConfigureOrder : 특정 자동 설정의 우선순위를 지정
