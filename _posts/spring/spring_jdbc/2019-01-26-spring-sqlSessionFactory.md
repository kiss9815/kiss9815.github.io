---
title: "sqlSessionFactory 란"
categories:
  - spring
tags:
  - sqlSessionFactory
last_modified_at: 2019-01-26T13:00:00+09:00
toc: true
toc_sticky: true
---

## SqlSessionFactory

SqlSessionFactory는 데이터베이스와의 연결과 SQL의 실행에 대한 모든 것을 가진 가장 중요한 객체다.
이 객체가 DataSource를 참조하여 MyBatis와 Mysql 서버를 연동시켜준다.

SqlSessionFactory를 생성해주는 SqlSessionFactoryBean 객체를 먼저 설정하여야 한다.
root-context.xml
```xml
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"></property>
</bean>
```

## cofing
MyBatis는 SQL Mapping 프레임워크로 별도의 설정 파일을 가질 수 있다.
src/main/resources에 mybatis-config.xml 파일을 추가
```xml
<!-- mybatis-config.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
    PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

</configuration>
```
 Mybatis에 별도의 설정을 주고 싶으면 위의 파일을 이용
root-context.xml의 sqlSessionFactory에 다음과 같이 configLocation 속성을 추가
```xml
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"></property>
    <property name="configLocation" value="classpath:/mybatis-config.xml"></property>
</bean>
```
설정파일이 필요한 다른 이유는 마이바티스 XML파일이 매퍼 클래스와 동일한 클래스패스에 있지 않은 경우이다. 이 설정을 사용하면 두가지 옵션이 있다.
첫번째는 마이바티스 설정파일에 <mappers> 섹션을 사용해서 XML파일의 클래스패스를 지정하는 것이다.
두번째는 팩토리 빈의 mapperLocations 프로퍼티를 사용하는 것이다.
```xml
<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
  <property name="dataSource" ref="dataSource" />
  <property name="mapperLocations" value="classpath*:sample/config/mappers/**/*.xml" />
</bean>
```


## Test
SqlSessionFactory를 이용해 MyBatis와 Mysql 서버가 제대로 연결되는지 테스트
rc/test/java 폴더에 MyBatisTest라는 파일 생성

```java
public class MyBatisTest {
	//SqlSessionFactory 객체를 자동으로 생성
	@Inject
	private SqlSessionFactory sqlFactory;
	//SqlSessionFactory 객체가 제대로 만들어졌는지 Test
	@Test
	public void testFactory() {
		System.out.println(sqlFactory);
	}
	//MyBatis와 Mysql 서버가 제대로 연결되었는지 Test
	@Test
	public void testSession() throws Exception{
		try(SqlSession session = sqlFactory.openSession()){
			System.out.println(session);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
}
```

참고문헌
> http://www.mybatis.org/spring/ko/factorybean.html
