layui.define(['lmfTable', 'form'], function (exports) {
    "use strict";
    var $ = layui.$;
    var form = layui.form;
    var global = window;
    if (!global.mall_uid) {
        console.error('[chooseActivity]组件需要使用全局变量mall_uid');
    }
    var TABLE_NAME = 'choose-box-mall-activity-table';
    var TPL = '<div class="layui-card ' + TABLE_NAME + '">' +
        '<div class="layui-card-body">' +
        '<div class="layui-row">' +
        '<form class="layui-form layui-form-sm" lay-filter="' + TABLE_NAME + '-search-box">' +
        '<input type="hidden" name="create_type"  value="TYP_MALL">' +
        '<input type="hidden" name="status[]"  value="not_start">' +
        '<input type="hidden" name="status[]"  value="active">' +
        '<input type="hidden" name="mall_uid"  value="' + global.mall_uid + '">' +
        '<div class="layui-col-sm3">' +
        ' <div class="layui-input-inline">' +
        '   <select name="type" lay-filter="subPromotionsByType" >' +
        '       <option value="TYP_PROMOTION" selected>爆品活动</option>' +
        '       <option value="TYP_LOTTERY">红包活动</option>' +
        '   </select>' +
        ' </div>' +
        '</div>' +
        '<div class="layui-col-sm3" style="margin-left: 10px">' +
        '     <input type="text" name="sub_promotion_name" autocomplete="true" placeholder="请输入活动名称搜索" maxlength="40" class="layui-input">' +
        '</div>' +
        '<div class="layui-col-sm3">' +
        ' <div class="layui-input-inline">' +
        '    <button class="layui-btn layui-btn-sm layui-search-btn" lay-submit="" lay-filter="' + TABLE_NAME + '-search-box">搜索</button>' +
        ' </div>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '<table id="' + TABLE_NAME + '" lay-filter="' + TABLE_NAME + '" class="mt20"></table>' +
        '</div>' +
        '</div>';
    var TITLE = '选择活动';
    //构造器
    var ChooseBox = function (options) {
        var that = this;
        that.config = $.extend({}, that.config, options);
        if (!that.config.params_in.mall_uid) {
            throw '此方法 必须附带mall_uid,请检查相关参数';
        }
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
            area: ['810px', '605px'],
            title: TITLE,
            move: false,
            resize: false,
            scrollbar: false,
            shadeClose: false,
            btn: that.config.isMultiple ? ['确定'] : [],
            content: TPL,
            success: function () {
                that.bindEvents();
                that.setBox();


            },
            yes: function () {
                that.config.success({
                    data: that.table.checkStatus().data
                });
                layer.close(that.box_index);
            }
        });
    };

    ChooseBox.prototype.bindEvents = function (success) {
        var that = this;
        form.on('select(subPromotionsByType)', function () {
            $('.layui-card.' + TABLE_NAME).find('[lay-submit]').get(0).click();
        })


    };

    ChooseBox.prototype.setBox = function () {
        var type = $('.layui-card.' + TABLE_NAME).find('[name="type"]').val();
        var that = this;
        var where = $.extend({}, {
            sort_order: 'desc',
            sort_key: 'created_at',
            "mall_uid": '',
            "sort_by": "created_at",
            "type": type,
            "status": ["not_start", "active"],
            "create_type": "TYP_MALL"
        }, that.config.params_in);

        var table_events = {};
        var table_cols = [
            {
                field: 'sub_promotion_name',
                title: '活动名称',
                width: '300',
                templet: function (d) {
                    return d.sub_promotion_name || d.promotion_name;
                }

            },
            {
                field: 'created_at',
                title: '活动开始时间',
                width: '180',
                valign: 'middle'
            },
            {
                field: 'sub_promotion_end_at',
                title: '活动结束时间',
                width: '180',
                valign: 'middle',
                templet: function (d) {
                    return d.end_at || d.sub_promotion_end_at;
                }
            }];


        if (that.config.isMultiple) {
            table_cols.unshift({
                field: 'sub_promotion_uid',
                title: 'id选择',
                fixed: 'left',
                checkbox: true
            });
        } else {
            table_cols.push({
                field: 'sub_promotion_uid',
                title: '操作(单选)',
                valign: 'middle',
                width: '115',
                fixed: 'right',
                undraggable: true,
                templet: function (d) {
                    return '<a href="javascript:;" lay-event="single-choose">选取</a>';
                }
            });
            table_events['single-choose'] = function (item) {
                var type = $('[name="subPromotionsByType"]').val();
                that.config.success({
                    data: [item.data],
                    type: type
                });
                layer.close(that.box_index);
            }
        }


        var table_config = {
            elem: '#' + TABLE_NAME,
            searchFilter: TABLE_NAME + '-search-box',    //必传
            tableFilter: TABLE_NAME,
            url: '/activity/getSubPromotionsByType',
            page: true,
            where: where,
            height: 480,
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
    exports('chooseActivity', function (option) {
        new ChooseBox(option);
    });
});


