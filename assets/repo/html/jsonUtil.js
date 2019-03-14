
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
    //Set Report title in first row or line
    //CSV += ReportTitle + '\r\n\n';//엑셀시트내 제목
    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        //This loop will extract the label from 1st index of on array
        var title =  arrData[0];
       title = jsonKeyChange(title)
        for (var index in title) {
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }
        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            if(index == '_id_'){
                continue;
            }else{
                row += '"' + arrData[i][index] + '",';
            }
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        CSV += row + '\r\n';
    }
    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "CarCardManage_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");

    //Initialize file format you want csv or xls
    //var uri = 'data:text/csv;charset=euc-kr,' + escape(CSV);
    var uri = 'data:text/csv;charset=UTF-8,\uFEFF' + encodeURI(CSV);
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    console.log(document.body);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}





function jsonKeyChange(json){
    /** 컬럼 순서대로 */
	if(json.AIRLINE_CODE != null){
        json.항공사 = json.AIRLINE_CODE
        delete json.AIRLINE_CODE
    }
	if(json.DEP_KOR_YN != null){
        json.한국발카드 = json.DEP_KOR_YN
        delete json.DEP_KOR_YN
    }
	if(json.SOTO_YN != null){
        json.해외발카드 = json.SOTO_YN
        delete json.SOTO_YN
    }
    if(json.BIN_YN != null){
        json.BIN리스트 = json.BIN_YN
        delete json.BIN_YN
    }
    if(json.CODE_SHARE_YN != null){
        json.코드쉐어 = json.CODE_SHARE_YN
        delete json.CODE_SHARE_YN
    }
    if(json.OTHER_AIRLINE_YN !=null){
    	json.OAL = json.OTHER_AIRLINE_YN
        delete json.OTHER_AIRLINE_YN
    }
    if(json.EXCEPT_NAT_OP_CLASS !=null){
    	json.출발제외지역 = json.EXCEPT_NAT_OP_CLASS
        delete json.EXCEPT_NAT_OP_CLASS
    }
    if(json.EXCEPT_NT_CODET !=null){
    	json.출발제외국가 = json.EXCEPT_NT_CODET
        delete json.EXCEPT_NT_CODET
    }
    if(json.EXCEPT_IDT_CODE !=null){
    	json.제외코드 = json.EXCEPT_IDT_CODE
        delete json.EXCEPT_IDT_CODE
    }
    if(json.INPT_DATE !=null){
    	json.입력일 = json.INPT_DATE
        delete json.INPT_DATE
    }
    if(json.INPT_USER !=null){
    	json.입력자 = json.INPT_USER
        delete json.INPT_USER
    }
    if(json.UPDT_DATE !=null){
    	json.수정일 = json.UPDT_DATE
        delete json.UPDT_DATE
    }
    if(json.UPDT_USER !=null){
    	json.수정자 = json.UPDT_USER
        delete json.UPDT_USER
    }
    if(json._id_ != null){
        delete json._id_
    }
    return json;
}
