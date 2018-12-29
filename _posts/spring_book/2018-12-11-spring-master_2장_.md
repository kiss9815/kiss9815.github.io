---
title: "스프링 5.0 master 3장"
excerpt: "의존성 주입"
categories:
  - blogging
tags:
  - spring
last_modified_at: 2018-12-07T19:00:00+09:00
toc: true
toc_sticky: true
---

# 의존성 주입

## 의존성 주입 이해
```java
public class BusinessServiceImpl {
	public long calculateSum(User user){
		DataServiceImpl dataService = new DataServiceImpl();
		long sum = 0;
		for (Data data :  dataService.retriveData(user)){
			sum += data.getValue();
		}
		return sum;
	}
}
```
BusinessServiceImpl은 DataServiceImpl에 의존한다.
=> 비즈니스 서비스가 데이터 서비스의 인스턴스를 직접 생성하여 서로 밀접하게 결합되었고 단위테스트는 어려움

```java
public class BusinessServiceImpl {
	private DataService dataService;
	public long calculateSum(User user){
		long sum = 0;
		for (Data data :  dataService.retriveData(user)){
			sum += data.getValue();
		}
		return sum;
	}
	public void setDataService(DataService dataService){
		this.dataService = dataService;
	}
}
```
DataServiceImpl의 DataService setter 코드를 업데이트하고 calculateSum 메서드는 이 참조를 사용하도록함
BusinessServiceImpl은 이제 DataService의 모든 구현체와 함께 작동 가능
특정 구현체인 DataServiceImpl과 밀접 하게 결합되어있지 않음

=> 하지만 DataServiceImpl 클래스의 인스턴스를 생성하거나 BusinessServiceImpl 클래스 연결해줄 무언가가 필요

## 스프링 IoC 컨테이너
스프링 IoC 컨테이너는 빈을 생성하고 연결한다.
모든 어노테이션은 스프링 프레임워크가 특정 클래스에 대한 빈을 생성하도록 지시한다.
```java
@Repository
public class DataServiceImpl implements DataService
@Service
public class BusinessServiceImpl implements BusinessService
```
@Autowired 어노테이션을 지정함으로써 스프링 IoC컨테이너는 빈을 서로 묶게 된다.
```java
public class BusinessServiceImpl {
	@Autowired
	private DataService dataService;
```
### 스프링 IoC컨테이너 생성 방법
##### ApplicationContext 자바 구성
@Configuration 어노테이션으로 스프링 구성
컴포넌트 스캔을 정의해 검색할 패키지 IoC 컨테이너에 명시
```java
@Configuration
@ComponenetScan(basePackages = {"com.mastering.spring"})
class SpringContext {
}
```
##### ApplicationContext XML 구성
```XML
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<beans>
    <context:component-scan base-package="com..mastering.sping"/>
</beans>
```
애플리케이션 콘텍스트를 main 메서드에서 구동한다.
```java
public class LaunchJavaContext {
    private static final User DUMMY_USER = new User("dummy");
    public static Logger logger = Logger.getLogger(LaunchJavaContext.class);
    public static void main(String[] args){
        // 자바로 구성된 applicationcontext 생성
        ApplicationContext context = new AnnotationConfigApplicationContext(SpringContext.class);
        // xml 구성된 applicationcontext 생성
        ApplicationContext context = new ClassPathXmlApplicationContext("BusinessApplicationContext.xml");
        BusinessService service = context.getBean(BusinessService.class); //서비스 빈을 가져온다.
        logger.debug(service.calculatesum(DUMMY_USER));
    }
}
```
JUnit을 사용한 테스트
단위 테스트 장점
- 미래의 결함에 대비한 안정망
- 결함이 일찍 발견됨
- TDD가 더 나은 디자인 만듬
- 잘 작성된 테스트는 코드 및 기능의 문서화 역할
```java
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "/BusinessApplicationContext.xml" })
public class BusinessServiceJavaContextTest {
  private static final User DUMMY_USER = new User("dummy");
  @Autowired
  private BusinessService service;
  @Test
  public void testCalculateSum() {
    long sum = service.calculateSum(DUMMY_USER);
    assertEquals(30, sum);
  }
}
```
진정한 단위 테스트가 아님 DataServiceImpl의 실제 구현 사용

## 모크 단위 테스팅
모킹은 실제 객체의 동작을 사뮬래이션하는 객체를 만드는 것이다.
MockitoJunitRunner는 @Mock 어노테이션으로 어노테이션된 빈을 초기화하고 테스트 메서드 실행한후 프레임워크 사용을 검증한다.
```java
@RunWith(MockitoJUnitRunner.class)
public class BusinessServiceMockitoTest {
  private static final User DUMMY_USER = new User("dummy");
  @Mock	//DataService용 모크 생성
  private DataService dataService;
  @InjectMocks	//객체를 주입
  private BusinessService service = new BusinessServiceImpl();
  @Test
  public void testCalculateSum() {
	  //검증
    BDDMockito.given(dataService.retrieveData(Matchers.any(User.class)))
    .willReturn(Arrays.asList(new Data(10), new Data(15), new Data(25)));
    long sum = service.calculateSum(DUMMY_USER);
    assertEquals(10 + 15 + 25, sum);
  }
}
```
## 컨테이너 관리 빈
컨테이너 관리 빈은 컨테이너에 의해 관리되는 빈이다.
빈에 대한 생성 및 관리를 컨테이너에 위임하면 이점
- 느슨하게 결합되 테스트할수 있다.
- 로깅 캐싱 트랜잭션관리 등 과 같ㅌ은 횡단 관심을 AOP를 사용해 빈을 중심으로 구성할 수 있다.

## 의존성 주입 타입
* setter 주입
```java
public class BusinessServiceImpl {
	private DataService dataService;
	@Autowired
	public void setDataService(DataService dataService){
		this.dataService = dataService;
	}
}
```
* 생성자 주입
```java
public class BusinessServiceImpl {
	private DataService dataService;
	@Autowired
	public BusinessServiceImpl(DataService dataService){
		super();
		this.dataService = dataService;
	}
}
```
## 스프링 빈 스코프
* 싱글톤 : 모든 빈 스코프는 기본적으로 싱글톤
* 프로토타입 : 스프링 컨테이너에서 빈이 요청할때마다 새로운 인스턴스가 생성됨
* 리퀘스트 : 모든 HTTP 요청마다 빈의 새 인스턴스가 작성됨
* 세션 : 모든 HTTP 세션마다 빈의 새로운 인스턴스가 생성됨
* 애플리케이션 : 특정 환경의 애플리케이션 구성에 적합
## 자바 대 XML 구성
스프링은 자바와 XML 기반 구성을 똑같이 잘 지원한다.
어노테이션은 빈을 더 짧고 간단하게 정의할수있고 적용할수있는 코드에 더 가깝다.
와이어링이 더 이상 중앙 집중화되지 않고 명시적으로 선언되지 않기 때문에 오토와이어링 문제를 해결하기 어려울수있다.
애플리케이션 패키지 외부에 스프링 콘텍스트 XML을 사용하면 와이어링이 좀 더 유연하다는 이점이 있다. 이렇게하면 통합 테스트에 대해 다른 설정도 할 수 있다.
## @Autowired 어노테이션
* @Autowired 어노테이션을 사용하면 애플리케이션 콘텍스트는 일치하는 의존성을 검색한다.
* @Primary 오토와이어 할수있는 후부가 둘 이상 일치하는 항목 발견시 하나만 사용할시 사용
* @Quarlifier  오토와이어링을 더욱 강화할시 사용


## 기타 중요한 스프링 어노테이션
| 어노테이션          | 사용                       |
| -------------- | ------------------------ |
| @ScopedProxy   | 요청이나 세션 스코브의 빈을          |
| @Component     | 스프링 빈을 정의하는 일반적인 방법      |
| @Service       | 비즈니스 서비스 레이어에 사용됨        |
| @Controller    | 프레젠테이션 구성 요소에 사용됨        |
| @Repository    | 데이터 액세스 객체에 사용           |
| @PostConstruct | 빈이 의존성으로 완전히 초기화된 후에 호출됨 |
| @PreDestroy    | 빈에 의해 보유된 자원을 해제하는데 사용   |
## 콘텍스트 및 의존성 주입 탐색
CDI는 의존성 주입을 자바 EE로 바져오는 자바 EE의 시도다.
CDI의 목표는 의존성 주입 수행 방법의 기본을 표준화하는 것이다.
| CDI 어노테이션  | 스프링 어노테이션과 비교                   |
| ---------- | ------------------------------- |
| @Inject    | @AutoWired 와 비슷                 |
| @Named     | @Componenet와 유사하게 명명된 구성 요소를 식별 |
| @Singleton | @Scope("singleton") 과 비슷        |
| @Qualifier | @Qualifier와 비슷                  |
