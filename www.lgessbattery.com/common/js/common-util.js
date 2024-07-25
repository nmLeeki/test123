/**
 * Supported Browser : MSIE, Chrome, FireFox, Safari
 * 
 * Object       : common-util.js
 * Description  : 공통 Util용 스크립트 
 * Author       : LaheeDad
 * Since        : 2013.9.23.
 * Version      : 1.0
 * 
 * Modification Information
 *     since          author              description
 *  ===========    =============    ===========================
 *  2013.9.23.     LaheeDad         최초 생성
 */

var $$MENU_ID;
var geoCd;

/**
 * 앞뒤 공백 제거
 * @returns 공백이 제거된 문자열
 */
String.prototype.trim = function(){
    return this.replace(/(^\s*)|(\s*$)/gi, '');
};

/**
 * Java StartWith 구현
 * @param   시작문자(문자열)
 * @returns Boolean : 시작문자유무(true:시작문자)
 */
if ( typeof String.prototype.startsWith != 'function' ) {
    String.prototype.startsWith = function( str ) {
        return str.length > 0 && this.substring(0, str.length) === str;
    };
};

/**
 * Java EndWith 구현
 * @param   마지막문자(문자열)
 * @returns Boolean : 마지막문자유무(true:마지막문자)
 */
if ( typeof String.prototype.endsWith != 'function' ) {
    String.prototype.endsWith = function( str ) {
        return str.length > 0 && this.substring(this.length - str.length, this.length) === str;
    };
};


/**
 * 페이지 로딩시 bind 되어야 할 이벤트 등록 
 */
$(function() {  
	
	geoCd = [
		{"longName" : "Australia" , "shortName" : "AU"}, {"longName" : "Austria" , "shortName" : "AT"}, {"longName" : "Belgium" , "shortName" : "BE"}, {"longName" : "Czech Republic" , "shortName" : "CZ"}, {"longName" : "Denmark" , "shortName" : "DK"}
		, {"longName" : "Finland" , "shortName" : "FI"}, {"longName" : "France" , "shortName" : "FR"}, {"longName" : "Germany" , "shortName" : "DE"}
		, {"longName" : "Greece" , "shortName" : "GR"}, {"longName" : "Hungary" , "shortName" : "HU"}, {"longName" : "Ireland" , "shortName" : "IE"}, {"longName" : "Italy" , "shortName" : "IT"}, {"longName" : "Luxembourg" , "shortName" : "LU"}, {"longName" : "Netherlands" , "shortName" : "NL"}
		, {"longName" : "New Zealand" , "shortName" : "NZ"}, {"longName" : "Norway" , "shortName" : "NO"}, {"longName" : "Poland" , "shortName" : "PL"}, {"longName" : "Portugal" , "shortName" : "PT"}, {"longName" : "Spain" , "shortName" : "ES"}
		, {"longName" : "Sweden" , "shortName" : "SE"}, {"longName" : "Switzerland" , "shortName" : "CH"}, {"longName" : "United Kingdom" , "shortName" : "GB"}, {"longName" : "USA" , "shortName" : "US"}
	];
	
//    $('img').error( function(){$(this).attr('src', '/resources/images/temp_img01.jpg'); });
    
//    $(window).resize(function(){
//        modalComUtil.resize();
//    });
    
//    $('#header ul.menu').ready(function(){
//        if ($$MENU_ID != undefined && $$MENU_ID != ''){
//            var depth = $$MENU_ID.split('|');    
//            $('li.'+depth[0]).addClass('on');        
//        }
//    });
//
//    $('#left').ready(function(){
//        if ($$MENU_ID != undefined && $$MENU_ID != ''){
//            var depth = $$MENU_ID.split('|');        
//            
//            for(var i = 1; i < depth.length; i++){
//                $('.'+depth[i]).addClass('on');
//            }                
//        }
//    });
    
    /**
     * A태그중 .submit은 Form객체 전송시 사용
     */
    $('a.submit, a.submit2').on({
        click : function(event){    
            event.preventDefault();   
            if(!$(this).prop('disabled')){
                submitUtil.disabled();
                $(this).parents('form').eq(0).submit();   
            }
        }
    });
    
    /**
     * Submit버튼 클릭시 disabled 시키기
     */
    $('button[type=submit]').on({
        click : function(event){    
        	event.preventDefault();   
            if(!$(this).prop('disabled')){
                submitUtil.disabled();
                $(this).parents('form').eq(0).submit();   
            }
        }
    });
    
    /**
     * A태그중 .reset은 Form객체 초기화
     * - hidden은 초기화 되지 않음.
     */
    $("a.reset").on({
        click : function(event){ 
            event.preventDefault();  
            if(!$(this).prop('disabled')){
//                if('새로 입력한 모든 내용을 초기화 하시겠습니까?\n저장하지 않는 정보는 삭제 됩니다.'){
                    $('form[name=mainForm]')[0].reset();
                    $('input[type=text]').eq(0).focus();
//                }
            }
        }
    });
    
    /**
     * A태그중 .searchSubmit .reportSubmit은 엑셀다운로드 Form객체 전송시 사용
     */
    $('a.searchSubmit, a.reportSubmit').on({
        click : function(event){    
            event.preventDefault();  
            
            if(!$(this).prop('disabled')){
                submitUtil.disabled();
                
                var form = $(this).parents('form').eq(0);
                $(form).attr('action', $(this).attr('href'));
                $(form).submit(); 
            }
        }
    });

    /**
     * input태그중 .submit은 Form객체 전송시 사용
     */
    $('input.submit').on({
        keypress :function(event){
            if(!$(this).prop('disabled')){
                if(event.which == '13'){
                    submitUtil.disabled();
                    $(this).parents('form').eq(0).submit();
                }
            }
        }
    });
    
    /**
     * 입력글자 대문자로 변환
     * enter submit금지
     * space 금지
     *
     * 1 .enter key / space key 무시
     * 2. 영문 소문자는 대문자로 치환 (a = 65, z = 90)
     *    - enter = 13
     *    - space = 32    
     */
    $('.txtUpperNoSubmit').on({
        keypress :function(event){
            if(event.which == '13' || event.which == '32'){
                event.preventDefault();
            }
        },
        keyup : function(event){
            if(event.which >= 65 && event.which <= 90){
                $(this).val($(this).val().toUpperCase());
            }
        }
    });
    
    /**
     * space 금지
     */     
    $(".noSpace").on({
        keypress : function(event){
            if(event.which == '32'){
                event.preventDefault();
            }
        }
    });    
    
    /**
     *  숫자만 입력
     *  0~9 : 48~57  
     *  BAKC SPACE : 8
     *  ENTER : 13
     *  SPACE : 32    
     */
    $('.numOnly').css('imeMode', 'disabled').on({
        keypress : function(event){   
            if(event.which && !(event.which  > 47 && event.which  < 58 || event.which == 8 || event.which == '13')) {
                alert('数字のみを入力してください。');
                event.preventDefault();
            }
        },
        keyup : function(event){
            var str = $(this).val();
            var len = str.length;
            var replaceStr = new String;

            for(var i=0; i < len; i++){
                if(str.charCodeAt(i) > 47 && str.charCodeAt(i) < 58){
                    replaceStr += str.charAt(i);
                }
            }

            if($(this).attr('numType') !== undefined){
                if($(this).attr('numType') === 'money'){
                    $(this).val( numUtil.createComma(replaceStr));
                }
            }else{
                $(this).val(replaceStr);
            }
        }
    });
    
    /**
     *  숫자, 소숫점만 입력
     *  0~9 : 48~57  
     *  BAKC SPACE : 8
     *  ENTER : 13
     *  SPACE : 32  
     *  소숫점 : 46
     */
    $('.numOnly2').css('imeMode', 'disabled').on({
        keypress : function(event){   
            
            if(event.which && !(event.which  > 47 && event.which  < 58 || event.which == 8 || event.which == '13' || event.which == '46' )) {
//                alert('数字のみを入力してください。');
                event.preventDefault();
            }
        },
        keyup : function(event){
            var str = $(this).val();
            var len = str.length;
            var replaceStr = new String;

            for(var i=0; i < len; i++){
                if(str.charCodeAt(i) > 47 && str.charCodeAt(i) < 58 || str.charCodeAt(i) == 46){
                    replaceStr += str.charAt(i);
                }
            }

            $(this).val(replaceStr);
        }
    });
    
    /**
     *  숫자, 콤마만 입력
     *  0~9 : 48~57  
     *  BAKC SPACE : 8
     *  ENTER : 13
     *  SPACE : 32  
     *  콤마 : 44
     */
    $('.numOnly3').css('imeMode', 'disabled').on({
        keypress : function(event){   
            
            if(event.which && !(event.which  > 47 && event.which  < 58 || event.which == 8 || event.which == '13' || event.which == '44' )) {
                alert('数字のみを入力してください。');
                event.preventDefault();
            }
        },
        keyup : function(event){
            var str = $(this).val();
            var len = str.length;
            var replaceStr = new String;

            for(var i=0; i < len; i++){
                if(str.charCodeAt(i) > 47 && str.charCodeAt(i) < 58 || str.charCodeAt(i) == 44){
                    replaceStr += str.charAt(i);
                }
            }

            $(this).val(replaceStr);
        }
    });
    
    /**
     *  숫자, 소숫점만 입력 1자리, 3자리
     *  0~9 : 48~57  
     *  BAKC SPACE : 8
     *  ENTER : 13
     *  SPACE : 32  
     *  소숫점 : 46
     */
    $('.numOnly21').css('imeMode', 'disabled').on({
        keypress : function(event){   
            
            if(event.which && !(event.which  > 47 && event.which  < 58 || event.which == 8 || event.which == '13' || event.which == '46' )) {
                alert('数字のみを入力してください。');
                event.preventDefault();
            }
            
            returnStr = $(this).val();
        },
        keyup : function(event){
            var strArr = new Array();
            var str = $(this).val();
            var count = 0;
            
            strArr = str.split('.');
                    
            //소수점 갯수 체크
            if(strArr.length > 2){
                alert('소수점 1자리만 입력해 주세요.');
                $(this).val(returnStr);
            }
            
            //소수점 체크
            if (strArr.length > 1) {
                if (strArr[0].length > 3) {
                    alert('3자리 숫자만 입력해 주세요.');
                    $(this).val(returnStr);
                }
                if (strArr[1].length > 1) {
                    alert('소수점 한자리만 입력해 주세요.');
                    $(this).val(returnStr);
                }
            } else {
                if (str.length > 3) {
                    alert('3자리 숫자만 입력해 주세요.');
                    $(this).val(returnStr);
                }
            }
            
            var str = $(this).val();
            var len = str.length;
            var replaceStr = new String;

            for(var i=0; i < len; i++){
                if(str.charCodeAt(i) > 47 && str.charCodeAt(i) < 58 || str.charCodeAt(i) == 46){
                    replaceStr += str.charAt(i);
                }
            }

            $(this).val(replaceStr);
        }
    });
    
    
    /**
     *  전화번호 : 숫자와 -만 입력
     *  0~9 : 48~57  
     *  BAKC SPACE : 8
     *  - : 45 
     */
    $('.telNumOnly').css('imeMode', 'disabled').on({
        keypress : function(event){   
            if(event.which && !(event.which  > 47 && event.which  < 58 || event.which == 8 || event.which == '13' || event.which == '45' )) {
                event.preventDefault();
            }
        },
        keyup : function(event){
            var str = $(this).val();
            var len = str.length;
            var replaceStr = new String;

            for(var i=0; i < len; i++){
                if(str.charCodeAt(i) > 47 && str.charCodeAt(i) < 58 || str.charCodeAt(i) == 45){
                    replaceStr += str.charAt(i);
                }
            }

            $(this).val(replaceStr);
        }
    });

    /**
     * 기본으로 영문을 입력받아햐 할때 사용(IE만 가능)
     */
    $('.engMode').css('imeMode', 'disabled');
    
    /**
     *  대소문자만 입력
     *  0~9 : 48~57  
     *  대문자문자 : 65~90
     *  소문자: 97~122
     */
    $('.engOnly').css('imeMode', 'disabled').on({
        keypress : function(event){   
            if (!(event.which && (event.which  > 64 && event.which  < 91 || event.which == 8) || (event.which  > 96 && event.which  < 123 || event.which == 8))) {
                alert('대소문자만 입력해 주세요.');
                event.preventDefault();
            }
        },
        keyup : function(event){
            var str = $(this).val();
            var len = str.length;
            var replaceStr = new String;

            for(var i=0; i < len; i++){
                if((str.charCodeAt(i) > 64 && str.charCodeAt(i) < 91) || (str.charCodeAt(i) > 96 && str.charCodeAt(i) < 123)){
                    replaceStr += str.charAt(i);
                }
            }

            $(this).val(replaceStr);
        }
    });
    
    
    /**
     *  아이디에 영문/숫자만 가능
     *  0~9 : 48~57  
     *  대문자문자 : 65~90
     *  소문자: 97~122
     */
    $('.idPattern').css('imeMode', 'disabled').on({
        keypress : function(event){   
            if (!(event.which && (event.which > 47 && event.which  < 58 || event.which == 8) || (event.which  > 64 && event.which  < 91 || event.which == 8) 
                    || (event.which  > 96 && event.which  < 123 || event.which == 8) )) {
                event.preventDefault();
            }
        },
        keyup : function(event){
            var str = $(this).val();
            var len = str.length;
            var replaceStr = new String;

            for(var i=0; i < len; i++){
                if( (str.charCodeAt(i) > 47  && str.charCodeAt(i) < 58) || (str.charCodeAt(i) > 64 && str.charCodeAt(i) < 91) 
                        || (str.charCodeAt(i) > 96 && str.charCodeAt(i) < 123)){
                    replaceStr += str.charAt(i);
                }
            }

            $(this).val(replaceStr);
        }
    });
    
    /**
     * 아이디에 특문입력금지
    **/
    /*$(".idPattern").on({
        keypress : function(event){
            if (!((event.which && (event.which  > 64 && event.which  < 91 || event.which == 8) || 
                    (event.which  > 96 && event.which  < 123 || event.which == 8) || 
                    (event.which  > 47 && event.which  < 58 || event.which == 8 || event.which == '13' || event.which == '32') || 
                    (event.which == '45' || event.which == '95' || event.which == '46')))) {
                event.preventDefault();
            }
        }
    });  */
    
    /**
     * 모달 화면 열기
     */
//    $('.btn_modal_open').on({
//        click : function(event){
//            event.preventDefault();
//            modalUtil.open($(this));
//        } 
//    });
    
    /**
     * 모달 화면 닫기
     */
//    $('.modal_wrap a.btn_pop_close, .modal_wrap a.btn_cancle').on({
//        click : function(event){
//            event.preventDefault();
//            modalUtil.close($(this));
//        } 
//    });   
    
    
    var today =  new Date();
  

    /* 텍스트 박스 글자수 체크 */
    $('.textLengthCheck').on({
        keyup : function (event) {
            var obj = $(this);
            
            var maxLength = parseInt($(this).attr("maxlength"));
            if ($(this).val().length > maxLength) {
                alert('글자수가 ' + ($(this).val().length-1) + '자 이내로 제한됩니다');
                $(this).val($(this).val().substring(0, maxLength));
            }
        }
    });

    //파일등록
    fileUtil.inputResetEvent();
    fileUtil.inputChangeEvent();
    fileUtil.downloadEvent();
    fileUtil.deleteEvent();
    
    eventObj.disabledEvent();
    
    //목록에서 전체 ROW선택
    eventObj.checkboxSelectAll();
    
    //게시물 로그 보기
    //eventObj.popupLogViewer();
});


var eventObj = {
    iframeClickEvent : function(){
        document.getElementById('ifr3').contentWindow.document.body.onclick = function(){
            $('.datepicker').datepicker('hide');
            $('#ifr3').hide();        
        };
    },
    /**
     * 파일첨부를 변경시 해당 파일정보는 input.text에 보여준다.
     * 
     * eventObj.inputFileChangeEvent();
     */    
    inputFileChangeEvent : function(){        
        $('input[type=file]').live({            
            change : function(){
                var txtName = $(this).attr('name');
                
                try{
                    $('#txt_'+ txtName).val($(this).val());
                    $('.desc_'+ txtName).prop('disabled', false);
                    
                    if(loginObj.isDevice == 'N'){
                        $('.desc_'+ txtName).css({'background-color' : '#FFF'});
                    }
                }catch(e){
                    //ignore
                }
            }
        });   
    },
    /**
     * .disabled 일때 배경색 설정하기
     */
    disabledEvent : function(){
        $('.disabled').prop('disabled', true); //.css({'background-color' : '#F5F5F5'});
    },
    /**
     * 주소 찾기
     * - 사용하는 페이지에서 이벤트 적용해 줄것.
     * @use eventObj.searchAddress();
     
    searchAddress : function(){
        $('.btn_find_address').on({
            click : function(event){
                event.preventDefault();  
                commonUtil.searchAddress();
            }
        });
    },*/
    /**
     * 목록에서 전체 ROW선택을 위한 이벤트
     */
    checkboxSelectAll : function(){
        $('input#checkbox-selectAll').on({
            change : function(event){
                $(this).parents('table').find('input.checkbox-select').prop('checked', $(this).is(':checked'));
            }
        });
    },
    /**
     * 주소 찾기
     * - 사용하는 페이지에서 이벤트 적용해 줄것.111
     * @use eventObj.searchAddress();
     */
    searchAddress : function(){
//        $(".find-address").click(function(){
//            window.open("/common/pop/addressPList.imx", 'popAddress', 'width=740,height=724,scrollbars=yes,resizable=no');
//        }); 
    },
    /**
     * 게시물 로그 보기
     */
    popupLogViewer : function(){
        $('.popup-logViewer').click(function(event){
            event.preventDefault();
            windowUtil.open($(this).attr('href'),  "popLogViewer", 600, 400, 0) ;
        });
    }
};


/**
 * 윈도우 팝업 처리
 */
var windowUtil = {
    /**
     * 팝업 열기
     * 
     * - 기본 팝업 열기 : windowUtil.open(uri,  "poptitle", 430, 190, 0) ;
     * - 팝업사이즈 변경 필요할 경우 : windowUtil.open(uri,  "poptitle1", 430, 190, 0,1);
     *  
     * @param url           경로
     * @param windowName    팝업명
     * @param width         가로크기
     * @param height        세로크기
     * @param strScroll     스크롤 여부
     * @param strResize     크기변경 여부
     */
    open: function(url,  windowName, width, height, strScroll, strResize) {
        var popupWindow = "" ;
        
        if(!(width == '' && height == '')){
            windowX = Math.ceil( (window.screen.width  - width) / 2 );
            windowY = Math.ceil( (window.screen.height - height) / 2 );
        }
        
        if(strResize == undefined || strResize == '') {
            strResize = 0 ;
        }
        
        if(!(width == '' && height == '')){
            popupWindow = window.open(url, windowName, "width=" + width + ", height=" + height + ", top="+ windowY +", left="+ windowX +", scrollbars="+ strScroll+", resizable="+ strResize);
        }else{
            popupWindow = window.open(url, windowName, '', '');
        }

        if(!popupWindow){
            // @TODO  팝업 해제 방법  메뉴얼 필요.
            alert("팝업을 해제해 주세요.");
        }else{
            try {popupWindow.focus(); } catch(e){}
        }
    },
    /**
     * 팝업창을 닫는다. 
     * - 팝업창에서 사용.  
     * 
     * @use windowUtil.close();
     * @returns {Boolean}
     */
    close : function() {
        window.open('', '_self', '');
        window.close();
        return false;
    }        
};

/**
 * 문자열 관련
 */
var stringUtil = {
    /**
     * NULL인지 체크
     * @param str
     * @returns {Boolean} true : null
     */
    isNull : function(str)    {
        var bRtn = false;
        if (str == undefined || str == null || str == 'null' || str.toString().replace(/ /g,"") == ""){
            bRtn =  true;
        }
        return bRtn;
    },
    /**
     * MessageResource문자열에서 개행 문자 제거 
     * @param str   문자열
     * @returns
     */
    replaceNewLine : function(str){
        return str.replace(/\\n/g,'\n');
    },
    /**
     * 
     * 날자 형식으로 리턴
     * ref) var param = stringUtil.makeDateFormat(20140101);  // 2014.01.01
     * @param YYYYMMDD
     * @returns YYYY.MM.DD
     */
    makeDateFormat : function(strDate){
        
        var delimiter = "-";    //날짜 형식 구분자
        
        if( isNaN(strDate) || strDate == null ){
            strDate = "";
        }
        
        var size = strDate.length;
        if(size >= 6 ){
            strDate = strDate.substring(0,4) + delimiter + strDate.substring(4,6) + delimiter + strDate.substring(6);
        }else if(size >= 4 ){
            strDate = strDate.substring(0,4) + delimiter + strDate.substring(4);
        }
        
        return strDate;
    }
};


/**
 * 숫자 관련 처리 
 */
var numUtil = {
    /**
     * 콤마 제거
     * 
     * @use numUtil.removeComma(num);
     * @param num
     * @returns
     */
    removeComma : function(num) {
        num = new String(num);
        return num.replace(/,/gi,"");
    },
    /**
     * 숫자에 자릿수 표시
     * 
     * @use numUtil.createComma(num);
     * @param num
     * @returns
     */
    createComma : function(num) {
        num = numUtil.removeComma(num);

        if (isNaN(num) || num == 0){
            return 0;
        }
    
        var sign = "";
    
        if (num < 0) {
            num = num * (-1);
            sign = "-";
        } else {
            num = num * 1;
        }
    
        var reg = /(^[+-]?\d+)(\d{3})/;
        num += '';
    
        while (reg.test(num))
            num = num.replace(reg, '$1' + ',' + '$2');
    
        return sign + num ;
    }        
};


var dateUtil = {
    /**
     * 날짜 형식 구분자
     */
    delimiter : ".",
    /**
     * 요청에 따른 날짜리턴
     * 아무값이 없으면 오늘 날짜
     * @param sdate 특정 날자를 넘길 경우.
     * @param dateFormat 요청 데이터 형식
     * @param split
     * @returns
     */
    getDate : function( sdate, dateFormat) {
        var date;
        
        if( sdate == undefined || sdate == "" || sdate == null){
            date = new Date();
        }else{
            date = new Date(sdate);
        }
        
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        if (("" + month).length == 1) { month = "0" + month; }
        if (("" + day).length  == 1) { day  = "0" + day;  }

        if(dateFormat=="yyyy"){
            return year;
        }else if(dateFormat=="mm"){
            return month ;
        }else if(dateFormat=="dd"){
            return day;
        }else if(dateFormat=="yyyymm"){
            return year + this.delimiter + month;
        }else if(dateFormat=="mmdd"){
            return month + this.delimiter + day;
        }else{
            return  year + this.delimiter + month + this.delimiter + day;
        }
    },
    /**
     * 월의 마지막 날짜 구하기
     * @param year 년도
     * @param month 월
     * @returns
     */
    getMonthLastDay : function(year, month) {
        // 월별 마지막 날짜
        var arrLastDay = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

        // 윤년인 경우 2월의 마지막은 29일
        if((0 == year%4 && 0 != year%100) || 0 == year%400) {
            arrLastDay[1]=29;
        }
        
        return arrLastDay[month-1];
    },
    /**
     * 년월일(YYYYMMDD)의 유효성을 체크    
     * ref : dateUtil.isDateFormat(yyyymmdd)
     * @param ymd
     * @returns {Boolean} ture : OK
     */
    isDateFormat : function(ymd) {
        ymd = ymd.replace(/[\.]/gi,"");
        
        if( isNaN(ymd) || ymd==null ){
            return false;
        }else{
            var year = ymd.substring(0, 4);
            var month = parseInt(ymd.substring(4, 6), 10) -1;
            var day = parseInt(ymd.substring(6), 10);
            var endDay = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

            if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
                endDay[1] = 29;
            }
            
            return (day >= 1 && day <= endDay[month]);
        }
    },
    /**
     * 입력시간의 유효성을 체크
     * ref : dateUtil.isTimeFormat('HHMM')
     * @param hhmm  시간
     * @returns {Boolean}
     */
    isTimeFormat : function(hhmm){
        var bRtn = true;
       
        hhmm = hhmm.replace(/[-:]/gi,"");
        
        if( isNaN(hhmm) || hhmm == null ||  hhmm.length != 4){
            bRtn = false;
        }else{
            if(parseInt(hhmm.substr(0, 2)) > 23){
                bRtn = false;
            }
            
            if(parseInt(hhmm.substr(2, 2)) > 59){
                bRtn = false;
            }            
        }
        
        if(!bRtn){
            alert('시간범위가 아닙니다. 최대 23시 59분까지 입니다.');
        }
        
        return bRtn;
    },
   /**
    * 입력시간의 유효성을 체크
    * - 시작시간과 종료시간의 범위검사 추가
    * ref : dateUtil.isTimeFormat('HHMM', 'HHMM')
    * @param hhmm   시작시간
    * @param hhmm2  종료시간
    * @returns {Boolean}
    */
    isTimeFormat2 : function(hhmm, hhmm2){
        var bRtn = true;
        
        hhmm = hhmm.replace(/[-:]/gi,"");
        hhmm2 = hhmm2.replace(/[-:]/gi,"");
        
        if(dateUtil.isTimeFormat(hhmm) && dateUtil.isTimeFormat(hhmm2)){
            if(parseInt(hhmm) > parseInt(hhmm2)){
                bRtn = false;
                alert('시작시간이 종료시간보다 늦습니다. 다시 확인해 주세요.');
            }
        }else{
            bRtn = false;
        }
        
        return bRtn;
    },
    /**
     * 날짜 차이를 일로계산 한다    
     * ref : dateUtil.diffDate('2002/02/01','2003/03/01')
     * @param fromDate
     * @param toDate
     * @returns
     */
    diffDate : function( fromDate, toDate) {
        // 값이 없는 경우 0일을 리턴한다.(조회 최소기간:하루)
        if(stringUtil.isNull(fromDate) || stringUtil.isNull(toDate)){
            return "0";
        }

        var MinMilli = 1000 * 60;
        var HrMilli = MinMilli * 60;
        var DyMilli = HrMilli * 24;

        //var d1 = new Date(stringUtil.replaceAll(fromDate, ".", "/"));
        //var d2 = new Date(stringUtil.replaceAll(toDate, ".", "/"));
        // 날자 표현형식 통일 : yyyy/mm/dd
        var d1 = new Date(fromDate);
        var d2 = new Date(toDate);

        var d3 = d2-d1;
        var str = d3 /DyMilli ;

        return str;
    },
    /**
     * 특정 날짜에 대해 지정한 값만큼 가감(+-)한 날짜를 반환
     * ref : dateUtil.addDate(aType, aDay, aDate, split)
     *       20130304 로부터 2달뒤 ==> dateUtil.addDate("m", 2, "20130304", "/");
     * @param aType 가감타입 : y(연도), m(월),  d(일), md(월가감 날짜까지 표현)
     * @param aDay 가감일
     * @param aDate 가감기준일
     * @returns {String}
     */
    addDate : function (aType, aDay, aDate){
        var yyyy;
        var mm;
        var dd;
        var cDate;
        var cYear, cMonth, cDay;
        
        if(aDate == undefined){
            aDate = dateUtil.getDate();
        }

        aDate = aDate.replace(/[\.]/gi,"");

        yyyy = aDate.substr(0, 4);
        mm  = aDate.substr(4, 2);
        dd  = aDate.substr(6, 2);

        if (aType == "y") {
            yyyy = (yyyy * 1) + (aDay * 1);
        } else if (aType == "m" || aType == "md") {
            mm  = (mm * 1) + (aDay * 1);
        } else if (aType == "d") {
            dd  = (dd * 1) + (aDay * 1);
            if (aDay < 0) dd++;
            else  dd--;
        }

        cDate = new Date(yyyy, mm - 1, dd); // 12월, 31일을 초과하는 입력값에 대해 자동으로 계산된 날짜가 만들어짐.
        cYear = cDate.getFullYear();
        cMonth = cDate.getMonth() + 1;
        cDay = cDate.getDate();

        cMonth = cMonth < 10 ? "0" + cMonth : cMonth;
        cDay = cDay < 10 ? "0" + cDay : cDay;


        if (aType == "m"){
            return cYear + this.delimiter + cMonth;
        }else{
            return cYear + this.delimiter + cMonth + this.delimiter + cDay;
        }
    }    
};

/**
 * 모달 팝업 처리
 * 
 * 공통으로 모달을 열고 닫을때 사용한다.
 * 모달의 상세한 설정은 각 페이지 에 modalUtil을 생성해서 사용한다.
 * ref.) /glovis-support-system-user/src/main/webapp/WEB-INF/jsp/sq/qsg/qsgaMan.jsp
 *
 * 
 * ***주의사항
 * 팝업과 모달의 코딩을 같이 하고 있기 때문에 Modal사용시 Class에 'modal_wrap'을 추가 표기해줄것.
 * 하나의 페이지에서 여러개의 모달을 싸용해야 한다면 class명을 modal_wrap과 modal-{식별아이이}을 선언해줄것.
 * ref.) 퍼블리싱 : <div id="pop_wrap" class="pop_wrap">
 *       모달적용 : <div class="modal_wrap modal-{식별아이이}">
 * 
 * //이벤트를 등록해준다.
 * //.btn_modal_open 공통으로 적용을 해두었음.
 * //기본적으로 하나의 모달을 사용한다면 모달 오픈 버튼 이름을 아래로 변경해 줄것.
 * //여러개의 모달을 사용한다면 각 모달 버튼에 대한 이벤트를 별도로 주어서 처리해야한다.(공통모듈 참고할것.)
 * $('.btn_modal_open').on({
 *     click : function(event){
 *         event.preventDefault();
 *         modalUtil.open($(this));
 *     } 
 * });
 * 
 * //모달 열고 닫기위한 페이지별 함수를 아래와 같이 공통으로 생성한다.
 * //모달 열고 닫기 전에 처리해야하는 로직을 아래에 추가한다.
 * var modalUtil = {
 *     open : function(object){
 *          //모달 오픈전 처리해야할 로직 추가
 *          
 *          //모달 열기         
 *          모달이 하나일때 : modalComUtil.open();  *          
 *          모달리 여러개일때 : modalComUtil.open('cont'); //modal-cont로 선언시
 *     },    
 *     close : function(object){
 *          //모달 닫기전 처리해야할 로직 추가
 *          
 *          //모달 닫기
 *          modalComUtil.close();
 *     }
 * };
 */
var modalComUtil = {
    /**
     * 모달 팝업 열기
     * 
     * @use modalComUtil.open();
     *      -> modal_box의 컨텐츠 영역이 하나뿐일때 사용 
     *      modalComUtil.open('new_cont');
     *      -> modal_box의 컨텐츠 영역이 여러개 일때 보여줄 영역의 Class명을 입력한다. 
     * @param 모달 팝업 열기
     */
    open : function(pContentClassName){
        
        if(pContentClassName == undefined){
            pContentClassName = '_wrap';
        }else{
            pContentClassName = '-' + pContentClassName;
        }
        
        $('.modal_wrap').hide();
        $('#mask').show();  
        
        //글 갯수에 따른 높이값 계산 후 화면 중앙 위치
        //this.resize();

        $('#ifr').show();
        $('#mask').fadeTo("slow", 0.5);    
        $('.modal'+pContentClassName).show();
    },    
    /**
     * 모달 팝업 닫기 
     * @use modalUtil.close();
     */
    close : function(){
        $('#ifr, #mask, .modal_wrap').hide();
    },
    /**
     * 윈도우 크기변환시 실행
     */
    resize : function(){
        var left = ( $(window).scrollLeft() + ($(window).width() - $('.modal_wrap').width()) / 2 );
        var top =  ((document.documentElement.clientHeight / 2) - ( $('.modal_wrap').height() / 2)) - 20;
        $('.modal_wrap').css({'top': top+'px', 'left':left + 'px', 'position':'fixed'});
        $('#ifr, #mask').css({'width':$(window).width(),'height':$(document).height()}); 
    }
};


/**
 * 공통 함수 :: 이벤트 아님
 */
var comUtil = {
    
};

/**
 * 쿠키관련 함수
 */
var cookieUtil = {
    /**
     * 쿠키 확인 
     * @param name  cookie name
     * @returns
     */    
    getCookie : function(name){
        var nameOfCookie = name+"=";
        var x = 0;
        while ( x <= document.cookie.length )
        {
                var y = (x+nameOfCookie.length);
                if ( document.cookie.substring( x, y ) == nameOfCookie ) {
                        if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
                                endOfCookie = document.cookie.length;
                        return unescape( document.cookie.substring( y, endOfCookie ) );
                }
                x = document.cookie.indexOf( " ", x ) + 1;
                if ( x == 0 )
                        break;
        }
        return null;
    },
    /**
     * 쿠키 설정
     * - day가 0이거나 undefined면 해당 쿠키가 삭제된다.
     * @param name cookie name
     * @param value cookie value
     * @param day   expires day
     */
    setCookie : function(name, value, day){
        if(typeof day == 'undefined'){
            day = 0;
        }        
        var expire = new Date();
        expire.setDate(expire.getDate() + day);
        document.cookie = name + '=' + escape(value) + '; path=/ ' + ';expires=' + expire.toGMTString() + ';';
    }
};

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
var Base64 = {
 
    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
 
        input = Base64._utf8_encode(input);
 
        while (i < input.length) {
 
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
 
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
 
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
 
            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
        }
 
        return output;
    },
 
    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
 
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
        while (i < input.length) {
 
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
 
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
 
            output = output + String.fromCharCode(chr1);
 
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
 
        }
 
        output = Base64._utf8_decode(output);
 
        return output;
 
    },
 
    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
 
        for (var n = 0; n < string.length; n++) {
 
            var c = string.charCodeAt(n);
 
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
 
        }
 
        return utftext;
    },
 
    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
 
        while ( i < utftext.length ) {
 
            c = utftext.charCodeAt(i);
 
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
 
        }
 
        return string;
    }
};

/*
Display to verify correct location 버튼 클릭하였는지 체크 로직 2021.05.11 추가
*/
function chkLocation(){
	var result = {'result':true, 'id': ''}
	$('input[name=locationClickYn]').each(function(i) {
		if($(this).val() != 'Y'){
			result.result = false;
			result.id = $(this).attr('id');
			return false;
		}
	});
	return result;
}
/*
 * home battery - product info - productLayer 에서 링크 복사 함수 2021.06.14 추가
 * home battery partner - library - incFileListLayer 에서 링크 복사 함수 2021.06.14 추가
 */
function copyModalAtypClip(Sn, gubn){
	var p_mobile ='';
	var url = '';
	var textarea = document.createElement("textarea");
	document.body.appendChild(textarea);
	
	if((location.pathname).indexOf('https://www.lgessbattery.com/m/') > -1){
		p_mobile = "/m";
	}
	
	if(gubn=='prdSn'){
		url = window.location.protocol + "//" + window.location.host+p_mobile+"/"+localeCd+'/home-battery/product-info.lg?sn='+Sn;
	}else{
		url = window.location.protocol + "//" + window.location.host+location.pathname+"?sn="+Sn;
	}
	
	textarea.value = url;
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	
	var msg = 'URL copy completed!';
	if(localeCd=='de'){
		msg = 'URL-Kopie abgeschlossen!'	;
	}else if(localeCd=='it'){
		msg = 'Copia URL completata!';
	}else if(localeCd=='es'){
		msg ='¡Copia de URL completada!';
	}
	alert(msg);
}


/*
 * home battery - product info - productLayer 에서 링크 복사 함수 2021.06.14 추가
 */
function libraryProductClip(name, menu){
	var url = '';
	var textarea = document.createElement("textarea");
	document.body.appendChild(textarea);
		
	url = window.location.protocol + "//" + window.location.host +"/ImageServlet?imgPath=" + name + "&imageType=" + menu;
	textarea.value = url;
	textarea.select();
	document.execCommand("copy");
	document.body.removeChild(textarea);
	
	var msg = 'PDF download<br>URL copy completed!';
	if(localeCd=='de'){
		msg = 'PDF Herunterladen<br>URL-Kopie abgeschlossen!'	;
	}else if(localeCd=='it'){
		msg = 'Scarica PDF<br>Copia URL completata!';
	}else if(localeCd=='es'){
		msg ='Descargar PDF<br>¡Copia de URL completada!';
	}
	alert(msg);
	
}

//2021.06.17  나라 선택 하였을 때 쿠키에 담고 해당 나라 url로 이동 시켜주기.
function languageCookie(lang){
	//$.cookie('language', lang, { expires: 365 });
	localStorage.setItem('language', lang);
	var pathname = window.location.pathname; 
	
	if(pathname.substr(0,2) == '/m'){
		location.href = window.location.protocol + "//" + window.location.host+"/m/"+lang+"/main/main.lg";
	}else{
		location.href = window.location.protocol + "//" + window.location.host+"/"+lang+"/main/main.lg";
	}
	
}

function removetop(){
    var element = document.querySelector('.l-header-wrap');
    element.classList.remove('has-language-wrap');
}

/*
 * Home battery > product info > 상세보기에서 사용하는 함수
 */
//작은이미지 클릭 하였을 경우 큰이미지로 나오게 함수 2021.06.17 로직 처리
function preview(attcFilSn, prdSn_v) {
	$activeDom = $('div[id=prdsn-'+prdSn_v+']');
	//큰이미지 div 안에 선택클래스 지우고 선택한 이미지로 클래스 추가해주기
	$activeDom.find('#defaultImg-'+prdSn_v).find('li').removeClass('chkImg');
	
	$activeDom.find('#defaultImg-'+prdSn_v).find('#bigItem_'+attcFilSn).addClass('chkImg');
	
	//작은이미지 의 checked 클래스 모두 지우기
	$activeDom.find('input[name=itemRadio]').removeClass('checked');
	
	//선택한 작은이미지에 checked 클래스 추가해주기
	$activeDom.find('#item_'+attcFilSn).addClass('checked');
}

//이미지 위화살표 버튼 클릭 함수  2021.06.17 로직 처리
function fnTopButtonClick(prdSn_v){
	var pos = $('div[id=prdsn-'+prdSn_v+']').find('#slider').scrollTop()-80;
	$('div[id=prdsn-'+prdSn_v+']').find('#slider').scrollTop(pos);
}

//이미지 아래화살표 버튼 클릭 함수 2021.06.17 로직 처리
function fnDownButtonClick(prdSn_v){
	var pos = $('div[id=prdsn-'+prdSn_v+']').find('#slider').scrollTop()+80;
	$('div[id=prdsn-'+prdSn_v+']').find('#slider').scrollTop(pos);
}

function memberAjaxMemberEmailChk(selectWhere) {	
	var result = true;
	var param = "";
	if (selectWhere == "mberCertEmail"){
		param = "mberCertEmail="+$("#mberCertEmail").val();
	}
	$.ajax({
        type: 'POST',
        url: '/'+localeCd+'/membership/memberFormCheck.lg',
        data : param + '&selectWhere='+selectWhere,
        dataType : 'xml',
        async:false,
        success: function(json){
        	var result = $(json).find("result").text();
        	var selectWhere = $(json).find("selectWhere").text();
        	if(selectWhere == "mberCertEmail"){
        		if (result == 0) {
        			inputMsgHide("mberCertEmail");
        			$("#mberCertEmailCheck").val('Y');
        		} else {
        			var altContent = "";
        			altContent += "<div class=\"error-msg\">There is already an account. Please enter another id Find email address.";
        			altContent += "</div>";
        			inputMsgShow("mberCertEmail", altContent);
        			$("#mberCertEmailCheck").val('N');
        		}
        	}
        },
        error:function (e){
        	alert(e.responseText);
        }
 	});
	return result;
}

function fnMberCertKeyup(){
	$('#e-msg1, #e-msg2, #e-msg3, #e-msg4').hide(); 
	$('#confirmation_number').attr("disabled", true).val('')
	$('#emailchkYn').val('N'); 
	$('#mberCertEmailCheck').val('N');
}
var setCookie = function(name, value, day) {
    var date = new Date();
    date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};
var getCookie = function(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
};
var deleteCookie = function(name) {
    var date = new Date();
    document.cookie = name + "= " + "; expires=" + date.toUTCString() + "; path=/";
}



function eloquaLink(lang) {
	var url = "/" + lang + "/main/main.lg";
	if(document.location.href.indexOf("/main/main.lg") == -1) {
		var form = document.createElement("form");
		localStorage.setItem("goEloqua", "y");
		setCookie("goEloqua","y");
	    form.setAttribute("method","get");
	    form.setAttribute("action","/" + lang + "/main/main.lg");
	    form.setAttribute("target","_blank");
	    document.body.appendChild(form);
	    
	    var hiddenField = document.createElement("input");

        hiddenField.setAttribute("type", "hidden");

        hiddenField.setAttribute("name", "goEloqua");

        hiddenField.setAttribute("value",  "y");

        form.appendChild(hiddenField);
	    form.submit();
	    
	    $(form).remove();
	} else {
		$("input[name=emailAddress]").focus();
		$("input[name=firstName]").focus();
		$(".new-letter").find(".error-msg").hide();
		$(".eloqua").find(".lg-red, .error").hide();
	}
}
function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}
function eloquaFocus() {
	if($('.btn.gray-btn.round-btn.wide-btn.white-btn.has-arrow').length>0){
		
		if($('.login button a').attr('onclick').indexOf('Login')>-1){
			$('.btn.gray-btn.round-btn.wide-btn.white-btn.has-arrow').each(function(i){
				$(this).attr('href', '#');
				$(this).attr('target', '');
				$(this).attr('onclick', $('.login button a').attr('onclick'));
			});	
		}
	}
		
		var querystring = getQueryStringObject();

		if(querystring["goEloqua"] == "y") {
			$("input[name=emailAddress]").focus();
			$("input[name=firstName]").focus();
			$('.section.eloqua').attr('id','eloqua')
                        location.hash = 'eloqua';

		}	
	if(localStorage.getItem("goEloqua") !== undefined ) {
		if(localStorage.getItem("goEloqua") == "y") {
			$("input[name=emailAddress]").focus();
			$("input[name=firstName]").focus();
		}
	}
	localStorage.removeItem("goEloqua");
	
	
	
	deleteCookie("goEloqua");
}

function emailCheck( value ) {
	// From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
	// Retrieved 2014-01-14
	// If you have a problem with this implementation, report a bug against the above spec
	// Or use custom methods to implement your own email validation
	return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test( value );
}

function validationEloqua() {
	var valiFlag = true;
	
	if($(".new-letter").length > 0) {
		$(".new-letter").find("input[type=text],select").each(function(i,e) {
			if($(e).closest("td").prev("th").find("span[class=necessary]").length > 0) {
				if($(e).prop('tagName') === "INPUT") {
					if($(e).val() == "") {
						alert("Please enter your " + $(e).closest("td").prev("th").text().replace("*", ""));
						valiFlag = false;
						return false;
					}
				} else {
					if($(e).val() == "") {
						alert("Please select the " + $(e).closest("td").prev("th").text().replace("*", ""));
						valiFlag = false;
						return false;
					}
				}
			}
		});
		
		if(valiFlag) {
			if(!$("#eloqua-agree").prop("checked")) {
				alert('Please select the check box');
				$(".letter-footer").find(".error-msg").show();
				return false;
			} else {
				$(".letter-footer").find(".error-msg").hide();
			}
		} else {
			$(".letter-footer").find(".error-msg").show();
			return false;
		}
		
		$(".letter-body").find(".error-msg").each(function(i,e) {
			if($(e).css("display") != "none") {
				$(".letter-footer").find(".error-msg").show();
				valiFlag = false;
				return false;
			}
		});
	}
	
	if($(".eloqua").length > 0) {
		$(".eloqua").find("input[type=text],select").each(function(i,e) {
			if($(e).closest("tr").prev("tr").find("td").find("span[class=necessary]").length > 0) {
				if($(e).prop('tagName') === "INPUT") {
					if($(e).val() == "") {
						alert("Please enter your " + $(e).closest("tr").prev("tr").find("td").text().replace("*", "") + ".");
						valiFlag = false;
						return false;
					}
				} else {
					if($(e).val() == "") {
						alert("Please select the " + $(e).closest("tr").prev("tr").find("td").text().replace("*", "") + ".");
						valiFlag = false;
						return false;
					}
				}
			}
		});
		
		if(valiFlag) {
			if(!$("#eloqua_agree").prop("checked")) {
				alert('Please select the check box.');
				$(".eloFooter").find(".error").show();
				return false;
			} else {
				$(".eloFooter").find(".error").hide();
			}
		} else {
			$(".eloFooter").find(".error").show();
			return false;
		}
		
		$("#eloquaForm").find(".lg-red").each(function(i,e) {
			if($(e).css("display") != "none") {
				$(".eloFooter").find(".error").show();
				valiFlag = false;
				return false;
			}
		});
	}
	
	return valiFlag;
}

function geoCodeFnc(country, results) {
	var flag = true;
	if(results != null) {
		var result = results[0].address_components;
		var geoCountry = "";
		var resultCountry = "";
		if(country != "") {
			for(var i = 0; i < geoCd.length; i++) {
				if(geoCd[i].longName == country) {
					geoCountry = geoCd[i].shortName;
					for(var j = 0; j < result.length; j++) {
						if(result[j].short_name == geoCountry) {
							resultCountry = result[j].short_name;
							break;
						}
					}
				}
			}
			flag = geoCountry != resultCountry ? false : true;
		}
		
		console.log(geoCountry + " / " + resultCountry);
		console.log(flag);
	} else {
		flag = false;
	}
	
	return flag;
}
