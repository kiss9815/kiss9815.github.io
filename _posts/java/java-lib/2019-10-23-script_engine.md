---
title: "문자열로 된 수식 계산하기"
categories:
  - java
tags:
  - ScriptEngineManager
last_modified_at: 2019-10-23T13:00:00+09:00
toc: true
toc_sticky: true
---

##문자열로 된 수식 계산하기

파싱안하고 스크립트 엔진으로 연산하기

``` java
import javax.script.ScriptEngineManager;
import javax.script.ScriptEngine;

public class Test {
  public static void main(String[] args) throws Exception{
    ScriptEngineManager mgr = new ScriptEngineManager();
    ScriptEngine engine = mgr.getEngineByName("JavaScript");
    String foo = "40+2";
    System.out.println(engine.eval(foo));
    }
}

```

참고문헌
> [https://unikys.tistory.com/226]
