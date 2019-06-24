"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var observable_1 = require("../helper/observable");
var selection_1 = require("../helper/selection");
function getOwnSideColumnRange(columnRange, side, visibleFrozenCount, rowHeaderCount) {
    var _a = columnRange.map(function (columnIdx) { return columnIdx + rowHeaderCount; }), start = _a[0], end = _a[1];
    if (side === 'L' && start < visibleFrozenCount) {
        return [start, Math.min(end, visibleFrozenCount - 1)];
    }
    if (side === 'R' && end >= visibleFrozenCount) {
        return [Math.max(start, visibleFrozenCount) - visibleFrozenCount, end - visibleFrozenCount];
    }
    return null;
}
function getVerticalStyles(rowRange, rowOffsets, rowHeights) {
    var top = rowOffsets[rowRange[0]];
    var bottom = rowOffsets[rowRange[1]] + rowHeights[rowRange[1]];
    return { top: top, height: bottom - top };
}
function getHorizontalStyles(columnRange, columnWidths, side, cellBorderWidth) {
    var left = 0;
    var width = 0;
    if (!columnRange) {
        return { left: left, width: width };
    }
    var widths = columnWidths[side];
    var startIndex = columnRange[0];
    var endIndex = Math.min(columnRange[1], widths.length - 1);
    for (var i = 0; i <= endIndex; i += 1) {
        if (i < startIndex) {
            left += widths[i] + cellBorderWidth;
        }
        else {
            width += widths[i] + cellBorderWidth;
        }
    }
    width -= cellBorderWidth;
    return { left: left, width: width };
}
function create(_a) {
    var selectionUnit = _a.selectionUnit, rowCoords = _a.rowCoords, columnCoords = _a.columnCoords, columnInfo = _a.column, dimension = _a.dimension;
    return observable_1.observable({
        inputRange: null,
        unit: selectionUnit,
        type: 'cell',
        intervalIdForAutoScroll: null,
        get range() {
            if (!this.inputRange) {
                return null;
            }
            var columnWidths = columnCoords.widths;
            var row = selection_1.getSortedRange(this.inputRange.row);
            var column = selection_1.getSortedRange(this.inputRange.column);
            if (this.unit === 'row') {
                var endColumnIndex = columnWidths.L.length + columnWidths.R.length - 1;
                column = [0, endColumnIndex];
            }
            return { row: row, column: column };
        },
        get rangeBySide() {
            if (!this.range) {
                return null;
            }
            var visibleFrozenCount = columnInfo.visibleFrozenCount, rowHeaderCount = columnInfo.rowHeaderCount;
            var _a = this.range, column = _a.column, row = _a.row;
            return {
                L: { row: row, column: getOwnSideColumnRange(column, 'L', visibleFrozenCount, rowHeaderCount) },
                R: { row: row, column: getOwnSideColumnRange(column, 'R', visibleFrozenCount, rowHeaderCount) }
            };
        },
        get rangeAreaInfo() {
            if (!this.rangeBySide) {
                return null;
            }
            var cellBorderWidth = dimension.cellBorderWidth;
            var rowOffsets = rowCoords.offsets, rowHeights = rowCoords.heights;
            var columnWidths = columnCoords.widths;
            var _a = this.rangeBySide, leftRange = _a.L, rightRange = _a.R;
            var leftSideStyles = null;
            var rightSideStyles = null;
            if (leftRange.column) {
                leftSideStyles = tslib_1.__assign({}, getVerticalStyles(leftRange.row, rowOffsets, rowHeights), getHorizontalStyles(leftRange.column, columnWidths, 'L', cellBorderWidth));
            }
            if (rightRange.column) {
                rightSideStyles = tslib_1.__assign({}, getVerticalStyles(rightRange.row, rowOffsets, rowHeights), getHorizontalStyles(rightRange.column, columnWidths, 'R', cellBorderWidth));
            }
            return {
                L: leftSideStyles,
                R: rightSideStyles
            };
        }
    });
}
exports.create = create;
//# sourceMappingURL=selection.js.map