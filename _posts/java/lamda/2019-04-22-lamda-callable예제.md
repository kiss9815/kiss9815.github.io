---
title: "lamda 식으로 callable 만들기 예제"
categories:
  - java
tags:
  - lamda
last_modified_at: 2019-04-22T13:00:00+09:00
toc: true
toc_sticky: true
---


### java7에서의 사용법
```java
//java7 이하
ExecutorService threadPool = Executors.newFixedThreadPool(1);
List<Future<String>> futures = new ArrayList<Future<String>>(); //리턴값
Callable<String> callable = new Callable<String>() {
	public String call() throws Exception {
			//실행시킬 코드
			return result;
		}
};
futures.add(threadPool.submit(callable));
threadPool.shutdown();
```

### lamda 식 사용법
```java
//lamda
ExecutorService threadPool = Executors.newFixedThreadPool(1);
new ArrayList<Future<String>>().add(threadPool.submit(() -> {
    //실행시킬 코드
	return resultCall;
}));
threadPool.shutdown(); //ExecutorService 쓰레드풀은 만들면 종료시켜야 함
```


참고문헌
> https://knight76.tistory.com/entry/%EB%9E%8C%EB%8B%A4%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-java8%EC%9D%98-Callable-Runnable-%EC%98%88%EC%A0%9C
