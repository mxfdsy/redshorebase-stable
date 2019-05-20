/**
 * Created by andy on 2018/6/26.
 */

layui.define(function (exports) {
    var lmfUtils = {};

    /**
     * 金额格式化 2位小数
     * @param money
     * @returns {*}
     */
    lmfUtils.formatMoney = function (money) {
        if (isNaN(money)) {
            return 0.00;
        }
        var n = 2;
        money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = money.split(".")[0].split("").reverse(), r = money.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    };


    /**
     * 格式化url
     * @param url
     * @returns {*}
     */
    lmfUtils.formatUrl = function (url) {
        if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) {
            return url;
        }
        return url && 'http://' + url || ""
    };

    /**
     * 文本换行处理
     * @param value  源数据
     * @param type   处理类型 1 代表将换行字符装换成|@|@| 2 代表代表将|@|@|装换成换行字符
     * @returns {String} 处理过换行的数据
     */
    lmfUtils.getTextArea = function (value, type) {
        return String.prototype.replace.apply(value, (type == 1) ? [/\n/g, "|@|@|"] : [/\|\@\|\@\|/g, "\n"]);
    };
    exports('lmfUtils', lmfUtils)
});