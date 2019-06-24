"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("../helper/observable");
var common_1 = require("../helper/common");
var rowSpan_1 = require("../helper/rowSpan");
function findIndexByPosition(offsets, position) {
    var rowOffset = common_1.findIndex(function (offset) { return offset > position; }, offsets);
    return rowOffset === -1 ? offsets.length - 1 : rowOffset - 1;
}
function calculateRange(scrollPos, totalSize, offsets, data, rowCalculation) {
    // safari uses negative scroll position for bouncing effect
    scrollPos = Math.max(scrollPos, 0);
    var start = findIndexByPosition(offsets, scrollPos);
    var end = findIndexByPosition(offsets, scrollPos + totalSize) + 1;
    var rawData = data.rawData, sortOptions = data.sortOptions;
    if (rawData.length && rowCalculation && rowSpan_1.enableRowSpan(sortOptions.columnName)) {
        var maxRowSpanCount = rowSpan_1.getMaxRowSpanCount(start, rawData);
        var topRowSpanIndex = start - maxRowSpanCount;
        return [topRowSpanIndex >= 0 ? topRowSpanIndex : 0, end];
    }
    return [start, end];
}
function getCachedRange(cachedRange, newRange) {
    if (cachedRange && common_1.arrayEqual(cachedRange, newRange)) {
        return cachedRange;
    }
    return newRange;
}
function create(_a) {
    var data = _a.data, column = _a.column, dimension = _a.dimension, rowCoords = _a.rowCoords, columnCoords = _a.columnCoords, showDummyRows = _a.showDummyRows;
    return observable_1.observable({
        scrollLeft: 0,
        scrollTop: 0,
        scrollPixelScale: 40,
        get maxScrollLeft() {
            var scrollbarWidth = dimension.scrollbarWidth, cellBorderWidth = dimension.cellBorderWidth;
            var areaWidth = columnCoords.areaWidth, widths = columnCoords.widths;
            var totalRWidth = 0;
            widths.R.forEach(function (width) {
                totalRWidth += width + cellBorderWidth;
            });
            return totalRWidth - areaWidth.R + scrollbarWidth;
        },
        get maxScrollTop() {
            var bodyHeight = dimension.bodyHeight, scrollbarWidth = dimension.scrollbarWidth;
            var totalRowHeight = rowCoords.totalRowHeight;
            return totalRowHeight - bodyHeight + scrollbarWidth;
        },
        // only for right side columns
        get colRange() {
            var range = calculateRange(this.scrollLeft, columnCoords.areaWidth.R, columnCoords.offsets.R, data);
            return getCachedRange(this.__storage__.colRange, range);
        },
        // only for right side columns
        get columns() {
            var _a;
            return (_a = column.visibleColumnsBySide.R).slice.apply(_a, this.colRange);
        },
        get offsetLeft() {
            return columnCoords.offsets.R[this.colRange[0]];
        },
        get rowRange() {
            var range = calculateRange(this.scrollTop, dimension.bodyHeight, rowCoords.offsets, data, true);
            return getCachedRange(this.__storage__.rowRange, range);
        },
        get rows() {
            var _a;
            return (_a = data.viewData).slice.apply(_a, this.rowRange);
        },
        get offsetTop() {
            return rowCoords.offsets[this.rowRange[0]];
        },
        get dummyRowCount() {
            var rowHeight = dimension.rowHeight, bodyHeight = dimension.bodyHeight, scrollXHeight = dimension.scrollXHeight, cellBorderWidth = dimension.cellBorderWidth;
            var totalRowHeight = rowCoords.totalRowHeight;
            var adjustedRowHeight = rowHeight + cellBorderWidth;
            var adjustedBodyHeight = bodyHeight - scrollXHeight;
            if (showDummyRows && totalRowHeight < adjustedBodyHeight) {
                return Math.ceil((adjustedBodyHeight - totalRowHeight) / adjustedRowHeight) + 1;
            }
            return 0;
        }
    });
}
exports.create = create;
//# sourceMappingURL=viewport.js.map