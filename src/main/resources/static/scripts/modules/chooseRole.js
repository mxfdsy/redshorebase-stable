layui.define(['lmfTable', 'form'], function (exports) {
    "use strict";
    var $ = layui.$;
    var form = layui.form;
    var lmfTable = layui.lmfTable;
    var global = window;

    var content = '<div class="layui-card">' +
        '<div class="layui-card-body">' +
        '   <div class="layui-row">' +
        '        <form class="layui-form layui-form-sm" lay-filter="role-search">' +
        '            <div class="layui-input-inline">' +
        '                <input type="text" name="role_name"' +
        '                       autocomplete="true" placeholder="请输入角色名称"' +
        '                       maxlength="40" class="layui-input">' +
        '            </div>' +
        '            <div class="layui-input-inline">' +
        '                <button class="layui-btn layui-btn-sm  layui-search-btn"' +
        '                        lay-submit lay-filter="role-search">搜索' +
        '                </button>' +
        '            </div>' +
        '        </form>' +
        '        <div class="blank-line"></div>' +
        '        <table class="layui-hide" id="choose-role-table" lay-filter="choose-role-table"></table>' +
        '    </div>' +
        '</div>' +
        '</div>';

    var _config = {
        title: '选择角色',
        success: function () {

        }
    };
    var ChooseRole = function (options) {
        this.config = $.extend({}, _config, options);
        this.open();
    };

    ChooseRole.prototype = {

        open: function (option) {
            var that = this;
            that.open_index = layer.open({
                type: 1,
                area: ['800px', '525px'],
                title: that.config.title || '选择角色',
                move: false,
                resize: false,
                scrollbar: false,
                shadeClose: false,
                shade: [0.3, '#000'],
                content: content,
                success: function () {
                    that.setBox();
                }
            });
        },
        setBox: function (option) {
            var that = this;
            var tableConfig = {
                elem: '#choose-role-table',
                url: '/role/getList',
                tableFilter: 'choose-role-table',
                searchFilter: 'role-search',
                height: 400,
                where: {
                    sort_order: 'desc',
                    sort_key: 'created_at',
                    is_changeable: 'YES'
                },
                page: true,
                cols: [[
                    {
                        field: 'role_name',
                        title: '角色名称'
                    },
                    {
                        field: 'role_desc',
                        title: '角色描述'
                    },
                    {
                        field: 'open_at',
                        title: '操作',
                        fixed: 'right',
                        width: '18%',
                        templet: function (d) {
                            return '<a href="javascript:;" lay-event="select">选择</a>';
                        }
                    }
                ]]
            };

            var optionEvents = {
                select: function (selected) {
                    layer.close(that.open_index);
                    if ($.isFunction(that.config.success)) {
                        that.config.success(selected.data);
                    }
                }
            };
            that.table = lmfTable(tableConfig, optionEvents);

            return that;
        }
    };

    //操作当前实例
    exports('chooseRole', function (options) {
        new ChooseRole(options);
    });
});


