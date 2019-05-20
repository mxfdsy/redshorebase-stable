layui.define(['lmfTable', 'form'], function (exports) {
    "use strict";
    var $ = layui.$;
    var form = layui.form;
    var global = window;

    var TABLE_NAME = 'choose-box-user-table';
    var TPL = '<div class="layui-card ' + TABLE_NAME + '">' +
        '<div class="layui-card-body">' +
        '<div class="layui-row">' +
        '<form class="layui-form layui-form-sm search-box" lay-filter="' + TABLE_NAME + '-search-box">' +
        '<div class="layui-inline">' +
        '</div>' +
        '<div class="layui-col-sm3 layui-inline">' +
        '     <input type="text" name="loginName" style="margin-left: 20px" autocomplete="true" placeholder="请输入员工姓名" maxlength="40" class="layui-input">' +
        '</div>' +
        '<div class="layui-inline">' +
        ' <div class="layui-input-inline" style="margin-left: 20px">' +
        '    <button class="layui-btn layui-btn-sm layui-search-btn" lay-submit="" lay-filter="' + TABLE_NAME + '-search-box">搜索</button>' +
        ' </div>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '<table id="' + TABLE_NAME + '" lay-filter="' + TABLE_NAME + '" class="mt20"></table>' +
        '</div>' +
        '</div>';
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
        title: "选择用户",
        success: function (data) {
        },     //成功回调
        params_in: {}  //默认参数
    };

    ChooseBox.prototype.open = function () {
        var that = this;
        this.box_index = layer.open({
            type: 1,
            area: ['800px', '620px'],
            title: that.config.title || '选择用户',
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
            sort_key: 'created_at'
        }, that.config.params_in);

        var table_events = {};
        var table_cols = [
            {
                field: 'loginName',
                title: '登陆账号',
                width: '200',
                align: 'left'
            },
            {
                field: 'userName',
                title: '员工姓名',
                width: '120',
                align: 'left'
            },
            {
                field: 'gender',
                title: '性別',
                width: '207',
                align: 'left'
            },
            {
                field: 'phone',
                title: '手机',
                width: '137',
                align: 'left'
            }
        ];

        if (that.config.isMultiple) {
            table_cols.unshift({
                field: 'userUid',
                title: 'id选择',
                fixed: 'left',
                checkbox: true
            });
        } else {
            table_cols.push({
                field: 'userUid',
                title: '操作(单选)',
                valign: 'middle',
                width: '100',
                fixed: 'right',
                undraggable: true,
                templet: function (d) {
                    if ($.inArray(d.userUid, that.config.excludeUIDs) > -1) {
                        return '已选取'
                    }
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
            url: '/user/getUserList',
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
    exports('chooseUser', function (option) {
        new ChooseBox(option);
    });
});


