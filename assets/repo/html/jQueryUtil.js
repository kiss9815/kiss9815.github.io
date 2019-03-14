

jQuery('.numbersOnly').keyup(function() {
    this.value = this.value.replace(/[^0-9\.]/g, '');
});

jQuery('.upperCase').keyup(function() {
    this.value = this.value.toUpperCase()
});

jQuery('.removeBlank').keyup(function() {
    this.value = this.value.trim();
});

jQuery('.oneCharComma').keyup(function() {

    var str = this.value;
    if(str.length > 1){
      str = replaceAll(str,',', '')
      str =str.split('').toString();

    }
    this.value = str;

});


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
