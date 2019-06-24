"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("../helper/observable");
var common_1 = require("../helper/common");
function create(_a) {
    var column = _a.column, _b = _a.width, width = _b === void 0 ? 'auto' : _b, domWidth = _a.domWidth, _c = _a.rowHeight, rowHeight = _c === void 0 ? 40 : _c, _d = _a.bodyHeight, bodyHeight = _d === void 0 ? 'auto' : _d, _e = _a.minRowHeight, minRowHeight = _e === void 0 ? 40 : _e, _f = _a.minBodyHeight, minBodyHeight = _f === void 0 ? 130 : _f, _g = _a.frozenBorderWidth, frozenBorderWidth = _g === void 0 ? 1 : _g, _h = _a.heightResizable, heightResizable = _h === void 0 ? false : _h, _j = _a.scrollX, scrollX = _j === void 0 ? true : _j, _k = _a.scrollY, scrollY = _k === void 0 ? true : _k, _l = _a.summaryHeight, summaryHeight = _l === void 0 ? 0 : _l, _m = _a.summaryPosition, summaryPosition = _m === void 0 ? 'bottom' : _m, _o = _a.headerHeight, headerHeight = _o === void 0 ? 40 : _o;
    var bodyHeightVal = typeof bodyHeight === 'number' ? bodyHeight : 0;
    return observable_1.observable({
        offsetLeft: 0,
        offsetTop: 0,
        width: width === 'auto' ? domWidth : width,
        autoWidth: width === 'auto',
        minBodyHeight: minBodyHeight,
        bodyHeight: Math.max(bodyHeightVal, minBodyHeight),
        autoHeight: bodyHeight === 'auto',
        heightResizable: heightResizable,
        fitToParentHeight: bodyHeight === 'fitToParent',
        minRowHeight: minRowHeight,
        rowHeight: common_1.isNumber(rowHeight) ? Math.max(rowHeight, minRowHeight) : minRowHeight,
        autoRowHeight: rowHeight === 'auto',
        scrollX: scrollX,
        scrollY: scrollY,
        summaryHeight: summaryHeight,
        summaryPosition: summaryPosition,
        headerHeight: headerHeight,
        scrollbarWidth: 17,
        tableBorderWidth: 1,
        cellBorderWidth: 1,
        get scrollYWidth() {
            return this.scrollY ? this.scrollbarWidth : 0;
        },
        get scrollXHeight() {
            return this.scrollX ? this.scrollbarWidth : 0;
        },
        get frozenBorderWidth() {
            var visibleFrozenCount = column.visibleFrozenCount, rowHeaderCount = column.rowHeaderCount;
            var visibleLeftColumnCount = visibleFrozenCount - rowHeaderCount;
            return visibleLeftColumnCount > 0 ? frozenBorderWidth : 0;
        },
        get contentsWidth() {
            var columnLen = column.visibleColumns.length;
            var totalBorderWidth = columnLen * this.cellBorderWidth;
            return this.width - this.scrollYWidth - this.frozenBorderWidth - totalBorderWidth;
        }
    });
}
exports.create = create;
function setBodyHeight(dimension, rowCoords) {
    var totalRowHeight = rowCoords.totalRowHeight;
    var autoHeight = dimension.autoHeight, scrollXHeight = dimension.scrollXHeight, minBodyHeight = dimension.minBodyHeight;
    if (autoHeight) {
        dimension.bodyHeight = Math.max(totalRowHeight + scrollXHeight, minBodyHeight);
    }
}
exports.setBodyHeight = setBodyHeight;
//# sourceMappingURL=dimension.js.map