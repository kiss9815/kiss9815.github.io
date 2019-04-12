---
title: "java memory 확인하기"
categories:
  - java-core
last_modified_at: 2019-04-12T13:00:00+09:00
toc: true
tags: # 태그 사용
    - java memory

---

## 1. 소스에서 로그확인하기
```java
System.out.println("발송 전 Free Memory " + Runtime.getRuntime().freeMemory()/1024/1024 + "MB");
```


## 2. jvisualvm 사용하기
/jdk1.x.xxxx/bin/jvisualvm.exe 를 실행

참고문헌
> https://joesimong.blogspot.com/2013/11/blog-post_29.html
