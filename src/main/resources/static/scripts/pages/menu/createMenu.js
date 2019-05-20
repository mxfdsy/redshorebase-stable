layui.use(['layer', 'element', 'laytpl', "form"], function () {
    var $ = layui.$;
    var laytpl = layui.laytpl;
    var layer = layui.layer;
    var form = layui.form;
    //接口路径
    var ajaxURL = {
        //获取所有模块菜单
        listModuleMenu: "/menu/listMenu",
        //添加模块
        addModule: '/menu/insertModule',
        //添加页面
        addPage: '/menu/insertChildrenMenu',
        //数据库添加权限
        addPermission: '/menu/insertPermission',
        delPermission: '/menu/deletePermission',
        //获取所有permission_key
        getPermissionkeys: '/menu/listPermissionKeys',
        editModule: '/menu/updateModule',
        delModule: '/menu/deleteModule',
        editMenu: '/menu/updateChildrenMenu',
        delMenu: '/menu/deleteChildrenMenu',
        changeParent: '/menu/changeParentMenu'
    };

    /**
     * 展示所有菜单权限
     */
    function loadPermissions() {
        var permissionsListTpl = $("#permissionsListTpl").html();
        $.ajax({
            type: "post",
            url: ajaxURL.listModuleMenu,
            contentType: 'application/json',
            data: "{}",
            dataType: "json",
            success: function (res) {
                if (res.code != 200) {
                    layer.Notify.error((res.error_msg || res.errorMsg || "获取菜单失败"));
                    return;
                }
                var _permissionContainerHtml = laytpl(permissionsListTpl).render(res.data);

                $("#permissionContainer").html(_permissionContainerHtml);


            },
            error: function () {
                layer.Notify.error("服务器繁忙");

            }
        });
    }


    var events = {
        /**
         * 添加模块
         */
        addModule: function () {
            var content = $('#addModule').html();
            layer.open({
                type: 1,
                title: '添加模块',
                area: ['600px', '300px'],
                scrollbar: false,
                content: content,
                btn: ['提交更改', '取消更改',],
                success: function () {
                    layui.use('form', function () {
                        var form = layui.form;
                        form.on('submit(addModuleForm)', function (formData) {
                            $.ajax({
                                type: "post",
                                url: ajaxURL.addModule,
                                contentType: 'application/json',
                                data: JSON.stringify(formData.field),
                                dataType: "json",
                                success: function (res) {
                                    if (res.code != 200) {
                                        layer.Notify.error("增加失败,失败原因:" + (res.error_msg || "未知"));
                                        return;
                                    }
                                    layer.closeAll();
                                    layer.Notify.success("添加成功");
                                    loadPermissions();
                                },
                                error: function (error) {
                                    console.error(error);
                                    layer.Notify.error("服务器繁忙");

                                }
                            });
                            return false;
                        })
                    })
                },
                yes: function () {
                    $("form[role='addModuleForm'] [lay-submit]").trigger('click');
                }
            });
        },
        /**
         * 修改模块
         */
        editModule: function (event, data) {
            var content = $('#editModule').html();
            layer.open({
                type: 1,
                title: '修改模块',
                area: ['600px', '360px'],
                scrollbar: false,
                content: content,
                btn: ['提交更改', '取消更改'],
                success: function () {
                    layui.use('form', function () {
                        var form = layui.form;
                        form.val('editModuleForm', data);
                        form.on('submit(editModuleForm)', function (formData) {
                            var _params = formData.field;
                            $.ajax({
                                type: "post",
                                url: ajaxURL.editModule,
                                contentType: 'application/json',
                                data: JSON.stringify(_params),
                                dataType: "json",
                                success: function (res) {
                                    if (res.code != 200) {
                                        layer.Notify.error("修改失败,失败原因:" + (res.error_msg || "未知"));
                                        return;
                                    }
                                    layer.closeAll();
                                    layer.Notify.success("修改成功");
                                    loadPermissions();
                                },
                                error: function () {
                                    layer.Notify.error("服务器繁忙");

                                }
                            });
                            return false;
                        });
                    })
                },
                yes: function () {
                    $("form[role='editModuleForm'] [lay-submit]").trigger('click');
                }
            });

        },
        delLayer2ToDB: function (event, data) {
            layer.confirm('删除该模块【' + data.name + '】如造成重大损失，将独自承担后果！', {icon: 7, title: '警告提示'}, function (index) {
                $.ajax({
                    type: "post",
                    url: ajaxURL.delModule,
                    contentType: 'application/json',
                    data: JSON.stringify({module_ids: [data.id]}),
                    dataType: "json",
                    success: function (res) {
                        if (res.code != 200) {
                            layer.Notify.error((res.error_msg || res.errorMsg) || "删除失败");
                            return;
                        }
                        layer.close(index);
                        layer.Notify.success("删除成功");
                        loadPermissions();
                    }

                });

            });
        },

        /**
         * 添加页面菜单
         */
        addLayer2ToDB: function (event, data) {
            data.modul_name = data.name;
            data.modul_id = data.id;

            var content = $('#addPage').html()

            layer.open({
                title: "添加页面",
                type: 1,
                area: ['600px', '410px'],
                scrollbar: false,
                content: content,
                btn: ['确认添加', '取消添加'],
                success: function () {
                    layui.use('form', function () {
                        var form = layui.form;
                        form.val('addPage', data);
                        form.on('submit(addPage)', function (formData) {
                            $.ajax({
                                type: "post",
                                url: ajaxURL.addPage,
                                contentType: 'application/json',
                                data: JSON.stringify(formData.field),
                                dataType: "json",
                                success: function (res) {
                                    if (res.code != 200) {
                                        layer.Notify.error((res.error_msg || res.errorMsg || "添加失败"));
                                        return;
                                    }
                                    layer.Notify.success("添加成功");
                                    layer.closeAll();
                                    loadPermissions();
                                },
                                error: function () {
                                    layer.Notify.error("服务器繁忙");
                                }
                            });
                            return false;
                        });
                    })
                },
                yes: function () {
                    $("form[role='addPage'] [lay-submit]").trigger('click');
                }
            });


        },
        delMenu2ToDB: function (event, data) {

            layer.confirm('删除该页面【' + data.name + '】如造成重大损失，将独自承担后果！', {icon: 7, title: '警告提示'}, function (index) {
                $.ajax({
                    type: "post",
                    url: ajaxURL.delMenu,
                    contentType: 'application/json',
                    data: JSON.stringify({menu_ids: [data.menu_id]}),
                    dataType: "json",
                    success: function (res) {
                        if (res.code != 200) {
                            layer.Notify.error((res.error_msg || res.errorMsg) || "删除失败");
                            return;
                        }
                        layer.close(index);
                        layer.Notify.success("删除成功");
                        loadPermissions();
                    }

                });

            });

        },
        /**
         * 修改页面菜单
         */
        editMenu2ToDB: function (event, data) {

            var content = $('#editPage').html();
            layer.open({
                title: "修改页面",
                type: 1,
                area: ['600px', '300px'],
                scrollbar: false,
                content: content,
                btn: ['确认修改', '取消修改'],
                success: function () {
                    layui.use(['form'], function () {
                        var form = layui.form;
                        form.val('editMenuForm', data);
                        form.on('submit(editMenuForm)', function (formData) {
                            $.ajax({
                                type: "post",
                                url: ajaxURL.editMenu,
                                contentType: 'application/json',
                                data: JSON.stringify(formData.field),
                                dataType: "json",
                                success: function (res) {
                                    if (res.code != 200) {
                                        layer.Notify.error("修改失败,失败原因:" + (res.error_msg || "未知"));
                                        return;
                                    }
                                    layer.closeAll();
                                    layer.Notify.success("修改成功");
                                    loadPermissions();
                                },
                                error: function () {
                                    layer.Notify.error("服务器繁忙");

                                }
                            });
                            return false
                        });
                    })
                },
                yes: function () {
                    $("form[role='editMenuForm'] [lay-submit]").trigger('click');
                }
            });

        },

        changeMenuParent: function (event, data) {

            var content = $('#changeParent').html();
            laytpl(content).render(data, function (_html) {
                layer.open({
                    title: "切换模块",
                    type: 1,
                    area: ['600px', '300px'],
                    scrollbar: false,
                    content: _html,
                    btn: ['确认切换', '取消切换'],
                    success: function () {
                        layui.use(['form'], function () {
                            var form = layui.form;
                            form.val('changeParentForm', data);
                            form.on('submit(changeParentForm)', function (formData) {
                                $.ajax({
                                    type: "post",
                                    url: ajaxURL.changeParent,
                                    contentType: 'application/json',
                                    data: JSON.stringify(formData.field),
                                    dataType: "json",
                                    success: function (res) {
                                        if (res.code != 200) {
                                            layer.Notify.error("切换失败,失败原因:" + (res.error_msg || "未知"));
                                            return;
                                        }
                                        layer.closeAll();
                                        layer.Notify.success("切换成功");
                                        loadPermissions();
                                    },
                                    error: function () {
                                        layer.Notify.error("服务器繁忙");

                                    }
                                });
                                return false
                            });
                        })
                        form.render();
                    },
                    yes: function () {
                        $("form[role='changeParentForm'] [lay-submit]").trigger('click');
                    }
                });
            })


        },

        /**
         * 添加权限
         */
        addpermissionToDB: function (event, data) {
            var menu_id = data.menu_id;
            data.permission_module = data.module;
            data.parent_menu_id = data.id;
            data.menu_id = data.menu_id;

            var permissionsListTpl = $("#addPermission").html();
            $.ajax({
                type: "post",
                url: ajaxURL.getPermissionkeys,
                contentType: 'application/json',
                data: JSON.stringify({"menu_id": menu_id}),
                dataType: "json",
                success: function (res) {
                    if (res.code != 200) {
                        layer.Notify.error((res.error_msg || res.errorMsg) || "添加失败");
                        return;
                    }
                    laytpl(permissionsListTpl).render(res, function (content) {
                        // $("#addPermission").html(html);

                        layer.open({
                            title: "添加权限",
                            type: 1,
                            area: ['800px', '500px'],
                            scrollbar: false,
                            content: content,
                            btn: ['确认添加', '取消添加',],
                            success: function () {
                                layui.use(['form'], function () {
                                    var form = layui.form;
                                    form.val('addPermission', data);

                                    form.on('submit(addPermission)', function (formData) {
                                        $.ajax({
                                            type: "post",
                                            url: ajaxURL.addPermission,
                                            contentType: 'application/json',
                                            data: JSON.stringify(formData.field),
                                            dataType: "json",
                                            success: function (res) {
                                                if (res.code != 200) {
                                                    layer.Notify.error((res.error_msg || res.errorMsg) || '添加失败');
                                                    return;
                                                }
                                                layer.Notify.success("添加成功");
                                                layer.closeAll();
                                                loadPermissions();
                                            },
                                            error: function () {
                                                layer.Notify.error("服务器繁忙");
                                            }
                                        });
                                        return false;
                                    })
                                })

                            },
                            yes: function () {
                                $("form[role='addPermission'] [lay-submit]").trigger('click');
                            }
                        });

                    });

                },
                error: function () {
                    layer.Notify.error("服务器繁忙");
                }
            });


        },
        delPermissionKey: function (event, data) {

            layer.confirm('删除该权限【' + data.permission_name + '】如造成重大损失，将独自承担后果！', {
                icon: 7,
                title: '警告提示'
            }, function (index) {
                $.ajax({
                    type: "post",
                    url: ajaxURL.delPermission,
                    contentType: 'application/json',
                    data: JSON.stringify({permission_uid: data.permission_uid}),
                    dataType: "json",
                    success: function (res) {
                        if (res.code != 200) {
                            layer.Notify.error((res.error_msg || res.errorMsg) || "删除失败");
                            return;
                        }
                        layer.close(index);
                        layer.Notify.success("删除成功");
                        loadPermissions();
                    },
                    fail: function () {

                    }

                });

            });

        },
    };

    $('body').on('click', '[data-btn-type]', function (e) {
        var typ = $(this).data('btnType');
        if (events[typ] && $.isFunction(events[typ])) {
            events[typ].call(this, e, $(this).data());
        }
        return false;
    });
    loadPermissions();
});