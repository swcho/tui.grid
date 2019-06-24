"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var hoc_1 = require("./hoc");
var rowSpan_1 = require("../helper/rowSpan");
var bodyCell_1 = require("./bodyCell");
var RowSpanCellComp = /** @class */ (function (_super) {
    tslib_1.__extends(RowSpanCellComp, _super);
    function RowSpanCellComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RowSpanCellComp.prototype.render = function () {
        var _a = this.props, columnInfo = _a.columnInfo, refreshRowHeight = _a.refreshRowHeight, rowSpan = _a.rowSpan, enableRowSpan = _a.enableRowSpan, viewRow = _a.viewRow;
        var rowSpanAttr = null;
        if (enableRowSpan && rowSpan) {
            if (!rowSpan.mainRow) {
                return null;
            }
            rowSpanAttr = { rowSpan: rowSpan.spanCount };
        }
        return (preact_1.h(bodyCell_1.BodyCell, { viewRow: viewRow, columnInfo: columnInfo, refreshRowHeight: refreshRowHeight, rowSpanAttr: rowSpanAttr }));
    };
    return RowSpanCellComp;
}(preact_1.Component));
exports.RowSpanCellComp = RowSpanCellComp;
exports.RowSpanCell = hoc_1.connect(function (_a, _b) {
    var data = _a.data;
    var viewRow = _b.viewRow, columnInfo = _b.columnInfo;
    var rowKey = viewRow.rowKey;
    var sortOptions = data.sortOptions, rawData = data.rawData;
    var rowSpan = rowSpan_1.getRowSpanByRowKey(rowKey, columnInfo.name, rawData);
    var enableRowSpan = sortOptions.columnName === 'rowKey';
    return { rowSpan: rowSpan, enableRowSpan: enableRowSpan };
})(RowSpanCellComp);
//# sourceMappingURL=rowSpanCell.js.map