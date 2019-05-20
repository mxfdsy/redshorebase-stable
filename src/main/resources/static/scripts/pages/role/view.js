/**
 * Created by SK on 2018/6/12.
 */

layui.use(['form', 'lmfTable', 'table', 'laytpl', 'layer', 'lmfEvent', 'element'], function () {
    var lmfTable = layui.lmfTable;
    var form = layui.form;
    var layer = layui.layer;
    var $ = layui.$;
    var laytpl = layui.laytpl;
    var element = layui.element;
    var clickEvent = layui.lmfEvent;

    /**
     * 展示所有菜单权限
     */
    function loadPermissions() {
        var createRoleAuthorityTpl = $("#createRoleAuthorityTpl").html();
        var _createRoleAuthorityTpl = laytpl(createRoleAuthorityTpl).render(roleMenuPermission);
        $("#createRoleAuthority").html(_createRoleAuthorityTpl);

        form.render();
        element.init();

        for (var i = 0; i < roleMenuPermission.length; i++) {
            for (var j = 0; j < roleMenuPermission[i].children.length; j++) {
                for (var k = 0; k < roleMenuPermission[i].children[j].permissions.length; k++) {
                    if (roleMenuPermission[i].children[j].permissions[k].isRoleSelected == true) {
                        $("[second-menu-name='role-second-menu'][value='" + roleMenuPermission[i].children[j].menuId + "']").prop("checked", true);
                        $("[first-menu-name='role-first-menu'][value='" + roleMenuPermission[i].menuId + "']").prop("checked", true);

                        form.render();

                    }
                }
            }

        }
    }

    /**
     * 权限配置中展开收起事件
     */
    clickEvent('role-icon-show', function () {
        if ($(this).hasClass('layui-this')) {
            $(this).children('.layui-colla-title-more').html("<span>收起</span><i class='layui-icon layui-icon-up'></i>")
        } else {
            $(this).children('.layui-colla-title-more').html("<span>展开</span><i class='layui-icon layui-icon-down'></i>")
        }

    })

    /**
     * 展示关联用户列表
     */


    /**
     * 关联用户数据展示
     */
    var operateEvents = {};
    var roleUid = roleInfo.roleUid;

    function renderTable() {
        var table_cols = [
            {
                field: 'organization',
                align: 'center',
                title: '归属组织',
            },

            {
                field: 'login_name',
                align: 'center',
                title: '登录账号'
            },

            {
                field: 'name',
                align: 'center',
                title: '员工姓名'
            },
            {
                field: 'phone',
                align: 'center',
                title: '手机'
            },
            {
                field: 'status',
                align: 'center',
                title: '状态',
                templet: function (d) {
                    if (d.status == 'TYP_ON') {
                        return '启用'
                    } else {
                        return '停用'
                    }
                }
            },
            {
                field: 'gender',
                align: 'center',
                title: '性别',
                templet: function (d) {
                    if (d.gender == 'F') {
                        return '女'
                    } else {
                        return '男'
                    }
                }
            }
        ];
        var tableConfig = {
            elem: '#roleAssociateTable',
            url: '/role/searchUserRole',
            searchFilter: 'search-role-associate',    //必传
            tableFilter: 'roleAssociateTable',
            where: {
                role_uid: roleUid,
                sort_order: 'desc',
                sort_key: 'created_at'
            },
            initSort: {
                field: 'totalSalesNumber',
                type: 'desc'
            },
            page: true,
            text: {
                none: '当前没有数据'
            },
            cols: [table_cols]
        };
        lmfTable(tableConfig, operateEvents);
    }

    var roleAssociate_table = renderTable();

    loadPermissions()

});