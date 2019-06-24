"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var hoc_1 = require("./hoc");
var dom_1 = require("../helper/dom");
var common_1 = require("../helper/common");
var rowSpanCell_1 = require("./rowSpanCell");
var BodyRowComp = /** @class */ (function (_super) {
    tslib_1.__extends(BodyRowComp, _super);
    function BodyRowComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.renderedRowHeight = _this.props.rowHeight;
        // This debounced function is aimed to wait until setTimeout(.., 0) calls
        // from the all child BodyCell components is made.
        // 10ms is just an approximate number. (smaller than 10ms might be safe enough)
        _this.updateRowHeightDebounced = common_1.debounce(function () {
            var _a = _this.props, dispatch = _a.dispatch, rowIndex = _a.rowIndex, rowHeight = _a.rowHeight;
            if (rowHeight !== _this.renderedRowHeight) {
                dispatch('setRowHeight', rowIndex, _this.renderedRowHeight);
            }
        }, 10);
        _this.refreshRowHeight = function (cellHeight) {
            _this.renderedRowHeight =
                Math.max(cellHeight, _this.renderedRowHeight) + _this.props.cellBorderWidth;
            _this.updateRowHeightDebounced();
        };
        return _this;
    }
    BodyRowComp.prototype.render = function (_a) {
        var _this = this;
        var rowIndex = _a.rowIndex, viewRow = _a.viewRow, columns = _a.columns, rowHeight = _a.rowHeight, autoRowHeight = _a.autoRowHeight;
        var isOddRow = rowIndex % 2 === 0;
        return (preact_1.h("tr", { style: { height: rowHeight }, class: dom_1.cls([isOddRow, 'row-odd'], [!isOddRow, 'row-even'], [!rowHeight, 'row-hidden']) }, columns.map(function (columnInfo) {
            // Pass row object directly instead of passing value of it only,
            // so that BodyCell component can watch the change of value using selector function.
            return (preact_1.h(rowSpanCell_1.RowSpanCell, { key: columnInfo.name, viewRow: viewRow, columnInfo: columnInfo, refreshRowHeight: autoRowHeight ? _this.refreshRowHeight : null }));
        })));
    };
    return BodyRowComp;
}(preact_1.Component));
exports.BodyRow = hoc_1.connect(function (_a, _b) {
    var rowCoords = _a.rowCoords, dimension = _a.dimension;
    var rowIndex = _b.rowIndex;
    return ({
        rowHeight: rowCoords.heights[rowIndex],
        autoRowHeight: dimension.autoRowHeight,
        cellBorderWidth: dimension.cellBorderWidth
    });
})(BodyRowComp);
//# sourceMappingURL=bodyRow.js.map