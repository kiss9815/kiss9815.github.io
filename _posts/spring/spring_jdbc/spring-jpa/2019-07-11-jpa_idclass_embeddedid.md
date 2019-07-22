---
title: "spring jpa vo annotation 사용"
excerpt: "spring jpa vo annotation 사용"
categories:
  - spring-annotation
tags:
  - IdClass EmbeddedId
last_modified_at: 2019-07-11T13:00:00+09:00
toc: true
toc_sticky: true
---

## @IdClass vs @EmbeddedId
```java
@Entity
@Data
@IdClass(ParentId.class)
public class Parent {

  @Id
  @Column(name = "PARENT_ID1")
  private String id1;

  @Id
  @Column(name = "PARENT_ID2")
  private String id2;

  private String name;
}

@Data
public class ParentId implements Serializable{

  private String id1;

  private String id2;
}
```
IDClass
1. 식별자 클래스의 속성명과 엔티티에서 사용하는 식별자의 속성명이 같아야 한다. Parent.id1과 ParentId.id1, 그리고 Parent.id2과 ParentId.id2 가 같다.
2. Serializable를 구현해야 한다.
3. equals, hashCode를 구현해야 한다.
4. 기본 생성자가 있어야 한다.
5. 식별자 클래스는 public 이어야 한다.


```java
@Entity
@Data
public class Parent {

  @EmbeddedId
  private ParentId id;

  private String name;

}

@Data
@Embeddable
public class ParentId implements Serializable {

  @Column(name = "PARENT_ID1")
  private String id1;

  @Column(name = "PARENT_ID2")
  private String id2;
}
```
EmbeddedId
1. @Embeddable 어노테이션을 붙여주어야 한다.
2. Serializable를 구현해야 한다.
3. equals, hashCode를 구현해야 한다.
4. 기본 생성자가 있어야 한다.
5. 식별자 클래스는 public 이어야 한다.

참고문헌
> http://wonwoo.ml/index.php/post/830