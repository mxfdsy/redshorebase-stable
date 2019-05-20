/**
 * Created by sjw on 10/13/2017.
 */

/**
 * 获取当前选择的门店地址 $('el').data('address-result');
 */

(function (factory) {
    "use strict";
    layui.define(['jquery', 'pinyin', 'addressData'], function (exports) {

        factory(layui.$, window, layui.addressData);
        exports('chooseArea', '');
    })
})(function ($, global, areaData) {
    "use strict";
    var PluginName = "ChooseArea";
    var fullAreaHtml =
        '<div class="city-title"><input type="text" placeholder="请选择省/市/区" value="" readonly="" class="layui-input"></div>' +
        '<div class="ks-overlay ks-overlay-hidden">' +
        '<div class="ks-overlay-content"> <div class="city-select-warp"><div class="city-select-tab"><a class="current" attr-cont="city-province">省份</a><a class="" attr-cont="city-city">城市</a> <a class="" attr-cont="city-district">县区</a> </div> <div class="city-select-content"> <div class="city-select city-province"><dl class=fn-clear><dt>A-G<dd class="a-g"></dl><dl class=fn-clear><dt>H-K<dd class="h-k"></dl><dl class=fn-clear><dt>L-S<dd class="l-s"></dl><dl class=fn-clear><dt>T-Z<dd class="t-z"></dl></div><div class="city-select hide city-city"></div><div class="city-select hide city-district"></div></div></div></div></div>';

    var partHtml =
        '<div  class="city-title"><input type="text" placeholder="请选择省/市" value="" readonly="" class="layui-input"></div>' +
        '<div class="ks-overlay ks-overlay-hidden">' +
        '<div class="ks-overlay-content"> <div class="city-select-warp"><div class="city-select-tab"><a class="current" attr-cont="city-province">省份</a><a class="" attr-cont="city-city">城市</a></div> <div class="city-select-content"> <div class="city-select city-province"><dl class=fn-clear><dt>A-G<dd class="a-g"></dl><dl class=fn-clear><dt>H-K<dd class="h-k"></dl><dl class=fn-clear><dt>L-S<dd class="l-s"></dl><dl class=fn-clear><dt>T-Z<dd class="t-z"></dl></div><div class="city-select hide city-city"></div><div class="city-select hide city-district"></div></div></div></div></div>';


    // 拼音排序
    function pySegSort(arr, empty) {
        if (!String.prototype.localeCompare) return null;

        var letters = "*abcdefghjklmnopqrstwxyz".split("");
        var zh = "啊把差大额发噶哈级卡啦吗那哦爬器然啥他哇西呀咋".split("");

        var segs = [];
        var curr;
        $.each(letters, function (i, letter) {
            curr = {
                letter: letter,
                data: []
            };
            $.each(arr, function () {
                if (
                    (!zh[i - 1] || zh[i - 1].localeCompare(this.name) <= 0) &&
                    this.name.localeCompare(zh[i] || "") == -1
                ) {
                    curr.data.push(this);
                }
            });
            if (empty || curr.data.length) {
                segs.push(curr);
                curr.data.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                });
            }
        });
        return segs;
    }

    // 渲染省份
    var renderProvince = function (filted) {
        var targetArea = this.element;


        filted.forEach(function (value) {
            var html = value.zone
                .map(function (province) {
                    return (
                        '<a title="' + province.name + '" attr-id="' + province.id + '" href="javascript:;">' + province.name + "</a>"
                    );
                })
                .join("");
            targetArea.find(".city-select-content .city-province dl")
                .find("." + value.className)
                .html(html);
            if (value.zone.length == 0) {
                targetArea.find(".city-select-content .city-province dl")
                    .find("." + value.className)
                    .siblings("dt")
                    .remove();
                targetArea.find(".city-select-content .city-province dl")
                    .find("." + value.className)
                    .parents("dl")
                    .addClass("no-padding");
            }
        });
    };

    // 只显示已添加城市
    function onlyShowData(data, _onlyShowArea) {
        return data.filter(function (f) {
            return _onlyShowArea.indexOf(f.id) > -1;
        });
    }

    var config = {
        fullArea: true,  //是否显示全 省市区 false 显示 省市
        onlyShowArea: [],    //自定义省市区显示 省id
        chooseResult: [],     //默认值 [{id:1,name:'省'},{id:1,name:'市'},{id:1,name:'区'}] 按省市区顺序
        choose: function (chooseResult) {   //点击回调事件 chooseResult 选中的数据 []

        }

    };

    function ChooseCity(element, options) {
        var that = this;
        that.element = $(element);
        that.config = $.extend(true, {}, config, options);
        that.fullArea = that.config.fullArea;

        that.element.append(!that.fullArea ? partHtml : fullAreaHtml);

        that.onlyShowArea = that.config.onlyShowArea.slice(0);
        that.result = [];
        that.defaultResult = that.config.chooseResult.slice(0);

        that._init = function () {
            that.init();
            setTimeout(function () {
                that.tab();
                that.clickShow();
                that.clickHide();
                that.areaClick();
                that._setDefaultValue();
            }, 2000)
        };


        if (options.areaData) {
            that.areaData = global.areaData = options.areaData;
            that._init();
            return
        }

        if (global.areaData) {
            that.areaData = global.areaData;
            that._init();
            return
        }

        that.areaData = global.areaData = areaData;
        that._init();

    }


    // 获取一级菜单数据
    ChooseCity.prototype.init = function () {
        var html = "",
            regPosistion = [
                {
                    reg: /^[a-g]$/i,
                    className: "a-g",
                    zone: []
                },
                {
                    reg: /^[h-k]$/i,
                    className: "h-k",
                    zone: []
                },
                {
                    reg: /^[l-s]$/i,
                    className: "l-s",
                    zone: []
                },
                {
                    reg: /^[t-z]$/i,
                    className: "t-z",
                    zone: []
                }
            ];
        this.filted = this.areaData.filter(function isPick(value) {
            return value.pid == 0;
        });
        if (this.onlyShowArea.length != 0) {
            this.filted = onlyShowData(this.filted, this.onlyShowArea);
        }
        if (!this.compositorData) {
            this.compositorData = pySegSort(this.filted);
        }

        this.compositorData.forEach(function (value) {
            for (var i = 0; i < regPosistion.length; i++) {
                if (regPosistion[i].reg.test(value.letter)) {
                    regPosistion[i].zone = regPosistion[i].zone.concat(value.data);
                }
            }
        });
        renderProvince.call(this, regPosistion);
    };

    // 点击显示地址栏
    ChooseCity.prototype.clickShow = function () {
        var targetArea = this.element;
        targetArea.on("click", function () {
            targetArea.find(".ks-overlay").removeClass("ks-overlay-hidden");
        });
    };

    // 点击隐藏地址栏
    ChooseCity.prototype.clickHide = function () {
        var targetArea = this.element;
        $(document).on("mouseup", function (e) {
            if (targetArea.has(e.target).length == 0 && !targetArea.is(e.target)) {
                targetArea.find(".ks-overlay").addClass("ks-overlay-hidden");
            }
        });
    };

    // 选择地址
    ChooseCity.prototype.areaClick = function () {
        this.element.on("click", ".city-select dd a", function (e) {
                e.stopPropagation();
                var _this = this,
                    target = e.target,
                    cont = this.element.find(".city-select-tab")
                        .find(".current")
                        .attr("attr-cont"),
                    id = $(target).attr("attr-id"),
                    tit = $(target).text();
                this.element.find("." + cont)
                    .find("dd a")
                    .removeClass("current");
                $(target).addClass("current");
                switch (cont) {
                    case "city-province":
                        var data = _this.areaData.filter(function isPick(value) {
                            return value.pid == id;
                        });
                        _this.renderArea("city-city", data);
                        _this.title(0, tit, id);
                        break;
                    case "city-city":
                        var data = _this.areaData.filter(function isPick(value) {
                            return value.pid == id;
                        });
                        if (this.fullArea) {
                            _this.renderArea("city-district", data);
                        } else {
                            this.element.find(".ks-overlay").addClass("ks-overlay-hidden");
                        }
                        _this.title(1, tit, id);
                        break;
                    case "city-district":
                        _this.title(2, tit, id);
                        this.element.find(".ks-overlay").addClass("ks-overlay-hidden");
                        break;
                }
            }.bind(this)
        );
    };

    // 渲染input当前地址
    ChooseCity.prototype.renderArea = function (position, data) {
        this.element.find(".city-select-content .city-select").addClass("hide");
        this.element.find(".city-select-content")
            .find("." + position)
            .removeClass("hide")
            .html("");
        this.element.find(".city-select-tab a")
            .removeClass("current")
            .each(function (index, el) {
                if ($(el).attr("attr-cont") == position) {
                    $(el).addClass("current");
                }
            });
        var html = "";
        if (this.onlyShowArea.length != 0) {
            data = onlyShowData(data, this.onlyShowArea);
        }
        var node = data
            .map(function (val) {
                return (
                    '<a title="' +
                    val.name +
                    '" attr-id="' +
                    val.id +
                    '" href="javascript:;">' +
                    val.name +
                    "</a>"
                );
            })
            .join("");
        html = '<dl class="fn-clear city-select-city"><dd>' + node + "</dd></dl>";
        this.element.find(".city-select-content")
            .find("." + position)
            .append(html);
    };

    // 当选择省份改变时改变内容
    ChooseCity.prototype.destory = function () {
        this.element.find(".city-district .city-select-city dd").html("");
    };

    // tab切换
    ChooseCity.prototype.tab = function () {
        var titles = this.element.find(".city-select-tab a");
        var contents = this.element.find(".city-select-warp").find(
            ".city-select-content .city-select"
        );
        // titles.each(function (index, el) {
        //     $(el).on("click", function () {
        titles.on("click", function (e) {
            // console.log(e);
            var index = $(this).index();
            titles
                .removeClass("current")
                .eq(index)
                .addClass("current");
            $(contents)
                .addClass("hide")
                .eq(index)
                .removeClass("hide");
        });
        // });
    };

    // 添加title
    ChooseCity.prototype.title = function (index, tit, id) {
        if (this.result[index] == undefined) {
            this.result.push({
                name: tit,
                id: id
            });
        } else {
            if (this.result[index] != tit) {
                this.result[index].name = tit;
                this.result[index].id = id;
                this.result = this.result.slice(0, index + 1);
                if (index == 0) {
                    this.destory();
                }
            }
        }
        var html = this.result
            .map(function (val) {
                return val.name;
            })
            .join('/');
        this.element.data("address-result", this.result);
        this.config.choose.call(this.element, this.result);
        this.element.find(".city-title").addClass("has-city-title")
            .find('input').val(html);
    };

    ChooseCity.prototype.reset = function () {
        this.result = [];
        this.element.data("address-result", this.result);
        this.element.html(fullAreaHtml);
        this.init();
        this.tab();
    };

    ChooseCity.prototype._setDefaultValue = function () {

        var defaultResult = this.defaultResult;
        var targetArea = this.element;
        if (defaultResult.length > 0) {
            targetArea.find('[attr-id="' + defaultResult[0].id + '"]').click();
        }
        if (defaultResult.length > 1) {
            setTimeout(function () {
                targetArea.find('[attr-id="' + defaultResult[1].id + '"]').click();
            }, 200)
        }
        if (defaultResult.length > 2) {
            setTimeout(function () {
                targetArea.find('[attr-id="' + defaultResult[2].id + '"]').click();
            }, 200)
        }
    };

    // 注册插件
    $.fn[PluginName] = function (options) {
        return this.each(function () {
            var cityData = $(this).data("plugin_" + PluginName);
            if (!cityData) {
                $.data(
                    this,
                    "plugin_" + PluginName,
                    (cityData = new ChooseCity(this, options))
                );
            }
            //todo 目前只有reset函数
            if (typeof options === "string" && options === "reset") {
                cityData[options].apply(cityData);
            }
        });
    };
});