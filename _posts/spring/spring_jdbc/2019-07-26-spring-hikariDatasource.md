---
title: "스프링 HikariDatasource"
categories:
  - spring
tags:
  - HikariDatasource
last_modified_at: 2019-07-26T13:00:00+09:00
toc: true
toc_sticky: true
---

## 세팅 옵션

- autoCommit: auto-commit설정 (default: true)
- connectionTimeout: pool에서 커넥션을 얻어오기전까지 기다리는 최대 시간, 허용가능한 wait time을 초과하면 SQLException을 던짐. 설정가능한 가장 작은 시간은 250ms (default: 30000 (30s))
- idleTimeout: pool에 일을 안하는 커넥션을 유지하는 시간. 이 옵션은 minimumIdle이 maximumPoolSize보다 작게 설정되어 있을 때만 설정. pool에서 유지하는 최소 커넥션 수는 -  - - -   minimumIdle (A connection will never be retired as idle before this timeout.). 최솟값은 10000ms (default: 600000 (10minutes))
- maxLifetime: 커넥션 풀에서 살아있을 수 있는 커넥션의 최대 수명시간. 사용중인 커넥션은 maxLifetime에 상관없이 제거되지않음. 사용중이지 않을 때만 제거됨. 풀 전체가아닌 커넥션 별로 적용이되는데 그 이유는 풀에서 대량으로 커넥션들이 제거되는 것을 방지하기 위함임. 강력하게 설정해야하는 설정 값으로 데이터베이스나 인프라의 적용된 connection time limit보다 작아야함. 0으로 설정하면 infinite lifetime이 적용됨(idleTimeout설정 값에 따라 적용 idleTimeout값이 설정되어 있을 경우 0으로 설정해도 무한 lifetime 적용 안됨). (default: 1800000 (30minutes))
- connectionTestQuery: JDBC4 드라이버를 지원한다면 이 옵션은 설정하지 않는 것을 추천. 이 옵션은 JDBC4를 지원안하는 드라이버를 위한 옵션임(Connection.isValid() API.) 커넥션 pool에서 커넥션을 획득하기전에 살아있는 커넥션인지 확인하기 위해 valid 쿼리를 던지는데 사용되는 쿼리 (보통 SELECT 1 로 설정) JDBC4드라이버를 지원하지않는 환경에서 이 값을 설정하지 않는다면 error레벨 로그를 뱉어냄.(default: none)
- minimumIdle: 아무런 일을 하지않아도 적어도 이 옵션에 설정 값 size로 커넥션들을 유지해주는 설정. 최적의 성능과 응답성을 요구한다면 이 값은 설정하지 않는게 좋음. default값을 보면 이해할 수있음. (default: same as maximumPoolSize)
- maximumPoolSize: pool에 유지시킬 수 있는 최대 커넥션 수. pool의 커넥션 수가 옵션 값에 도달하게 되면 idle인 상태는 존재하지 않음.(default: 10)
- poolName: 이 옵션은 사용자가 pool의 이름을 지정함. 로깅이나 JMX management console에 표시되는 이름.(default: auto-generated)
- initializationFailTimeout: 이 옵션은 pool에서 커넥션을 초기화할 때 성공적으로 수행할 수 없을 경우 빠르게 실패하도록 해준다. 상세 내용은 한국말보다 원문이 더 직관적이라 생각되어 다음 글을 인용함.
- readOnly: pool에서 커넥션을 획득할 때 read-only 모드로 가져옴. 몇몇의 database는 read-only모드를 지원하지 않음. 커넥션이 read-only로 설정되어있으면 몇몇의 쿼리들이 최적화 됨.(default: false)
- driverClassName: HikariCP는 jdbcUrl을 참조하여 자동으로 driver를 설정하려고 시도함. 하지만 몇몇의 오래된 driver들은 driverClassName을 명시화 해야함. 어떤 에러 메시지가 명백하게 표시 되지않는다면 생략해도됨.
- validationTimeout: valid 쿼리를 통해 커넥션이 유효한지 검사할 때 사용되는 timeout. 250ms가 설정될 수 있는 최솟값(default: 5000ms)
- leakDetectionThreshold: 커넥션이 누수 로그메시지가 나오기 전에 커넥션을 검사하여 pool에서 커넥션을 내보낼 수 있는 시간. 0으로 설정하면 leak detection을 이용하지않음. 최솟값 2000ms (default: 0)

MySQL Performance Tips
- prepStmtCacheSize: This sets the number of prepared statements that the MySQL driver will cache per connection. The default is a conservative 25. We recommend setting this to between 250-500.
- prepStmtCacheSqlLimit: This is the maximum length of a prepared SQL statement that the driver will cache. The MySQL default is 256. In our experience, especially with ORM frameworks like Hibernate, this default is well below the threshold of generated statement lengths. Our recommended setting is 2048.
- cachePrepStmts: Neither of the above parameters have any effect if the cache is in fact disabled, as it is by default. You must set this parameter to true.
- useServerPrepStmts: Newer versions of MySQL support server-side prepared statements, this can provide a substantial performance boost. Set this property to true.

참고문헌
> https://effectivesquid.tistory.com/entry/HikariCP-%EC%84%B8%ED%8C%85%EC%8B%9C-%EC%98%B5%EC%85%98-%EC%84%A4%EB%AA%85
