---
title: "스프링부트 mybatis multi datasource"
categories:
  - spring
tags:
  - mybatis
last_modified_at: 2019-07-11T13:00:00+09:00
toc: true
toc_sticky: true
---

## multi datasource 설정하는 법

## config 자바 파일
- 첫번째 db 만 @primary 어노테이션을 붙인다.
``` java
import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import lombok.extern.slf4j.Slf4j;

@Configuration
@MapperScan(value="com.example.mapper.db1.read", sqlSessionFactoryRef="db1SqlSessionFactory")
@Slf4j
public class db1Config {
    @Autowired
    private Environment env;
 
    private static final String prefix = "spring.db1.datasource.hikari.";
        
    @Bean(name = "db1Source", destroyMethod = "close")
    @Primary
    public HikariDataSource db1Source() {
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
        
    	config = new HikariDataSource( config );
    	HikariDataSource dataSource = new HikariDataSource( config );
        
        return dataSource;
    }
    
    @Bean(name = "db1SqlSessionFactory")
    @Primary
    public SqlSessionFactory db1SqlSessionFactory(@Qualifier("db1Source") DataSource db1Source) throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(db1Source);
        sqlSessionFactoryBean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:db1/read/*.xml"));
        return sqlSessionFactoryBean.getObject();
    } 

    @Bean(name = "db1SqlSessionTemplate")
    @Primary
    public SqlSessionTemplate db1SqlSessionTemplate(SqlSessionFactory db1SqlSessionFactory) throws Exception {
        return new SqlSessionTemplate(db1SqlSessionFactory);
    }

    @Bean(name="db1TransactionManager")
    @Primary
    public PlatformTransactionManager db1TransactionManager(@Qualifier("db1Source") DataSource db1Source) {
  
    	DataSourceTransactionManager transactionManager = new DataSourceTransactionManager();      
    	transactionManager.setDataSource(db1Source);        
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

SqlSessionTemplate >> SqlSessionFactory >> HikariDataSource
