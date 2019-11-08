---
title: "스프링부트 jpa db 여러개 설정"
categories:
  - spring
tags:
  - jpa
last_modified_at: 2019-07-22T13:00:00+09:00
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

EXAMPLE)
```java
@Configuration
@EnableJpaRepositories(
    basePackages = "kr.co.lunasoft.coreapi.jpa.db1", 
    entityManagerFactoryRef = "db1EntityManager", 
    transactionManagerRef = "db1TransactionManager"
)
public class db1Config {
    @Autowired
    private Environment env;
 
    private static final String prefix = "spring.db1.datasource.hikari.";
    
    @Bean(name="db1EntityManager")
    @Primary
    public LocalContainerEntityManagerFactoryBean db1EntityManager() {
        LocalContainerEntityManagerFactoryBean em  = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(db1DataSource());
        em.setPackagesToScan( new String[] { "kr.co.lunasoft.coreapi.vo.db_mall" });
 
        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
//        vendorAdapter.setShowSql(false);
//        vendorAdapter.setGenerateDdl(false);
//        vendorAdapter.setDatabasePlatform("org.hibernate.dialect.MySQL5InnoDBDialect");
        em.setJpaVendorAdapter(vendorAdapter);
        Map<String, Object> jpaProperties = new HashMap<>();
//        jpaProperties.put("hibernate.hbm2ddl.auto", env.getProperty("jpa.hibernate.ddl-auto"));
        
        em.setJpaPropertyMap(jpaProperties);
 
        return em;
    }
 
    
    @Bean
    @Primary
    public HikariDataSource db1DataSource() {
    	HikariConfig config = new HikariConfig();
    	config.setUsername(env.getProperty(prefix+"username")); 
    	config.setPassword(env.getProperty(prefix+"password")); 
//    	config.setDriverClassName(env.getProperty(prefix+"driverClassName"));
    	config.setJdbcUrl( env.getProperty(prefix+"jdbc-url") );
    	config.setMaxLifetime( Long.parseLong(env.getProperty(prefix+"max-lifetime")) );
    	config.setConnectionTimeout(Long.parseLong( env.getProperty(prefix+"connection-timeout")));
    	config.setValidationTimeout(Long.parseLong( env.getProperty(prefix+"validation-timeout")));
    	
    	config.addDataSourceProperty( "cachePrepStmts" ,  env.getProperty(prefix+"data-source-properties.cachePrepStmts"));
      config.addDataSourceProperty( "prepStmtCacheSize" , env.getProperty(prefix+"data-source-properties.prepStmtCacheSize"));
      config.addDataSourceProperty( "prepStmtCacheSqlLimit" , env.getProperty(prefix+"data-source-properties.prepStmtCacheSqlLimit") );	
      config.addDataSourceProperty( "useServerPrepStmts" , env.getProperty(prefix+"data-source-properties.useServerPrepStmts") );
      
    	HikariDataSource dataSource = new HikariDataSource( config );
        
      return dataSource;
    }
    
   
    @Bean(name="db1TransactionManager")
    @Primary
    public PlatformTransactionManager db1TransactionManager() {
  
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(db1EntityManager().getObject());
        return transactionManager;
    }
}
```
## application.yml
``` yml
spring:
dbmall:
  datasource:
    hikari:
      jdbc-url: jdbc:mysql://url:3306/?&autoReconnect=true
      username: juntae
      password: juntae
      driverClassName: com.mysql.cj.jdbc.Driver
      maximum-pool-size: 10
      #minimum-idle: 100
      max-lifetime: 1800000 #1800000
      connection-timeout: 30000 #30000
      validation-timeout: 5000
      #connection-test-query: SELECT 1      
      data-source-properties: 
        cachePrepStmts: true
        prepStmtCacheSize: 250
        prepStmtCacheSqlLimit: 2048
        useServerPrepStmts: true 
```

JpaTransactionManager >> EntityManager >> HikariDataSource

참고문헌
> https://cpdev.tistory.com/74
> https://hojak99.tistory.com/498
> https://jogeum.net/2   -- 제일 자세함
> 
