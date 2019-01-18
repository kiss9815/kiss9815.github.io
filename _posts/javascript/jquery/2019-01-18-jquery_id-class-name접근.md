---
title: "jquery 로 id, name, class 로 접근"
categories:
  - jquery
tags:
  - jquery
last_modified_at: 2019-01-18T13:00:00+09:00
toc: true
toc_sticky: true
---


## 1. id로 접근시 $(#id)

id로 접근시 # 식별자를 사용하여 접근합니다.
<button id="testbutton" type="button">버튼</button>
ex) $("#testbutton")

## 2. class로 접근시 $(.class)
class로 접근시 . 식별자를 사용하여 접근합니다.
<button class="testclass" type="button">버튼</button>
ex) $(".testclass")

## 2. name으로 접근시 $(tag_name[name=name])
name으로 접근시 개체[name=개체 이름] 형태로 접근합니다.
<input type="submit" name="testname">버튼</button>
ex) $("input[name=testname]") or $("input:checkbox[name=testname]")
