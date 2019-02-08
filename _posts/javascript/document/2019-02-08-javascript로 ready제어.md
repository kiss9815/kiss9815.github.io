---
title: "javascript 로 dom ready 제어"
categories:
  - javascript
tags:
  - javascript
last_modified_at: 2019-02-08T13:00:00+09:00
toc: true
toc_sticky: true
---


## 제이쿼리 3.0이전 ready 사용
```javascript
$(document).ready(function() {
  // Handler for .ready() called.
});
```
제이쿼리 3.0이후에는 사용법이 추가된다.


## ready 와 load 이벤트 차이
ready 는 dom 이 로드되고 엘리먼트 접근이 가능할 때 동작
load 는 모든 resource 가 로드되고 실행

```javascript
$(window).on("load", function(){
  //이미지 사이즈를 계산하려는 경우나 필요
});
```

## 순수 자바스크립트로 ready() 대체
인터넷 익스플로러 9 이상의 모던 브라우저에서는 DOMContentLoaded 이벤트를 감지할 수 있다.
```javascript
document.addEventListener("DOMContentLoaded", function(){
  // Handler when the DOM is fully loaded
});
```
이미 이벤트가 발샏ㅇ한 경우라면 콜백이 실행되지 않는다.
제이쿼리는 document 의 readyState 속성를 체크한다.

일반적인 javascript 를 사용시에 readyState complete 상태에도 실행하면 좋다.
```javascript
var callback = function(){
  // Handler when the DOM is fully loaded
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  callback();
} else {
  document.addEventListener("DOMContentLoaded", callback);
}
```

## 구버젼 익스플로러
8이하 버젼의 익스플로러에서는 document 의 readyState 솟성 값을 감지하기 위해 onreadystatechange 이벤트를 사용한다.

```javascript
document.attachEvent("onreadystatechange", function(){
  // check if the DOM is fully loaded
  if(document.readyState === "complete"){
    // remove the listener, to make sure it isn't fired in future
    document.detachEvent("onreadystatechange", arguments.callee);
    // The actual handler...
  }
});
```

## 결론
그냥 jquery 되면 ready 함수 쓰는게 나을거 같다.


참고문헌
> http://www.mybatis.org/spring/ko/mappers.html
