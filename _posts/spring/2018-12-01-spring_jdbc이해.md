---
title: "스프링 jdbc 이해하기"
excerpt: "스프링 jdbc 이해하기"
categories:
  - spring
tags:
  - spring
  - jdbc
last_modified_at: 2018-12-01T13:00:00+09:00
toc: true
toc_sticky: true
---

# DAO 란
DAO(Data Access Object)는 실제로 DB에 접근하는 객체이다.

Service와 DB를 연결하는 고리의 역할을 한다.
- DAO 패턴은 서비스 계층에 영향을 주지 않고 데이터 액세스 기술을 변경할 수 있는 것이 장점.

---

# JDBC(Java Database Connectivity) 란?
JDBC(Java Database Connectivity)는 DB에 접근할 수 있도록 Java에서 제공하는 API이다. (모든 Java의 Data Access 기술의 근간)

JDBC는 데이터베이스에서 자료를 쿼리하거나 업데이트하는 방법을 제공한다.
JDBC API의 문제점
쿼리를 실행하기 전과 후에 많은 코드를 작성해야한다. EX) 연결 생성, 명령문, ResultSet 닫기, 연결 등
데이터베이스 로직에서 예외 처리 코드를 수행해야 한다.
트랜잭션을 처리해야 한다.
이러한 모든 코드를 반복하는 것으로, 시간이 낭비된다.

---

# Spring JDBC란?
JDBC의 장점과 단순성을 그대로 유지하면서도 기존 JDBC의 단점을 극복할 수 있게 해주고, 간결한 형태의 API 사용법을 제공하며, JDBC API에서 지원되지 않는 편리한 기능을 제공.
 - Spring JDBC는 반복적으로 해야하는 많은 작업들을 대신 해줌.

 - Spring JDBC를 사용할 때는 실행할 SQL과 바인딩 할 파라미터를 넘겨주거나, 쿼리 실행 결과를 어떤 객체에 넘겨 받을지를 지정만 하면 된다.

 - Spring JDBC를 사용하려면 먼저, DB 커넥션을 가져오는 DataSource를 Bean으로 등록해야 한다.

---

# Spring JDBC가 해주는 작업

 Connection 열기와 닫기
  - Connection과 관련된 모든 작업을 Spring JDBC가 필요한 시점에서 알아서 진행.
  - 진행 중에 예외가 발생했을 때도 열린 모든 Connection 객체를 닫아줌.

  - SQL 정보가 담긴 Statement 또는 PreparedStatement를 생성하고 필요한 준비 작업을 해주는 것도 Spring JDBC가 한다.
  - Statement도 Connection과 마찬가지로 사용이 끝나고 나면 Spring JDBC가 알아서 객체를 닫아줌.

 Statement 실행
  - SQL이 담긴 Statement를 실행하는 것도 Spring JDBC가 해줌.
  - Statement의 실행 결과는 다양한 형태로 가져올 수 있다.
 ResultSet Loop처리
  - ResultSet에 담긴 쿼리 샐행 결과가 한 건 이상이면 ResultSet 루프를 만들어서 반복해주는 것도 Spring JDBC가 해주는 작업.
 Exception 처리와 반환
  - JDBC 작업 중 발생하는 모든 예외는 Spring JDBC예외 변환기가 처리.
  - Checked Exception인 SQLException을 Runtime Exception인 DataAccessException 타입으로 변환.

 Transaction 처리
  - Spring JDBC를 사용하면 transaction과 관련된 모든 작업에 대해서는 신경 쓰지 않아도 됨.
   * Transaction과 관련된 작업 : Commit, Rollback 등 작업의 단위

---

# JDBC Template 이란?
JDBC Template은 내부적으로 JDBC API를 사용하지만 위와 같은 JDBC API의 문제점들을 제거한 형태의 Spring에서 제공하는 class이다.

Spring JDBC가 하는 일
Connection 열기와 닫기
Statement 준비와 닫기
Statement 실행
ResultSet Loop처리
Exception 처리와 반환
Transaction 처리

##Spring JDBC 접근 방법
JdbcTemplate (선택!)
전형적인 Spring JDBC 접근 방법이고 가장 인기가 좋다.
쿼리를 직접 작성하는 방법을 제공하므로 많은 작업과 시간을 절약 할 수 있다.
NamedParameterJdbcTemplate
SimpleJdbcTemplate
SimpleJdbcInsert 및 SimpleJdbcCall
Spring framework는 JDBC DB 접근에 대해 위와 같은 접근 방법을 제공한다.

JdbcTemplate이 제공하는 기능
실행 : Insert나 Update같이 DB의 데이터에 변경이 일어나는 쿼리를 수행하는 작업
조회 : Select를 이용해 데이터를 조회하는 작업
배치 : 여러 개의 쿼리를 한 번에 수행해야 하는 작업

JdbcTemplate사용시 인자로 dataSource 넣음 - DI

---

# DataSource 란?

DataSource는 JDBC 명세의 일부분이면서 일반화된 연결 팩토리이다. Spring은 DataSource로 DB와의 연결을 획득한다.

DataSource는 JDBC Driver vendor(Mysql, Oracle 등)별로 여러가지가 존재한다.
DataSource가 하는 일
    1) DB Server와의 기본적인 연결
    2) DB Connection Pooling 기능 (* 아래 참고)
    3) 트랜젝션 처리
DataSource의 구현 예시
    BasicDataSource (선택!)
    PoolingDataSource
    SingleConnectionDataSource
    DriverManagerDataSource

Spring JDBC를 사용하려면 먼저, DB Connection을 가져오는 DataSource를 Spring IoC 컨테이너의 공유 가능한 Bean으로 등록해야 한다.

즉, DB와의 연결을 위한 DB Server에 관한 정보(Parameter)를 설정한 후 Bean으로 등록해야 DB와 연결할 수 있다.


커넥션 풀링은 미리 정해진 갯수만큼의 DB 커넥션을 풀에 준비해두고, 어플리케이션이 요청할 때마다 Pool에서 꺼내서 하나씩 할당해주고 다시 돌려받아서 Pool에 넣는 식의 기법.
Spring에서는 DataSource를 공유 가능한 Spring Bean으로 등록해주어 사용할 수 있도록 해줌.

-----------------------

    DB Server에 관한 정보(Parameter)를 설정 (* 설정 방법 아래 참고)
    url, driver, username, password
    BasicDataSource에 bean으로 등록
    ```
    <bean id="dataSource" class="org.apache.commons.dbcp.BasicDataSource" destroy-method="close">
          <property name="driverClassName" value="${jdbc.driverClassName}" />
          <property name="url" value="${jdbc.url}" />
          <property name="username" value="${jdbc.username}" />
          <property name="password" value="${jdbc.password}" />
    </bean>
    ```
* DB Connection Pooling이란?

자바 프로그램에서 데이터베이스에 연결(Connection 객체를 얻는 작업)은 시간이 많이 걸린다.
만약, 일정량의 Connection을 미리 생성시켜 저장소에 저장했다가 프로그램에서 요청이 있으면 저장소에서 Connection 꺼내 제공한다면 시간을 절약할 수 있다. 이러한 프로그래밍 기법을 Connection Pooling이라 한다.
Connection Pooling을 이용하면 속도와 퍼포먼스가 좋아진다.

* 정보(Parameter)들을 설정하는 방법

Property file을 하나 만들고 Parameter 정보들을 적는다.
${jdbc.password}와 같은 placeholder를 사용하여 이 Parameter 정보들을 주입한다.
DB Server에 관한 정보(Parameter)를 설정할 때 이 정보들을 hard coding 하지 않는다.
왜냐하면 나중에 Property file의 내용만 고치면 다른 모든 부분에 적용할 수 있기 때문이다.
예를 들어, pom.xml에서 springframework-version을 4.2.5.RELEASE로 설정했으면

<groupId>org.springframework</groupId>
에 해당하는 밑에 요소들은 ${org.springframework-version} 로 적어주면 알아서 버전에 맞는 것이 적용된다.

# JDBC Driver 란?
JDBC Driver는 자바 프로그램의 요청을 DBMS가 이해할 수 있는 프로토콜로 변환해주는 클라이언트 사이드 어댑터이다.

DB마다 Driver가 존재하므로, 자신이 사용하는 DB에 맞는 JDBC Driver를 사용한다.
DataSource를 JDBC Template에 주입(Dependency Injection)시키고 JDBC Template은 JDBC Driver를 이용하여 DB에 접근한다.

Spring 프로젝트에서 DB 프로그래밍을 위해 필요한 Library
```
    jdbc class: spring-jdbc
    org.springframework.jdbc.core.JdbcTemplate
    data source: commons-dbcp
    org.apache.commons.dbcp.BasicDataSource
    jdbc driver: mysql-connector-java
    com.mysql.jdbc.Driver
```

# JDBC 와 DBCP  

JDBC에서 가장 시간이 많이 소요되는 부분이 Connection 맺는 부분

Java 에서 Database 와 연결하기 위해 JDBC 필요
JDBC 이용해 생성한 Connection을 효율저그로 활용하기 위해 Connection 객체를 관리하는 것을 DBCP의 개념으로 본다.
