layui.define(['jstree', 'layer', 'lmfConfig'], function (exports) {
    "use strict";
    var $ = layui.$;
    var layer = layui.layer;
    var CONFIG = layui.lmfConfig;

    var _config = {
        organization_code: 'root',
        selected_organization_code: [],
        is_all: "false",
        success: function () {

        }
    };

    var ChooseDepartment = function (options) {
        this.config = $.extend({}, _config, options);
        this.loadDepartment(this.config);
    };

    ChooseDepartment.prototype = {
        loadDepartment: function (parameter) {
            var that = this;
            var index = layer.load(2);
            $.ajax({
                type: "post",
                url: '/organizationManage/getOrganizationNodeByCode',
                dataType: "json",
                data: JSON.stringify(parameter),
                contentType: "application/json"
            })
                .then(function (res) {
                    layer.close(index);
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
                        }
                    };
                    that.setBox(treeConfig);
                })
                .fail(function (treeConfig) {
                    layer.close(index);
                    layer.Notify.error('请求归属组织列表出错');
                });
        },
        setBox: function (treeConfig) {
            var that = this;
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
                    if ($.isFunction(that.config.success)) {
                        that.config.success(chooseNode);
                    }

                }
            });
        }
    };


    //操作当前实例
    exports('chooseDepartment', function (options) {
        new ChooseDepartment(options);
    });
});


