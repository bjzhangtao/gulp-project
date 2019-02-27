Zr.add('./base/i18n.js', function (zr, url, utils, tmpl, $) {
    const local = {
        init: function (str, callback) {
            this.eventsFn.getLanguageFn(utils.getLanguage(str), callback);
        },
        author: "",
        version: "",
        options: {},
        eventsFn: {
            getLanguageFn: function (language, callback) {
                zr.use(language, function (zr, _json) {
                    if (_json) {
                        local.eventsFn.reloadBodyFn(_json, callback);
                    }
                })
            },
            reloadBodyFn: function (json, callback) {
                $('#zt-content').html(tmpl('zr-content', json));
                if (callback) {
                    callback();
                }
            }
        },
        events: {},
        ajax: {}
    };

    return local;
}, {requires: ['/base/url.js', '/base/utils.js', 'tmpl', 'jquery']});