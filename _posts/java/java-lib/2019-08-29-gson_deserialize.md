---
title: "gson deserialize"
categories:
  - java
tags:
  - gson
last_modified_at: 2019-04-09T13:00:00+09:00
toc: true
toc_sticky: true
---

##Gson deserialize


```Java
public ReturnVo deserialze(String jsonStr) {
		GsonBuilder builder = new GsonBuilder();
		builder.registerTypeAdapter(ReturnVo.class, new CustomDeserializer()); 
		Gson gson = builder.create();
		ReturnVo response = gson.fromJson(jsonStr, ReturnVo.class); /** fromJson 호출시 CustomDeserializer 가 호출됨*/
		return response;
	}
```
여기서 registerTypeAdapter 에 넣는 class 에 따라 deserialize 메소드의 json 데이터가 달라짐.
EX) String.class 를 넣으면 하위객체 String 데이터만 들어오고, 제일 상위 클래스를 넣으면 하위 json 데이터까지 deserialize 메소드에서 컨트롤 가능

CustomDeserializer 클래스
```Java
public class CouponUserDeserializer implements JsonDeserializer<ReturnVo> {

	/**
	 * JsonElement json parameter 은 parsing 하려는 전체 json 데이터
	 */
	@Override
	public ReturnVo deserialize(JsonElement json, java.lang.reflect.Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
	
		ReturnVo returnVo = new ReturnVo();
    JsonObject jsonObject = json.getAsJsonObject();
    /**
      파싱 
    */
    return returnVo;
	}
}

```

참고문헌
> https://stackoverflow.com/questions/28319473/gson-same-field-name-different-types  [Same field name, different types]
