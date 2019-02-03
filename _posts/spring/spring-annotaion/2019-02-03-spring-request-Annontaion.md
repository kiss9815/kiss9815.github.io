---
title: "스프링 request Annotation"
categories:
  - spring
tags:
  - annotation
last_modified_at: 2019-02-03T13:00:00+09:00
toc: true
toc_sticky: true
---

## @RequestMapping

일반적인 mapping
```java
@RequestMapping("/post/list")
public String list(){
}
```

여러경로를 한 메소드에서 처리하고 잇으면 배열로 경로 목록을 지정
```java
@RequestMapping({"/post/list", "/post/all"})
public String list(){
}
```

컨트롤러와 메서드에 동시사용 하령 클래스 적용한 값과 메소드에 적용한 값을 조합해서 매핑
```java
@Contorller
@RequestMapping("/post")
pulic class PostController{
    @RequestMapping("/list")
    public String list(){
    }
}
```

get과 post 지정
```java
//get
@RequestMapping(value="/post/{postId}", method=RequestMethod.GET)
public String list(@PathVariable String poistId, Model model) {
  return "view";
}
//get post 두개 동시
@RequestMapping(value="/post/{postId}", method={RequestMethod.GET, RequestMethod.POST })
public String list(@PathVariable String poistId, Model model) {
  return "view";
}
```

## 요청 parameter 관리

### @PathVariable
위 코드 처럼 {postId} 처럼 사용
```java
@RequestMapping(value="/post/{postId}", method={RequestMethod.GET, RequestMethod.POST })
public String list(@PathVariable String poistId, Model model) {
  return "view";
}
```

### @RequestParam
```java
private ModelAndView request_TEST(@RequestParam(value="test", required=false, defaultValue= "0") int num,
                                                   @RequestParam("test2") String str)){
//required=false로 지정하면 해당 키값이 존재하지 않다고 해서 BadRequest가 발생하지 않게 됩니다.
//그리고 존재하지 않다면 num변수에 default로 0이 들어가게됩니다.
}
```
required=false 및 true 지정 가능하고, defaultValue 지정이 가능

여러개 param 관리 가능
1. HaspMap
```java
private ModelAndView request_TEST(@RequestParam HashMap<string,string> paramMap)){
        String data = paramMap.get("testParam");
    }
```
2. 데이터커맨드(커맨드객체)
```java
private ModelAndView request_TEST(BoardVo boardVo)){
        return "view";
    }
```
키값과 변수명이 동일하면 AutoParsing 되어 요청 데이터를 사용할 수 있다.

### @RequestBody 와 @ResponseBody
@RequestBody 어노테이션을 이용하면 HTTP 요청 몸체를 자바 객체로 전달받을 수 있다. 비슷하게 @ResponseBody 어노테이션을 이용하면 자바 객체를 HTTP 응답 몸체로 전송할 수 있다.

@RequestBody
요청을 java 받을때 사용
```java
public @ResponseBody  Map<String , Object> saveCode(@RequestBody Map<String, Object> param) {
    String code = (String) param.get("code");
    String upCode = (String) param.get("upCode");
}
```

@ResponseBody


참고문헌
>
