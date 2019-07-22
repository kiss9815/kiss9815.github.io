---
title: "스프링 mybatis 트랜잭션"
categories:
  - spring
tags:
  - Transactions
last_modified_at: 2019-07-22T13:00:00+09:00
toc: true
toc_sticky: true
---

## Transactions

마이바티스 스프링 연동모듈을 사용하는 중요한 이유중 하나는 마이바티스가 스프링 트랜잭션에 자연스럽게 연동될수 있다는 것이다. 마이바티스에 종속되는 새로운 트랜잭션 관리를 만드는 것보다는 마이바티스 스프링 연동모듈이 스프링의 DataSourceTransactionManager과 융합되는 것이 좋다.
설정을 하면 스프링에서 트랜잭션 가능
@Transactional 애노테이션과 AOP스타일의 설정 모두 지원한다. 하나의 SqlSession객체가 생성되고 트랜잭션이 동작하는 동안 지속적으로 사용될것이다. 세션은 트랜잭션이 완료되면 적절히 커밋이 되거나 롤백될것이다.

```xml
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
  <property name="dataSource" ref="dataSource" />
</bean>
```
트랜잭션 관리자에 명시된 DataSource가 SqlSessionFactoryBean을 생성할때 사용된 것과 반드시 동일한 것이어야 하는 것만 꼭 기억하자. 그렇지 않으면 트랜잭션 관리가 제대로 되지 않을것이다.



참고문헌
> http://www.mybatis.org/spring/ko/transactions.html
