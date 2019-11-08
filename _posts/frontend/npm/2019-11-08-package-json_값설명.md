---
title: "package.json 값 설명"
categories:
  - npm
tags:
  - package.json
last_modified_at: 2019-11-08T13:00:00+09:00
toc: true
toc_sticky: true
---

## npm 설명
```javascript
// vue-cli 전역 설치
{
  "name": "@ashnamuh/vue-npm-example",
  "version": "0.1.0",
  "private": false,
  "main": "dist/ash.common.js",
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build --target lib --name ash src/index.js",
    "lint": "vue-cli-service lint"
  },
  ...
}
```
name은 npm에 배포할 패키지명입니다. 반드시 유일해야합니다.

version은 semver versioning에 따른 버전입니다.

private를 false로 설정해야 npm에 배포가 가능합니다.

main은 패키지를 사용했을 때 진입지점이 됩니다. 빌드 후 생기는 파일을 설정했습니다.

build 스크립가 중요합니다.

원래 webpack 등을 사용해서 별도의 빌드 코드를 작성해야 합니다.

이젠 vue-cli-service에서 자체적으로 빌드 기능을 지원합니다.

빌드 target을 lib으로 지정하면 npm 배포용으로 빌드됩니다.

진입점 파일인 src/index.js를 빌드했습니다.

—name 옵션은 빌드된 결과물 파일명을 의미합니다.


npm 등록(https://www.npmjs.com/)은 배포는 아래 참고문헌 링크 

참고문헌
> https://velog.io/@ashnamuh/Vue-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EB%A5%BC-%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4%EB%A1%9C-npm%EC%97%90-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0-dxjxfg5v7e [Vue 컴포넌트를 오픈소스로 npm에 배포하기]
