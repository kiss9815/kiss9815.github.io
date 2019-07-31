---
title: "vue cli 로 시작하기"
categories:
  - java
tags:
  - lamda
last_modified_at: 2019-05-07T13:00:00+09:00
toc: true
toc_sticky: true
---

## vue cli 2.X
```
// vue-cli 전역 설치
npm install -g vue-cli
```
### 프로젝트 생성
```
// vue init <template-name> <project-name>
vue init webpack my-project
```
```
//실행
npm install
npm run dev 로 실행
```

vue-cli 에서는 미리 세팅된 몇가지 템플릿을 제공한다.
제공되는 템플릿은 vuejs-templates 에 각각의 레퍼로 저장되어 있다.
vue list 명령어를 통해서 제공되는 템플릿 리스트를 확인할 수 있다.


## vue cli 3.X
```
//설치
npm install -g @vue/cli
```
버젼으로 설치
```
npm install -g @vue/cli@^3.1.0
npm r -g vue-cli --지우고 다시 설치 
```

```
//시작하기
vue create my-project
```

```
//실행
npm run serve
```

```
//관리자 vue 페이지
vue ui
```


참고문헌
> http://vuejs.kr/vue/vue-cli/2018/01/27/vue-cli-3/
