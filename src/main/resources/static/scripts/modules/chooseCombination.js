layui.define(['lmfTable', 'lmfEvent', 'form', 'chooseUser', 'chooseDepartment', 'chooseRole', 'laytpl'], function (exports) {
    "use strict";
    var $ = layui.$;
    var form = layui.form;
    var laytpl = layui.laytpl;
    var lmfTable = layui.lmfTable;
    var lmfEvent = layui.lmfEvent;
    var chooseUser = layui.chooseUser;
    var chooseDepartment = layui.chooseDepartment;
    var chooseRole = layui.chooseRole;
    var global = window;

    layui.addcss("../../../styles/chooseCombination.css");

    var content = '<div class="layui-card">' +
        '<div class="layui-card-body">' +
        '   <div class="layui-row">' +
        '        <form class="layui-form layui-form-sm" lay-filter="combination-search">' +
        '            <div class="layui-input-inline">' +
        '                <input type="text" name="combination_name"' +
        '                       autocomplete="true" placeholder="请输入组合策略名称"' +
        '                       maxlength="40" class="layui-input">' +
        '            </div>' +
        '            <div class="layui-input-inline">' +
        '                <button class="layui-btn layui-btn-sm  layui-search-btn"' +
        '                        lay-submit lay-filter="combination-search">搜索' +
        '                </button>' +
        '                <a class="layui-btn layui-btn-sm  layui-search-btn"' +
        '                        lmf-event="new-combination">新增组合' +
        '                </a>' +
        '            </div>' +
        '        </form>' +
        '        <div class="blank-line"></div>' +
        '        <table class="layui-hide" id="choose-combination-table" lay-filter="choose-combination-table"></table>' +
        '    </div>' +
        '</div>' +
        '</div>';

    var _config = {
        title: '选择组合模式',
        success: function () {

        }
    };

    var _ajaxUrl = {
        combinationList: '/workflow/strategy/combination',
        newCombination: '/workflow/strategy/combination/new',
        permissionList: '/businessProgram/getList'
    };
    var ChooseCombination = function (options) {
        this.config = $.extend({}, _config, options);
        this.open();
    };

    ChooseCombination.prototype = {

        open: function (option) {
            var that = this;
            that.open_index = layer.open({
                type: 1,
                area: ['800px', '525px'],
                title: that.config.title || '选择组合模式',
                move: false,
                resize: false,
                scrollbar: false,
                shadeClose: false,
                shade: [0.3, '#000'],
                content: content,
                success: function () {
                    that.setBox();
                    that.bindEvents();
                }
            });
        },
        setBox: function (option) {
            var that = this;
            var tableConfig = {
                elem: '#choose-combination-table',
                url: _ajaxUrl.combinationList,
                tableFilter: 'choose-combination-table',
                searchFilter: 'combination-search',
                height: 400,
                where: {
                    sort_order: 'desc',
                    sort_key: 'created_at',
                    is_changeable: 'YES'
                },
                page: true,
                cols: [[
                    {
                        field: 'combination_name',
                        title: '组合名称',
                        width: '32%'
                    },
                    {
                        field: 'combination_item_list',
                        title: '组合详情',
                        templet: function (d) {
                            var html = (d.combination_item_list || []).map(function (value) {
                                return value.approval_group_name;
                            }).join(", ");
                            return html;
                        }
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
        },
        bindEvents: function () {
            var that = this;
            lmfEvent('new-combination', function () {
                that.newCombination();
            })
        },
        newCombination: function () {
            var that = this;
            var combinationIndex = 0;
            var content = '<div class="new-combination-box">' +
                '    <form class="layui-form layui-form-sm">' +
                '        <div class="layui-form-item">' +
                '            <label for="combination_name_id" class="layui-form-label layui-label-required">组合名称</label>' +
                '            <div class="layui-input-block layui-input-md">' +
                '                <input class="layui-input" type="text" name="combination_name" id="combination_name_id" placeholder="请输入组合名称" lay-verify="required" lay-errorText="请输入组合名称">' +
                '            </div>' +
                '        </div>' +
                '        <div class="layui-form-item">' +
                '            <label for="combination_name_id" class="layui-form-label layui-label-required">组合详情</label>' +
                '               <div class="layui-input-block combination-item-box">' +
                '                      <a class="add-auditor" href="javascript:void(0);" lmf-event="add-individual">添加个人</a>' +
                '                      <a class="add-auditor" href="javascript:void(0);" lmf-event="add-role">添加角色</a>' +
                '                      <a class="add-auditor" href="javascript:void(0);" lmf-event="add-department">添加部门</a>' +
                '               </div>' +
                '       </div>' +
                '       <div class="layui-form-item">' +
                '            <div class="layui-input-block">' +
                '                <button class="layui-btn" lay-submit lay-filter="new-combination-form-submit">保存</button>' +
                '                <a class="layui-btn layui-btn-primary" href="#" lmf-event="new-combination-cancel">取消</a>' +
                '            </div>' +
                '       </div>' +
                '    </form>' +
                "</div>";

            function renderCombination(param) {
                var templet_html = '<div class="combination-item">' +
                    '    <input type="hidden" class="combination-item-mall" name="combination_item[{{d.index}}][approval_group_mall]" value="{{d.approval_group_mall}}">' +
                    '    <input type="hidden" name="combination_item[{{d.index}}][approval_group_type]" value="{{d.approval_group_type}}">' +
                    '    <input type="hidden" name="combination_item[{{d.index}}][approval_group]" value="{{d.approval_group}}">' +
                    '    <input type="text" class="layui-input layui-input-md layui-input-inline combination-item-name" readonly name="combination_item[{{d.index}}][approval_group_name]" value="{{d.approval_group_name}}">' +
                    '    <i class="layui-icon layui-icon-close-fill combination-item-icon" lmf-event="del-combination-item"></i>' +
                    ' <a href="#" class="choose-permission" lmf-event="choose-permission"><cite>+设置数据权限</cite></a>' +
                    '</div>';
                laytpl(templet_html).render(param, function (_html) {
                    $('.new-combination-box .combination-item-box').append(_html);
                });
            }

            var newCombinationIndex = layer.open({
                type: 1,
                area: ['800px', '525px'],
                title: '新增组合模式',
                move: false,
                resize: false,
                scrollbar: false,
                shadeClose: false,
                shade: [0.3, '#000'],
                content: content,
                end: function () {
                    that.table.reload();
                },
                success: function () {
                    lmfEvent('add-individual', function () {
                        chooseUser({
                            isMultiple: false,
                            success: function (obj) {
                                if (obj.data.length < 1) {
                                    layer.Notify.error("未选择用户");
                                    return false;
                                }
                                var user = obj.data[0];
                                renderCombination({
                                    "index": combinationIndex++,
                                    "approval_group_mall": "11111111111111111",
                                    "approval_group_type": "TYP_INDIVIDUAL",
                                    "approval_group": user.user_uid,
                                    "approval_group_name": user.name
                                });
                            }
                        });
                        return false;
                    });
                    lmfEvent('add-role', function () {
                        chooseRole({
                            success: function (role) {
                                renderCombination({
                                    "index": combinationIndex++,
                                    "approval_group_mall": "11111111111111111",
                                    "approval_group_type": "TYP_ROLE",
                                    "approval_group": role.role_key,
                                    "approval_group_name": role.role_name
                                });
                            }
                        });
                    });
                    lmfEvent('add-department', function () {
                        chooseDepartment({
                            selected_organization_code: [],
                            success: function (chooseNode) {
                                if (!chooseNode) {
                                    return false;
                                }
                                renderCombination({
                                    "index": combinationIndex++,
                                    "approval_group_mall": "11111111111111111",
                                    "approval_group_type": "TYP_DEPARTMENT",
                                    "approval_group": chooseNode.data.organization_uid,
                                    "approval_group_name": chooseNode.previwe_text
                                });
                            }
                        });
                    });
                    lmfEvent('new-combination-cancel', function () {
                        layer.close(newCombinationIndex);
                    });
                    lmfEvent('del-combination-item', function () {
                        $(this).parents('.combination-item').remove();
                    });
                    lmfEvent('choose-permission', function () {
                        var $combinationItem = $(this).parents('.combination-item');
                        that.choosePermission(function (data) {
                            var mallUids = (data || []).map(function (value) {
                                return value.mall_uid
                            });
                            if (mallUids.length < 1) {
                                mallUids.push("11111111111111111");
                            }
                            $combinationItem.find('.combination-item-mall').val(mallUids.join(","));
                        });
                    });

                    form.on('submit(new-combination-form-submit)', function (obj) {
                        var data = obj.field;
                        var combinationItem = (data.combination_item || []).filter(function (value) {
                            return !!value;
                        });
                        if (combinationItem.length < 1) {
                            layer.Notify.error("请选择具体的组合详情");
                            return false
                        }
                        var submitData = {
                            "combination_name": data.combination_name,
                            "combination_item_list": combinationItem
                        };
                        $.ajax({
                            url: _ajaxUrl.newCombination,
                            type: 'POST',
                            data: JSON.stringify(submitData),
                            contentType: 'application/json',
                            dataType: 'json',
                            success: function (data) {
                                layer.close(newCombinationIndex);
                                if (data.code != 200) {
                                    layer.Notify.error(data.error_msg || '新建组合失败');
                                    return false;
                                }
                                layer.Notify.success('新建组合成功');
                            },
                            error: function () {
                                layer.close(newCombinationIndex);
                                layer.Notify.error('数据库忙，请稍后再试', 3000);
                            }
                        });

                        return false;
                    });
                }
            });
        },
        choosePermission: function (fn) {
            var content = '<div class="layui-card">' +
                '<div class="layui-card-body">' +
                '   <div class="layui-row">' +
                '        <form class="layui-form layui-form-sm" lay-filter="choose-permission-search">' +
                '            <div class="layui-input-inline">' +
                '                <input type="text" name="program_name"' +
                '                       autocomplete="true" placeholder="请输入项目名称"' +
                '                       maxlength="40" class="layui-input">' +
                '            </div>' +
                '            <div class="layui-input-inline">' +
                '                <button class="layui-btn layui-btn-sm  layui-search-btn"' +
                '                        lay-submit lay-filter="choose-permission-search">搜索' +
                '                </button>' +
                '            </div>' +
                '        </form>' +
                '        <div class="blank-line"></div>' +
                '        <table class="layui-hide" id="choose-permission-table" lay-filter="choose-permission-table"></table>' +
                '    </div>' +
                '</div>' +
                '</div>';

            var choosePermissionTable;
            layer.open({
                type: 1,
                area: ['1000px', '600px'],
                title: '设置数据权限',
                move: false,
                resize: true,
                scrollbar: false,
                shadeClose: false,
                shade: [0.3, '#000'],
                btn: ['确定', '取消'],
                content: content,
                yes: function (index) {
                    var permissionList = choosePermissionTable.checkStatus().data;
                    if ($.isFunction(fn)) {
                        fn(permissionList);
                    }
                    layer.close(index)
                },
                cancel: function (index) {
                    layer.close(index)
                },
                success: function () {
                    var config = {
                        elem: '#choose-permission-table',
                        url: _ajaxUrl.permissionList,
                        tableFilter: 'choose-permission-table',
                        searchFilter: 'choose-permission-search',
                        height: 400,
                        where: {
                            sort_order: 'desc',
                            sort_key: 'created_at'
                        },
                        limit: 10,
                        limits: [10],
                        page: true,
                        cols: [[
                            {
                                field: 'mall_uid',
                                type: 'checkbox',
                                unresize: true,
                                undraggable: true
                            },
                            {
                                field: 'business_code',
                                title: '项目编号',
                                unresize: true,
                                undraggable: true,
                                width: 150
                            },
                            {
                                field: 'program_name',
                                title: '项目名称',
                                unresize: true,
                                undraggable: true,
                                width: 150
                            },
                            {
                                field: 'company_name',
                                title: '商管公司',
                                unresize: true,
                                undraggable: true,
                                width: 200,
                                templet: function (d) {
                                    return d.business_company && d.business_company.company_name || '';
                                }
                            },
                            {
                                field: 'attribution_area',
                                title: '归属区域',
                                unresize: true,
                                undraggable: true,
                                width: 150
                            },
                            {
                                field: 'program_type',
                                title: '项目类型',
                                unresize: true,
                                undraggable: true
                            },
                            {
                                field: 'open_at',
                                title: '开业时间',
                                unresize: true,
                                undraggable: true,
                                width: 150
                            }
                        ]]
                    };
                    choosePermissionTable = lmfTable(config);
                }
            });
        }
    };


    //操作当前实例
    exports('chooseCombination', function (options) {
        new ChooseCombination(options);
    });
});