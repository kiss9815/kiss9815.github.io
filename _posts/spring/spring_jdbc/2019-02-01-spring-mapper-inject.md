---
title: "스프링 mapper 주입"
categories:
  - spring
tags:
  - mapper
last_modified_at: 2019-02-01T13:00:00+09:00
toc: true
toc_sticky: true
---

## mapper 등록하기
### xml 설정
매퍼는 다음처럼 XML설정파일에 MapperFactoryBean을 두는 것으로 스프링에 등록된다.
```xml   
<bean id="userMapper" class="org.mybatis.spring.mapper.MapperFactoryBean">
  <property name="mapperInterface" value="org.mybatis.spring.sample.mapper.UserMapper" />
  <property name="sqlSessionFactory" ref="sqlSessionFactory" />
</bean>
```  
MapperFactoryBean은 SqlSessionFactory 나 SqlSessionTemplate가 필요하다. sqlSessionFactory 와 sqlSessionTemplate 프로퍼티를 셋팅하면 된다. 둘다 셋팅하면 SqlSessionFactory가 무시된다. 세션 팩토리 셋은 SqlSessionTemplate이 필요하고 MapperFactoryBean는 팩토리를 사용할것이다.

### 자바 설정
```java
@Bean
public SqlSessionFactory sqlSessionFactory() throws Exception {
  SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
  sqlSessionFactory.setDataSource(dataSource());
  return (SqlSessionFactory) sqlSessionFactory.getObject();
}

@Bean
public UserMapper userMapper() throws Exception {
  SqlSessionTemplate sessionTemplate = new SqlSessionTemplate(sqlSessionFactory());
  return sessionTemplate.getMapper(UserMapper.class);
}
```
마이바티스의 디폴트 SqlSession에서 매퍼를 리턴받을수 없다. 디폴트 SqlSession은 쓰레드에 안전하지 않고 생성된 SqlSession이 닫힐때까지만 살아있기 때문이다. 대신 샘플코드에서 보여주는 것처럼 SqlSessionTemplate 를 사용해야만 한다


## mapper 스캐닝
위는 매퍼를 수동으로 등록하는 방법이고, 정상적이라면 mapper 를 스캔해서 등록해야 한다.
스캔방법에는 3가지가 있다.
- 1. <mybatis:scan/> 엘리먼트 사용
- 2. @MapperScan 애노테이션 사용
- 3. 스프링 XML파일을 사용해서 MapperScannerConfigurer를 등록

### 1. <mybatis:scan/> 엘리먼트 사용
'<mybatis:scan/>' XML엘리먼트는 스프링에서 제공하는 '<context:component-scan/>' 엘리먼트와 매우 유사한 방법으로 매퍼를 검색할 것이다.
```xml
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:mybatis="http://mybatis.org/schema/mybatis-spring"
  xsi:schemaLocation="
  http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
  http://mybatis.org/schema/mybatis-spring http://mybatis.org/schema/mybatis-spring.xsd">

  <mybatis:scan base-package="org.mybatis.spring.sample.mapper" />

</beans>
```

### 2. @MapperScan 애노테이션 사용
@Configuration 을 사용해서 사용해야 한다.
```java  
@Configuration
@MapperScan("org.mybatis.spring.sample.mapper")
public class AppConfig {

  @Bean
  public DataSource dataSource() {
    return new EmbeddedDatabaseBuilder().addScript("schema.sql").build()
  }

  @Bean
  public SqlSessionFactory sqlSessionFactory() throws Exception {
    SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
    sessionFactory.setDataSource(dataSource());
    return sessionFactory.getObject();
  }
}
```

### 3. 스프링 XML파일을 사용해서 MapperScannerConfigurer를 등록
MapperScannerConfigurer
```xml
<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
  <property name="basePackage" value="org.mybatis.spring.sample.mapper" />
</bean>
```

참고문헌
> http://www.mybatis.org/spring/ko/mappers.html
