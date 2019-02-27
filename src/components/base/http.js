Zr.add('./base/http.js', function (zr, $) {
    var ajax = function (params) {
        var params = params || {};
        var dealUrl = function () {
            //处理url
            return params.url;
        };
        var opt = {
            method: params.method || 'POST',
            url: dealUrl(),
            headers: params.headers || {},
            params: params.params || {}
        };
        var transfer = function(status, ret){
            if(ret.error === 'NotLogin'){
                var href = window.location.href;
                // 本地调试
                // window.location.href="//ssa.jd.id/sso/login?ReturnUrl=" + href;  //印尼
                // window.location.href="//passport.jd.co.th/user/facade?ReturnUrl=" + href; //泰国
            }
            //跳转到登陆页面
            // if(status == 401){
            //     var href = window.location.href;
            //     window.location.href="http://jd.com?ReturnUrl=" + href;
            // }
        };
        if (opt.method.toUpperCase() === 'GET') {
            $.ajax({
                type: "GET",
                url: opt.url,
                headers: opt.heasders,
                data: opt.params,
                dataType: 'json',
                success: function(ret, textStatus, xhr) {
                    transfer(xhr.status);
                    params.success && params.success(ret); 
                },
                error: function(xhr, textStatus){
                    transfer(xhr.status, ret);
                    params.error && params.error(xhr);
                }
            });
        } else if (opt.method.toUpperCase() === 'POST') {
            $.ajax({
                type: "POST",
                url: opt.url,
                headers: opt.heasders,
                data: opt.params,
                dataType: 'json',
                success: function(ret, textStatus, xhr) {
                    transfer(xhr.status, ret);
                    params.success && params.success(ret); 
                },
                error: function(xhr, textStatus){
                    transfer(xhr.status);
                    params.error && params.error(xhr);
                }
            });
        }
    }
    return {
        ajax: ajax
    }
}, {
    requires: ['jquery']
})