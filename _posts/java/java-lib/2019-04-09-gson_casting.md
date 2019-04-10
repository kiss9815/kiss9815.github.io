---
title: "gson casting 오류"
categories:
  - java
tags:
  - gson
last_modified_at: 2019-04-09T13:00:00+09:00
toc: true
toc_sticky: true
---

##Gson casting 오류

gson 을 사용하다 보면
__com.google.gson.internal.LinkedTreeMap cannot be cast to my class__
이런 오류가 나는데, casting 을 사용하려고 하면 나는 오류다.
결론은 아래 메소드로 다시 json 변환 후 object 로 변환 하던지, 아니면 gson 파싱 객체를 casting하지 않도록 만들어야 한다.

```Java
//array 를 json String 으로 변환
public static <T> String arrayToString(ArrayList<T> list) {
    Gson g = new Gson();
    return g.toJson(list);
}
```

```Java
// json String 을 list Object 로 변환
public static <T> List<T> stringToArray(String s, Class<T[]> clazz) {
    T[] arr = new Gson().fromJson(s, clazz);
    return Arrays.asList(arr); //or return Arrays.asList(new Gson().fromJson(s, clazz)); for a one-liner
}
```

참고문헌
> https://stackoverflow.com/questions/27253555/com-google-gson-internal-linkedtreemap-cannot-be-cast-to-my-class
