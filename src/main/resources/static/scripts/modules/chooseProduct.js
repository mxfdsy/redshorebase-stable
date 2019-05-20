layui.define(['lmfTable', 'form'], function (exports) {
    "use strict";
    var $ = layui.$;
    var form = layui.form;
    var global = window;
    if (!global.mall_uid) {
        console.error('[chooseProduct]组件需要使用全局变量mall_uid');
    }
    var TABLE_NAME = 'choose-box-mall-product-table';
    var STYLE = '<style></style>';
    var TPL = '<div class="layui-card ' + TABLE_NAME + '">' +
        '<div class="layui-card-body">' +
        '<form class="layui-form layui-form-sm" lay-filter="' + TABLE_NAME + '-search-box">' +
        '<div class="layui-row layui-col-space20">' +
        // '<input type="hidden" name="state"  value="active">' +
        '<div class="layui-col-sm3">' +
        ' <div class="layui-input-inline">' +
        '   <select name="subPromotionsByType"><option value="TYP_PROMOTION" selected>爆品活动</option></select>' +
        ' </div>' +
        '</div>' +
        '<div class="layui-col-sm3">' +
        '    <div class="layui-input-inline">' +
        '       <select name="sub_promotion_uids[]"></select>' +
        '   </div>' +
        '</div>' +
        '<div class="layui-col-sm3">' +
        '     <input type="text" name="product_name" autocomplete="true" placeholder="请输入商品名称搜索" maxlength="40" class="layui-input">' +
        '</div>' +
        '<div class="layui-col-sm3">' +
        ' <div class="layui-input-inline">' +
        '    <button class="layui-btn layui-btn-sm layui-search-btn" lay-submit="" lay-filter="' + TABLE_NAME + '-search-box">搜索</button>' +
        ' </div>' +
        '</div>' +
        '</div>' +
        '<input type="hidden" name="review[]" value="TYP_APPROVED">' +
        '<input type="hidden" name="state" value="TYP_ON">' +
        '<input type="hidden" name="active" value="true">' +
        '</form>' +
        '<table id="' + TABLE_NAME + '" lay-filter="' + TABLE_NAME + '" class="mt20"></table>' +
        '</div>' +
        '</div>';
    var TITLE = '选择商品';
    //构造器
    var ChooseBox = function (options) {
        var that = this;
        that.config = $.extend({}, that.config, options);
        that.open();
    };

    //默认配置
    ChooseBox.prototype.config = {
        isMultiple: false,   //是否多选
        excludeUIDs: [],    //已有id
        type: "",           //类型 mallProduct  mallActivity
        success: function (data) {
        },     //成功回调
        params_in: {}  //默认参数
    };

    ChooseBox.prototype.open = function () {
        var that = this;
        this.box_index = layer.open({
            type: 1,
            area: ['810px', that.config.isMultiple ? '570px' : '525px'],
            title: TITLE,
            move: false,
            resize: false,
            scrollbar: false,
            shadeClose: false,
            btn: that.config.isMultiple ? ['确定'] : [],
            content: STYLE + TPL,
            success: function () {

                that.getSubPromotionData(function () {
                    that.setBox();
                });

            },
            yes: function () {
                that.config.success({
                    data: that.table.checkStatus().data
                });
                layer.close(that.box_index);
            }
        });
    };

    ChooseBox.prototype.getSubPromotionData = function (success) {
        var that = this;
        var type = $('.layui-card.' + TABLE_NAME).find('[name="subPromotionsByType"]').val();
        $.ajax({
            type: "post",
            url: "/activity/getSubPromotionsByType",
            dataType: "json",
            contentType: "application/json",
            async: true,
            data: JSON.stringify({
                "page_no": 1,
                "page_size": 500,
                "mall_uid": global.mall_uid,
                "sort_by": "created_at",
                "type": type,
                "status": ["not_start", "active"],
                "create_type": "TYP_MALL"
            }),
            success: function (res) {
                if (res.code != 200) {
                    return false;
                }
                $('.layui-card.' + TABLE_NAME)
                    .find('[name="sub_promotion_uids[]"]')
                    .html(res.data.content.map(function (sub_promotion, index) {
                        return '<option value="' + sub_promotion.sub_promotion_uid + '" ' + (index == 0 ? 'selected' : '') + '>' + sub_promotion.sub_promotion_name + '</option>'
                    }).join(''));
                if (res.data.content[0]) {
                    that.config.params_in.sub_promotion_uids = [res.data.content[0].sub_promotion_uid];
                } else {
                    // 如果一个活动都没有，则还是需要给一个为0的sub_promotion_uids，不然会把所有活动的活动商品查出来
                    that.config.params_in.sub_promotion_uids = [0];
                }
                form.render('select');
                success();
            }

        });

    };

    ChooseBox.prototype.setBox = function () {
        var that = this;
        var where = $.extend({}, {
            sort_order: 'desc',
            sort_key: 'created_at',
            active: true,
            state: 'TYP_ON',
            review: ['TYP_APPROVED']
        }, that.config.params_in);

        var table_events = {};
        var table_cols = [
            {
                field: 'product_name',
                title: '商品名称',
                width: '380',
                templet: '<div><div class="product-preview-warp"><div class="product-preview layui-clear"><div class="fl"><img class="pic" src="{{d.product_image}}?imageView2/2/w/60/h/60"></div><div class="fl"><p class="title">{{d.product_name}}</p><div><span class="pr">￥{{d.min_price}}</span><span class="od">￥{{d.original_max_price}}</span></div></div></div></div></div>'
            },
            {
                title: '剩余库存',
                width: that.config.isMultiple ? '120' : '100',
                valign: 'middle',
                templet: function (d) {
                    return d.total_stock_number - d.total_sales_number
                }
            },
            {
                field: 'created_at',
                title: '报名时间',
                width: that.config.isMultiple ? '227' : '180',
                valign: 'middle'
            }];
        if (that.config.isMultiple) {
            table_cols.unshift({
                field: 'promotion_product_uid',
                title: 'id选择',
                checkbox: true,
                undraggable: true,
                fixed: 'left'
            });
        } else {
            table_cols.push({
                field: 'promotion_product_uid',
                title: '操作(单选)',
                valign: 'middle',
                width: '115',
                templet: function (d) {
                    return '<a href="javascript:;" lay-event="single-choose">选取</a>';
                }
            });
            table_events['single-choose'] = function (item) {
                that.config.success({
                    data: [item.data]
                });
                layer.close(that.box_index);
            }
        }


        var table_config = {
            elem: '#' + TABLE_NAME,
            searchFilter: TABLE_NAME + '-search-box',    //必传
            tableFilter: TABLE_NAME,
            url: '/promotionProduct/getPromotionProductPager',
            page: true,
            where: where,
            height: 400,
            skin: 'product',
            initSort: {
                field: 'created_at',
                type: 'desc'
            },
            text: {
                none: '当前没有数据'
            },
            cols: [table_cols]
        };

        that.table = layui.lmfTable(table_config, table_events);
        return that;
    };


    //操作当前实例
    exports('chooseProduct', function (option) {
        new ChooseBox(option);
    });
});

