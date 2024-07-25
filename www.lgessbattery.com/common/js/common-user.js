/**
 * Supported Browser : MSIE, Chrome , FireFox
 * 
 * Object       : common-user.js
 * Description  : 로그인 정보 관련 
 * Author       : LaheeDad
 * Since        : 2013. 10. 31.
 * Version      : 1.0
 * 
 * Modification Information
 *     since          author              description
 *  ===========    =============    ===========================
 *  LaheeDad     2013. 10. 31.     최초 생성
 */

/*
 * 로그인 정보
 */
var loginObj = {
    /*
     * 프로젝트 ContextPath 정보 
     */
    contextPath : '',
    /*
     * 접속페이지 국가 코드 
     */
    localeCode : 'CK',
    /*
     * contextPath + localeCode
     */
    pagePath : '',
    /*
     * 로그인여부
     */    
    isLogin : 'N',
    /*
     * 멤버쉽 여부 
     */
    isMember : 'N',
    /*
     * 접속DEVICE
     * N : normal
     * M : mobile
     * T : tablet
     */
    isDevice : 'N',
    /*
     * 접속 DIVICE가 모바일일대 ISO인지 확인
     * N : Android or Other
     * Y : IOS 
     */
    isIos : 'N',
    /**
     * 설정
     * @param _isLogin  로그인유무
     * @param _isDevice 접속 DEVICE종류
     * @param _isIos    아이폰계열 유무
     */
    init : function(_isLogin, _isMember, _isDevice, _isIos){
        this.isLogin = _isLogin;
        this.isMember = _isMember;
        this.isDevice = _isDevice;
        this.isIos = _isIos;
        //this.pagePath = this.contextPath + '/' + this.localeCode;
    },
    /**
     * 사용자 로그인 확인
     * 
     * @use     - loginObj.loginCheck();
     *          - loginObj.loginCheck(gotoUrl);
     * @param gotoURL   - 로그인확인 실패시 로그인후에 이동할 페이지 URL
     *                  - 로그인확인 실패시 gotoURL을 설정하지 않았다면 로그인후 현재 페이지로 이동한다.
     *                  - 로그인을 성공했는데 gotoURL가 없다면 로그인 확인 성공여부만 리턴한다.
     * @returns {Boolean}
     */
    loginCheck : function(gotoURL){
        var bRtn = false;
        
        //로그인 여부 확인
        if(!this.isLoginCheck()){
            //로그인 페이지로 이동
            bRtn = this.goLogin(gotoURL, true);            
        }else{            
            if(gotoURL != undefined){
                location.href = gotoURL;
            }            
            bRtn = true;
        }
        
        return bRtn;
    },
    /**
     * 로그인 여부 확인
     * @returns {Boolean} true:로그인중
     */
    isLoginCheck : function(){
        var bRtn = false;
        
        //로그인 여부 확인
        if(this.isLogin === 'Y' && this.isMember === 'S'){
            bRtn = true;
        }
        
        return bRtn;
    },
    /**
     * 로그인 페이지로 이동
     * - loginCheck에서 홨을대는 이동 여부 확인
     * @param returnUrl
     * @param bChecked  로그인여부화인 로직여부
     * @returns {Boolean}
     */
    goLogin : function(returnUrl, bChecked){
        if(bChecked != undefined && bChecked){
            if(confirm("로그인 페이지로 이동합니다.")){            
                this.moveLogin(returnUrl);        
            }else{
                return false;
            }
        }else{
            this.moveLogin(returnUrl);
        }        
    },
    moveLogin : function(returnUrl){
        location.replace( loginObj.pagePath + (loginObj.isDevice != 'N' ? '/m' : '') + '/member/login?returnUrl='+ encodeURIComponent((returnUrl == undefined || returnUrl == '' ? location.href : returnUrl)));
    }    
};


$(function() {  
    //Header의 로그인 버튼
//    $('.goLogin').on({
//        click : function(event){
//            event.preventDefault();
//            loginObj.goLogin();
//        }
//    });  
    
    //Header의 로그아웃 버튼
//    $('.goLogout').on({
//        click : function(event){
//            event.preventDefault();
//            location.replace($(this).attr('href'));
//        }
//    });  
    

    $('a.memberOnly').on({
        click : function(event){
            event.preventDefault();
            loginObj.loginCheck($(this).attr('href'));
        }
    });
});