/**
 * Created by SK on 2018/6/7.
 */
layui.use(['lmfTable', 'table', 'layer', 'lmfEvent', 'jstree', 'lmfConfig'], function () {
    var lmfTable = layui.lmfTable;
    var layuiTable = layui.table;
    var clickEvent = layui.lmfEvent;
    var layer = layui.layer;
    var $ = layui.$;
    var CONFIG = layui.lmfConfig;

    // var selected_organization_code = [];
    // clickEvent('selected_organization', function (obj) {
    //     layer.load(2);
    //
    //     $.ajax({
    //             type: "post",
    //             url: '/organizationManage/getOrganizationNodeByCode',
    //             dataType: "json",
    //             data: JSON.stringify({
    //                 organization_code: 'root',
    //                 selected_organization_code: selected_organization_code
    //             }),
    //             contentType: "application/json"
    //         })
    //         .then(function (res) {
    //             layer.closeAll();
    //             if (res.code != 200) {
    //                 layer.Notify.error('请求归属组织列表出错!');
    //                 throw res;
    //             }
    //
    //             return {
    //                 core: {
    //                     data: [{
    //                         text: CONFIG.groupName,
    //                         id: res.data.id,
    //                         state: res.data.state || {
    //                             "opened": true,
    //                             "selected": false,
    //                             "disabled": false
    //                         },
    //                         children: res.data.children || []
    //                     }]
    //                 },
    //                 plugins: ["checkbox", "types"],
    //                 checkbox: {
    //                     "three_state": false, //父子级别级联选择
    //                     "cascade_to_disabled": false
    //                 },
    //                 types: {
    //                     default: {
    //                         "icon": "layui-icon layui-icon-group",
    //                         "valid_children": []
    //                     }
    //                 },
    //             };
    //         })
    //         .then(function (treeConfig) {
    //             var clickNode = [];
    //             var nodesText = [];
    //             var _selected_organization_code = [];
    //             layer.open({
    //                 type: 1,
    //                 title: '选择归属组织',
    //                 btn: ['确定', '取消'],
    //                 area: ['500px', '600px'],
    //                 content: '<div id="organization-tree-content" class="mt20 organization-tree-content"></div>',
    //                 resize: false,
    //                 scrollbar: false,
    //                 shadeClose: false,
    //                 shade: [0.3, '#000'],
    //                 success: function () {
    //                     $('#organization-tree-content').on('changed.jstree', function (e, data) {
    //                         nodesText = [];
    //                         _selected_organization_code = data.selected.slice(0);
    //
    //                         if (_selected_organization_code.indexOf(0) != -1) {
    //                             clickNode = [];
    //                             nodesText = [CONFIG.groupName];
    //                             return;
    //                         }
    //
    //                         clickNode = _selected_organization_code.map(function (_node) {
    //                             var nodeText = [CONFIG.groupName];
    //                             var nodeUid = '';
    //                             var allNodes = _node.match(/\d{3}/g);
    //                             allNodes.forEach(function (node) {
    //                                 var _node = data.instance.get_json(nodeUid += node);
    //                                 nodeText.push(_node.text)
    //                             });
    //                             nodesText.push(nodeText.join('/'));
    //                             var node = data.instance.get_node(_node).data;
    //                             return '<input name="organization_uids[]" type="hidden" value="' +
    //                                 node.organization_uid + '">'
    //                         });
    //
    //                     }).jstree(treeConfig);
    //                 },
    //                 yes: function (index) {
    //                     selected_organization_code = _selected_organization_code;
    //                     $('#organization_uids').html(clickNode.join(''));
    //                     $('#selected_organization').val(nodesText.join(','));
    //                     layer.close(index);
    //                 }
    //             });
    //         })
    //         .fail(function () {
    //             layer.closeAll();
    //             layer.Notify.error('请求归属组织列表出错');
    //         });
    // });
    //

    //批量启用
    clickEvent('batch-user-on', function () {

        var users = layuiTable.checkStatus('user-table').data;
        if (users.length == 0) {
            return layer.Notify.error('请选择需操作的数据');
        }
        var request = {
            user_uids: users.map(function (user) {
                return user.userUid
            }),
            status: 'TYP_ON'
        };

        batchOperateUsers(request);
    });
    //批量停用
    clickEvent('batch-user-off', function () {
        var users = layuiTable.checkStatus('user-table').data;
        if (users.length == 0) {
            return layer.Notify.error('请选择需操作的数据');
        }
        var request = {
            user_uids: users.map(function (user) {
                return user.userUid
            }),
            status: 'TYP_OFF'
        };
        batchOperateUsers(request);
    });

    function batchOperateUsers(request) {
        var hint_text = {
            'TYP_ON': '确定将选中的用户登录账号状态变更为启用',
            'TYP_OFF': '确定将选中的用户登录账号状态变更为停用'
        };

        layer.confirm(hint_text[request.status], {title: '提示'}, function (layerIndex) {
            $.ajax({
                type: "post",
                url: '/user/batchUpdateUserStatus',
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(request)
            })
                .then(function (res) {
                    if (res.code != 200) {
                        layer.Notify.error('批量操作出错');
                        return false;
                    }
                    if (res.data.error_list && res.data.error_list.length > 0) {
                        var error_msg = res.data.error_list.map(function (node, index, arr) {
                            return '校验到' + node.login_name + '操作失败,失败原因:' + node.error_msg;
                        }).join('<br>');
                        error_msg += ",请重新操作";
                        layer.Notify.error(error_msg);
                    } else {
                        layer.Notify.success('批量操作成功');
                        userTable.reload();
                    }
                })
                .fail(function () {
                    layer.close(layerIndex);
                    layer.Notify.error('批量操作出错');
                })
        });
    }

    var operateEvents = {
        change_user_pwd: function (obj) {
            var user_uid = obj.data.user_uid || '';
            layer.confirm('是否继续密码重置', {title: '提示'}, function (layerIndex) {
                $.ajax({
                    type: "post",
                    url: '/user/resetPassword',
                    dataType: "json",
                    contentType: "application/json",
                    data: JSON.stringify({
                        user_uid: user_uid
                    })
                })
                    .then(function (res) {
                        if (res.code != 200) {
                            layer.Notify.error('用户重置密码失败');
                            return false;
                        }
                        layer.Notify.success('用户重置密码成功');
                    })
                    .fail(function () {
                        layer.close(layerIndex);
                        layer.Notify.error('用户重置密码失败');
                    });
            });
        }
    };

    var tableConfig = {
        elem: '#user-table',
        url: '/user/getUserList',
        searchFilter: 'user-search',
        tableFilter: 'user-table',
        where: {
            sort_order: 'desc',
            sort_key: 'created_at'
        },
        page: true,
        cols: [[
            {
                field: 'createdAt',
                type: 'checkbox',
                title: '用户uid',
                fixed: 'left'
            },
            {
                field: 'loginName',
                title: '登陆账号',
                width: '15%',
                align: 'left'
            },
            {
                field: 'userName',
                title: '员工姓名',
                width: '15%',
                align: 'left'
            },
            {
                field: 'phone',
                title: '手机',
                width: '15%',
                align: 'left'
            },
            {
                field: 'status',
                title: '状态',
                width: '15%',
                align: 'left',
                templet: function (d) {
                    return d.status == 'TYP_ON' ? '启用' : '停用';
                }
            },
            {
                field: 'gender',
                title: '性别',
                align: 'left',
                width: '15%',
                templet: function (d) {
                    return d.gender == 'M' ? '男' : '女';
                }
            },
            {
                field: 'userUid',
                align: 'center',
                title: '操作',
                fixed: 'right',
                width: '20%',
                toolbar: '#operateTemplate'
            }
        ]]
    };

    var userTable = lmfTable(tableConfig, operateEvents);
});