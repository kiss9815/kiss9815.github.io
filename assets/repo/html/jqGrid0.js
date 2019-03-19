<script language="Javascript" src="/lts/template_interpark/common/etour_script.js"></script>
<script type="text/javascript" src="/global/js/jquery-1.7.2.min.js" charset="euc-kr"></script>
<script type="text/javascript" src="/global/js/jqgrid/jquery.jqGrid.min.js" charset="euc-kr"></script>
<script type="text/javascript" src="/global/js/jqgrid/grid.locale-kr.js" charset="utf-8"></script>
<script type="text/javascript" src="/global/js/jqgrid/jquery-ui-1.9.0.custom.min.js" charset="utf-8"></script>

<link href="/global/css/jquerytheme/base/jquery-ui.css" rel="stylesheet">
<link href='/lts/template_interpark/css/style.css' rel='stylesheet' type='text/css'>
<link href="/global/js/jqgrid/css/ui.multiselect.css" media="screen"  rel="stylesheet">
<link href="/global/js/jqgrid/css/ui.jqgrid.css" media="screen"  rel="stylesheet">
<link href='/lts/template_interpark/css/style.css' rel='stylesheet' type='text/css'>
<script language="Javascript" src="/lts/template_interpark/common/admin_script.js?v=20181115"></script>

<meta http-ｅquiv="X-UA-Compatible" content="IE=edge,chrome=1">
<style>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #ffffff;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

#mask {
  position:absolute;
  left:0;
  top:0;
  z-index:9000;
  background-color:#000;
  display:none;
}

</style>
<script language="javascript">


  function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}


  var _localData = {};
  _localData.tktNoArr = new Array();
  _localData.cancelYn = new Array();
  _localData.fareQuoteRe = 'NN';
  var _pcdId = '<#PCD_ID>';
  var _pnrAddr = '<#PNR_ADDR>'
  //alert("http://fly.interpark.com/entry/tqn.do?pcdId=<#PCD_ID>&pnr=<#PNR_ADDR>");
  jQuery(function() {
     fareQuoteMessage()
		jQuery("#tabs").tabs({
			select : function(event, ui ){

			  if(ui.index == 0){ //FareQuote 확인
			    fareQuoteMessage()
			  }
			  if(ui.index == 1){ //카드승인
			    keyInPaymentLogJqGrid()
			  }

			  if(ui.index == 2){ //오류로그
			    requestErrorLogJqGrid()
			  }
			  if(ui.index == 3){ //VOID 요청 로그
			    requestVoidLogJqGrid()
			  }
			},
			activate:function(event, ui){
			  /*

			  if(ui.newTab.index() == 1){
			  }

			  if(ui.newTab.index() == 2){
			  }
			  */
			}


		});
		doQuery(); // 로드되면 바로 리스트 나오도록
	});



var _localGridSetting ={
          AModelName : [
          		'PCD_ID','PND_ID','NO','탑승객', '자동발권티켓번호','티켓심사여부','담당자', '티켓심사','VOID', '탑승객취소여부'
          ],
          AModel : [
                      { label: 'PCD_ID', name: 'PCD_ID',hidden : true, width: 10},
                      { label: 'PND_ID', name: 'PND_ID', hidden : true,key:true ,width: 10},
                      { label: 'NO', name: 'PND_NAME_SEQ', align :'center',  width: 5},
                      { label: '탑승객', name: 'FULL_NAME',  align :'center', width: 20},
                      { label: '자동발권티켓번호',align :'center',
                        name: 'ATL_TKT_NO', sortable: true,  width: 15,
                          formatter: function (rowId, cellval, colpos, rwdat, _act) {

                            if(colpos.ATL_TKT_NO != ''){
                             _localData.tktNoArr.push(colpos.ATL_TKT_NO)
                            }

                        	  var rowWamId = colpos.PND_ID.toString();
                            return colpos.ATL_TKT_NO;
                         }

                      },
                      { label: '티켓심사여부', name: 'ATL_TKT_JUDGMENT_YN', hidden : true, width: 10},
                      { label: '담당자', name: 'PCD_CHARGE_ID',align :'center', width: 10},
                      {
                         name: 'CHECK', sortable: false, align :'center', width: 10,
                          formatter: function (rowId, cellval, colpos, rwdat, _act) {
                            var rowWamId = colpos.PND_ID.toString();
                            if(colpos.ATL_TKT_NO == ''){
                              return "자동발권티켓없음";
                            }else if(colpos.ATL_TKT_JUDGMENT_YN == 'Y'){
                               return "심사완료";
                            }
                            return "<input type='button' id='"+rowWamId+"' value='심사요청' class='btn' onClick='ticketAgree(this);' />";
                         }
                      },
                      {
                          name: 'VOID_REQ', sortable: false, align :'center', width: 10,
                           formatter: function (rowId, cellval, colpos, rwdat, _act) {
                        	 var tktNo = colpos.ATL_TKT_NO.toString();
                        	 var pndId = colpos.PND_ID.toString();
							 if(colpos.VRL_CRE_ID != ''){
								return 'void완료';
							 }
                             return "<input type='button' id='"+tktNo+"' value='void요청' data-tktno='"+tktNo+"' data-pndid='"+pndId+"' class='btn' onClick='ticketVoid(this);' />";
                          }
                       },
                      { label: '탑승객취소여부', name: 'CANCELPSGN',align :'center', width: 10},

          ],
           PModelName : [
          		'KPL_ID','항공사','예약번호','카드코드','만료일', 'INSTALLMENT','금액','카드번호','결재/취소','승인번호','승인일','결과코드','결과','생성일','생성자'
          ],
          PModel : [
                      { label: 'KPL_ID', name: 'KPL_ID', hidden:true, key:true , width: 4},
                      { label: '항공사', name: 'AIRLINE_CODE',align :'center', width: 4},
                      { label: '예약번호', name: 'PNR_ALPHA',align :'center', width: 8},
                      { label: '카드코드', name: 'CARD_CODE',align :'center',  width: 4},
                      { label: '만료일', name: 'EXPIRY_DATE',align :'center',   width: 6},
                      { label: 'INSTALLMENT', name: 'INSTALLMENT',hidden:true, width: 13},
                      { label: '금액', name: 'PAYMENT_AMOUNT',align :'center',sortable:true, formatter:'integer', width: 10},
                      { label: '카드번호', name: 'CARD_NO', width: 15},
                      { label: '결재/취소', align :'center',
                         name: 'CANCEL_TYPE', sortable: false,  width: 10,
                          formatter: function (rowId, cellval, colpos, rwdat, _act) {
                            if(colpos.CANCEL_TYPE == 1){
                             _localData.cancelYn.push("Y");
                             return "<p>취소완료</p>"
                            }else if(colpos.CANCEL_TYPE == 2){
                             return "<p>결제오류</p>"
                            }else if(colpos.CANCEL_TYPE == 3){
                             return "<p style='display:inline;'>결제 <input type='button' id='"+colpos.KPL_ID+"CancelBtn"+"' value='취소' class='btn' data-kplid = '"+colpos.KPL_ID+"' data-approvalnumber='"+colpos.APPROVAL_NUMBER+"' onClick='keyInPaymentCancelReq(this)' /></p>";
                            }

                            return colpos.SERVICE_TYPE_DESC;
                         }
                      },
                      { label: '승인번호', name: 'APPROVAL_NUMBER', align :'center',width: 10},
                      { label: '승인일', name: 'APPROVAL_DATE_TIME', align :'center',width: 10},
                      { label: '결과코드', name: 'RESULT_CODE', hidden:true, width: 10},
                      { label: '결과', name: 'RESULT_DESC', width: 10},
                      { label: '생성일', name: 'CRE_DATE_TIME',hidden:true, width: 10},
                      { label: '생성자', name: 'CRE_ID', hidden:true, width: 10}
          ],
           LModelName : [
          		'항공사','상품코드','FQ단계','티켓여부', '에러메시지','등록일시'
          ],
          LModel : [
                      { label: '항공사', name: 'AEL_A2_CODE',align :'center', width: 3},
                      { label: '상품코드', name: 'AEL_GOOD_CODE', align :'center', width: 8},
                      { label: 'FQ단계', name: 'AEL_FQ_METHOD', align :'center',sortable:true, sorttype: 'int', width: 4},
                      { label: '티켓여부', name: 'AEL_CUSTOMER_TKT',  align :'center', width: 4},
                      { label: '에러메시지', name: 'AEL_ERR_MESSAGE', sortable:true,width: 20,
                          formatter: function (rowId, cellval, colpos, rwdat, _act) {

                            if(rowId.length < 39){
                              var result = rowId;
                            }else{
                              var result = rowId.substr(0,39) + "\n"+ rowId.substr(39,78)+ "\n" + rowId.substr(78,rowId.length);
                            }

                            return result;
                         }

                      },
                      { label: '등록일시', name: 'AEL_REG_DT', align :'center', sorttype:'date',width: 8}
          ],
          VModelName : [
                  		'예약ID','탑승객ID','티켓번호','결과코드', '결과메시지','응답메시지','VOID요청시간','VOID요청자'
                  ],
         VModel : [
                     { label: '예약ID', name: 'VRL_PCD_ID',align :'center', width: 3, hidden:true},
                     { label: '탑승객ID', name: 'VRL_PND_ID', align :'center', width: 8, hidden:true},
                     { label: '티켓번호', name: 'VRL_TKT_NO', align :'center', sorttype: 'int', width: 10},
					{ label: '결과코드', name: 'VRL_RESULT_CODE',  align :'center', width: 4},
                     { label: '결과메시지', name: 'VRL_RESULT_MESSAGE',  align :'center', width: 4, hidden:true},
                     { label: '응답메시지', name: 'VRL_REPLY_MESSAGE', width: 20 },
					{ label: 'VOID요청시간', name: 'VRL_CRE_DATE', align :'center',width: 11},
                     { label: 'VOID요청자', name: 'VRL_CRE_ID', align :'center', width: 8}
         ]
}

function ticketAgree(cellValue){
  var con = confirm("티켓심사를 하시겠습니까?")
  if(con){

  }else{
    return;
  }
  var pndId = cellValue.id;

	jQuery.ajax({   //Jquery  Ajax
		type : "post",
		url	 : "/lts/adminB/TktReqViewAmadeus.lts",
		data : {
		  SEARCH_TYPE : 'C',
      ReservationCode : _pcdId,
		  PND_ID : pndId
		},
		cache : false,
		dataType : 'json',
		success : function(data){
			var code = data.code;
	    if(code == 0){
			  	alert("티켓이 없거나, 티켓심사할 내역이 없습니다.");
	    }else if(code > 0 ){
	      doQuery();
	      alert("티켓" +code+"건 심사를 완료했습니다.")
	    }


		},
		error  : function(data){
			alert("네트워크 에러 및 예측하지 못한 에러");
		}
	});
}


function ticketVoid(cellValue){
	var con = confirm("void 하시겠습니까?")
	  if(con){

	  }else{
	    return;
	  }
	var tktNo = cellValue.dataset.tktno;
	if(tktNo == ''){
		alert("자동발권 된 티켓번호가 없습니다.");
    return;
	}
	var pndId = cellValue.dataset.pndid;
	loadingStart(150);
	jQuery.ajax({   //Jquery  Ajax
		type : "post",
		url	 : "/lts/adminB/TktReqViewAmadeus.lts",
		data : {
		  SEARCH_TYPE : 'RV',
      	  ReservationCode : _pcdId,
		  TKT_NO : tktNo,
		  PND_ID : pndId
		},
		cache : false,
		dataType : 'json',
		success : function(data){
			var code = data.code;
	    if(code == 0){
			var resultCode = jQuery(data.message).find("resultCode").text();
			var responseMessage = jQuery(data.message).find("replyMessage").text();
			if(resultCode == 'O'){
				alert(responseMessage);
			}else{
				alert("응답코드 : " + resultCode +"\n응답메시지 : " + responseMessage);
			}
			doQuery();
			jQuery('#tabs').tabs('select', 3);
	    }


		},
		error  : function(data){
			alert("네트워크 에러 및 예측하지 못한 에러");
		},
		complete : function(data){
		   loadingEnd();
		}
	});
}



function ticketAgreeMulit(){
  var keys = jQuery("#jqGrid").jqGrid('getGridParam','selarrrow');
  for(var i=0; i<keys.length; i++){

    if(jQuery("#jqGrid").jqGrid('getRowData', keys[i]).ATL_TKT_NO == ''){
      keys =keys.removeByVal(keys[i])

    }
  }
  jQuery("#jqGrid").jqGrid('getRowData','selarrrow');
	jQuery.ajax({   //Jquery  Ajax
		type : "post",
		url	 : "/lts/adminB/TktReqViewAmadeus.lts",
		data : {
		  SEARCH_TYPE : 'C',
      	  ReservationCode : _pcdId,
		  PND_IDS : keys
		},
		cache : false,
		dataType : 'json',
		success : function(data){
			var code = data.code;
			  if(code == 0){
			  	alert("티켓이 없거나, 티켓심사할 내역이 없습니다.");

	    	}else if( code > 0) {
	    	  doQuery();
	    	 	alert("티켓 " +code+"건 심사를 완료했습니다.");
	    	}else {
	    		alert(data.message);
	    	}

		},
		error  : function(data){
			alert("네트워크 에러 및 예측하지 못한 에러");
		}
	});
}

function doQuery(){

	var captionTitle = "아마데우스 자동발권 리스트";
	var colNames = _localGridSetting.AModelName;
	var colModel = _localGridSetting.AModel;

	$("#jqGrid").jqGrid('GridUnload');

    $("#jqGrid").jqGrid({
             url: "/lts/adminB/TktReqViewAmadeus.lts",
             postData : {
            	 SEARCH_TYPE:'R',
            	 ReservationCode : _pcdId
             },
             datatype: "json",
             jsonReader: {
                 repeatitems: false,
                 root: "result",
                 page:  "page",
                 records : "records"
             },
             colNames:  colNames,
             colModel: colModel,
  			 ondblClickRow:function(rowid){

             },
             loadComplete:function(data){

               if(_localData.tktNoArr.length > 0){
                jQuery("#requestTktBtn").hide();
               }else{
                jQuery("#requestTktBtn").show();
               }

             },
             cache : false,
             loadonce: true,
             rowNum: 20,
             width : '800',
             pager: '#jqGridPager',
             hiddengrid:false,
             rownumbers: true,
             viewrecords: true,
             sortorder: "desc",
             height: "auto",
             multiselect:true,
             formatter:{
                 integer : {thousandsSeparator:",", defaultValue : 0 }
               },
             caption: captionTitle
         }).navGrid('#jqGridPager', { edit: false, add: false, del: false });

    jQuery(window).bind('resize', function(){
 	    jQuery("#jqGrid").setGridWidth(jQuery(window).width()-10);
 	}).trigger('resize');
}

function fareQuoteMessageRe(){
    _localData.fareQuoteStatus = 'NN';
    _localData.fareQuoteRe = 'YY';
    fareQuoteMessage();
}

function fareQuoteMessage(){
  var quoteBtn = "<input type='button' id='fareQuoteMessageBtn' onclick='fareQuoteMessageRe()' value='FareQuote&발권처리 재조회'>";

  if(_localData.fareQuoteStatus == 'YY' ){
      /** 탭 클릭할때마다 재조회 하는게 소요시간이 커서*/
     jQuery("#fareQuoteBtn").html(quoteBtn);

     /** API 조회 시간이 길어서 추가 */
  }else if(_localData.fareQuoteStatus != 'QQ' ){ /** 상태값이 요청중이 아닌 것들만 처리 */
       _localData.fareQuoteStatus = 'QQ';
       var fareLoadingText = "FareQuote 데이터 불러오는 중입니다";
       jQuery("#fareQuoteBtn").html("");
       jQuery("#fareQuoteTab").html(fareLoadingText);
       jQuery("#fareQuoteReply").html("");
       //loadingStart(150);
        var i =0;
        var timer = setInterval(function() {
           jQuery("#fareQuoteTab").append(Array((++i % 4)+1).join(".."));
           if(i == 10){
              return;
           }
        }, 500);

        jQuery.ajax({   //Jquery  Ajax
    		type : "post",
    		url	 : "/lts/adminB/TktReqViewAmadeus.lts",
    		data : {
    		    SEARCH_TYPE:'F',
                ReservationCode : _pcdId,
                PNR : _pnrAddr,
                ReFareQuote : _localData.fareQuoteRe
            },
    		cache : false,
    		dataType : 'json',
    		success : function(data){
    			var code = data.code;

    			if(code == 0 || code == 2){
                    var completeMessage = "쿼트완료 - 요금정보와 일치하는지 PNR체크요망<br><br>";
                    completeMessage+= "FareQuote : 쿼트 된 날짜가 오늘 날짜이므로 그대로 진행합니다.<br><br>";
                    completeMessage+= "* 전체 TST 정보 확인이 어려우므로 아마데우스 터미널을 통해 확인바랍니다.<br><br>"
                    completeMessage+="----------------------------------------------------------------<br>";
                    var resultMessage = "";
                    var replyMessage = "";
                    if(jQuery(data.message).find("resultMessage").text() == ''){
                        replyMessage = data.message;
                    }else{
                        resultMessage = "결과메시지 : " + jQuery(data.message).find("resultMessage").text()+"<br>";
                        replyMessage = "응답메시지\n\n" + jQuery(data.message).find("replyMessage").text();
                    }
                    var total = completeMessage + resultMessage;
                    jQuery("#fareQuoteTab").html( total);
                    replyMessage = replaceAll(replyMessage, "\n", "<br>")
                    jQuery("#fareQuoteReply").html(replyMessage);

    			}else if(code == 1){
                    _localData.fareQuoteStatus = 'NN';
    			    var completeMessage = "*쿼트미완료 - <처리/발권>을 진행해 주시길 바랍니다.<br><br>";
    			    completeMessage+="----------------------------------------------------------------<br>";
            	    jQuery("#fareQuoteTab").html(completeMessage);
                    jQuery("#fareQuoteReply").html("");
    			}else{
    				jQuery("#fareQuoteTab").html(data.message);
    			}
    		  jQuery("#fareQuoteBtn").html(quoteBtn);
    			//loadingEnd();
    		},
    		error  : function(data){
    			  alert("네트워크 에러 및 예상치 못한 에러");
    		},
		    complete : function(data){
		      jQuery("#fareQuoteBtn").html(quoteBtn);
		      _localData.fareQuoteStatus = 'YY';
    		  clearInterval(timer);
    		}
    	});
	} /** API 조회 끝 */

}


function requestTktAmadeus(){
    jQuery("#requestTktBtn").hide();
    jQuery("#requestTktMsg").show();
    loadingStart(150);
    jQuery.ajax({   //Jquery  Ajax
            type : "post",
            url	 : "/lts/adminB/TktReqViewAmadeus.lts",
            data : {
                SEARCH_TYPE:'T',
                ReservationCode : _pcdId,
                PNR : _pnrAddr
            },
            cache : false,
            dataType : 'json',
            success : function(data){
                var code = data.code;
                if(code == 0){
                    var jsonData = JSON.parse(data.message);
                    var responseCode = jsonData.responseCode;
                    var responseMessage = jsonData.responseMessage;

                    var alertMsg = "응답코드 : " + responseCode + "\n";
                    alertMsg += "응답결과 : " + responseMessage + "\n";
                    alert(alertMsg);
                    doQuery() ;  // 성공시 호출로 바꿔야 함
                    if(responseCode == 00){
                      jQuery('#tabs').tabs('select', 0);
                      fareQuoteMessage();
                    }else{
                      jQuery('#tabs').tabs('select', 2);
                    }
                }else if(code == 1){ /** 탑승객 취소 상태가 QQ 인 경우*/
                    alert(data.message);
                }else{
                    alert(data.message);
                }
                jQuery("#requestTktBtn").show();
                jQuery("#requestTktMsg").hide();
                loadingEnd();
            },
            error  : function(data){
                alert("네트워크 에러");
                jQuery("#requestTktBtn").show();
                jQuery("#requestTktMsg").hide();
                loadingEnd();
            }
    });
}

function keyInPaymentLogJqGrid(){
    var captionTitle = "키인 승인내역";
	var colNames = _localGridSetting.PModelName;
	var colModel = _localGridSetting.PModel;
	jQuery("#jqGridKeyIn").jqGrid('GridUnload');

    jQuery("#jqGridKeyIn").jqGrid({
             url: "/lts/adminB/TktReqViewAmadeus.lts",
             postData : {
            	 SEARCH_TYPE:'P',
            	 ReservationCode : _pcdId
             },
             datatype: "json",
             jsonReader: {
                 repeatitems: false,
                 root: "result",
                 page:  "page",
                 records : "records"
             },
             colNames:  colNames,
             colModel: colModel,
  			     ondblClickRow:function(rowid){

             },
             loadComplete:function(data){
               var code = data.code;
          			if(code == 0){
                  jQuery("#keyInPaymentTab").html("");
          			  if(_localData.cancelYn.length > 0){
            	      jQuery("#fopBtn").show();
            	    }else{
            	      jQuery("#fopBtn").hide();
            	    }
          			}else{
          			  jQuery("#fopBtn").hide();
          			  var text = "카드승인 내역이 없습니다."
          			  jQuery("#jqGridKeyIn").jqGrid('GridUnload');
          			  jQuery("#keyInPaymentTab").html(text);
          			}
             },
             loadError: function(jqXHR, textStatus, errorThrown){
                    if(jqXHR.status == 200){
                        alert("서버측에서 오류 발생");
                        jQuery("#keyInPaymentTab").html("서버측에서 오류 발생" +textStatus);
                    }else{
                        alert('HTTP status code: ' + jqXHR.status + '\n' +
                        'textStatus: ' + textStatus + '\n' +
                        'errorThrown: ' + errorThrown);
                        alert('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
                        jQuery("#keyInPaymentTab").html('HTTP status code: ' + jqXHR.status + '\n' +
                                'textStatus: ' + textStatus + '\n' +
                                 'errorThrown: ' + errorThrown);
                    }
             },
             cache : false,
             loadonce: false,
             rowNum: 20,
             width : '750',
             pager: '#jqGridKeyInPager',
             hiddengrid:false,
             rownumbers: true,
             viewrecords: true,
             sortorder: "desc",
             height: "auto",

             formatter:{
                 integer : {thousandsSeparator:",", defaultValue : 0 }
               },
             caption: captionTitle
         }).navGrid('#jqGridPagerKeyIn', { edit: false, add: false, del: false });

          jQuery(window).bind('resize', function(){
 	    jQuery("#jqGridKeyIn").setGridWidth(jQuery(window).width()-30);
 	}).trigger('resize');

}



function keyInPaymentCancelReq(cellValue){

  var con = confirm("결제 취소를 하시겠습니까?")
  if(con){

  }else{
    return;
  }
  loadingStart(150);
  jQuery("#"+cellValue.id).hide(); /** 취소버튼 숨김 */
  var kplId = cellValue.dataset.kplid;
  var approvalnumber = cellValue.dataset.approvalnumber;

  jQuery.ajax({   //Jquery  Ajax
		type : "post",
		url	 : "/lts/adminB/TktReqViewAmadeus.lts",
		data : {
		    SEARCH_TYPE:'PC',
            APPROVAL_NUMBER : approvalnumber,
            KPL_ID : kplId,
            ReservationCode : _pcdId,
            PNR : _pnrAddr
        },
		cache : false,
		dataType : 'json',
		success : function(data){
			var code = data.code;
			if(code == 0){
			    var responseMsg = jQuery(data.message).find("responseMessage").text();
			    var responseCode = jQuery(data.message).find("responseCode").text();
          alert("응답코드 : " + responseCode +"\n" + "응답메시지 : " + responseMsg + "\n승인취소를 완료했습니다.");
          keyInPaymentLogJqGrid();
			}else{
				alert(data.message);
				jQuery("#"+cellValue.id).show();
			}
			 loadingEnd();
		},
		error  : function(data){
    	alert("네트워크 에러 및 예상치 못한 에러");
			jQuery("#"+cellValue.id).show();
			loadingEnd();
		}
	});

}

function requestFareQuote(){
  loadingStart(150);
  jQuery.ajax({   //Jquery  Ajax
		type : "post",
		url	 : "/lts/adminB/TktReqViewAmadeus.lts",
		data : {
		    SEARCH_TYPE:'RF',
        ReservationCode : _pcdId,
        PNR : _pnrAddr
    },
		cache : false,
		dataType : 'json',
		success : function(data){
			var code = data.code;
			if(code == 0){
			    var responseMsg = jQuery(data.message).find("responseMessage").text();
			    var responseCode = jQuery(data.message).find("responseCode").text();
          alert("응답코드 : " + responseCode +"\n" + "응답메시지 : " + responseMsg );
          if(responseCode == 00){
            jQuery('#tabs').tabs('select', 0);
            fareQuoteMessageRe();
          }else{
            jQuery('#tabs').tabs('select', 2);
          }
			}else{
				alert(data.message);
			}
		},
		error  : function(data){
    	alert("네트워크 에러 및 예상치 못한 에러");

		},
		complete : function(data){
		   loadingEnd();
		}
	});
}

function requestFopDelete(){
  loadingStart(150);
  jQuery.ajax({   //Jquery  Ajax
		type : "post",
		url	 : "/lts/adminB/TktReqViewAmadeus.lts",
		data : {
		    SEARCH_TYPE:'FD',
        ReservationCode : _pcdId,
        PNR : _pnrAddr
    },
		cache : false,
		dataType : 'json',
		success : function(data){
			var code = data.code;
			if(code == 0){
			    var responseMsg = jQuery(data.message).find("responseMessage").text();
			    var responseCode = jQuery(data.message).find("responseCode").text();
          alert("응답코드 : " + responseCode +"\n" + "응답메시지 : " + responseMsg + "\nFOP삭제를 완료했습니다.");
			}else{
				alert(data.message);
			}
		},
		error  : function(data){
    	alert("네트워크 에러 및 예상치 못한 에러");
		},
		complete : function(data){
		   loadingEnd();
		}
	});
}

function requestErrorLogJqGrid(){
    var captionTitle = "오류로그";
	var colNames = _localGridSetting.LModelName;
	var colModel = _localGridSetting.LModel;

	$("#jqGridErrorLog").jqGrid('GridUnload');

    $("#jqGridErrorLog").jqGrid({
             url: "/lts/adminB/TktReqViewAmadeus.lts",
             postData : {
            	 SEARCH_TYPE:'L',
            	 ReservationCode : _pcdId
             },
             datatype: "json",
             jsonReader: {
                 repeatitems: false,
                 root: "result",
                 page:  "page",
                 records : "records"
             },
             colNames:  colNames,
             colModel: colModel,
  			     ondblClickRow:function(rowid){

             },
             loadComplete:function(data){
               var code = data.code;
          			if(code == 0){
            	   jQuery("#errorTab").html("");
          			}else{
          			  var text = "오류로그가 없습니다."
          			   $("#jqGridErrorLog").jqGrid('GridUnload');
          			  jQuery("#errorTab").html(text);

          			}


             },
             loadError: function(jqXHR, textStatus, errorThrown){
                    if(jqXHR.status == 200){
                        alert("서버 측에서 오류 발생");
                    }
                        alert('HTTP status code: ' + jqXHR.status + '\n' +
                    'textStatus: ' + textStatus + '\n' +
                    'errorThrown: ' + errorThrown);
                    alert('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
             },
             cache : false,
             loadonce: false,
             rowNum: 20,
             width : '750',
             pager: '#jqGridErrorLogPager',
             hiddengrid:false,
             rownumbers: true,
             viewrecords: true,
             sortorder: "desc",
             sortable:true,
             height: "auto",
             formatter:{
                 integer : {thousandsSeparator:",", defaultValue : 0 }
               },
             caption: captionTitle
         }).navGrid('#jqGridErrorLogPager', { edit: false, add: false, del: false });

          jQuery(window).bind('resize', function(){
 	    jQuery("#jqGridErrorLog").setGridWidth(jQuery(window).width()-50);
 	}).trigger('resize');
}

function requestVoidLogJqGrid(){
	 var captionTitle = "Void 요청 이력";
	var colNames = _localGridSetting.VModelName;
	var colModel = _localGridSetting.VModel;

	var gridId = "#jqGridVoidLog";
	var gridPagerId = "#jqGridVoidLogPager";

	$(gridId).jqGrid('GridUnload');

    $(gridId).jqGrid({
             url: "/lts/adminB/TktReqViewAmadeus.lts",
             postData : {
            	 SEARCH_TYPE:'V',
            	 ReservationCode : _pcdId
             },
             datatype: "json",
             jsonReader: {
                 repeatitems: false,
                 root: "result",
                 page:  "page",
                 records : "records"
             },
             colNames:  colNames,
             colModel: colModel,
  			     ondblClickRow:function(rowid){

             },
             loadComplete:function(data){
               var code = data.code;
          			if(code == 0){
            	   jQuery("#voidTab").html("");
          			}else{
          			  var text = "void 요청이력이 없습니다."
          			   $(gridId).jqGrid('GridUnload');
          			  jQuery("#voidTab").html(text);
          			}

             },
             loadError: function(jqXHR, textStatus, errorThrown){
                    if(jqXHR.status == 200){
                        alert("서버 측에서 오류 발생");
                    }
                        alert('HTTP status code: ' + jqXHR.status + '\n' +
                    'textStatus: ' + textStatus + '\n' +
                    'errorThrown: ' + errorThrown);
                    alert('HTTP message body (jqXHR.responseText): ' + '\n' + jqXHR.responseText);
             },
             cache : false,
             loadonce: false,
             rowNum: 20,
             width : '750',
             pager: gridPagerId,
             hiddengrid:false,
             rownumbers: true,
             viewrecords: true,
             sortorder: "desc",
             sortable:true,
             height: "auto",
             formatter:{
                 integer : {thousandsSeparator:",", defaultValue : 0 }
               },
             caption: captionTitle
         }).navGrid(gridPagerId, { edit: false, add: false, del: false });

          jQuery(window).bind('resize', function(){
 	    jQuery(gridId).setGridWidth(jQuery(window).width()-50);
 	}).trigger('resize');
}

</script>
<body leftmargin="3" topmargin="5" marginwidth="5">

  <table id = "jqGrid" ></table>
  <div id = "jqGridPager" ></div>
  <table width=100% cellpadding=0 cellspacing="1" border="0"align="center">
    	<tr align="left">
    		<td colspan=11>
    			<input type="button" id="requestTktBtn" onclick="requestTktAmadeus()" value="처리/발권>>>>>">
    			<input type="button" onclick="requestFareQuote()" value="FareQuote실행">
    			<input type="button" onclick="ticketAgreeMulit()" value="선택한티켓심사">
    			<p id="requestTktMsg"  style="display:none;">처리중입니다.</p>
    		</td>
    	</tr>
  </table>
  <br><br>
	<div id="tabs" style="width: 100%">
		<ul>
			<li><a href="#tabs-1"><strong>FareQuote&발권 처리상태</strong></a></li>
			<li><a href="#tabs-2"><strong>카드 승인내역</strong></a></li>
			<li><a href="#tabs-3"><strong>오류로그</strong></a></li>
			<li><a href="#tabs-4"><strong>void요청이력</strong></a></li>
		</ul>
		<div id="tabs-1" >
            <!-- 진행처리 중인 메시지 화면 -->
       <div id="fareQuoteBtn"  width="100%"></div><br>
		   <div id="fareQuoteTab"  width="100%">
		  </div>
           <!-- 받아 온 응답값 화면 -->
		  <p id = "fareQuoteReply"> </p>
		</div>
		<div id="tabs-2" >
			<div id="keyInPaymentTab"  width="100%">
			</div>
			<table id = "jqGridKeyIn" ></table>
      <div id = "jqGridKeyInPager" ></div>
      <div id = "fopBtn" style="display:none;" >
			  <input type="button" onclick="requestFopDelete()" value="FOP삭제">
			</div>
		</div>
		<div id="tabs-3" >
		  <div id="errorTab"  width="100%">
		  </div>
		  <table id = "jqGridErrorLog" ></table>
          <div id = "jqGridErrorLogPager" ></div>
		</div>
		<div id="tabs-4" >
		  <div id="voidTab"  width="100%">
		  </div>
		  <table id = "jqGridVoidLog" ></table>
          <div id = "jqGridVoidLogPager" ></div>
		</div>
	</div>
	<div id="mask">
	</div>
	<div class="loader" style= "display:none;">
	</div>

<script>




</script>
</body>
</html>
