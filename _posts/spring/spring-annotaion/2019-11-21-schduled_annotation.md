---
title: "스프링 scheduled annotaion"
categories:
  - spring
tags:
  - annotation
last_modified_at: 2019-11-21T13:00:00+09:00
toc: true
toc_sticky: true
---

spring boot 에서 main application 에
@EnableScheduling 어노테이션 추가해야 사용 가능

@Scheduled(fixedDelay = 600000) //10분
1초 -> 1000
fixedDelay 는 어플리케이션 올라갈때 바로 시작  
fixedRate : 지정한 시간 주기로 작업을 실행 -> 오래걸리더라도 같은 시간 주기로 실행

@Scheduled(fixedRateString = "5", initialDelay = 3000)

@Scheduled(cron = "0 0 5 * * *")  
매일 새벽 5시

@Scheduled(cron = "0 0 10 * * *")  
매일 10시

@Scheduled(cron = "0 30 10 * * *")  
매일 10시 30분


---
cron : cron표현식을 지원한다. "초 분 시 일 월 주 (년)"으로 표현한다. cron표현식에 쓸 수 있는 것들(특수문자 활용 포함)이 많은데 해당 내용이 핵심이 아니므로 다른 블로그에서 확인해보기를 바란다.  
fixedDelay : milliseconds 단위로, 이전 작업이 끝난 시점으로 부터 고정된 시간을 설정한다. ex) fixedDelay = 5000  
fixedDelayString : fixedDelay와 같은데 property의 value만 문자열로 넣는 것이다. ex) fixedDelay = "5000"  
fixedRate : milliseconds 단위로, 이전 작업이 수행되기 시작한 시점으로 부터 고정된 시간을 설정한다. ex) fixedRate = 3000  
fixedRateString : fixedDelay와 같은데 property의 value만 문자열로 넣는 것이다. ex) fixedRate = "3000"  
initialDelay : 스케줄러에서 메서드가 등록되자마자 수행하는 것이 아닌 초기 지연시간을 설정하는 것이다.  
initialDelayString : 위와 마찬가지로 문자열로 값을 표현하겠다는 의미다.
zone : cron표현식을 사용했을 때 사용할 time zone으로 따로 설정하지 않으면 기본적으로 서버의 time zone이다.  
---

참고문헌
> https://jieun0113.tistory.com/115 [CRON EXPRESSION]
> https://jeong-pro.tistory.com/186 [fixedDelay vs fixedRate]