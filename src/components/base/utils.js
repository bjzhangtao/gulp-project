Zr.add('./base/utils.js', function (zr, $) {
    let utils = {
        /**
         *
         * @param url   请求类型
         * @param type  请求时发送的数据
         * @param data  请求时发送的数据参数
         * @param success   成功后回调
         * @param dataType  接收数据类型
         * @param error     失败后回调
         */
        ajax: function (url, type, data, success, dataType, complete, error) {
            type = type || 'POST';
            data = data || {};
            dataType = dataType || 'json';

            success = success || function (data) {
                console.log('请求成功!');
                console.log(data);
            };

            error = error || function (err) {
                console.log('请求失败！');
                console.log(err);
            };

            complete = complete || function () {};

            $.ajax({
                url: url,
                type: type,
                data: data,
                traditional:true,    // 阻止深度序列化
                dataType: dataType,
                success: success,
                complete: complete,
                error: error
            });
        },

        /**
         * 判断字符串是否为空-可自定义过滤字符
         * @param str   传入字符串（自动toSting强转）
         * @param exclude   数组 排除项，全等也判定为空
         * @returns {boolean}
         */
        isEmpty: function (str, exclude) {
            // str = str.toString();
            var arr = ['', undefined, null];
            if (exclude) {
                arr = arr.concat(exclude);
            }

            return $.inArray(str, arr) > -1;
        },

        /**
         * 初始化dropDown
         * @param el 定位DOM节点
         * @param data  option参数的数据
         */
        initDropdown: function (el, data) {
            var html = [];
            // html.push(
            //     '<li class="search-list-item active">' +
            //     '<a href="javascript:;" data-val="-1">请选择</a>' +
            //     '</li>'
            // );
            // if (zr.tools.isArray(data)) {
            //     $.each(data, function (i, item) {
            //         let dataValue = '00' + (i + 1);
            //         dataValue = dataValue.substr(dataValue.length - 3);
            //         html.push('<li class="search-list-item"><a href="javascript:;" data-val="' + dataValue + '">' + item + '</a></li>');
            //     });
            // } else {
                $.each(data, function (key, val) {
                    // let dataValue = key;
                    // dataValue = dataValue.substr(dataValue.length - 3);
                    html.push('<li class="search-list-item"><a href="javascript:;" data-val="' + key + '">' + val + '</a></li>');
                });
            // }

            el = el + ' .zr-dropdown-search-list';
            $(el).html(html.join(''));
        },

        /**
         * 获取url参数并组织成对象返回
         * @param key 想要调取的参数key
         * @returns {*} 如果存在key，则返回相应值，不存在则返回整个对象
         */
        getParamsByUrl: function (key) {
            var params = {};
            var search = window.location.search.substr(1);
            if (search.length === 0) {
                return null;
            } else {
                var arr = search.split('&');

                $.each(arr, function (index, item) {
                    var keyValue = item.split('=');
                    params[keyValue[0]] = keyValue[1];
                });

                if (params[key]) {
                    return params[key];
                } else {
                    return params;
                }
            }
        },

        /**
         * 获取国际化编码
         * @param str   url中国际化编码的键值名
         */
        getLanguage: function (str) {
            let _i18n = this.getCookie(str) || 'zh_CN';
            return "./i18n/" + _i18n;
        },

        /**
         * 获取cookie值
         * @param sName 想要获取的值的key
         * @returns {string}
         */
        getCookie: function (sName) {
            var arr = document.cookie.split('; ');
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].split('=')[0] === sName) {
                    return arr[i].split('=')[1];
                };
            }
        },

        checkEnv: function () {
            //开发环境
            if (Zr.global.env === 'dist') {
                //发布环境
                $('head').append('<link rel="stylesheet" href="//storage.360buyimg.com/v1.0.0/zr/css/cdn_zr.min.css">' +
                    '<link rel="stylesheet" href="/static/components/create-bill/create-bill.css">' +
                    '<link rel="stylesheet" href="/static/components/ui/ui.css">');
            } else {
                $('head').append('<link rel="stylesheet" href="//storage.360buyimg.com/v1.0.0/zr/css/cdn_zr.min.css">' +
                    '<link rel="stylesheet" href="/dest/components/create-bill/create-bill.css">' +
                    '<link rel="stylesheet" href="/dest/components/ui/ui.css">');
            }
        },

        timeStamp2String: function(time, format){
            var datetime = new Date();
            datetime.setTime(time);
            var year = datetime.getFullYear();
            var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
            var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
            var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
            var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
            var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
            var str = '';
            switch (format){
                case 'yyyy-MM-dd': 
                    str = year + "-" + month + "-" + date;
                    break
                case 'yyyy-MM-dd HH:mm:ss':
                    str = year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
                    break
                default:
                    str = year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
            }
            return str;
        },

        download: function(url, data, method) {
            if (url && data) {
                // data 是 string 或者 array/object
                data = typeof data == 'string' ? data : $.param(data); // 把参数组装成form的input
                // data = decodeURIComponent(data);
                var inputs = '';
                $.each(data.split('&'), function() {
                    var pair = this.split('=');
                    inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
                }); 
                $('<form action="' + url + '" method="' + 'post' + '">' + inputs + '</form>').appendTo('body').submit().remove();
            };
        },
    };

    return utils;
}, {
    requires: ['jquery']
});