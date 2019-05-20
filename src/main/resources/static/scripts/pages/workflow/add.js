/**
 * Created by andy on 2018/6/6.
 */
layui.use(['form', 'layer', 'lmfEvent', 'laytpl', 'chooseRole', 'chooseUser', 'chooseDepartment', 'chooseCombination'], function () {
    var form = layui.form;
    var layer = layui.layer;
    var laytpl = layui.laytpl;
    var clickEvent = layui.lmfEvent;
    var chooseRole = layui.chooseRole;
    var chooseUser = layui.chooseUser;
    var chooseDepartment = layui.chooseDepartment;
    var chooseCombination = layui.chooseCombination;
    var $ = layui.$;


    var approvalGroup = {
        "TYP_INDIVIDUAL": function ($stepItem) {
            chooseUser({
                isMultiple: false,
                success: function (obj) {
                    if (obj.data.length < 1) {
                        layer.Notify.error("未选择用户");
                        return false;
                    }
                    var user = obj.data[0];
                    $stepItem.find(".approval_group_value").val(user.userUid);
                    $stepItem.find(".approval_group_name").val(user.loginName);
                }
            })
        },
        "TYP_ROLE": function ($stepItem) {
            chooseRole({
                success: function (role) {
                    $stepItem.find(".approval_group_value").val(role.role_key);
                    $stepItem.find(".approval_group_name").val(role.role_name);
                }
            });
        },
        "TYP_DEPARTMENT": function ($stepItem) {
            var options = {
                selected_organization_code: [],
                success: function (chooseNode) {
                    if (!chooseNode) {
                        $stepItem.find(".approval_group_value").val('');
                        $stepItem.find(".approval_group_name").val('');
                        return false;
                    }
                    $stepItem.find(".approval_group_value").val(chooseNode.data.organization_uid);
                    $stepItem.find(".approval_group_name").val(chooseNode.previwe_text);
                }
            };
            chooseDepartment(options);
        },
        "TYP_COMBINATION": function ($stepItem) {
            chooseCombination({
                success: function (data) {
                    $stepItem.find(".approval_group_value").val(data.combination_uid);
                    $stepItem.find(".approval_group_name").val(data.combination_name);
                }
            });
        }
    };


    form.on('select(approval_group_type_filter)', function (obj) {
        // var func = approvalGroup[obj.value];
        //         // if ($.isFunction(func)) {
        //         //     func($(obj.elem).parents('.step-item'))
        //         // }
        $(this).parents('.step-item').find('.approval_group_name').val('');
        $(this).parents('.step-item').find('.approval_group_value').val('');
    });

    form.on('submit(form-submit)', function (obj) {
        var data = obj.field;

        var workflow_step_list = data.workflow_step.filter(function (element) {
            return !!element;
        });
        data.workflow_step = workflow_step_list;
        $.ajax(
            {
                type: "post",
                url: "/workflow/add",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(data)
            }
        )
            .then(
                function (res) {
                    if (res.code != 200) {
                        layer.closeAll('loading');
                        layer.Notify.error(res.error_msg);
                        return false;
                    }
                    layer.Notify.success('新增审核流成功!');
                    location.href = "/workflow/layout/index.html";
                }
            )
            .fail(function (e) {
                layer.Notify.error('新增审核流失败!');
            });
        return false;
    });

    var contactsCount = 0;
    clickEvent('add-workflow-step', function () {
        var contactHtml = $('#tplFactoryWorkflowStep').html();
        $('.step-container').append(laytpl(contactHtml).render({index: ++contactsCount}));
        form.render();
    });

    clickEvent('del-workflow-step', function (e) {
        $(this).parents('.step-item').remove();
    });

    clickEvent('change-approval-group', function (e) {
        var $stepItem = $(this).parents(".step-item");
        var approvalGroupType = $stepItem.find('[lay-filter="approval_group_type_filter"]').val();
        var func = approvalGroup[approvalGroupType];
        if ($.isFunction(func)) {
            func($stepItem);
        }
    })

});