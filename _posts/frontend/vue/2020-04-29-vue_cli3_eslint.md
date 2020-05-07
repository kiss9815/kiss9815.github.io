## Vue-cli 3에서 eslint 설정

## vue.config.js
``` javascript
module.exports = {
  chainWebpack: (config) => {
    config.module.rule('eslint').use('eslint-loader')
      .tap((options) => {
        options.fix = true; // auto-fix 옵션
        return options;
      });
  },
};
```

## package.json
``` javascript
"scripts": {
    ...
    "lint": "vue-cli-service lint --fix"
  },
```  

## jquery
vue-cli 3 에서 eslint 설정은 package.json 에서 설정 가능하다  
예를 들어 jquery를 쓰고 싶다면  
index.html에서 jquery를 CDN으로 넣고 package.json 파일에서  
eslintConfig -> env -> "jquery": true 추가를 하면 됨

참고문헌

> https://harangpapa.tistory.com/83 [jquery사용]
> https://velog.io/@moggy/Vue.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-ESLint-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0 [vue.config.js]
