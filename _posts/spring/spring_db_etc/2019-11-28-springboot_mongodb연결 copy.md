---
title: "spring boot mongo db 연결하기"
categories:
  - spring
tags:
  - mongodb
last_modified_at: 2019-11-28T13:00:00+09:00
toc: true
toc_sticky: true
---


## 의존성


```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```

```java
@Autowired
MongoTemplate mongoTemplate;

public void mongo() {
    KafkaLogMongo test = KafkaLogMongo.builder()
		.log_date(new Date())
		.topic_name("111")
		.param_list("sdf||ASDFASD|A|SDF|AS|DFAS|DF|")
		.exception_text("tttt")
		.kafka_reproduce_yn(1)
		.build();
		
		mongoTemplate.insert(test);
}
```

참고문헌
> https://engkimbs.tistory.com/797 [몽고db 간단 insert]