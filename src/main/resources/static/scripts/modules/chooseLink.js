layui.define(['jquery', 'chooseProduct', 'chooseActivity', 'chooseLandingPage'], function (exports) {
    "use strict";
    var $ = layui.$;


    var responesData = function (content, promotionUid, targetUrl, promotionType) {
        return {
            promotion_name: content,
            promotion_uid: promotionUid,
            target_url: targetUrl,
            promotion_type: promotionType
        }
    };
    var linkTypeValObj = {
        mallProduct: function (res) {
            res.format_data = res.data.map(function (data) {
                return responesData(data.product_name, data.promotion_product_uid, data.h5_url, 'product');
            });
            return res;
        },
        mallActivity: function (res) {
            res.format_data = res.data.map(function (data) {
                var sub_promotion_name = data.sub_promotion_name || data.promotion_name;
                var sub_promotion_uid = data.sub_promotion_uid || data.lottery_promotion_uid;
                return responesData(sub_promotion_name, sub_promotion_uid, data.page_link, 'promotion');
            });
            return res;
        },
        mallLandingPage: function (res) {

            res.format_data = res.data.map(function (data) {
                return responesData(data.page_name, data.lp_uid, data.page_link, 'landingpage');
            });
            return res;

        }
    };


    var choiceLinkConfig = {
        isMultiple: false,   //是否多选
        excludeUIDs: [],    //已有id
        type: "",           //类型 mallProduct  mallActivity
        success: function (data) {
        },     //成功回调
        params_in: {}  //默认参数
    };

    //传入方法与内置方法对于关系
    var linkTpyeConfig = {
        'mallProduct': layui.chooseProduct,    //商品
        'mallActivity': layui.chooseActivity, //商业项目活动
        'mallLandingPage': layui.chooseLandingPage,   //商业项目微页
    };

    var choiceLink = function (opts) {
        opts = $.extend({}, choiceLinkConfig, opts);
        if (!linkTpyeConfig[opts.type]) {
            console.log('错误的类型', opts.type);
            layer.Notify.error('错误的类型');
        }
        var success = typeof opts.success == 'function' ? opts.success : function () {
        }
        opts.success = function (data) {
            success(linkTypeValObj[opts.type](data));
        };
        linkTpyeConfig[opts.type](opts);
        return false;
    };


    exports('chooseLink', choiceLink);
});
