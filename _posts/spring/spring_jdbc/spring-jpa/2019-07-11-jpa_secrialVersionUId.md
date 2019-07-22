---
title: "spring jpa vo annotation 사용"
excerpt: "spring jpa vo annotation 사용"
categories:
  - spring-annotation
tags:
  - jpa
last_modified_at: 2019-07-11T13:00:00+09:00
toc: true
toc_sticky: true
---

## jpa id class 에 Serializable 을 구현시 이유

serialVersionUID를 선언해야 하는 이유

자바가상기계 (JVM)은 직렬화와 역직렬화를 하는 시점의 클래스에 대한 버전 번호를 부여합니다. 만약 그 시점에 클래스의 정의가 바뀌어 있다면 새로운 버전 번호를 할당합니다. 그래서 직렬화할 때의 버전 번호와 역직렬화를 할 때의 버전 번호가 다르면 역직렬화가 불가능하게 될 수도 있습니다. 이런 문제를 해결하기 위해 SerialVerionUID를 사용합니다.

간단명료하게 serialVersionUID값을 저장할 때 클래스 버전이 맞는지 확인하기 위한 용도입니다.

만약 직렬화할 때 사용한 serialVersionUID 의 값과 역직렬화 하기 위해 사용했던 serialVersionUID값이 다르다면 InvalidClassException이 발생할 수 있습니다.

이 serialVersionUID를 작성하지 않으면 Java VM에서 내부 알고리즘에 따라서 자동으로 작성을 하게 되는데, 이것은 어떤 __Java VM__ 을 사용하는지에 따라서 달라지게 된다.

``클라이언트가 Windows나 서버이거나 Linux일 경우 Java VM 이 다르므로, 이 값이 다르게 설정이 되므로, 역직렬화를 할때 익셉션이 발생할 수 있다.``

무조건 serialVersionUID 값을 설정하기를 권장!!!!!!

참고문헌
> https://ktko.tistory.com/entry/JAVA-객체의-직렬화Serializable-serialVersionUID