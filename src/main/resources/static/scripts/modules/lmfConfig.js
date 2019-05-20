layui.define([], function (exports) {
    var config = {};
    var $ = layui.$;
    var sysName = $('[name="SYS_NAME"]').attr('content');
    var groupName = $('[name="GROUP_NAME"]').attr('content');
    config.sysName = sysName;
    config.groupName = groupName;
    exports('lmfConfig', config);
});