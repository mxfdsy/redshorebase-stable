/**
 * Created by sqq on 2018/6/25.
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

        //一级菜单事件
        form.on('checkbox(role-first-menu)', function (obj) {

            if (window.event.stopPropagation) {
                window.event.stopPropagation();      //阻止事件 冒泡传播
            } else {
                window.event.cancelBubble = true;   //ie兼容
            }
            //如果一级菜单选中，当下所有菜单选中
            $("[first-menu-uid='" + obj.value + "']").prop("checked", obj.elem.checked);
            form.render();
        });
        //二级菜单事件
        form.on('checkbox(role-second-menu)', function (obj) {

            if (window.event.stopPropagation) {
                window.event.stopPropagation();      //阻止事件 冒泡传播
            } else {
                window.event.cancelBubble = true;   //ie兼容
            }
            var _this = obj.elem;

            //二级菜单选中，当下所有菜单和一级菜单选中
            var first_menu_uid = $(_this).attr("first-menu-uid");

            var $second_menu = $("[second-menu-name='role-second-menu']");

            var second_menu_length = $second_menu.filter("[first-menu-uid='" + first_menu_uid + "']:checked").length;

            var $first_menu = $("[first-menu-name='role-first-menu'][value='" + first_menu_uid + "']");

            if (_this.checked) {
                $first_menu.prop("checked", true);
            } else if (second_menu_length == 0) {
                $first_menu.prop("checked", false);
            }

            $("[second-menu-uid='" + obj.value + "']").prop("checked", obj.elem.checked);

            form.render();
        });
        //三级菜单事件
        form.on('checkbox(role-third-menu)', function (obj) {

            if (window.event.stopPropagation) {
                window.event.stopPropagation();      //阻止事件 冒泡传播
            } else {
                window.event.cancelBubble = true;   //ie兼容
            }
            var _this = obj.elem;

            //三级菜单选中，当下所有菜单和二级一级菜单选中

            var first_menu_uid = $(_this).attr("first-menu-uid");
            var $first_menu = $("[first-menu-name='role-first-menu'][value='" + first_menu_uid + "']");


            var second_menu_uid = $(_this).attr("second-menu-uid");
            var $second_menu = $("[second-menu-name='role-second-menu'][value='" + second_menu_uid + "']");


            var $third_menu = $("[third-menu-name='role-third-menu']");


            var third_menu_slibing_length =
                $third_menu.filter("[first-menu-uid='" + first_menu_uid + "'][second-menu-uid='" + second_menu_uid + "']:checked").length;

            if (_this.checked) {

                $first_menu.prop("checked", true);
                $second_menu.prop("checked", true);

            } else if (third_menu_slibing_length == 0) {

                $second_menu.prop("checked", false);


                var second_menu_length = $("[second-menu-name='role-second-menu'][first-menu-uid='" + first_menu_uid + "']:checked").length;
                if (second_menu_length == 0) {
                    $first_menu.prop("checked", false);
                }
            }
            form.render();
        });
        element.init();
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
     * 复制角色
     */

    function createBrand(request) {
        return $.ajax({
            type: "post",
            url: "/role/create",
            dataType: "json",
            contentType: "application/json",
            async: false,
            data: JSON.stringify(request)
        })
            .then(function (res) {
                layer.load(2);
                if (res.code == 25003) {
                    layer.closeAll('loading');
                    layer.Notify.error('该角色名称已被使用，请重新输入!');
                    return false;
                } else if (res.code != 200) {
                    layer.closeAll('loading');
                    layer.Notify.error('复制角色失败!');
                    return false;
                }

                layer.closeAll("loading");
                layer.Notify.success('复制角色成功!', function () {
                    window.location.href = "/role/layout/management";
                });
            });
    }

    form.on('submit(form-role)', function (data) {
        var field = data.field;
        field.is_changeable = "YES";

        //去除提交permission_uids中的空字符串
        var permission_uidsArr = $.grep(field.permission_uids, function (n) {
            return $.trim(n).length > 0;
        })
        field.permission_uids = permission_uidsArr;

        createBrand(field);
        return false;
    })

    loadPermissions()
});