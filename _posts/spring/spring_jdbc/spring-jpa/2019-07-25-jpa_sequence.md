---
title: "spring jpa 시퀀스 generatedValue"
excerpt: "spring jpa 시퀀스 generatedValue"
categories:
  - spring-annotation
tags:
  - jpa
last_modified_at: 2019-07-25T13:00:00+09:00
toc: true
toc_sticky: true
---

# 기본키 자동생성 사용방법

## mysql
IDENTITY : 기본 키 생성을 데이터베이스에 위임하는 방법 (데이터베이스에 의존적)
- 주로 MySQL, PostgresSQL, SQL Server, DB2에서 사용
``` java
@GeneratedValue(strategy = GenerationType.IDENTITY)
```


참고문헌
> https://ithub.tistory.com/24