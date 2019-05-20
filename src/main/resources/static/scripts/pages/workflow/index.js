/**
 *
 */

layui.use(['layer', 'lmfTable'], function () {
    var lmfTable = layui.lmfTable;
    var layer = layui.layer;
    var $ = layui.$;


    //接口路径
    var ajaxURL = {
        //获取workflow列表
        getWorkflowList: "/workflow/list"
    };


    var operateEvents = {
        workflow_delete: function (obj) {
            var workflow_uid = obj.data.workflow_uid;
            var index = layer.load(2);
            deleteWorkflow(workflow_uid)
                .then(function (res) {
                    layer.close(index);
                    if (res.code != 200) {
                        layer.Notify.error(res.error_msg);
                        return false;
                    }
                    layer.Notify.success("删除审核流成功");
                    workflow_table.reload();
                })
                .fail(function (e) {
                    layer.close(index);
                    layer.Notify.error('删除审核流失败!');
                });
        }

    };


    var tableConfig = {
        elem: '#workflowManageTable',
        url: ajaxURL.getWorkflowList,
        where: {
            sort_order: 'desc',
            sort_key: 'created_at'
        },
        page: true,
        initSort: {
            field: 'totalSalesNumber',
            type: 'desc'
        },
        text: {
            none: '当前没有数据'
        },
        cols: [[
            {
                type: 'id',
                fixed: 'left',
                title: '序号',
                templet: function (d) {
                    return d.LAY_INDEX
                }
            },
            {
                field: 'workflow_key',
                title: '工作流KEY',
                fixed: 'left'
            },

            {
                field: 'workflow_name',
                title: '工作流'
            },

            {
                field: 'workflow_desc',
                title: '工作流描述'
            },
            // {
            //     field: 'created_at',
            //     title: '创建时间'
            // },
            {
                field: 'updated_at',
                title: '最新修改时间'
            },
            // {
            //     field: 'updated_by',
            //     title: '最后修改人'
            // },
            {
                field: '',
                align: 'center',
                title: '操作',
                fixed: 'right',
                width: '15%',
                toolbar: '#operateTemplate'
            }
        ]]
    };


    var workflow_table = lmfTable(tableConfig, operateEvents);


    function deleteWorkflow(workflowUid) {
        return $.ajax({
            type: "post",
            url: "/workflow/delete",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                "workflow_uid": workflowUid
            })
        })
    }
});