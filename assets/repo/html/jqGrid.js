var jqGridSetting = {
  /* 결제관리 기본모델 */
  commonModel : [
    {
      label: '항공사',  name: 'AIRLINE_CODE',  key: true,   width: 10, align :'center'
    }, {
        label: '한국발카드',  name: 'DEP_KOR_YN',  width: 10, align :'center'
    }, {
        label: '해외발카드',  name: 'SOTO_YN',  width: 10, align :'center'
    }, {
        label: 'BIN-LIST',  name: 'BIN_YN',  width: 10, align :'center'
    },{
        label: '코드쉐어',  name: 'CODE_SHARE_YN',  width: 10, align :'center'
    }, {
        label: 'OAL',  name: 'OTHER_AIRLINE_YN',  width: 10, align :'center'
    }, {
        label: '제외노선',  name: 'EXCEPT_NAT_OP_CLASS', width: 10, align :'center'
    }, {
        label: '출발제외국가',  name: 'EXCEPT_NT_CODET',  width: 10, align :'center'
    }, {
        label: '제외코드',  name: 'EXCEPT_IDT_CODE',  width: 10, align :'center'
    }, {
        label: '등록일',  name: 'INPT_DATE',  width: 10, align :'center'
    }, {
        label: '등록자',  name: 'INPT_USER',  width: 10, align :'center'
    }, {
        label: '수정일',  name: 'UPDT_DATE',  width: 10, align :'center'
    }, {
        label: '수정자',  name: 'UPDT_USER',  width: 10, align :'center'
    }

  ],
  lastModel : [
   {
         label: '삭제', name: 'DELETE', sortable: false, align :'center', width: 5,
         formatter: function (rowId, cellval, colpos, rwdat, _act) {
          return  "<input type='button' id='"+ cellval.rowId +"deleteBtn"+"' value='삭제' class='btn' data-keyid= '"+ cellval.rowId +"' onClick='deleteData(this);' />";
         }
    }
  ],
  gridResetSelection : function(){
    jQuery("#jqGrid").jqGrid("resetSelection");
    jQuery("#jqGridNonUse").jqGrid("resetSelection");
  },
  selectCurrentRow : function(){
    var keyCheckArr = []; /** Array 에 데이터 없으면 concat 이 안되서 추가 */
    var keyCheckArrOne = jQuery("#jqGrid").jqGrid('getGridParam', 'selarrrow');
    //var keyCheckArrThree = jQuery("#jqGridNonUse").jqGrid('getGridParam', 'selarrrow');

    keyCheckArr = keyCheckArr.concat(keyCheckArrOne);
    return keyCheckArr;
  }
}

/* 검색 필터 넣기 */
jQuery('#jqGrid').jqGrid('filterToolbar', {
    stringResult: true, searchOnEnter: false, searchOperators: true
});


  /** 하나만 체크박스 눌리도록 */
function doQueryV1() {

    var captionTitle = "캡션 이름";
    var colModel = jqGridSetting.commonModel.concat(jqGridSetting.lastModel);

    jQuery("#jqGrid").jqGrid('GridUnload');

    jQuery("#jqGrid").jqGrid({
        url: "url 주소",
        postData: {
            SEARCH_TYPE: 'R'
        },
        datatype: "json",
        jsonReader: {
            repeatitems: false,
            root: "result",
            page: "page",
            records: "records"
        },
        colModel: colModel,
        width: 1050,
        onSelectRow: function(rowid, status, iCol) {

            /** 하나만 체크박스 눌리도록 */
            if (rowid == _localData.lastSel) {
                //jQuery(this).jqGrid("resetSelection");
                jqGridSetting.gridResetSelection();
                _localData.lastSel = undefined;
                status = false;
            } else {
                _localData.lastSel = rowid;
            }
            /** 하나만 체크박스 눌리도록 */
            if (status) {
                var rowData = jQuery("#jqGrid").getRowData(rowid)
                setCorrectData(rowData);
                jQuery('#correctContents').show();
            } else {
                jQuery('#correctContents').hide();
            }

        },
        loadComplete: function(data) {
            //데이터 가져온 후거나 로컬에서 데이터 뿌리기 전
        },
        beforeSelectRow: function(rowId, e) {
            jQuery(this).jqGrid("resetSelection");
            jqGridSetting.gridResetSelection();
            return true;
        },
        cache: false,
        loadonce: true,
        rowNum: 20,
        width: 900,
        rowList: [10, 20, 30, 40, 50],
        pager: '#jqGridPager',
        hiddengrid: false,
        rownumbers: true,
        viewrecords: true,
        sortorder: "desc",
        height: "auto",
        //cellEdit:true,
        multiselect: true,
        multiboxonly: true,
        formatter: {
            integer: {
                thousandsSeparator: ",",
                defaultValue: 0
            }
        },
        caption: captionTitle
    }).navGrid('#jqGridPager', {
        edit: false, add: false, del: false
    }).navButtonAdd('#jqGridPager',
			 {caption: "Export to Excel"
   			  ,buttonicon : "ui-icon-disk"
   			  ,onClickButton : function(){
   				  	allData("#jqGrid");
   			  }
   			  ,position : "last"
		 	}
    );
    /* 검색 필터 넣기 */
    jQuery('#jqGrid').jqGrid('filterToolbar', {
        stringResult: true, searchOnEnter: false, searchOperators: true
    });

}


function doQueryV2(){
  $('#jqGrid').jqGrid('setGridState', 'hidden'); //그리드 숨기기
  $('#jqGrid').jqGrid('setGridState', 'visible'); //그리드 노출하기


  var model = jqGridSetting.AgeTitleModel.concat(jqGridSetting.CommonModel); //concat으로 array추가됨


  $("#jqGrid" + gridId).jqGrid('GridUnload');
    $("#jqGrid" + gridId).jqGrid({
            url: "url주소",
            postData : param,
            datatype: "json",
            jsonReader: {
                repeatitems: false,
                root: "result",
                page:  "page",
                records : "records"
            },
            colModel: model,
            width: 1200,
			      ondblClickRow:function(rowid){
                if(param.SEARCH_GROUP = 'NOR'){
                    var rowData = jQuery("#jqGrid" + gridId).getRowData(rowid);
                    if(rowData.PCD_ID != null){
                    	console.log(rowData);
                    	pnrWindow('/lts/admin/PNR_RevSummary.lts?PCD_ID='+rowData.PCD_ID ,850,800)
                    }
                }
            },
            loadComplete:function(data){
            	if(data.code == -2){
            		alert(data.message);
            	}
            	jQuery("#searchBtn").show();
            	jQuery("#searchMsg").hide();
            },
            loadError: function (jqXHR, textStatus, errorThrown) {
            	if(textStatus == 'parsererror'){
            		alert("데이터 형식 오류 ");
            	}else{
                	alert('HTTP status code: ' + jqXHR.status + '\n' +
                    	  'textStatus: ' + textStatus + '\n' +
                      	  'errorThrown: ' + errorThrown);
            	}
            },
            cache : false,
            loadonce: true,
            rowNum: 50,
            rowList: [10, 20],
            pager: '#jqGridPager'+gridId,
            hiddengrid:false,
            rownumbers: true,
            viewrecords: true,
            sortorder: "desc",
            height: "auto",
            caption: jqGridSetting.captionTitle
        }).navGrid('#jqGridPager'+gridId, { edit: false, add: false, del: false })
        .navButtonAdd('#jqGridPager'+gridId,
        			 {caption: "Export to Excel"
        			  ,buttonicon : "ui-icon-disk"
        			  ,onClickButton : function(){
        				  	allData("#jqGrid"+gridId);
        				  }
        			  ,position : "last"
        			 });
	jQuery("#jqGrid" + gridId).setGridWidth(jQuery(window).width()- 30); // 넓이

  jQuery('#jqGrid'+gridId).jqGrid('filterToolbar',{stringResult: true,searchOnEnter : false, searchOperators:true});
}


}
