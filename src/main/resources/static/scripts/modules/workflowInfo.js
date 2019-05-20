layui.define(['chooseUser', 'lmfEvent', 'laytpl', 'form'], function (exports) {
    "use strict";
    var $ = layui.$;
    var chooseUser = layui.chooseUser;
    var clickEvent = layui.lmfEvent;
    var laytpl = layui.laytpl;
    var form = layui.form;
    var global = window;

    var _errorMap = {
        23003: '请添加审核人员'
    };
    var _config = {
        elem: '',  // 审核信息放置的位置
        isView: true,
        hasAudit: false,
        htmlType: 0, //0表示创建时的表单显示的页面，详见品牌的创建； 1表示弹框中的审核页面，详见人员待进场列表的入场申请
        callBackUrl: '/brand/layout/index.html',
        memo: '',
        additionalPageBottom: '',  // 附加的底部按钮
        auditProgressInfo: {
            auditor_list: [],
            workflow_step_uid: '',
            workflow_step_desc: '',
            workflow_step: '',
            current_progress_uid: ''
        }  // 审核进程信息
    };
    layui.addcss("../../../styles/workflowInfo.css");

    var HTML = '<blockquote class="layui-elem-quote">审核信息</blockquote>' +
        '       <div class="layui-form-item">' +
        '           <label class="layui-form-label layui-label-required">下步审批 </label>' +
        '           <div class="layui-input-block">' +
        '               <div class="layui-input-view">{{d.workflow_step_desc || "-"}}</div>' +
        '           </div>' +
        '       </div>' +
        '       <div class="layui-form-item">' +
        '           <label class="layui-form-label layui-label-required">审核人员 </label>' +
        '           <div class="layui-input-block auditor-list-box">' +
        '                  {{#  layui.each(d.auditor_list, function(index, item){ }} ' +
        '                     <input type="text" value="{{item.name}}" class="layui-input layui-input-md layui-input-disable" style="margin-bottom: 15px">    ' +
        '                  {{#  }); }} ' +
        '           </div>' +
        '       </div>';

    var POPUP_HTML = '<div style="width: 95%;border-top:1px solid #f0f0f0;margin-bottom: 10px;"></div>' +
        '       <div class="layui-form-item">' +
        '           <label class="layui-form-label layui-label-required">下步审批 </label>' +
        '           <div class="layui-input-block">' +
        '               <div class="layui-input-view">{{d.workflow_step_desc || "-"}}</div>' +
        '           </div>' +
        '       </div>' +
        '<div class="layui-form-item">' +
        '           <label class="layui-form-label layui-label-required">审核人员 </label>' +
        '           <div class="layui-input-block auditor-list-box">' +
        '                  {{#  layui.each(d.auditor_list, function(index, item){ }} ' +
        '                     <input type="text" value="{{item.name}}" class="layui-input layui-input-md layui-input-disable" style="margin-bottom: 15px">    ' +
        '                  {{#  }); }} ' +
        '           </div>' +
        '         </div>';

    var AUDITOR_ITEM_HTML = ' <div class="auditor-item">' +
        '                      <input type="hidden" name="user_uid" value="{{d.user_uid}}" > ' +
        '                      <input type="text" value="{{d.name}}" class="layui-input layui-input-md layui-input-inline auditor-item-name" readonly> ' +
        '                      <i class="layui-icon layui-icon-close-fill auditor-item-icon" lmf-event="del-auditor"></i>' +
        '                    </div>';

    var OPERATION_HTML = ' <div class="layui-form-item">' +
        '                      <label class="layui-form-label"></label>' +
        '                      <a class="add-auditor" href="javascript:void(0);" lmf-event="add-auditor">新增审批人员</a>' +
        '                  </div>';

    // var AUDIT_OPERATION_HTML = '<div class="layui-page-bottom">' +
    //     '                           <button class="layui-btn"  lmf-event="audit-pass">审核通过</button>' +
    //     '                           <button class="layui-btn"  lmf-event="audit-refuse">审核拒绝</button>' +
    //     '                       </div>';

    var AUDIT_OPERATION_HTML = ' <button class="layui-btn"  lmf-event="audit-pass">审核通过</button>' +
        '                       <button class="layui-btn"  lmf-event="audit-refuse">审核拒绝</button>';

    var Workflow = function (option) {
        var that = this;
        this.newAuditorList = function () {
            return this._auditorList;
        };
        this.userAuditHandle = function (param) {
            var index = layer.load(2);
            $.ajax({
                type: "post",
                url: "/workflow/audit/progress",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(param)
            })
                .then(function (res) {
                    layer.close(index);
                    if (res.code != 200) {
                        layer.Notify.error("审核出错");
                        return false;
                    }

                    if (res.data.success == 0) {
                        var failDetail1 = res.data.fail_details[0];
                        var error_code = failDetail1.error_code;
                        var error_msg = _errorMap[error_code] || failDetail1.error_msg || '审核出错';
                        layer.Notify.error(error_msg);
                        return false;
                    }
                    layer.Notify.success('审核成功');
                    global.location.href = that.config.callBackUrl;
                })
                .fail(function () {
                    layer.close(index);
                    layer.Notify.error('审核出错');
                })
        };
        return this.init(option);
    };
    Workflow.prototype = {
        config: {},
        _excludeUIDs: [],
        _auditorList: [],
        init: function (option) {
            this.config = $.extend(true, {}, _config, option);

            if (!this.config.auditProgressInfo) {
                return;
            }

            this._excludeUIDs = (this.config.auditProgressInfo.auditor_list || []).map(function (ele) {
                return ele.userUid;
            });

            this.render();
            this.bindEvents();
            form.render();

            return this;
        },
        render: function () {
            var hasAuditInfoHtml = !!this.config.auditProgressInfo.workflow_step_uid;
            var hasAddAuditor = !this.config.isView;

            var _html = "";
            if (this.config.htmlType == 0) {
                if (hasAuditInfoHtml) {
                    _html += HTML;
                    if (hasAddAuditor) {
                        _html += OPERATION_HTML;
                    }
                }
                _html += this.renderPageBottom();
            }

            if (this.config.htmlType == 1) {
                if (hasAuditInfoHtml) {
                    _html += POPUP_HTML;
                    if (hasAddAuditor) {
                        _html += OPERATION_HTML;
                    }
                }

            }

            var $elem = $(this.config.elem);
            laytpl(_html).render(this.config.auditProgressInfo, function (elemHtml) {
                $elem.html(elemHtml);
            });
        },
        renderPageBottom() {
            var hasAuditOperation = this.config.hasAudit && !!this.config.auditProgressInfo.current_progress_uid;
            var _html = "";
            if (hasAuditOperation) {
                _html = AUDIT_OPERATION_HTML;
            }
            _html += this.config.additionalPageBottom;
            if (_html.length < 1) {
                return "";
            }
            return '<div class="layui-page-bottom">' + _html + '</div>';
        },
        bindEvents: function () {
            var that = this;
            var auditorUidList = that._auditorList.map(function (auditor) {
                return auditor.user_uid
            }) || [];
            clickEvent('add-auditor', function (e) {
                var _this = this;
                var option = {
                    isMultiple: false,
                    excludeUIDs: that._excludeUIDs.concat(auditorUidList),
                    title: '新增审批人员',
                    params_in: {
                        status: 'TYP_ON'
                    },
                    success: function (obj) {
                        var userlist = obj.data || [];
                        if (userlist.length != 1) {
                            layer.Notify.error("只能选择一个用户");
                        }
                        var user = userlist[0];
                        that._auditorList.push(user);
                        auditorUidList.push(user.user_uid);

                        laytpl(AUDITOR_ITEM_HTML).render(user, function (html) {
                            $(_this).parents(".layui-card-body").find('.auditor-list-box').append(html);
                        });

                    }
                };
                chooseUser(option);
            });

            clickEvent('del-auditor', function (e) {
                var parents = $(this).parents('.auditor-item');
                var userUid = parents.find('[name="user_uid"]').val();
                var index = $.inArray(userUid, auditorUidList);
                if (index > -1) {
                    auditorUidList.splice(index, 1);
                }
                that._auditorList = that._auditorList.filter(function (value) {
                    return value.user_uid != userUid;
                });
                parents.remove()
            });

            clickEvent('audit-pass', function (e) {
                var current_progress_uid = that.config.auditProgressInfo.current_progress_uid || '';
                var memo = that.config.memo || '';
                var param = {
                    "operation": "APPROVED",
                    "progress_list": [{
                        "progress_uid": current_progress_uid,
                        "memo": memo
                    }],
                    "next_auditor_list": auditorUidList
                };
                that.userAuditHandle(param);
            });
            clickEvent('audit-refuse', function (e) {
                var current_progress_uid = that.config.auditProgressInfo.current_progress_uid || '';
                var memo = that.config.memo || '';
                var param = {
                    "operation": "REJECTED",
                    "progress_list": [{
                        "progress_uid": current_progress_uid,
                        "memo": memo
                    }],
                    "next_auditor_list": auditorUidList
                };
                that.userAuditHandle(param);
            });
        }
    };
    //操作当前实例
    exports('workflowInfo', function (option) {
        return new Workflow(option);
    });

});