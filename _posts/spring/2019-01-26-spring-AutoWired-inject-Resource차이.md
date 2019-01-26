---
title: "@Autowired, @Resource,@Inject 차이"
categories:
  - spring
tags:
  - Autowired
  - Resource
  - Inject
last_modified_at: 2019-01-26T13:00:00+09:00
toc: true
toc_sticky: true
---


## 차이

|      | Autowired | Inject | Resource |
|---   |:---:      |:---:   |:---:     |
| 범용 | 스프링전용 | 자바에서 지원 | 자바에서 지원 |
| 연결방식| 타입에 맞춰서 연결 | 타입에 맞춰서 연결 |  이름으로 연결|
| 강제연결| @Qualifier("title")| | @Resource(name="title")|
@Autowired와 @Inject는 타입에 맞춰서 하는 반면, @Resource는 이름에 맞춰서 연결

```java
@Autowired
private Chicken penguin;  //Chicken 타입으로 연결
@Inject
private Penguin chicken; //Penguin 타입으로 연결
@Resource
private Chicken penguin;  //penguin 타입으로 연결됩니다만, Chicken 클래스를 자료형으로 두었기에 캐스팅이 되지 않아 에러가 난다.
@Resource
private Bird penguin;      //penguin 타입으로 연결되어 호출해보면 penguin 클래스의 값을 호출
```

Resource를 추천.
어느 프레임워크에 종속적이지 않기 때문에
이것또한 Bean를 생성하며 싱글톤 패턴이 자동으로 적용.
타입으로 연결 하기 때문에 같은 타입인 여러개의 필드는 오류가 날 것 이다.
