"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var selection_1 = require("./selection");
function getMainRowSpan(columnName, rowSpan, data) {
    var mainRow = rowSpan.mainRow, mainRowKey = rowSpan.mainRowKey;
    if (mainRow) {
        return rowSpan;
    }
    var mainRowIndex = common_1.findPropIndex('rowKey', mainRowKey, data);
    return data[mainRowIndex].rowSpanMap[columnName];
}
function getRowSpanRange(rowRange, colRange, visibleColumns, data) {
    var startColumnIndex = colRange[0], endColumnIndex = colRange[1];
    var startRowIndex = rowRange[0], endRowIndex = rowRange[1];
    for (var index = startColumnIndex; index <= endColumnIndex; index += 1) {
        var rawData = data.rawData;
        var startRowSpanMap = rawData[startRowIndex].rowSpanMap;
        var endRowSpanMap = rawData[endRowIndex].rowSpanMap;
        var columnName = visibleColumns[index].name;
        // get top row index of topmost rowSpan
        if (startRowSpanMap[columnName]) {
            var mainRowKey = startRowSpanMap[columnName].mainRowKey;
            var topRowSpanIndex = common_1.findPropIndex('rowKey', mainRowKey, rawData);
            startRowIndex = startRowIndex > topRowSpanIndex ? topRowSpanIndex : startRowIndex;
        }
        // get bottom row index of bottommost rowSpan
        if (endRowSpanMap[columnName]) {
            var _a = endRowSpanMap[columnName], mainRowKey = _a.mainRowKey, spanCount = _a.spanCount;
            var bottomRowSpanIndex = common_1.findPropIndex('rowKey', mainRowKey, rawData) + spanCount - 1;
            endRowIndex = endRowIndex < bottomRowSpanIndex ? bottomRowSpanIndex : endRowIndex;
        }
    }
    return startRowIndex !== rowRange[0] || endRowIndex !== rowRange[1]
        ? getRowSpanRange([startRowIndex, endRowIndex], colRange, visibleColumns, data)
        : [startRowIndex, endRowIndex];
}
function getRowRangeWithRowSpan(rowRange, colRange, visibleColumns, focusRowIndex, data) {
    var sortedColRange = selection_1.getSortedRange(colRange);
    var endRowIndex = rowRange[1];
    var startRowIndex = rowRange[0];
    // if start row index is different from focused index,
    // change start row index to focused row index for getting proper row range
    startRowIndex =
        !common_1.isNull(focusRowIndex) && startRowIndex !== focusRowIndex ? focusRowIndex : startRowIndex;
    var sortedRowRange = selection_1.getSortedRange([startRowIndex, endRowIndex]);
    var _a = getRowSpanRange(sortedRowRange, sortedColRange, visibleColumns, data), startRowSpanIndex = _a[0], endRowSpanIndex = _a[1];
    return startRowIndex > endRowIndex
        ? [endRowSpanIndex, startRowSpanIndex]
        : [startRowSpanIndex, endRowSpanIndex];
}
exports.getRowRangeWithRowSpan = getRowRangeWithRowSpan;
function getVerticalPosWithRowSpan(columnName, rowSpan, rowCoords, data) {
    var mainRowSpan = getMainRowSpan(columnName, rowSpan, data);
    var mainRowIndex = common_1.findPropIndex('rowKey', mainRowSpan.mainRowKey, data);
    var spanCount = mainRowSpan.spanCount;
    var top = rowCoords.offsets[mainRowIndex];
    var bottom = top;
    for (var count = 0; count < spanCount; count += 1) {
        bottom += rowCoords.heights[mainRowIndex + count];
    }
    return [top, bottom];
}
exports.getVerticalPosWithRowSpan = getVerticalPosWithRowSpan;
function getRowSpan(rowIndex, columnName, data) {
    var rowSpanMap = data[rowIndex].rowSpanMap;
    return rowSpanMap[columnName];
}
exports.getRowSpan = getRowSpan;
/*
 * get top row index of specific rowSpan cell
 */
function getRowSpanTopIndex(rowIndex, columnName, data) {
    var rowSpan = getRowSpan(rowIndex, columnName, data);
    if (!rowSpan) {
        return rowIndex;
    }
    return common_1.findPropIndex('rowKey', rowSpan.mainRowKey, data);
}
exports.getRowSpanTopIndex = getRowSpanTopIndex;
/*
 * get bottom row index of specific rowSpan cell
 */
function getRowSpanBottomIndex(rowIndex, columnName, data) {
    var rowSpan = getRowSpan(rowIndex, columnName, data);
    if (!rowSpan) {
        return rowIndex;
    }
    var mainRowIndex = common_1.findPropIndex('rowKey', rowSpan.mainRowKey, data);
    return mainRowIndex + rowSpan.spanCount - 1;
}
exports.getRowSpanBottomIndex = getRowSpanBottomIndex;
function getRowSpanByRowKey(rowKey, columnName, data) {
    var rowIndex = common_1.findPropIndex('rowKey', rowKey, data);
    if (rowIndex === -1) {
        return null;
    }
    return getRowSpan(rowIndex, columnName, data) || null;
}
exports.getRowSpanByRowKey = getRowSpanByRowKey;
/*
 * get max rowSpan count in all columns that have rowSpan
 */
function getMaxRowSpanCount(rowIndex, data) {
    var rowSpanMap = data[rowIndex].rowSpanMap;
    if (common_1.isEmpty(rowSpanMap)) {
        return 0;
    }
    return Object.keys(rowSpanMap).reduce(function (acc, columnName) { return Math.max(acc, rowSpanMap[columnName].spanCount); }, 0);
}
exports.getMaxRowSpanCount = getMaxRowSpanCount;
function enableRowSpan(columnName) {
    return columnName === 'rowKey';
}
exports.enableRowSpan = enableRowSpan;
function createRowSpan(mainRow, rowKey, count, spanCount) {
    return { mainRow: mainRow, mainRowKey: rowKey, count: count, spanCount: spanCount };
}
exports.createRowSpan = createRowSpan;
function updateSubRowSpan(data, mainRow, columnName, startOffset, spanCount) {
    var mainRowIndex = common_1.findPropIndex('rowKey', mainRow.rowKey, data);
    for (var offset = startOffset; offset < spanCount; offset += 1) {
        var row = data[mainRowIndex + offset];
        row.rowSpanMap[columnName] = createRowSpan(false, mainRow.rowKey, -offset, spanCount);
    }
}
function updateRowSpanWhenAppend(data, prevRow, extendPrevRowSpan) {
    var prevRowSpanMap = prevRow.rowSpanMap;
    if (common_1.isEmpty(prevRowSpanMap)) {
        return;
    }
    Object.keys(prevRowSpanMap).forEach(function (columnName) {
        var prevRowSpan = prevRowSpanMap[columnName];
        if (prevRowSpan) {
            var count = prevRowSpan.count, keyRow = prevRowSpan.mainRow, mainRowKey = prevRowSpan.mainRowKey;
            var mainRow = keyRow ? prevRow : common_1.findProp('rowKey', mainRowKey, data);
            var mainRowSpan = mainRow.rowSpanMap[columnName];
            var startOffset = keyRow || extendPrevRowSpan ? 1 : -count + 1;
            // keep rowSpan state when appends row in the middle of rowSpan
            if (mainRowSpan.spanCount > startOffset) {
                mainRowSpan.count += 1;
                mainRowSpan.spanCount += 1;
                updateSubRowSpan(data, mainRow, columnName, 1, mainRowSpan.spanCount);
            }
        }
    });
}
exports.updateRowSpanWhenAppend = updateRowSpanWhenAppend;
function updateRowSpanWhenRemove(data, removedRow, nextRow, keepRowSpanData) {
    var removedRowSpanMap = removedRow.rowSpanMap;
    if (common_1.isEmpty(removedRowSpanMap)) {
        return;
    }
    Object.keys(removedRowSpanMap).forEach(function (columnName) {
        var removedRowSpan = removedRowSpanMap[columnName];
        var count = removedRowSpan.count, keyRow = removedRowSpan.mainRow, mainRowKey = removedRowSpan.mainRowKey;
        var mainRow, spanCount;
        if (keyRow) {
            mainRow = nextRow;
            spanCount = count - 1;
            if (spanCount > 1) {
                var mainRowSpan = mainRow.rowSpanMap[columnName];
                mainRowSpan.mainRowKey = mainRow.rowKey;
                mainRowSpan.mainRow = true;
            }
            if (keepRowSpanData) {
                mainRow[columnName] = removedRow[columnName];
            }
        }
        else {
            mainRow = common_1.findProp('rowKey', mainRowKey, data);
            spanCount = mainRow.rowSpanMap[columnName].spanCount - 1;
        }
        if (spanCount > 1) {
            var mainRowSpan = mainRow.rowSpanMap[columnName];
            mainRowSpan.count = spanCount;
            mainRowSpan.spanCount = spanCount;
            updateSubRowSpan(data, mainRow, columnName, 1, spanCount);
        }
        else {
            delete mainRow.rowSpanMap[columnName];
        }
    });
}
exports.updateRowSpanWhenRemove = updateRowSpanWhenRemove;
//# sourceMappingURL=rowSpan.js.map