/**
 * FORM 객체 유효성및 이벤트처리 관련 스크립트
 * 
 * Object       : jquery-submit.js
 * Description  : FORM 객체 유효성및 이벤트처리 관련 스크립트 
 * Author       : LaheeDad
 * Since        : 2013.9.10.
 * Version      : 1.0
 * 
 * Modification Information
 *     since          author              description
 *  ===========    =============    ===========================
 *  2013.9.10.     LaheeDad         최초 생성
 */


/**
 * 문자열의 왼쪽에서 count 만큼의 문자열을 반환
 * @param   count
 * @returns string
 */
String.prototype.left = function(count){
    return this.substr(0, count);
};

/**
 * 문자열의 오른쪽에서 count 만큼의 문자열을 반환
 * @param   count
 * @returns string
 */
String.prototype.right = function(count){
    return this.substr(this.length-count, count);
};


/**
 * From 유효성 확인을 위한 객체
 */
var submitUtil = {
    /**
     * SUBMIT 비활성화
     * @use submitUtil.disabled();
     */
    disabled : function() {
        $('input[type=submit], a.submit, button[type=submit]').prop('disabled', true);
    },
    /**
     * SUBMIT 활성화
     * @use submitUtil.enable();
     */
    enable : function() {     
        $('input[type=submit], a.submit, button[type=submit]').prop('disabled', false);
    },
    /**
     * 앞뒤 공백을 제거한후에 다시 Obejct에 담아준다.
     * @use submitUtil.trim(Object)
     * @param object
     */
    trim : function(object){        
        $(object).val($.trim($(object).val()));   
    },
    /**
     * 입력값 입력유무 확인 
     * - minLength속성이 있으면 최소 문자수도 확인.
     * - text/textarea/file/select 만 가능
     * - select는 ''로 구분함.
     * @use submitUtil.isEmpty(Object, String)
     * @param object
     * @param formName 폼명(Alert Message 표시에 필요함.)     
     * @returns {Boolean} true : 입력값이 있음. / false : 입력값 없음.
     */
    isEmpty : function(object, errMsg, errType) {
        var str = '';
        try{     
            if(typeof errMsg == 'undefined'){
                errMsg = $(object).attr('title');
            }
            
            if(typeof errType == 'undefined'){
            	errType ='alert';
            }
            
            switch(object.type){
                case 'text' :
                case 'password' :   
                case 'hidden' : 
                case 'textarea' :   
                    this.trim(object);  
                    str = $(object).val();
                    break;
                case 'file' :
                    str = $(object).val();
                    break;
                case 'select-one' :                    
                    str = $('select[name=' + $(object).attr('name') + '] option:selected').val();                    
                    break;
                default : 
                    return this.alertNfocus(object, errMsg + ' : text / textarea / select / file 만 가능합니다.' + object.type);  
            }
            
            if("" == str || null == str){
            	if(errType === 'alert'){
            		this.alertNfocus(object, errMsg);
            	}else{
            		$(object).off('change, keyup').siblings('.error-msg').remove();
            		$(object).parent().append('<div class=\"error-msg\">'+ errMsg +'</div>');
            		$(object).on('change keyup', function(e){ console.log('change'); if($(this).val() != ''){ $(this).off('change, keyup').siblings('.error-msg').remove(); } });
            	}
            	
            	return false;
            }else{
                return this.isMinLength(object, errMsg);
            }
            
        }catch (e) {
            return this.alertNfocus(object, '[isEmpty]Script Error Message :: ' + e);
        }
    },
    /**
     * 최소문자수 확인
     * @use  submitUtil.isMinLength(Object, String);
     * @param object
     * @param formName 폼명(Alert Message 표시에 필요함.)  
     * @returns
     */
    isMinLength : function(object, formName) {
        try{
        	if(typeof formName == 'undefined'){
                formName = $(object).attr('title');
            }
            
            if($(object).attr('minlength') != null){
                if(!($(object).val().length >= $(object).attr('minlength'))){
                    return this.alertNfocus(object, formName + '을(를) '+ $(object).attr('minlength') + '글자 이상 입력해주세요.');                        
                } 
            }              
            
            return true;
        }catch (e) {
            return this.alertNfocus(object, '[isEmpty]Script Error Message :: ' + e);
        }
    },
    /**
     * 입력값이 NULL인지 체크
     * @use  submitUtil.isNull(Object); 
     * @param object
     * @returns true : null
     */
    isNull : function(object) {
        try{     
            var str = $(object).val();
            if("0" == str || "" == str || null == str || 'null' === str || str.toString().replace(/ /g,"") == ""){
                return true;
            }else{
                this.trim(object);
            }
            
            return false;
        }catch (e) {
            //return this.alertNfocus(object, '[isNull]Script Error Message :: ' + e);
            return false;
        }
    },
    /**
     * 입력값에 공백이 있는지 체크
     * @use  submitUtil.isBlank(Object); 
     * @param object
     * @returns {Boolean}
     */
    isBlank : function(object) {
    	var pattern =  /\s/g;
    	var isPattern = true;
    	
    	try{
    		isPattern = pattern.test($(object).val());
    	}catch (e) {
    		isPattern = true;
    	}
    	return isPattern;
    },
    /**
     * ID 확인
     * @use  submitUtil.isID(Object); 
     * @param object
     * @returns {Boolean}
     */
    isID : function(object, message) {
    	//var pattern = /^.*(?=.{3,10})(?=.*[a-zA-Z])(?=.*[0-9]).*$/gi;
        //var pattern = /^.*(?=.{3,10})(?=.*[a-zA-Z0-9]).*$/gi;
        var pattern = /^[a-zA-Z0-9]{4,20}$/;
        try{
            this.trim(object);
            
            if(typeof message == 'undefined'){
                message = "숫자, 영어를 포함한 4 자 이상 20 자 이하로 입력 해 세오.";
            }
            
            if (!pattern.test($(object).val()) || this.isBlank(object)) {
                return this.alertNfocus(object, message); 
            }else {
                return true;
            }
        }catch (e) {
            return this.alertNfocus(object, message); 
        }
    },
    /**
     * 비밀번호 체크 
     * 영문 대/소문자, 특수문자, 숫자를 조합하여 최소 8자리
     * @use  submitUtil.isPassword(Object); 
     * @param object
     * @returns {Boolean}
     */
    isPassword : function(object, message) {
        var pattern = /^.*(?=.{12,30})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*\(\)\-_+=]).*$/gi;
        var pattern2 = /((?=.*[a-zA-Z]{3,})|(?=.*[0-9]{3,})|(?=.*[!@#$%^&*\(\)\-_+=]{3,}))/;
        var pattern3 = /^.*(?=.{8,20})(?=.*[a-zA-Z])(?=.*[0-9]).*$/gi;
        var pattern4 =  /^[a-zA-Z0-9!@#$%^&*\(\)\-_+=]{4,20}$/;
        try{
            this.trim(object);

            var str = $(object).val();
            
            /*
            if(typeof formName == 'undefined'){
                formName = $(object).attr('title');
            }
            
            if(str == ''){
                return this.alertNfocus(object, formName+'를 입력해 주십시오.'); 
            }*/
            
//            if(typeof message == 'undefined'){
//                message = "数字、英語を含めて4文字以上20文字以下で入力して瀬尾。";
//            }
            
            var patternYn = pattern4.test(str);
            
            if(patternYn && !this.isBlank(object)){
                return true;
            }else{
            	return false;
//                return this.alertNfocus(object, message);
            }
        }catch (e) {
            return this.alertNfocus(object, '[isPassword]Script Error Message :: ' + e);
        }
    },
    /**
     *  E-Mail 주소 확인
     * @use  submitUtil.isEmail(Object);
     * @param object
     * @returns {Boolean}
     */
    isEmail : function(object, message) {
        var pattern1 = /(@.*@)|(\.\.)|(@\.)|(\.@)|(^\.)/;
        var pattern2 = /^[a-zA-Z0-9\-\.\_]+\@[a-zA-Z0-9\-\.]+\.([a-zA-Z]{2,4})$/;
        
        try{
            this.trim(object);
            if(!pattern1.test($(object).val()) && !pattern2.test($(object).val())){
//                return this.alertNfocus(object, message); 
                return false;
            }else{
                return true;
            }            
        }catch (e) {
            return this.alertNfocus(object, '[isEmail]Script Error Message :: ' + e);
        }
    },
    /**
     * checkbox,radio checked 확인
     *
     * @use  submitUtil.isChecked(object);
     * @param object : 시작일 form.input객체
     * @param formName 폼명(Alert Message 표시에 필요함.)
     * @return true / false
     */
    isChecked : function(object, formName){
        var bRtn = true;

        try{
            if(!$('input[name="'+$(object).attr("name")+'"]').is(':checked')){
                
            	if(typeof formName == 'undefined'){
                    formName = $(object).attr('title');
                }
                
                return this.alertNfocus(object, formName);     
//                bRtn = false;
            }
        }catch (e) {
            return this.alertNfocus(object, '[isChecked]Script Error Message :: ' + e);
        }

        return bRtn;
    },
    /**
     * 날자 형식여부 체크 
     * ref.)  submitUtil.isDateFormat(formId)
     * @param f_Obj
     * @param f_title
     * @returns
     */
    isDateFormat: function(object) {
        if(!dateUtil.isDateFormat(object.value)){
            return this.alertNfocus(object, $(object).attr('title') + '가 잘못 입력되었습니다.\n다시 입력해주세요.');
        }
        
        return true;
    },
    /**
     * 입력 날짜 유효성 체크
     * - 입력 날짜가 유효한 날짜인지를 확인 한다.
     * @use  submitUtil.isDate(Object);
     * @param object : form.input객체
     * @return true / false
     */
    isDate : function(object){
        alert(' submitUtil.isDateFormat(formId) 사용하세요.');
        return false;
    },
    /**
     * 입력 날짜 유효성 체크
     * - 시작일과 만료일을 확인
     * - 시작일이 만료일보다 크면 flase
     *
     * @use  submitUtil.isDateCompare(Object, Object);
     * @param oStart : 시작일 form.input객체
     * @param oEnd : 만료일 form.input객체
     * @return true / false
     */
    isDateCompare : function(oStart, oEnd){
        var bRtn = true;

        try{
            this.trim(oStart);
            this.trim(oEnd);
            
            var valStart = $.trim($(oStart).val()).replace(/[-]/g,'');
            var valEnd = $.trim($(oEnd).val()).replace(/[-]/g,'');

           if(!(valStart <= valEnd)){
               bRtn = this.alertNfocus(oStart, '선택한 기간이 올바르지 않습니다.\n다시 선택해 주십시오.'); 
           }

        }catch (e) {
            return this.alertNfocus(oEnd, '[isDateCompare]Script Error Message :: ' + e);
        }

        return bRtn;
    },
    /**
     * 입력 날짜 / 시간 유효성 체크
     * - 시작일과 만료일을 확인
     * - 시작일이 만료일보다 크면 flase
     * - 시작일과 종료일이 같다면 하루일정일수도 있음. 시간이 입력되었는지 확인 할것.
     * - 시작일과 종료일이 같다면 시작시간과 종료시간이 같을수는 없음.
     *
     * @use  submitUtil.isDateCompare(Object, Object);
     * @param oStart : 시작일 form.input객체
     * @param oEnd : 만료일 form.input객체
     * @return true / false
     */
    isDateTimeCompare : function(oStart, oEnd){
        var bRtn = true;

        try{
            this.trim(oStart);
            this.trim(oEnd);
            
            var arrayStart = $.trim($(oStart).val()).replace(/[-:]/g,'').split(' ');
            var arrayEnd = $.trim($(oEnd).val()).replace(/[-:]/g,'').split(' ');
            
            if(!(arrayStart[0] <= arrayEnd[0])){
                bRtn = this.alertNfocus(oEnd, '종료일이 시작일보다 빠를 수  없습니다.\n다시 선택해 주십시오.'); 
            }else if(arrayStart[0] === arrayEnd[0] && arrayStart.length > 1){
                //날짜가 같다면 
                if(arrayStart[1] === arrayEnd[1]){
                    bRtn = this.alertNfocus(oEnd, '시작시간과 종료시간이 같을 수  없습니다.\n다시 선택해 주십시오.');
                }else if(!(arrayStart[1] < arrayEnd[1])){
                    bRtn = this.alertNfocus(oEnd, '종료시간이 시작시간보다 빠를 수  없습니다.\n다시 선택해 주십시오.');
                }
            }
        }catch (e) {
            return this.alertNfocus(oEnd, '[isDateTimeCompare]Script Error Message :: ' + e);
        }

        return bRtn;
    },
    /**
     * 이미지 첨부파일 확인
     * 
     * @use  submitUtil.isAttachFile(Object, {IMG,THUMB,DOC,ALL});
     * @param object
     * @param fileType (IMG:이미지, THUMB:썸네일용이미지, PDF:PDF파일, DOC:일반첨부파일, ALL:전체)
     * @returns {Boolean}
     */
    isAttachFile : function(object, fileType){
        var bRtn = true;        //확인결과
        
        try{
            //파일경로
            var attachFilePath = object.value.toLowerCase();
            
            //파일명
            var attachFileName = attachFilePath.substring(attachFilePath.lastIndexOf("\\")+1); 
            
            //파일 확장자   
            var attachFileType = attachFileName.substring(attachFileName.lastIndexOf(".")+1).toLowerCase()
	        
            switch(fileType){
	            case 'PDF' :  if(attachFileType != 'pdf'){
					            bRtn = submitUtil.alertNfocus(object,'File type is incorrect.');
					        }
					        break;
	            case 'THUMB' :	    
                case 'IMG' :  if(!(attachFileType == 'jpg' || attachFileType == 'gif' || attachFileType == 'png')){
                                bRtn = submitUtil.alertNfocus(object,'File type is incorrect.');    
                            }                
                            break;
            }
                            
        }catch (e) {
            return this.alertNfocus(object, '[isAttachFile]Script Error Message :: ' + e);
        }
        
        return bRtn;
    },    
    /**
     * 경고창 및 포커싱처리
     * @use submitUtil.alertNfocus(Object, String);
     * @param object
     * @param alertMsg  AlertMessage
     * @returns {Boolean}
     */
    alertNfocus : function(object, alertMsg) {        
        try{
            if(alertMsg != ""){
                alert(alertMsg);   
            }
            object.select();
            object.focus();
        }catch(e){
            //ignore
        }
        return false;
    },
    /**
     * 문자열 바이트 체크
     * @use submitUtil.getByte(Object)
     * @param object
     * @returns {Number}
     */
    getByte : function(object) {    
        var str = $.trim($(object).val());
        var strByte = 0;
        
        for (var i = 0; i < str.length; i++) {
            var ch = str.charAt(i);
            if (escape(ch).length > 4) {
                strByte += 2;
            } else if (ch != '\r') {
                strByte++;
            }
        }

        return strByte;
    }
};


/**
 * 첨부 파일 관리 
 */
var fileUtil = {
		
	inputResetEvent : function(){
		$('.btn_reset_file').on('click', function(event){
			event.preventDefault();
			
			var $$TD = $(this).closest('div.filebox');
            $$TD.find('.file_name').hide();
            $$TD.find('.filebox').show();
//            $$TD.find('input[type=hidden][name^="attachFileUseYn"]').val('Y');
			$$TD.find('input[type=text][name^="attachFileText"]').val('');
			$$TD.find('input[type=file]').replaceWith($$TD.find('input[type=file]').val(null).clone(true));
			$$TD.find('a[id^="attachFileBtn"]').html("Search");
			$$TD.find('.btn_reset_file').hide();
		});
		
	},
	/**
	 * 첨부파일 Change이벤트
	 */
	inputChangeEvent : function(){
		$('input[type=file]').on('change', function(event){

			var bRtn = true;
			var browser = ieVersion();
			var $$TD = $(this).closest('div.filebox');
			var checkFileType = $(this).data('filetype');
			var object = event.target;
			
			var fileMaxSize = 150000000;
			
            //파일경로
            var attachFilePath = object.value.toLowerCase();
            
            //파일명
            var attachFileName = attachFilePath.substring(attachFilePath.lastIndexOf("\\")+1); 
            
            //파일 확장자   
            var attachFileType = attachFileName.substring(attachFileName.lastIndexOf(".")+1).toLowerCase();
	        
            if(attachFileType){
            	switch(checkFileType){
	            case 'PDF' :  if(attachFileType != 'pdf'){
					            bRtn = submitUtil.alertNfocus(object,'File type is incorrect.');
					        }
					        break;
                case 'IMG' :  if(!(attachFileType == 'jpg' || attachFileType == 'gif' || attachFileType == 'png')){
                                bRtn = submitUtil.alertNfocus(object,'File type is incorrect.');    
                            }                
                            break;
            	}
            }                
            //파일크기
            /*오류로 인한 주석처리
	        if (browser == "N/A" || Number(browser) > 9) {
        	    var fileSize = object.files[0].size;
                if (fileSize > fileMaxSize) {
                	alert("The only 1mb or less can be registered.");
                	bRtn = false;
                }
	        }
	        //*/
	        
	        if(bRtn){
//	            $$TD.find('input[type=hidden][name^="attachFileUseYn"]').val('Y');
				$$TD.find('a[id^="attachFileBtn"]').html("Change");
				$$TD.find('.btn_reset_file').show();
	        }else{
	        	$$TD.find('input[type=text][name^="attachFileText"]').val('');
	        	$$TD.find('input[type=file]').replaceWith($$TD.find('input[type=file]').val(null).clone(true));
	        	object.value = '';
	        }
		});
	},
    /**
     * 파일 다운로드
     */
    downloadEvent : function(){
        $('.btn_file_download').on({
            click : function(event){
                event.preventDefault();
            	windowUtil.open("/ImageServlet?imgPath=" + $(this).data('name') + "&imageType=" + $(this).data('menu'),  "", "", "") ;
            }
        });  
        
//        $('.btn_file_download_pdf').on({
//            click : function(event){
//                event.preventDefault();
//                if($(this).attr('fileSn') != undefined){
//                    windowUtil.open(loginObj.contextPath + "/common/fileDownMan.lg?attcFilSn=" + $(this).attr('fileSn'),  "", "", "") ;
//                }
//            }
//        });  
    },
    /**
     * 첨부선택한 파일 삭제
     */
    deleteEvent : function(){
        $('.btn_delete_file').on({
            click : function(event){
                event.preventDefault();  
                var $$TD = $(this).closest('td');
                $$TD.find('.file_name').hide();
                $$TD.find('.filebox').show();
                $$TD.find('input[type=hidden][name^="attachFileUseYn"]').val('N');
                $$TD.find('input[type=hidden][name^="attachFileSn"]').val($(this).attr('filesn'));
            }        
        });
        
        $('.btn_delete_div_file').on({
            click : function(event){
                event.preventDefault();  
                var $$TD = $(this).closest('.filedivbox');
                $$TD.find('.file_name').hide();
                $$TD.find('.filebox').show();
                $$TD.find('input[type=hidden][name^="attachFileUseYn"]').val('N');
                $$TD.find('input[type=hidden][name^="attachFileSn"]').val($(this).attr('filesn'));
            }        
        });
        
        $('.btn_delete_li_file').on({
            click : function(event){
                event.preventDefault();  
                var $$TD = $(this).closest('li');
                $$TD.find('.file_name').hide();
                $$TD.find('.filebox').show();
                $$TD.find('input[type=hidden][name^="attachFileUseYn"]').val('N');
                $$TD.find('input[type=hidden][name^="attachFileSn"]').val($(this).attr('filesn'));
            }        
        });
    },
    /**
     * 첨부파일 삭제 :: 단건
     * @use fileUtil.submitDeleteFileInfo($(Object))
     * @param object
     */
    submitDeleteFileInfo : function(object){
        var data = { attcFilSn : $(object).attr('fileSn'),
                     menuCd : $(object).attr('menuCd'),
                     cotnSn : $(object).attr('cotnSn') };
        
        ajaxUtil.postDisableAsync(loginObj.contextPath + '/cm/fileDelMan.imx', data, fileUtil.resultDeleteFileInfo);
    },
    /**
     * 첨부파일 삭제 결과
     * @use fileUtil.resultDeleteAttachFileInfo({JSON})
     * @param json
     */
    resultDeleteFileInfo : function(json){
        if(json.bindingStatus == undefined && json.result.status){
            var object = $('input[type=hidden][name*="attach"][value='+json.result.seq+']');
            var parent = $(object).closest('td');
            
            //파일정보 영역 삭제
            $(object).val('0');
            $(parent).find('.input-file input[type=file]').prop('disabled', false);
            $(parent).find('.input-file').show();
            $(parent).find('.img-file').hide();
            
            try{
                //대체텍스트 삭제
                $('input[id=desc_'+ $(object).attr('id').split('_')[1] +']').val(''); //.css({'background-color' : '#F5F5F5'});
            }catch(e){}
        }else{
            ajaxUtil.error(json);   
        }
    }
};
