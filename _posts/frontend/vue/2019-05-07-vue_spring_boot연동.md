---
title: "vue 를 스프링부트 에서 연동"
categories:
  - java
tags:
  - lamda
last_modified_at: 2019-05-07T13:00:00+09:00
toc: true
toc_sticky: true
---

## 스프링부트 프로젝트 일단 생성

## vue 프로젝트 생성
스프링부트 제일 상위 루트 terminal 에서 명령어 작성

vue-cli 2.X
```
vue init webpack frontend
```
[vuecli-2.X시작하기](https://itstory.tk/entry/Spring-Boot-Vuejs-%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0)


프로젝트 구조
```
├── src/ # Spring 소스코드 디렉터리
│ └── main/ │
│            ├── java/  
│            └── resources/  
│               ├── static/
│               ├── templates/
│               └── application.properties
├── target/ # Spring 빌드 디렉터리
│ └── ...
├── frontend/ # Vue.js 루트 디렉터리
│ ├── src/
│ └── ...
└── pom.xml
```

## 빌드
vue 빌드 파일 설정 <br>
파일명
frontend/config/index.js
```
build: {
  // Template for index.html
  index: path.resolve(__dirname, '../../src/main/resources/static/index.html'),
  // Assets Paths
  assetsRoot: path.resolve(__dirname, '../../src/main/resources/static'), }
```

```
cd frontend
npm run build
```

빌드를 하게되면 index.js 에서 설정해준 경로로 빌드된 파일이 떨어지고, 스프링부트를 실행해서 해당 static 파일 경로로 접속하면 화면이 뜬다.

### 3.X configure

vue.config.js 파일을 제일 상위 폴더 frontend 아래에 만든다.
assetsDir 폴더명이 outputDir 과 같아 static 이면 build 할때마다 해당 dir 파일 다 지우고 다시 만든다.
outputDir 가 root dir 이고, assetsDir 이 outputDir 하위에 생성되는 vue 에서 생성되는 build dir 이다.
```javascript
//vue.config.js
module.exports = {
   assetsDir: "vuestatic",
  outputDir: "../src/main/resources/static",
  indexPath: "../templates/index.html",
  devServer: {
    proxy: "http://localhost"
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  }
};
```


참고문헌
> https://itstory.tk/entry/Spring-Boot-Vuejs-%EC%97%B0%EB%8F%99%ED%95%98%EA%B8%B0
