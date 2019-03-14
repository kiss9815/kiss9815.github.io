

/*
사용방법
var browser = get_browser();
if(browser.name == 'MSIE' && browser.version < 9 ){
  alert(익스플로러 9 미만인 경우);
}else{
    alert(그 외);
}
*/

function get_browser() {
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name:'IE',version:(tem[1]||'')};
        }
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR|Edge\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
 }


 function replaceAll(str, searchStr, replaceStr) {
   return str.split(searchStr).join(replaceStr);
 }

 function zerofill(i) {
     return (i < 10 ? '0' : '') + i;
 }




/*
사용방법
loadingUtil.loa
*/
var loadingUtil = {

    showLoader : function(top, left){
      jQuery(".loader").show();
     	jQuery(".loader").center(top); //jqerry 에 center 함수 만들어줘야 함
    },
    loadingStart : function(top, left){
      var maskHeight = $(document).height();
      var maskWidth = $(window).width();

      //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
      jQuery('#mask').css({'width':maskWidth,'height':maskHeight});
      jQuery('#mask').fadeTo("slow",0.4);
      showLoader(top);
    },
    loadingEnd : function (){
      jQuery('#mask').css({'width':0,'height':0});
      jQuery('#mask').fadeTo("slow",0);
    	jQuery(".loader").hide();
     }
}
