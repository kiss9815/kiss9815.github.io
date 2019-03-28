---
title: "스프링 스케쥴설정"
categories:
  - spring
tags:
  - Schedule
last_modified_at: 2019-03-26T13:00:00+09:00
toc: true
toc_sticky: true
---


ex)
 @Scheduled(cron="*/30 * * * * *")
 시간 설정 @scheduled(cron=" ")  * 리눅스 crontab 과 같은 설정방법
ex> @Scheduled(cron="0 0 02 * * ?") = 매일 새벽2시에 실행
ex> @Scheduled(cron="0 0 02 2,20 * ?") = 매월 2일,20일 새벽2시에 실행



참고문헌
> https://kanetami.tistory.com/entry/Schedule-Spring-%EC%8A%A4%ED%94%84%EB%A7%81-%EC%8A%A4%EC%BC%80%EC%A5%B4-%EC%84%A4%EC%A0%95%EB%B2%95-CronTab
