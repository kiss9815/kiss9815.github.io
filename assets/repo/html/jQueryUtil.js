
/** 숫자만 */
jQuery('.numbersOnly').keyup(function() {
    this.value = this.value.replace(/[^0-9\.]/g, '');
});

/** 대문자 */
jQuery('.upperCase').keyup(function() {
    this.value = this.value.toUpperCase()
});

/** 공백삭제 */
jQuery('.removeBlank').keyup(function() {
    this.value = this.value.trim();
});

/** 캐릭터하나 뒤에 컴마*/
jQuery('.oneCharComma').keyup(function() {
    var str = this.value;
    if(str.length > 1){
      str = replaceAll(str,',', '')
      str =str.split('').toString();
    }
    this.value = str;

});

/** 한글만 입력가능 **/
jQueryJ(document).on("keyup", "input:text[onlyKorean]", function() {
	var regexp = /[a-z0-9]|[ \[\]{}()<>?|`~!@#$%^&*-_+=,.;:\"'\\]/g;
	var v = jQueryJ(this).val();
	if(regexp.test(v)) {
		alert("한글만 입력 가능합니다.");
		jQueryJ(this).val(v.replace(regexp, ""));
	}
});

/** 영어만 입력가능 대신 input태그에 onlyEnglish**/
jQueryJ(document).on("keyup", "input:text[onlyEnglish]", function() {
	var regexp =/[^a-zA-Z\s]+$/;
	var v = jQueryJ(this).val();
	if(regexp.test(v)) {
		alert("영문만 입력 가능합니다.");
		jQueryJ(this).val(v.replace(regexp, ""));
	}
});

/** 숫자만 입력가능 대신 input태그에 onlyNumber **/
jQueryJ(document).on("keyup", "input:text[onlyNumber]", function() {
	var regexp = /[^0-9]/g;
	var v = jQueryJ(this).val();
	if(regexp.test(v)) {
		alert("숫자만 입력 가능합니다.");
		jQueryJ(this).val(v.replace(regexp, ""));
	}
});

/** 영어+숫자만 입력가능 **/
jQueryJ(document).on("keyup", "input:text[onlyEngNum]", function() {
	var regexp = /[^a-zA-Z0-9]/g;
	var v = jQueryJ(this).val();
	if(v.match(regexp)) {
		alert("영문, 숫자만 입력 가능합니다.");
		jQueryJ(this).val(v.replace(regexp, ""));
	}
});

/** div container open **/
function show(obj) {
	jQueryJ(obj).show();
}

/** div container close **/
function hide(obj) {
	jQueryJ(obj).hide();
}

/*
jQuery 에 center 메소드 추가하기
*/
jQuery.fn.center = function (top, left) {
    this.css("position","absolute");
    this.css("z-index","1");
    if(top == undefined){
      this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    }else{
      this.css("top", top + "px");
    }
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;
}
