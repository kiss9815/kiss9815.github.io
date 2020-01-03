---
title: "업데이트 findAndModify"
categories:
  - mongodb
tags:
  - update
last_modified_at: 2020-01-03T13:00:00+09:00
toc: true
toc_sticky: true
---

## FindAndModify
 update 메소드와는 달리 upsert과 remove까지 같이 수행할 수 있습니다. 인자가 옵션 객체 하나인데 여러 개의 속성을 넣어줘야 합니다.  query가 대상을 찾는 법, update가 대상을 수정할 내용, new가 수정 이전의 다큐먼트를 반환할지, 수정 이후의 다큐먼트를 반환할 지 결정하는 부분입니다. { new: true }를 넣으면 수정 이후의 다큐먼트를 반환합니다.  

```javascript
db.getCollection('collection').findAndModify(
{ 
    query: {  _id:ObjectId("5e0d9ba05cf8e83108af800d") },
    update: {
        $set: { data:{text: "data" , name: '이름이다'} },
        $unset: { address:"", address2:"" }
        },
    upsert: true    
})
```
$set 을 안하면 나머지 컬럼 다 없어지므로, set 으로 추가 하고자 하는 컬럼을 지정해준다. 
$unset 은 컬럼 없애기


참고문헌
> https://www.zerocho.com/category/MongoDB/post/579e2821c097d015000404dc[제로초,mongodb수정]
