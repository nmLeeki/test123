/**
 * Supported Browser : MSIE, Chrome, FireFox, Safari
 * 
 * Object       : jquery-ajax-options.js
 * Description  : AJAX 기본 옵션 정의 및 관련 메소드 
 * Author       : LaheeDad
 * Since        : 2013.7.29.
 * Version      : 1.0
 * 
 * Modification Information
 *     since          author              description
 *  ===========    =============    ===========================
 *  2013.7.29.     LaheeDad         최초 생성
 */

(function($){
		$(document).ready(function(){
			$.ajaxSetup({
			    dataType:"xml",
//			    dataType:"json",
			    //cache: false,
			    //async: false,
				beforeSend : function(xhr, settings){
				    ajaxUtil.start();				    
				},
				complete : function(xhr, status){
				},
				error : function(xhr, status, error){
				    ajaxUtil.end();
				    
					/**
					 * ERROR 공통 설정
					 * xhr.status : http 오류 번호 를 출력 합니다. (500, 404 등)
					 * xhr.statusText : 오류 내용 텍스트 -> 세번째 인자 errorThrown과 동일 합니다.
					 * xhr.responseText : url의 response full text를 출력 합니다.
					 * xhr.readyState : ajax readyState를 출력 합니다.
					 */
					if(xhr.status === 403){
						alert('Access 권한이 없는 메뉴입니다.\n\n관리자에게 문의 바랍니다.');
					}else if(xhr.status === 401){
						alert('세션이 종료 되었습니다.\n다시 로그인 하시기 바랍니다.');
						location.replace("https://www.lgessbattery.com/admin/login/loginForm.lg");
					}else{
						alert('요청작업 처리중 ERROR가 발생하였습니다.\n\n관리자에게 문의 바랍니다.');
					}
				}
			});
		});

		$(document).ajaxStop(function(){
		    ajaxUtil.end();
		});
})(jQuery);


/**
 * AJAX 호출을 위한 공통 Object
 * 
 * - ajaxUtil.post
 * - ajaxUtil.get
 * - ajaxUtil.start
 * - ajaxUtil.end
 */
var ajaxUtil = {
    /**
     * RequestMethod = POST
     * 
     * @param pUrl  호출 URL
     * @param pData  {paramName : 'paramValue'} 형식의 Request Parameter.
     *               ref.) var data = { code : 'S' }               
     *               또는 $(form).serialize()으로 넘겨줘도 된다.                              
     * @param pCallback  AJAX-SUCEES시 리턴되는 Call Back 함수 명.
     */
    post : function( pUrl, pData, pCallback) {
        $.ajax({
            type : 'POST',
            url : pUrl,
            data : pData,
            success : pCallback
        });        
    },
    /**
     * RequestMethod = POST
     * 동기화 비활성화
     * @param pUrl  호출 URL
     * @param pData  {paramName : 'paramValue'} 형식의 Request Parameter.
     *               ref.) var data = { code : 'S' }               
     *               또는 $(form).serialize()으로 넘겨줘도 된다.                              
     * @param pCallback  AJAX-SUCEES시 리턴되는 Call Back 함수 명.
     */
    postDisableAsync : function( pUrl, pData, pCallback) {
        $.ajax({
            type : 'POST',
            url : pUrl,
            async: false,
            data : pData,
            success : pCallback
        });        
    },
    /**
     * RequestMethod = POST
     * 캐시 비활성화
     * @param pUrl  호출 URL
     * @param pData  {paramName : 'paramValue'} 형식의 Request Parameter.
     *               ref.) var data = { code : 'S' }               
     *               또는 $(form).serialize()으로 넘겨줘도 된다.                              
     * @param pCallback  AJAX-SUCEES시 리턴되는 Call Back 함수 명.
     */
    postDisableCache : function( pUrl, pData, pCallback) {
        $.ajax({
            type : 'POST',
            url : pUrl,
            cache: false,
            data : pData,
            success : pCallback
        });        
    },
    /**
     * RequestMethod = GET
     * 
     * @param pUrl  호출 URL
     * @param pData  {paramName : 'paramValue'} 형식의 Request Parameter.
     *               ref.) var data = { code : 'S' }               
     *               또는 $(form).serialize()으로 넘겨줘도 된다.                              
     * @param pCallback  AJAX-SUCEES시 리턴되는 Call Back 함수 명.
     */
    get : function( pUrl, pData, pCallback) {
        $.ajax({
            type : 'GET',
            url : pUrl,
            data : pData,
            success : pCallback
        });        
    },
    /**
     * RequestMethod = GET, DataType = JSONP
     * 
     * @param pUrl  호출 URL
     * @param pData  {paramName : 'paramValue'} 형식의 Request Parameter.
     *               ref.) var data = { code : 'S' }               
     *               또는 $(form).serialize()으로 넘겨줘도 된다.                              
     * @param pCallback  AJAX-SUCEES시 리턴되는 Call Back 함수 명.
     */
    getJsonp : function( pUrl, pData, pCallback) {
        $.ajax({
            type : 'GET',
            dataType:"jsonp",
            url : pUrl,
            data : pData,
            success : pCallback
        });        
    },
    /**
     * FORM SUBMIT 사용시 호출
     * 
     * 첨부파일 업로드시 사용할것.
     * 
     * @param pFormObject   FORM 객체                          
     * @param pCallback     Call Back 함수 명
     */
    formSubmit : function( pFormObject, pCallback) {
        $(pFormObject).ajaxSubmit({
            type : 'POST',
            async: false,
            target : 'ifr',
            dataType : 'xml',
            beforeSubmit : ajaxUtil.start,
            success : pCallback,
            error : function(xhr, status, error){
                console.log('ajaxUtil.formSubmit');
                ajaxUtil.end();
                
                /**
                 * ERROR 공통 설정
                 * xhr.status : http 오류 번호 를 출력 합니다. (500, 404 등)
                 * xhr.statusText : 오류 내용 텍스트 -> 세번째 인자 errorThrown과 동일 합니다.
                 * xhr.responseText : url의 response full text를 출력 합니다.
                 * xhr.readyState : ajax readyState를 출력 합니다.
                 */
                if(xhr.status === 403){
                    alert('Access 권한이 없는 메뉴입니다.\n\n관리자에게 확인하세요.');
                }else if(xhr.status === 401){
                    alert('세션이 종료 되었습니다.\n다시 로그인 하시기 바랍니다.');
                    location.replace("https://www.lgessbattery.com/admin/login/loginForm.lg");
                }else{
                    alert('요청작업 처리중 ERROR가 발생하였습니다.\n\n관리자에게 문의 바랍니다.');
                }
            }
        });       
    },
	/**
	 * 로딩 이미지 ON
	 * @param o   Element Object 전체 화면에 해단 로딩이미지가 아니라 특정 영역에 한정된 로딩 이미지일때 Object를 넘겨준다.
	 *             ref.) $(divName) 
	 */
    start : function(o){
    	console.log('== AJAX 시작 ==');
//        var loadingLeft = ( $(window).scrollLeft() + ($(window).width() - $('#loading-wrap').width()) / 2 );
//        var loadingTop = ( $(window).scrollTop() + ($(window).height() - $('#loading-wrap').height()) / 3 );
//        $('#loading-wrap').css({'left':loadingLeft,'top':loadingTop, 'position':'absolute'});
//        $('#mask2, #ifr2').css({'width':$(window).width(),'height':$(document).height()});  
//        
//        $('#ifr2').show();
//        $('#mask2').fadeTo("slow",0.5);    
//        $('#loading-wrap').show();
	},
	/**
	 * 로딩 이미지 OFF
	 */
	end : function(){
		console.log('== AJAX 완료 ==');
//	    $('#ifr2, #mask2, #loading-wrap').hide();  
	},
	/**
     * Ajax Error 메세지 처리
     * Statements
     * @param json
     */
    error : function(json){
        ajaxUtil.end();
        var errorMsg = "";
        console.log('== AJAX ERROR : ' + json);
        alert('Ajax ERROR : ' + json);
        
/*
        if(json.bindingStatus == undefined && json.result == undefined){
            alert('요청작업 처리중 ERROR가 발생하였습니다.\n\n관리자에게 문의 바랍니다.');
        }else if(json.bindingStatus != undefined && !json.bindingStatus){
            if(json.message == undefined){
                errorMsg += '입력값이 올바르지 않습니다.';
            }else{
                errorMsg += stringUtil.replaceNewLine(json.message);
            }
            
            //Binding에러는 Field순서대로 표시
            for(var i = json.bindingFields.length -1; i >= 0 ; i--){
                //errorMsg += '\n - ' + $('input[name='+ json.bindingFields[i].field +']:eq(0)').attr('title')  + '을(를) 입력해 주세요.';
                errorMsg += '\n - ' + stringUtil.replaceNewLine(json.bindingFields[i].defaultMessage);
            }
            
            alert(errorMsg);
        }else if( json.result.uploadInfo != undefined && !json.result.uploadInfo.status){
            var uploadFile = json.result.uploadInfo.uploadFileInfo;
            
            for(var i = 0; i < uploadFile.length; i++){
                alert(stringUtil.replaceNewLine(uploadFile[i].ogcFilNm +' 파일은  ' +json.result.message));
            }
        }else if(!json.result.status){
            if(json.result.message == undefined){
                alert('조회된 데이터가 없습니다.');
            }else{
                alert(stringUtil.replaceNewLine(json.result.message));
            }
        }
*/
    }
};
