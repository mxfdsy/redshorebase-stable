/**
 * Created by SK on 2018/6/6.
 */
layui.use(['element', 'form', 'layer', 'jstree', 'lmfEvent', 'laytpl', 'lmfTable', 'table', 'lmfConfig'], function () {
    var $ = layui.$;
    var form = layui.form;
    var layer = layui.layer;
    var laytpl = layui.laytpl;
    var clickEvent = layui.lmfEvent;
    var lmfTable = layui.lmfTable;
    var CONFIG = layui.lmfConfig;

    var MAX_ROLE_NUM = 20;
    var roleCount = 0;
    var select_roles = {};
    layui.element.on('tab(choosed-permission-tab)', function () {
        $(window).trigger('resize');
    });

    function initEditView() {
        if (userInfo.roles && userInfo.roles.length > 0) {
            userInfo.roles.forEach(function (role, i) {
                addRole(role.role_name);
                $('.choose-permission').removeClass('layui-hide');
                select_roles[(i + 1).toString()] = {
                    role: role,
                    malls: role.mall_uids.map(function (mall_uid) {
                        return {
                            mall_uid: mall_uid
                        }
                    })
                };
            })

        } else {
            addRole('');
            initSelectData("1");
        }
    }

    function initSelectData(index) {
        if (!select_roles[index]) {
            select_roles[index] = {
                role: {},
                malls: []
            }
        }
    }

    initEditView();

    function addRole(role_name) {
        var roleTpl = $('#tplRoles').html();

        laytpl(roleTpl).render({index: ++roleCount, role_name: role_name}, function (contactHtml) {
            $('.user-roles:last').after(contactHtml);
        });
        var $deleteIcon = $('.delete-icon');
        if ($deleteIcon.length >= MAX_ROLE_NUM) {
            $('.add-role').addClass('layui-hide');
        } else {
            if ($deleteIcon.length < 2) {
                $deleteIcon.addClass('layui-hide')
            } else {
                $deleteIcon.first().removeClass('layui-hide')
            }
        }

    }

    clickEvent('add-role', function () {
        addRole('');

        initSelectData(roleCount.toString());
    });

    clickEvent('del-role', function (e) {
        var index = $(this).parents('.user-roles').attr('data-index');
        delete select_roles[index];

        $(this).parents('.user-roles').remove();
        var $deleteIcon = $('.delete-icon');
        if ($deleteIcon.length < MAX_ROLE_NUM) {
            $('.add-role').removeClass('layui-hide');
        }
        if ($deleteIcon.length == 1) {
            $deleteIcon.addClass('layui-hide')
        } else {
            $deleteIcon.first().removeClass('layui-hide')
        }
    });

    // 设置角色
    clickEvent('choose-role', function (res) {
        var _this = this;
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
                    title: '角色名称',
                    unresize: true,
                    undraggable: true
                },
                {
                    field: 'role_desc',
                    title: '角色描述',
                    unresize: true,
                    undraggable: true
                },
                {
                    field: 'open_at',
                    title: '操作',
                    unresize: true,
                    undraggable: true,
                    templet: function (d) {
                        return '<a href="javascript:;" lay-event="select">选择</a>';
                    }
                }
            ]]
        };

        var optionEvents = {
            select: function (selected) {
                layer.closeAll();
                var index = $(_this).parents('.user-roles').attr('data-index');
                $(_this).val(selected.data.role_name || '');
                select_roles[index].role = selected.data;
                $(_this).siblings('.choose-permission').removeClass('layui-hide');
            }
        };

        layer.open({
            type: 1,
            area: ['800px', '525px'],
            title: ['选择角色'],
            move: false,
            resize: false,
            scrollbar: false,
            shadeClose: false,
            shade: [0.3, '#000'],
            content: $('#chooseRole').html(),
            success: function () {
                lmfTable(tableConfig, optionEvents);
            }
        });
    });


    (function choosePermission() {
        var choosedMalls = []; //弹窗中 选中的数据
        var allMalls; //所有数据

        var getAllMalls = function () {
            if (allMalls) {
                return $.when(allMalls.map(function (mall) {
                    delete mall['LAY_CHECKED'];
                    delete mall['LAY_TABLE_INDEX'];
                    return mall;
                }));
            }
            return $.ajax({
                type: "post",
                url: '/businessProgram/getList',
                dataType: "json",
                data: JSON.stringify({
                    "page_no": 1,
                    "page_size": 1000,
                    "sort_order": "desc",
                    "sort_key": "created_at"
                }),
                contentType: "application/json"
            })
                .then(function (res) {
                    if (res.code != 200) {
                        return []
                    }
                    return res.data.content;
                })
                .then(function (_allMalls) {
                    return allMalls = _allMalls.slice(0);
                })
        };

        var getWaitingMalls = function () {
            var choosedMallUids = choosedMalls.map(function (mall) {
                return mall.mall_uid
            });
            return allMalls.filter(function (mall) {
                return choosedMallUids.indexOf(mall.mall_uid) == -1;
            })
        };

        var setChoosedMalls = function (malls) {
            var malluids = malls.map(function (mall) {
                return mall.mall_uid;
            });
            choosedMalls = allMalls.filter(function (mall) {
                return malluids.indexOf(mall.mall_uid) != -1;
            });
        };
        var choosedTable, listTable;

        var renderPermissionTable = function () {
            var tableCols = [
                {
                    field: 'mall_uid',
                    type: 'checkbox',
                    unresize: true,
                    undraggable: true,
                },
                {
                    field: 'business_code',
                    title: '项目编号',
                    unresize: true,
                    undraggable: true,
                    width: 120
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
                    undraggable: true,
                },
                {
                    field: 'open_at',
                    title: '开业时间',
                    unresize: true,
                    undraggable: true,
                    width: 130
                }
            ];

            var choosedTableConfig = {
                data: choosedMalls.slice(0),
                elem: '#choosed-table',
                tableFilter: 'choosed-table',
                searchFilter: 'choosed-search',
                height: 370,
                where: {
                    sort_order: 'desc',
                    sort_key: 'created_at'
                },
                cacheChecked: false,
                page: true,
                cols: [tableCols.slice(0)]
            };

            var listTableConfig = {
                data: getWaitingMalls(),
                elem: '#permission-table',
                tableFilter: 'permission-table',
                searchFilter: 'permission-search',
                height: 370,
                where: {
                    sort_order: 'desc',
                    sort_key: 'created_at'
                },
                cacheChecked: false,
                page: true,
                cols: [tableCols.slice(0)]
            };
            //
            choosedTable = lmfTable(choosedTableConfig, {});
            listTable = lmfTable(listTableConfig, {});
        };


        //删除项目
        clickEvent('delete-choose', function () {
            var deleteMallsData = choosedTable.checkStatus().data.slice(0);
            var deleteMallUids = deleteMallsData.map(function (mall) {
                return mall.mall_uid;
            });

            choosedMalls = choosedMalls
                .filter(function (mall) {
                    return deleteMallUids.indexOf(mall.mall_uid) == -1;
                })
                .map(function (mall) {
                    delete mall['LAY_CHECKED'];
                    delete mall['LAY_TABLE_INDEX'];
                    return mall;
                });

            choosedTable.reload({
                data: choosedMalls.slice(0)
            });
            listTable.reload({
                data: getWaitingMalls()
            });

            return false;
        });
        //选择项目
        clickEvent('add-choose', function () {
            var choosedMallsData = listTable.checkStatus().data.slice(0);
            choosedMalls = choosedMalls.concat(choosedMallsData);
            choosedMalls = choosedMalls.map(function (mall) {
                delete mall['LAY_CHECKED'];
                delete mall['LAY_TABLE_INDEX'];
                return mall;
            });

            choosedTable.reload({
                data: choosedMalls.slice(0)
            });
            listTable.reload({
                data: getWaitingMalls()
            });
            return false;
        });
        // 设置数据权限


        clickEvent('choose-permission', function () {
            var index = $(this).parents('.user-roles').attr('data-index');


            getAllMalls()
                .then(function () {
                    layer.open({
                        type: 1,
                        area: ['1100px', '600px'],
                        title: ['设置数据权限'],
                        btn: ['提交', '取消'],
                        move: false,
                        resize: false,
                        scrollbar: false,
                        shadeClose: false,
                        shade: [0.3, '#000'],
                        content: $('#tplPermission').html(),
                        success: function () {
                            setChoosedMalls(select_roles[index].malls);
                            renderPermissionTable();

                        },
                        yes: function (layerIndex) {
                            select_roles[index].malls = choosedMalls;
                            layer.close(layerIndex);
                        },
                        end: function () {
                            listTable.tableIns.clearCache();
                            choosedTable.tableIns.clearCache();
                        }
                    });
                })
                .fail(function () {
                    layer.Notify.error("获取项目信息失败")
                });
            return false;
        });

    })();


    var selected_organization = [userInfo.organization ? userInfo.organization.organization_uid : 'root'];
    clickEvent('choose-organization', function () {
        layer.load(2);
        var parameter = {
            organization_code: 'root',
            selected_organization_code: selected_organization,
            is_all: "false"
        };

        $.ajax({
            type: "post",
            url: '/organizationManage/getOrganizationNodeByCode',
            dataType: "json",
            data: JSON.stringify(parameter),
            contentType: "application/json"
        })
            .then(function (res) {
                layer.closeAll();
                if (res.code != 200) {
                    layer.Notify.error('请求归属组织列表出错!');
                    return false;
                }
                var treeConfig = {
                    core: {
                        data: [{
                            text: CONFIG.groupName,
                            id: res.data.id,
                            state: res.data.state || {
                                "opened": true,
                                "selected": false,
                                "disabled": true
                            },

                            children: res.data.children || []
                        }],
                        multiple: false
                    },
                    plugins: ["checkbox", "types"],
                    "checkbox": {
                        "three_state": false //父子级别级联选择
                    },
                    types: {
                        default: {
                            "icon": "layui-icon layui-icon-group",
                            "valid_children": []
                        }
                    },
                };

                var chooseNode;
                layer.open({
                    type: 1,
                    title: '选择归属组织',
                    btn: ['确定', '取消'],
                    area: ['500px', '600px'],
                    content: '<div id="organization-tree-content" class="organization-tree-content mt20"></div>',
                    resize: false,
                    scrollbar: false,
                    shadeClose: false,
                    shade: [0.3, '#000'],
                    success: function () {
                        $('#organization-tree-content').on('changed.jstree', function (e, data) {
                            var allNodes = data.selected[0].match(/\d{3}/g);
                            var nodeText = [CONFIG.groupName];
                            var nodeUid = '';
                            allNodes.forEach(function (node) {
                                var _node = data.instance.get_json(nodeUid += node);
                                nodeText.push(_node.text)
                            });

                            chooseNode = data.instance.get_node(data.selected[0]);
                            chooseNode.previwe_text = nodeText.join('/');

                        }).jstree(treeConfig)
                    },
                    yes: function (index) {
                        layer.close(index);
                        if (!chooseNode) {
                            $('.organization').val('');
                            $('.organization-id').val('');
                            return false;
                        }
                        $('.organization').val(chooseNode.previwe_text);
                        $('.organization-id').val(chooseNode.data.organization_uid);
                        selected_organization = [chooseNode.id];
                    }
                });
            })
            .fail(function () {
                layer.closeAll();
                layer.Notify.error('请求归属组织列表出错');
            });
    });

    form.verify({
        input_email: function (value, item) {
            if (value && !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)) {
                return '请输入正确的邮箱地址';
            }
        }
    });

    // 编辑用户
    form.on('submit(form-save)', function (data) {
        var field = data.field;

        var choose_roles = [];
        for (index in select_roles) {
            var role = {
                role_uid: select_roles[index].role.role_uid,
                mall_uids: select_roles[index].malls.map(function (item) {
                    return item.mall_uid;
                })
            };
            choose_roles.push(role);
        }

        field.roles = choose_roles;

        $.ajax({
            type: "post",
            url: "/user/updateUserInfo",
            dataType: "json",
            contentType: "application/json",
            async: false,
            data: JSON.stringify(field)
        })
            .then(function (res) {
                if (res.code != 200) {
                    layer.Notify.error(res.error_msg || '编辑用户出错!');
                    return false;
                }
                layer.Notify.success('编辑用户成功!');
                setTimeout(function () {
                    window.location.href = "/user/layout/index.html";
                }, 800);
            })
            .fail(function () {
                layer.Notify.error('编辑用户出错!');
            });
        return false;
    });

});