layui.use(['form', 'lmfTable', 'workflowInfo'], function () {
    var lmfTable = layui.lmfTable;
    var form = layui.form;
    var $ = layui.$;
    var workflowInfo = layui.workflowInfo;
    var global = window;
    var MAX_MEMO = 100000;


    var operationType = [];
    operationType[0] = 'TYP_BRAND_ADD';
    operationType[1] = 'TYP_BRAND_EDIT';
    operationType[2] = 'TYP_BRAND_ENABLED';
    operationType[3] = 'TYPE_BRAND_DISABLED';
    operationType[6] = 'TYP_BRAND_REVIEW_APPROVED_COMPLETION';
    operationType[7] = 'TYP_BRAND_REVIEW_REJECTED_COMPLETION';
    operationType[8] = 'TYP_BRAND_REVIEW_PENDING';

    var auditOperationType = [];
    auditOperationType[0] = 'TYP_BRAND_REVIEW_APPROVED';
    auditOperationType[1] = 'TYP_BRAND_REVIEW_REJECTED';
    auditOperationType[2] = 'TYP_BRAND_REVIEW_APPROVED_COMPLETION';
    auditOperationType[3] = 'TYP_BRAND_REVIEW_REJECTED_COMPLETION';
    auditOperationType[4] = 'TYP_BRAND_REVIEW_PENDING';

    var brandVendorTableConfig = {
        elem: '#brand-vendor-table',
        url: '/brand/listBrandVendor',
        tableFilter: 'brand-vendor-table',
        where: {
            sort_order: 'asc',
            sort_key: 'erp_vendor_code',
            brand_uid: global.brandUid
        },
        page: true,
        text: {
            none: '暂无记录'
        },
        cols: [[
            {
                field: 'contract_code',
                title: '合同编号'
            },
            {
                field: 'mall_name',
                title: '项目名称'
            },
            {
                field: 'erp_vendor_code',
                title: '商户编号'
            },
            {
                field: 'erp_vendor_name',
                title: '商户姓名'
            },
            {
                field: 'vendor_phone',
                title: '商户手机号'
            },
            {
                field: 'primary_brand_uid',
                title: '经营类别',
                templet: function (d) {
                    return d.primary_brand_uid == global.brandUid ? '主营' : '兼营';
                }
            }
        ]]
    };

    var tableConfig = {
        elem: '#trace-table',
        url: '/brand/trace/list',
        tableFilter: 'trace-table',
        searchFilter: 'trace-search-box',
        where: {
            brand_operation_type: operationType,
            sort_order: 'desc',
            sort_key: 'id',
            brand_uid: global.brandUid
        },
        page: true,
        text: {
            none: '当前没有数据'
        },
        cols: [[
            {
                field: 'operation_name',
                title: '操作人'
            },
            // {
            //     field: 'operation_phone',
            //     title: '操作人联系方式'
            // },
            {
                field: 'operator_organization_name',
                title: '归属组织'
            },
            {
                field: 'operation_type',
                title: '操作行为',
                templet: function (brand_info) {
                    var operationTypeMap = {
                        'TYP_BRAND_ADD': '新增',
                        'TYP_BRAND_EDIT': '编辑',
                        'TYP_BRAND_REVIEW_APPROVED': '审核通过',
                        'TYP_BRAND_REVIEW_REJECTED': '审核拒绝',
                        'TYP_BRAND_REVIEW_APPROVED_COMPLETION': '品牌审核通过',
                        'TYP_BRAND_REVIEW_REJECTED_COMPLETION': '品牌审核拒绝',
                        'TYP_BRAND_REVIEW_PENDING': '提交审核',
                        'TYP_BRAND_ENABLED': '启用',
                        'TYPE_BRAND_DISABLED': '冻结'
                    };

                    function renderBrandType(brand_info, operationTypeMap) {
                        var memo = brand_info.trace_details.map(function (node) {
                            return node.item + ": " + node.item_memo;
                        }).join('<br>');
                        var complete_memo = memo;
                        if (memo && memo.length > MAX_MEMO) {
                            memo = memo.substring(0, MAX_MEMO) + " ......";
                        }
                        return '<span style="color: #3388FF;" lay-complete-tips="' + complete_memo + '" lay-tips="' + memo + '">' + (operationTypeMap[brand_info.operation_type] || '--') + '</span>';
                    }

                    if (brand_info.operation_type == 'TYP_BRAND_EDIT'
                        || brand_info.operation_type == 'TYP_BRAND_REVIEW_APPROVED'
                        || brand_info.operation_type == 'TYP_BRAND_REVIEW_REJECTED') {
                        return renderBrandType(brand_info, operationTypeMap);
                    }
                    return (operationTypeMap[brand_info.operation_type] || '--')
                }
            },
            {
                field: 'brand_status',
                title: '品牌状态',
                width: 130,
                templet: function (brand_info) {
                    if (brand_info.brand_status == 'TYP_ENABLED') {
                        return '库内';
                    }
                    if (brand_info.brand_review_status == 'TYP_PENDING') {
                        return '审核中';
                    }
                    if (brand_info.brand_review_status == 'TYP_DECLINED') {
                        return '入库拒绝';
                    }
                    return '库外';
                }
            },
            {
                field: 'created_at',
                title: '操作时间'
            }
        ]]
    };


    var tableAuditConfig = {
        elem: '#traceAudit-table',
        url: '/brand/trace/list',
        tableFilter: 'traceAudit-table',
        searchFilter: 'traceAudit-search-box',
        where: {
            brand_operation_type: auditOperationType,
            sort_order: 'desc',
            sort_key: 'id',
            brand_uid: global.brandUid
        },
        page: true,
        text: {
            none: '当前没有数据'
        },
        cols: [[
            {
                field: 'operation_name',
                title: '操作人'
            },
            // {
            //     field: 'operation_phone',
            //     title: '操作人联系方式'
            // },
            {
                field: 'operator_organization_name',
                title: '归属组织'
            },
            {
                field: 'operation_type',
                title: '操作行为',
                templet: function (brand_info) {
                    var operationTypeMap = {
                        'TYP_BRAND_ADD': '新增',
                        'TYP_BRAND_EDIT': '编辑',
                        'TYP_BRAND_REVIEW_APPROVED': '审核通过',
                        'TYP_BRAND_REVIEW_REJECTED': '审核拒绝',
                        'TYP_BRAND_REVIEW_APPROVED_COMPLETION': '品牌审核通过',
                        'TYP_BRAND_REVIEW_REJECTED_COMPLETION': '品牌审核拒绝',
                        'TYP_BRAND_REVIEW_PENDING': '提交审核',
                        'TYP_BRAND_ENABLED': '启用',
                        'TYPE_BRAND_DISABLED': '冻结'
                    };

                    function renderBrandType(brand_info, operationTypeMap) {
                        var memo = brand_info.trace_details.map(function (node) {
                            return node.item + ": " + node.item_memo;
                        }).join('<br>');
                        var complete_memo = memo;
                        if (memo && memo.length > MAX_MEMO) {
                            memo = memo.substring(0, MAX_MEMO) + " ......";
                        }
                        return '<span style="color: #3388FF;" lay-complete-tips="' + complete_memo + '" lay-tips="' + memo + '">' + (operationTypeMap[brand_info.operation_type] || '--') + '</span>';
                    }

                    if (brand_info.operation_type == 'TYP_BRAND_EDIT'
                        || brand_info.operation_type == 'TYP_BRAND_REVIEW_APPROVED'
                        || brand_info.operation_type == 'TYP_BRAND_REVIEW_REJECTED') {
                        return renderBrandType(brand_info, operationTypeMap);
                    }
                    return (operationTypeMap[brand_info.operation_type] || '--')
                }
            },
            {
                field: 'brand_status',
                title: '品牌状态',
                width: 130,
                templet: function (brand_info) {
                    if (brand_info.brand_status == 'TYP_ENABLED') {
                        return '库内';
                    }
                    if (brand_info.brand_review_status == 'TYP_PENDING') {
                        return '审核中';
                    }
                    if (brand_info.brand_review_status == 'TYP_DECLINED') {
                        return '入库拒绝';
                    }
                    return '库外';
                }
            },
            {
                field: 'created_at',
                title: '操作时间'
            }
        ]]
    };


    lmfTable(brandVendorTableConfig, {});
    var operateEvents = {};
    var traceTable = lmfTable(tableConfig, operateEvents);
    var traceAuditTable = lmfTable(tableAuditConfig, operateEvents);
    form.on('select(brand-traceAudit-select)', function (data) {
        if (data.value === "") {
            data.value = auditOperationType;
        }
        traceAuditTable.reload({
            where: {
                brand_operation_type: data.value,
                sort_order: 'desc',
                sort_key: 'id',
                brand_uid: global.brandUid
            }
        });
    });

    form.on('select(brand-trace-select)', function (data) {
        if (data.value === "") {
            data.value = operationType;
        }
        traceTable.reload({
            where: {
                brand_operation_type: data.value,
                sort_order: 'desc',
                sort_key: 'id',
                brand_uid: global.brandUid
            }
        });
    });


    workflowInfo({
        elem: '#brand-audit-info-wrap',
        isView: false,
        hasAudit: true,
        memo: brandInfo.brandName,
        auditProgressInfo: auditList
    });
});