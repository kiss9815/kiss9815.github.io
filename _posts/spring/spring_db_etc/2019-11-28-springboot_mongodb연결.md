---
title: "java mongo db _class 없애기"
categories:
  - spring
tags:
  - mongodb
last_modified_at: 2019-11-28T13:00:00+09:00
toc: true
toc_sticky: true
---


## 방법
vo 를 넣을경우 _class 필드가 자동으로 생김

```java
@Configuration
public class MongoDBConfiguration  {
    @Autowired private MongoDbFactory mongoDbFactory;
    @Autowired private MongoMappingContext mongoMappingContext;

    @Bean
    public MappingMongoConverter mappingMongoConverter() {
        DbRefResolver dbRefResolver = new DefaultDbRefResolver(mongoDbFactory);
        MappingMongoConverter converter = new MappingMongoConverter(dbRefResolver, mongoMappingContext);
        converter.setTypeMapper(new DefaultMongoTypeMapper(null));
        return converter;
    }
}
```

참고문헌
> https://elfinlas.github.io/2019/02/12/mongo-class-remove/ [_class자동생성삭제]