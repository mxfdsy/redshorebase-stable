/**
 * Created by andy on 2018/7/6.
 *
 *
 * 参数说明
 * ,accept:'file'  //允许上传的文件类型：images/file/video/audio
 * ,exts: '' //允许上传的文件后缀名
 ,drag: true //是否允许拖拽上传
 ,size: 1024 * 5 //文件限制大小，默认5M
 */
layui.define(['upload', 'layer', 'laytpl'], function (exports) {
    var $ = layui.jquery,
        upload = layui.upload;

    var default_config = {
        accept: 'file', //普通文件
        auto: false,
        size: 1024 * 5, //限制文件大小，单位 KB
        skin: 'attachment'         //皮肤 attachment附件  video 单视频
    };
    var lmfUploadFile = {
        render: function (config) {
            "use strict";
            if (!$.isPlainObject(config)) {

                throw  "配置错误";
            }
            delete config.auto;


            config = $.extend({}, default_config, config);
            var $elem = $(config.elem);
            var preview_html = {
                'attachment': '<button type="button" class="layui-btn layui-inline lmf-file-upload-btn"><i class="layui-icon">&#xe67c;</i>选择文件</button><div class="layui-upload_info layui-hide"><div class="layui-inline layui-upload_fliename"></div><div class="layui-inline layui-upload_tool"><a href="#" class="del_file">删除</a></div></div>',
                'video': '<div class="layui-upload-box layui-inline lmf-file-upload-btn"></div>' +
                    '<div class="lmf-upload-list layui-upload_info layui-hide">' +
                    '   <div class="layui-hide layui-upload_fliename"></div>' +
                    '   <div class="layui-inline layui-upload_tool">' +
                    '       <img src="/images/video-preview.png"class="layui-upload-img">' +
                    '       <a href="#" class="del-img-btn del_file">删除</a>' +
                    '   </div>' +
                    '</div>'
            };

            $elem.hide();
            $elem.after(preview_html[config.skin] || preview_html.attachment);


            $elem.nextAll('.layui-upload_info').children('.layui-upload_tool').children('a.del_file').on('click', function () {
                $elem.nextAll('.layui-upload_info').addClass('layui-hide');
                $elem.nextAll('.lmf-file-upload-btn').removeClass('layui-hide');
                $elem.val('');
                return false;
            });


            var preview = function (index, file) {
                $elem.nextAll('.lmf-file-upload-btn').addClass('layui-hide');
                $elem.nextAll('.layui-upload_info').removeClass('layui-hide').children('.layui-upload_fliename').text(file.name).attr('title', file.name);
            };
            $elem.nextAll('.lmf-file-upload-btn').on('click', function () {
                $elem.trigger('click');
            });

            var _choose = config.choose || $.noop;
            config.choose = function (obj) {
                obj.preview(preview);
                delete obj.upload;
                _choose.call(this, obj);
            };
            upload.render(config);

        }
    };


    exports('lmfUploadFile', lmfUploadFile);
});