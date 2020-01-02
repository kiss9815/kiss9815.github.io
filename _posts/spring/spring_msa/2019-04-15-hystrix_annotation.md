---
title: "hystrix annotation"
categories:
  - spring
tags:
  - hystrix
last_modified_at: 2019-04-15T13:00:00+09:00
toc: true
toc_sticky: true
---

## Hystrix config
```java
@HystrixCommand(fallbackMethod = "fallback", commandProperties = {
   @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "500"),
   @HystrixProperty(name = "metrics.rollingStats.timeInMilliseconds", value = "10000"),
   @HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "10"),
   @HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "5"),
   @HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "10000")
}, threadPoolProperties = @HystrixProperty(name = "coreSize", value = "100"))
```
- execution.isolation.thread.timeoutInMilliseconds
Hystrix 가 적용된 메서드의 타임아웃을 지정한다. 이 타임아웃 내에 메서드가 완료되지못하면 서킷브레이커가 닫혀있다고 하더라도 fallback 메서드가 호출된다. 보통 외부 API 를 호출하게되면 RestTemplate 과 같은 http client에도 connect, read timeout 등을 지정하게하는데 hystrix timeout은 이를 포함하고 여유를 좀 더 두어 잡는다. 기본값은 1초(1000)
- metrics.rollingStats.timeInMilliseconds
서킷 브레이커가 열리기위한 조건을 체크할 시간이다. 아래에서 살펴볼 몇가지 조건들과 함께 조건을 정의하게되는데 "10초간 50% 실패하면 서킷 브레이커 발동" 이라는 조건이 정의되어있다면 여기서 10초를 맡는다. 기본값은 10초(10000)
- circuitBreaker.errorThresholdPercentage
서킷 브레이커가 발동할 에러 퍼센트를 지정한다. 기본값은 50
- circuitBreaker.requestVolumeThreshold
서킷 브레이커가 열리기 위한 최소 요청조건이다. 즉 이 값이 20으로 설정되어있다면 10초간 19개의 요청이 들어와서 19개가 전부 실패하더라도 서킷 브레이커는 열리지않는다. 기본값은 20
- circuitBreaker.sleepWindowInMilliseconds
서킷 브레이커가 열렸을때 얼마나 지속될지를 설정한다. 기본값은 5초(5000)
- coreSize
위에서 별도의 설명은 안했는데 Hystrix 작동방식은 Thread를 이용하는 Thread 방식과 Semaphore 방식이 있다. Thread 를 이용할 경우 core size를 지정하는 속성이다. 넷플릭스에서는 공식 가이드에 왠만하면 Thread 방식을 권장하고있다.(디폴트 설정도 Thread 방식이다.) 기본 coreSize 는 10

위 설정들을 참고하여 적절한 설정을 해주고 일부러 consumer로부터 실패할 요청만 보내보자. 계속 fallback을 반환하면서 path에 대한 log가 출력되다가 서킷 브레이커가 열리면 consumer를 실행하면 바로 fallback을 호출하면서 내부 코드가 실행되지않기때문에 fallback이 반환되지만 log는 찍히지않는것을 확인할 수 있다.

설정이 매우 다양하니 자세한건 https://github.com/Netflix/Hystrix/wiki/configuration 에서 살펴보자.


참고문헌
> https://multifrontgarden.tistory.com/238[설정값]
> http://woowabros.github.io/experience/2017/08/21/hystrix-tunning.html[histrix세마포어설명]
