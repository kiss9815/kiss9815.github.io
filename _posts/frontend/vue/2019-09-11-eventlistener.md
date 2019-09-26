---
title: "vue eventlister 추가 제거"
categories:
  - vue
tags:
  - eventlister
last_modified_at: 2019-09-11T13:00:00+09:00
toc: true
toc_sticky: true
---

eventLister 제거시 같은 메소드를 사용해야 함. 
콜백 메소드로 
window.addEventListener('keyup', function(event) {
  //~~~~
})
다음 처럼 사용시 이벤트 제거가 안됨.
event 는 vue beforeDestroy 생성주기에 작성을 해야함. 안그러면 event 가 계속 살아 있음.


``` javascript
 mounted () {
    // let context = this
    window.addEventListener('keyup', this.doStuff) // enter 클릭시 alert 창 닫기
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.doStuff)
  },
  methods: {
    doStuff (event) {
      if (event.keyCode === 13) {
        this.callEvent()
      }
    },
    callEvent () {
      this.$emit('close')
    }
  }
```
