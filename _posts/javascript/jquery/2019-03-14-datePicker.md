---
title: "jquery datePicker"
categories:
  - jquery
tags:
  - datePicker
last_modified_at: 2019-03-14T13:00:00+09:00
toc: true
toc_sticky: true
---

## datePicker란
jQuery에서 제공하는 달력 형식의 UI 위젯중 하나인 datepicker

datepicker의 동작 순서는 먼저 datepicker 메소드를 통해서 jQuery가 javascript 해석기로 datepicker를 요청합니다. 요청을 받은 javascript 해석기는 DOM에서 id가 datepicker인 요소를 찾습니다. 다시 javascript 해석기로 return 후 화면으로 출력합니다.

필요 파일
```html
// jQuery UI CSS파일
<link rel="stylesheet" href="http://code.jquery.com/ui/1.8.18/themes/base/jquery-ui.css" type="text/css" />  
// jQuery 기본 js파일
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>  
// jQuery UI 라이브러리 js파일
<script src="http://code.jquery.com/ui/1.8.18/jquery-ui.min.js"></script>  
```

```javascript
    // 날짜 적용하려는 input id 가 divId 이다
		jQuery( divId ).datepicker({
			   monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			   dayNamesMin: ['일','월','화','수','목','금','토'],
			   showOn: "button",
			   weekHeader: 'Wk',
			   numberOfMonths: 1,
			   buttonImage: "http://이미지url주소",     
			   buttonImageOnly: true,
			   dateFormat: 'yymmdd', //형식(2012-03-03)
			   changeMonth: true, //월변경가능
			   changeYear: true, //년변경가능
			   showMonthAfterYear: true //년 뒤에 월 표시
		});
```


참고문헌
> http://www.nextree.co.kr/p9887/
