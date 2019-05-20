/**
 * Created by sqq on 2018/6/20.
 */

layui.use(['form', 'lmfTable', 'table', 'laytpl', 'layer', 'lmfEvent', 'select2'], function () {
    var lmfTable = layui.lmfTable;
    var table = layui.table;
    var form = layui.form;
    var layer = layui.layer;
    var $ = layui.$;


    //接口路径
    var ajaxURL = {
        //获取角色
        getRoleList: "/role/getList",
        //增加角色
        createRole: "/role/createRole",
        //修改角色
        updateRole: "/role/updateRole",
        //删除角色
        deleteRole: "/role/deleteRole",
        //获取账号列表
        serchUserByRole: '/user/listUserByRole',
        //添用账号
        addUser: '/user/dispatch/add',
        //更新账号
        updateUser: '/user/dispatch/update',
        //删除账号
        delUser: '/user/dispatch/remove',
        //获取权限列表
        searchRolePermission: "/menu/listModuleMenu",
        //修改权限
        insertOrUpdateRolePermission: "/permission/insertOrUpdateRolePermission"
    };


    var operateEvents = {
        //删除角色
        delete_role: function (obj) {
            var data = obj.data; //获得当前行数据
            var role_uid = data.role_uid;

            layer.confirm('确认删除该角色？', {title: '提示'}, function () {
                $.ajax({
                    type: "post",
                    url: "/role/delete",
                    dataType: "json",
                    contentType: "application/json",
                    async: false,
                    data: JSON.stringify({
                        role_uid: role_uid
                    })
                })
                    .then(function (res) {
                        if (res.code == 12004) {
                            layer.Notify.error('该角色已绑定用户，无法删除！');
                            return false;
                        } else if (res.code != 200) {
                            layer.Notify.error('删除失败！');
                            return false;
                        }
                        layer.Notify.success('删除角色成功！');
                        renderTable();
                        return true;
                    })
                    .fail(function (error) {
                        layer.Notify.error('删除失败！');
                    });
            }, function () {

            });
        }
    };


    /**
     * 角色数据展示
     */

    function renderTable() {
        var table_cols = [
            {
                field: 'role_name',
                align: 'left',
                title: '角色名称',
                fixed: 'left'
            },

            {
                field: 'role_desc',
                align: 'left',
                title: '角色描述'
            },
            {
                field: 'role_uid',
                align: 'center',
                title: '操作',
                fixed: 'right',
                undraggable: true,
                width: '20%',
                toolbar: '#operateTemplate'
            }
        ];
        var tableConfig = {
            elem: '#roleManageTable',
            searchFilter: 'search-role',    //必传
            tableFilter: 'roleManageTable',
            url: ajaxURL.getRoleList,
            page: true,
            where: {
                sort_order: 'asc',
                sort_key: 'created_at',
                is_changeable: 'YES'
            },
            initSort: {
                field: 'totalSalesNumber',
                type: 'desc'
            },
            text: {
                none: '当前没有数据'
            },
            cols: [table_cols]
        };

        lmfTable(tableConfig, operateEvents);
    };
    var roleManage_Table = renderTable();
});