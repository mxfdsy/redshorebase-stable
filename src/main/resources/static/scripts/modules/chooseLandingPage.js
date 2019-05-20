layui.define(['lmfTable'], function (exports) {
    "use strict";
    var $ = layui.$;

    var global = window;
    if (!global.mall_uid) {
        console.error('[chooseLandingPage]组件需要使用全局变量mall_uid');
    }


    var TABLE_NAME = 'choose-box-landing-table';
    var TPL = '<div class="layui-card ' + TABLE_NAME + '">' +
        '<div class="layui-card-body">' +
        '<div class="layui-row">' +
        '<form class="layui-form layui-form-sm" lay-filter="' + TABLE_NAME + '-search-box">' +
        '<input type="hidden" name="is_home"  value="-1">' +
        '<input type="hidden" name="state"  value="active">' +
        '<input type="hidden" name="mall_list"  value="' + global.mall_uid + '">' +
        '<div class="layui-col-sm6">' +

        '</div>' +
        '<div class="layui-col-sm3">' +
        '     <input type="text" name="page_name" autocomplete="true" placeholder="请输入海报标题" maxlength="40" class="layui-input">' +
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


    var TITLE = '活动海报';
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
            area: ['800px', '600px'],
            title: TITLE,
            move: false,
            resize: false,
            scrollbar: false,
            shadeClose: false,
            btn: that.config.isMultiple ? ['确定'] : [],
            content: TPL,
            success: function () {
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

    ChooseBox.prototype.setBox = function () {
        var that = this;
        var where = $.extend({}, {
            sort_order: 'desc',
            sort_key: 'created_at',
            state: "active",
        }, that.config.params_in);

        var table_events = {};
        var table_cols = [
            // {
            //     field: 'lp_uid',
            //     title: '序号',
            //     width: '80',
            //     fixed: 'left',
            //     templet: function (d) {
            //         return d.LAY_INDEX;
            //     }
            // },
            {
                field: 'page_name',
                title: '海报标题',
                width: '350',
                fixed: 'left',
                valign: 'middle'
            },
            // {
            //     field: 'page_title',
            //     title: '海报标签',
            //     width: '100',
            //     valign: 'middle'
            // },
            {
                field: 'created_time',
                title: '创建时间',
                width: '315',
                valign: 'middle'
            }];
        if (that.config.isMultiple) {
            table_cols.unshift({
                field: 'lp_uid',
                title: 'id选择',
                fixed: 'left',
                checkbox: true
            });
        } else {
            table_cols.push({
                field: 'page_link',
                title: '操作(单选)',
                valign: 'middle',
                width: '100',
                fixed: 'right',
                undraggable: true,
                templet: function (d) {
                    return '<a href="javascript:;" lay-event="single-choose">选取</a>';
                }
            });
            table_events['single-choose'] = function (item) {
                that.config.success({
                    data: [item.data],
                    type: 'landing-page'
                });
                layer.close(that.box_index);
            }
        }

        var table_config = {
            elem: '#' + TABLE_NAME,
            searchFilter: TABLE_NAME + '-search-box',    //必传
            tableFilter: TABLE_NAME,
            url: '/landing/listLandingPage',
            page: true,
            where: where,
            height: 450,
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
    exports('chooseLandingPage', function (option) {
        new ChooseBox(option);
    });
});
