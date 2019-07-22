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

## jpa 테이블 vo 만들기

```java
@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="Tb_table")
public class Tb_table {

	@Id
	@Column(name = "id")
	private String id;
	
	@Column(name = "name")
	private String category_no;

  @IDClass
  IDClass idClass;

	@Convert(converter = DefaultTrueConverterToYnColumn.class)
	@Column(name = "use_yn")
	private String use_yn;
	
	@Column(name = "update_date", columnDefinition="DATETIME")
	@Temporal(TemporalType.TIMESTAMP)
	private Date update_date;

  @Column(name = "long_text", length=8000)
	private String long_text;

  @Column(name = "important_code",unique=true, nullable = false)
	private String important_code;

	@Builder
	public Tb_table(String id, String name, String use_yn, Date update_date) {
		this.id = id;
		this.name = name;
		this.use_yn = use_yn;
		this.update_date = update_date;
	}
	
}
```
@Entity
-  테이블과 링크될 클래스임을 나타냄.

@EmbeddedId, @IDClass
- IDClass 로 따로 pk class 를 관리 할수 있음.
- 사용하기 위해 @IdClass(IDClass.class) 를 class 상단에 붙이면 사용 가능

위 예제 외 어노테이션
@GeneratedValue
  PK의 생성 규칙을 나타냅니다.
  기본값은 AUTO 로, MySQL의 auto_increment와 같이 자동증가하는 정수형 값이 됨
  bulk insert 시에는 사용하면 건건이 insert 가 됨  


```java
@Getter
@Setter
@Embeddable
public class IDClass implements Serializable{
  private static final long serialVersionUID = 1L;

	@Column(name = "id")
	private String id;

	@Column(name = "name")
	private String name;
}

```
- converter 사용
```java
@Converter
public class DefaultTrueConverterToYnColumn implements AttributeConverter<String, String>{
  //엔티티의 데이터를 데이터베이스 컬럼에 저장할 데이터로 변환한다
	@Override
	public String convertToDatabaseColumn(String attribute) {
		
		if("T".equals(attribute) || "t".equals(attribute) || "Y".equals(attribute) || "y".equals(attribute) || "1".equals(attribute) || attribute == null || attribute.isEmpty())
			return "1";
		else if("F".equals(attribute) || "f".equals(attribute) || "N".equals(attribute) || "n".equals(attribute) || "0".equals(attribute))
			return "0";		
		else 
			return "1";
	}
  //데이터베이스에서 조회한 컬럼 데이터를 엔티티의 데이터로 변환한다
	@Override
	public String convertToEntityAttribute(String dbData) {
		return ("0".equals("dbData") ? "0" : "1");
	}
	
}
```
- 생명주기 리스너 
  1. **PostLoad** : 엔티티가 영속성 컨텍스트에 조회된 직후 또는 refresh를 호출한 후
  2. **PrePersist** : persist() 메서드를 호출해서 엔티티를 영속성컨텍스트에 관리하기 직전에 호출 된다. 식별자 생성 전략을 사용한 경우 엔티티에 식별자는 아직 존재 하지 않는다. 새로운 인스턴스를 merge할 때도 수행된다.
  3. **PreUpdate** : flush나 commit을 호출해서 엔티티를 데이터베이스에 수정하기 직전에 호출된다.
  4. **PreRemove** : remove() 메서드를 호출해서 엔티티를 영속성 컨텍스트에서 삭제하기 직전에 호출된다. 또한 삭제 명령어로 영속성 전이가 일어날 때도 호출 된다. orphanRemoval에 대해서는 flush나 commit시 호출 된다.
  5. **Postpersist** : flush나 commit을 호출해서 엔티티를 데이터베이스에 저장한 직후에 호출된다. 식별자가 항상 존재한다. 참고로 식별자 생성 전략이 IDENTITY면 식별자를 생성하기 위해 persist()를 호출한 직후에 바로 Postpersist가 호출 된다.
  6. **PostUpdate** : flush나 commit을 호출해서 엔티티를 데이터베이스에 수정한 직후에 호출 된다.
  7. **PostRemove** : flush나 commit을 호출해서 엔티티를 데이터베이스에 삭제한 직후에 호출된다.
``` java
@Entity
@Data
public class Duck {

  @Id @GeneratedValue
  private Long id;

  private String name;

  @PrePersist
  public void prePersist(){
    System.out.println("Duck.prePersist id=" + id);
  }

  @PostPersist
  public void postPersist(){
    System.out.println("Duck.postPersist id=" + id);
  }
  @PostLoad
  public void postLoad(){
    System.out.println("Duck.postLoad");
  }

  @PreRemove
  public void preRemove(){
    System.out.println("Duck.preRemove");
  }

  @PostRemove
  public void postRemove(){
    System.out.println("Duck.postRemove");
  }
}
```

- 별도의 리스너 등록하기
``` java
@Entity
@Data
@EntityListeners(DuckListener.class)
public class Duck {

  @Id @GeneratedValue
  private Long id;
}
```
``` java
public class DuckListener {

  @PrePersist
  public void perPersist(Object obj){
    System.out.println("DuckListener.perPersist obj=" + obj);
  }

  @PostPersist
  public void postPersist(Object obj){
    System.out.println("DuckListener.postPersist obj=" + obj);
  }
}
```

참고문헌
> http://wonwoo.ml/index.php/post/995