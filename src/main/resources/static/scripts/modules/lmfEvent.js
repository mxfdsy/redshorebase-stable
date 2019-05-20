/**
 * Created by SK on 2018/6/7.
 */
layui.define('jquery', function (exports) {
    var $ = layui.$;
    // var SELECTOR = 'lmf-event';
    // var lmfEvents = 'click onblur';
    // var callBackFn = {};
    //
    //
    // var lmfEvent = function (event, callback) {
    //     if (!$.isFunction(callback)) {
    //         console.error('[lmfEvent error] 方法无效');
    //         return false;
    //     }
    //     var _index = event.indexOf('(');
    //     if (!event || _index == -1) {
    //         console.error('[lmfEvent error] 传入event格式出错');
    //         return false;
    //     }
    //     var filter = event.substring(_index + 1, event.length - 1);
    //     callBackFn[filter] = callback;
    //
    //     var _event = event.substring(0, _index);
    //     $(document).on(_event, '[' + SELECTOR + ']', function (event) {
    //         var _lmfEvent = $(this).attr(SELECTOR);
    //         if (callBackFn[_lmfEvent] && $.isFunction(callBackFn[_lmfEvent])) {
    //             callBackFn[_lmfEvent].call(this, event);
    //         }
    //     });
    // };

    var events = {};
    $(document).on('click', '[lmf-event]', function (event) {
        var _lmfEvent = $(this).attr('lmf-event');
        if (events[_lmfEvent] && $.isFunction(events[_lmfEvent])) {
            events[_lmfEvent].call(this, event);
        }
    });
    var lmfEvent = function (event, callback) {
        if (!$.isFunction(callback)) {
            console.error('[lmfEvent error] 方法无效');
            return false;
        }
        events[event] = callback;
    };

    exports('lmfEvent', lmfEvent);
});