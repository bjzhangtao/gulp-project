"use strict";

Zr.add('./js/index', function (zr, $) {
  var index = {
    init: function init() {
      var dt = $('#example').dataTable({
        autoWidth: true,
        // 宽度自适应
        lengthChange: false,
        // 是否允许改变表格每页显示的记录数
        ordering: false,
        // 是否启动排序
        data: [['sku', 'skuName', '10', 'skuNumber', '未知参数来源', '未知参数来源', '未知参数来源', '<a>删除</a>'], ['sku', 'skuName', '10', 'skuNumber', '未知参数来源', '未知参数来源', '未知参数来源', '<a>删除</a>'], ['sku', 'skuName', '10', 'skuNumber', '未知参数来源', '未知参数来源', '未知参数来源', '<a>删除</a>'], ['sku', 'skuName', '10', 'skuNumber', '未知参数来源', '未知参数来源', '未知参数来源', '<a>删除</a>'], ['sku', 'skuName', '10', 'skuNumber', '未知参数来源', '未知参数来源', '未知参数来源', '<a>删除</a>'], ['sku', 'skuName', '10', 'skuNumber', '未知参数来源', '未知参数来源', '未知参数来源', '<a>删除</a>'], ['sku', 'skuName', '10', 'skuNumber', '未知参数来源', '未知参数来源', '未知参数来源', '<a>删除</a>'], ['sku', 'skuName', '10', 'skuNumber', '未知参数来源', '未知参数来源', '未知参数来源', '<a>删除</a>'], ['sku', 'skuName', '10', 'skuNumber', '未知参数来源', '未知参数来源', '未知参数来源', '<a>删除</a>']],
        // 表格数据
        scrollCollapse: true,
        // 数据不足使允许减少高度，与"scrollY"绑定
        destroy: true,
        // 如果存在表格，则销毁生成新的
        paging: false,
        // 是否显示分页
        columns: [// 表格栏目
        {
          'title': "sku"
        }, {
          'title': "name"
        }, {
          'title': "withinNumber"
        }, {
          'title': "outStoreNumber"
        }, {
          'title': "inStoreNumber"
        }, {
          'title': "weight"
        }, {
          'title': "volume"
        }, {
          'title': "operation"
        }]
      });
      var dom = $('#example'); // 变色

      dom.on('click', 'tr', function () {
        var _this = $(this);

        if (_this.hasClass('bg')) {
          _this.removeClass('bg');
        } else {
          _this.addClass('bg');
        }

        console.log(dt.api().data());
      }); // 增加一行-row

      $('#add').off('click').on('click', function () {
        dt.api().row.add(['sku', 'skuName', '10', 'skuNumber', '未知参数来源', '未知参数来源', '未知参数来源', '<a>删除</a>']).draw();
      }); // 删除一行

      dom.on('click', 'a', function () {
        event.stopPropagation();

        var _this = $(this); // dt.api()
        //     .row(_this.parents('tr'))
        //     .remove

      });
    }
  };
  return index;
}, {
  requires: ['jquery', 'datatables']
});