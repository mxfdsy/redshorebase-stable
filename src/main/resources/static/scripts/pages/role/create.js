/**
 * Created by sqq on 2018/6/22.
 */
layui.use(['form', 'layer', 'element', 'laytpl', 'lmfEvent'], function () {
    var form = layui.form;
    var layer = layui.layer;
    var element = layui.element;
    var $ = layui.$;
    var laytpl = layui.laytpl;
    var clickEvent = layui.lmfEvent;

    /**
     * 默认验证规则
     * http://www.layui.com/doc/modules/form.html#attr
     * 必填项    required
     * 手机号    phone
     * 网址      url
     * 日期      date
     * 身份证    identity
     *
     * 自定义表单验证规则
     *
     * 没有输入限制       *
     * 输入字符长度1-5    *1-5
     * 限制输入字符长度4  *4-4
     * 只能输入数字       n
     * 只能输入1-999     n1-3
     * 不能输入特殊字符   s
     */

    /**
     * 展示所有菜单权限
     */
    function loadPermissions() {
        var createRoleAuthorityTpl = $("#createRoleAuthorityTpl").html();
        $.ajax({
            type: "post",
            url: '/menu/listMenu',
            contentType: 'application/json',
            data: "{}",
            dataType: "json",
            success: function (res) {
                if (res.code != 200) {
                    layer.Notify.error((res.error_msg || res.errorMsg || "获取菜单失败"));
                    return;
                }
                var _createRoleAuthorityTpl = laytpl(createRoleAuthorityTpl).render(res.data);
                $("#createRoleAuthority").html(_createRoleAuthorityTpl);
                // console.log(res.data);
                layui.use(['element', 'form'], function () {
                    form.render();
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
                    layui.element.init();
                });

            },
            error: function () {
                layer.Notify.error("服务器繁忙");

            }
        });
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
     * 提交表单
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
                    layer.closeAll();
                    layer.Notify.error('该角色名称已被使用，请重新输入!');
                    return false;
                } else if (res.code == 11001) {
                    layer.closeAll();
                    layer.Notify.error('请选择权限！');
                    return false;
                } else if (res.code != 200) {
                    layer.closeAll();
                    layer.Notify.error('新增角色失败!');
                    return false;
                }
                layer.closeAll('loading');
                layer.Notify.success('新增角色成功!', function () {
                    window.location.href = "/role/layout/management";
                });
            });

    }

    form.on('submit(form-role)', function (data) {
        var field = data.field;
        field.is_changeable = "YES";
        //去除提交permission_uids中的空字符串
        field.permission_uids = field.permission_uids.filter(function (permission_uid) {
            return permission_uid != "";
        });
        createBrand(field)
        return false;
    })

    loadPermissions();

})