(function (factory) {
    "use strict";
    layui.define(['element', 'table', 'form', 'layer', 'lmfTable'], function (exports) {
        factory(layui.$, window, layui.lmfTable);
        exports('chooseLink', '');
    })
})(function ($, global, lmfTable) {
    var TPL = (function ($tpls) {
        var tpls = {};
        $tpls.each(function () {
            var tpl_name = $(this).data('tplChoicelink');
            var tpl = $(this).html();
            tpls[tpl_name] = tpl;
        });
        return tpls;
    })($('[data-tpl-choiceLink]'));

    var showBox = {
        linkType: {},
        _box: null,
        setBox: function ($obj) {
            this._box = $obj;
            return this;
        }
    };

    var initSelectItem = function () {
        layui.form.render();
        return true;
    };

    var changePromotionType = function (type) {
        if (type === 'TYP_SELECT_PRODUCT') {
            // TODO
            return true;
        }
    }

    showBox.initSearch = function () {
        return new P(function (resolve) {
            var _this = showBox;
            resolve(initSelectItem(true));
        })
    };

    /**
     * 表格配置
     * @type {{searchbox_product: searchbox_product, searchbox_cashBack: searchbox_cashBack, searchbox_activity: searchbox_activity, searchbox_lottery: searchbox_lottery, searchbox_gift: searchbox_gift, searchbox_topic: searchbox_topic, searchbox_TYP_BAYMAX_SHOP: searchbox_TYP_BAYMAX_SHOP, searchbox_TYP_BAYMAX_REBATE: searchbox_TYP_BAYMAX_REBATE, searchbox_TYP_BAYMAX_PRODUCT: searchbox_TYP_BAYMAX_PRODUCT, searchbox_TYP_BAYMAX_LOTTERY: searchbox_TYP_BAYMAX_LOTTERY, searchbox_TYP_BAYMAX_GIFT: searchbox_TYP_BAYMAX_GIFT}}
     */
        // TODO 抄来的，还没动
    var changeExcludeUIDs = function (_showBox) {

            _showBox = _showBox || {};
            if (!!_showBox.__isMultiple) {  // 多选
                return (_showBox._selected || []).map(function (ele) {
                    var _ele = linkTypeValObj(_showBox.__type.replace('searchbox_', ''), ele);
                    return _ele.promotionUid;
                });
            } else {
                return (_showBox._selected || []).map(function (ele) {
                    return ele.promotion_uid || ele.targetUid; //兼容小程序和品牌配置
                });
            }


        };

    var getTableConfigByType = {

        // 商品链接
        TYP_SELECT_PRODUCT: function (tableConfig, __isMultiple) {

            tableConfig.elem = '#choose-product-table';
            tableConfig.url = '/promotionProduct/getPromotionProductPager';
            tableConfig.tableFilter = 'choose-product-table';
            tableConfig.searchFilter = 'choose-product-search-box';
            tableConfig.where = {
                sort_order: 'desc',
                sort_key: 'created_at'
            };
            tableConfig.page = true;
            tableConfig.text = {
                none: '当前没有数据'
            };
            tableConfig.limit = 5;
            tableConfig.limits = [5];
            tableConfig.cols = [[
                {
                    title: '商品',
                    align: 'left',
                    valign: 'middle',
                    width: '280',
                    templet: function (row) {
                        var imgUrl = row.productImage;
                        var price = row.productSku[0].promotionPrice;//formatMoney_2
                        var salePrice = row.productSku[0].skuSalePrice;
                        var productName = row.productName;
                        return '<div class="parent-thumbnail clearfix">' +
                            '<div class="thumbnail">' +
                            '<img src="' + imgUrl + '?imageView2/3/w/60/h/60"/>' +
                            '</div>' +
                            '<div class="text-description">' +
                            '<p class="product-name table-two-line">' + productName + '</p>' +
                            '<p class="color-red money">¥' + price +
                            '<del style="color:#999;margin-left:5px;">¥' + salePrice + '</del>' +
                            '</p>' +
                            '</div></div>';
                    }
                },
                {
                    title: '剩余库存',
                    valign: 'middle',
                    width: '120',
                    templet: function (row) {
                        return row.productSku[0].stockTotal - row.productSku[0].salesNumber;
                    }
                },
                {
                    field: 'createdAt',
                    title: '报名时间',
                    valign: 'middle',
                    width: '180'
                },
                {
                    align: 'center',
                    title: '操作',
                    fixed: 'right',
                    toolbar: '#productOperateTpl'
                }
            ]];

        }

    };

    showBox.initTable = function (isInitSuccess) {
        var tableConfig = {};
        var __isMultiple = showBox.__isMultiple;
        var __excludeUIDs = showBox.__excludeUIDs;
        var __params_in = showBox.__params_in;

        var operateEvents = {
            select_product: function (obj) {
                // TODO 暂时抄来的，还没写
                var data = obj.data; //获得当前行数据
                var brand_uid = data.brand_uid;

                var content = data.status == "TYP_ENABLED" ? '冻结' : '启用';
                layer.confirm('该品牌将被' + content + '，请确认', {title: '提示'}, function () {
                    $.ajax({
                        type: "post",
                        url: "/brand/updateBrandStatus",
                        dataType: "json",
                        contentType: "application/json",
                        async: false,
                        data: JSON.stringify({
                            brandUid: brand_uid
                        })
                    })
                        .then(function (res) {
                            if (res.code != 200) {
                                layer.Notify.error(content + '品牌出错');
                                return false;
                            }
                            layer.Notify.success(content + '品牌成功');
                            table_approved.reload();
                            return true;
                        })
                        .fail(function (error) {
                            layer.Notify.error(content + '品牌出错');
                        });
                }, function () {

                });
            }
        };

        getTableConfigByType[showBox.__type](tableConfig, __isMultiple, isInitSuccess, __excludeUIDs, __params_in);

        lmfTable(tableConfig, operateEvents);
    };

    // TODO 抄来的，还没动
    showBox.handelData = function (type, data) {
        if (type == 'TYP_SELECT_PRODUCT') {
            return [data].map(function (product) {
                return {
                    product_image: product.productImage,
                    product_name: product.productName,
                    original_min_price: product.originalMaxPrice,
                    explode_price: product.productSku[0].explodePrice,
                    product_sku: [{
                        promotion_price: product.productSku[0].promotionPrice,
                        preorder_price: product.productSku[0].preorderPrice,
                        explode_price: product.productSku[0].explodePrice
                    }],
                    is_explode: product.isExplode,
                    payment_type: product.paymentType,
                    promotion_product_uid: product.promotionProductUid
                }
            })[0];

        }

        return data;
    };

    // TODO 抄来的，还没动
    showBox.initEvents = function () {

        $('.dialog-choiceLink')
            .on('submit', 'form.label-search', function () {
                $('.dialog-choiceLink .search-table').bootstrapTable("refreshOptions", {pageNumber: 1});
                return false;
            })
            .on('change', '[name="sub_promotion_uid"],[name="rebate_promotion_uid"]', function () {
                $('.dialog-choiceLink .search-table').bootstrapTable("refreshOptions", {pageNumber: 1});
                return false;
            })
            .on('click', 'a.select', function () {
                var data = $(this).data('data');
                try {
                    showBox.success(data);
                    showBox.destroyEvents();
                    layer.closeAll('page')
                } catch (e) {
                    console.error('showBox 回调失败', e)
                }
                return false;
            })
            .on('click', '.page-footer-ctrl-button .button_searchbox_choose', function () {
                if (showBox._selected.length == 0) {
                    layer.Notify.notice('请先选择');
                    return false;
                }
                try {
                    showBox.success(showBox._selected.slice(0));
                    showBox.destroyEvents();
                    layer.closeAll('page');
                    showBox._selected = null;
                } catch (e) {
                    console.error('showBox 回调失败', e)
                }
                return false;
            })
            .on('click', 'a.selects', function () {

                var _data = showBox.handelData(showBox.__type, $(this).data('data'));
                showBox._selected.push(_data);

                $(this).addClass('hide').siblings().removeClass('hide');


                return false;
            })
            .on('click', 'span.cancel_selects', function () {

                var _data = showBox.handelData(showBox.__type, $(this).data('data'));
                var type = $(this).data('type');
                var index = showBox._selected.findIndex(function (ele) {
                    return linkTypeValObj(type, ele).promotionUid == linkTypeValObj(type, _data).promotionUid
                });

                showBox._selected.splice(index, 1);
                $(this).addClass('hide').siblings().removeClass('hide');
                return false;
            })
            .on('click', 'span.cancel_select', function () {

                var _data = $(this).data('data');

                try {
                    showBox.success(null);
                    showBox.destroyEvents();
                    layer.closeAll('page')
                } catch (e) {
                    console.error('showBox 回调失败', e)
                }

                return false;
            });

        var $OnlyactivityType = $('#OnlyactivityType');
        if ($OnlyactivityType.length) {
            $OnlyactivityType.on('change', function () {

                $('.dialog-choiceLink .search-table').bootstrapTable('destroy');
                showBox.initTable(true);
            })
        }


        var autocompleteXHR = null;
        if ($('[name="catalog_name"].autocomplete').length) {
            $('[name="catalog_name"].autocomplete').autocomplete({
                delay: 1000,
                source: function (request, response) {
                    if (autocompleteXHR) {
                        autocompleteXHR.abort();
                    }
                    $.ajax({
                        url: "/catalogManage/listCatalogByCatalogName",
                        type: 'POST',
                        data: JSON.stringify({
                            "catalog_name": request.term || "默认",	//品类名称 选填
                            "page_no": 1,
                            "page_size": 200
                        }),
                        contentType: 'application/json',
                        dataType: 'json',

                        beforeSend: function (xhr) {
                            autocompleteXHR = xhr;
                        }
                    })
                        .then(function (res) {
                            if (res.code != 200) {
                                console.error('搜索分类信息错误', res);
                                return [];
                            }
                            return res.data.content
                        })
                        .then(function (data) {
                            return data.map(function (content) {
                                return content.name;
                            })
                        })
                        .then(function (data) {
                            response(data);
                        })
                        .fail(function (error) {
                            console.error('搜索品牌出错-Post请求品牌：', error);
                            response([]);
                        });
                }
            });
        }


    };
    showBox.destroyEvents = function () {
        if ($('[name="catalog_name"]').length) {
            $('[name="catalog_name"]').autocomplete("destroy");
        }
    };

    showBox.open = function (title, searchBoxTplName, isMultiple, excludeUIDs, params_in) {
        showBox.__type = searchBoxTplName;
        showBox.__isMultiple = !!isMultiple;
        showBox.__excludeUIDs_data = excludeUIDs;
        showBox.__params_in = params_in || {};
        showBox.__excludeUIDs = [];

        if (!!isMultiple) {  // 多选
            showBox.__excludeUIDs = (excludeUIDs || []).map(function (ele) {
                var _ele = linkTypeValObj(searchBoxTplName.replace('searchbox_', ''), ele);
                return _ele.promotionUid;
            });
        } else {
            showBox.__excludeUIDs = (excludeUIDs || []).map(function (ele) {
                return ele.promotion_uid || ele.targetUid; //兼容小程序和品牌配置
            });
        }

        showBox._selected = [].concat(excludeUIDs || []);

        layer.open({
            type: 1,
            area: ['800px', '670px'],
            title: title,
            move: false,
            resize: false,
            scrollbar: false,
            shadeClose: false,
            btn: [],
            content: TPL.main.replace('{{searchBox}}', TPL[searchBoxTplName] || ''),
            success: function () {
                showBox.setBox($('form.label-search'))
                    .initSearch()
                    .then(showBox.initTable)
                    .then(showBox.initEvents);
            }
        });
    };


    // 展示在H5 页面 微海报类别
    showBox.linkType['product_group'] = function (isMultiple, excludeUIDs) {
        showBox.open('选择爆品活动商品', 'TYP_SELECT_PRODUCT', isMultiple !== false, excludeUIDs)
    };


    var choiceLinkConfig = {
        excludeUIDs: [],
        type: "",
        success: $.noop,
        params_in: {}
    };

    choiceLink = function (options) {
        var opts = $.extend(true, {}, choiceLinkConfig, options);

        if (showBox.linkType[opts.type]) {
            showBox.success = $.type(opts.success) == 'function' ? opts.success : $.noop;
            showBox.linkType[opts.type](opts.isMultiple, opts.excludeUIDs, opts.params_in);
        } else {
            console.log('错误的类型', opts.type);
            layer.Notify.error('错误的类型');
        }
        return false;
    };

    function P(fn) {
        var dfd = $.Deferred();
        fn = $.isFunction(fn) ? fn : $.noop;
        try {
            fn(dfd.resolve, dfd.reject);
        } catch (e) {
            dfd.reject(e);
        }
        return dfd.promise();

    }

});
