"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../helper/common");
var column_1 = require("../helper/column");
var focus_1 = require("./focus");
var selection_1 = require("./selection");
var rowSpan_1 = require("../helper/rowSpan");
var selection_2 = require("../query/selection");
function setNavigating(_a, navigating) {
    var focus = _a.focus;
    focus.navigating = navigating;
}
exports.setNavigating = setNavigating;
function getPositionFromBodyArea(pageX, pageY, dimension) {
    var offsetLeft = dimension.offsetLeft, offsetTop = dimension.offsetTop, tableBorderWidth = dimension.tableBorderWidth, cellBorderWidth = dimension.cellBorderWidth, headerHeight = dimension.headerHeight, summaryHeight = dimension.summaryHeight, summaryPosition = dimension.summaryPosition;
    var adjustedSummaryHeight = summaryPosition === 'top' ? summaryHeight : 0;
    return {
        x: pageX - offsetLeft,
        y: pageY -
            (offsetTop + headerHeight + adjustedSummaryHeight + cellBorderWidth + tableBorderWidth)
    };
}
function getTotalColumnOffsets(widths, cellBorderWidth) {
    var totalWidths = widths.L.concat(widths.R);
    var offsets = [0];
    for (var i = 1, len = totalWidths.length; i < len; i += 1) {
        offsets.push(offsets[i - 1] + totalWidths[i - 1] + cellBorderWidth);
    }
    return offsets;
}
function getScrolledPosition(_a, dimension, leftSideWidth) {
    var pageX = _a.pageX, pageY = _a.pageY, scrollLeft = _a.scrollLeft, scrollTop = _a.scrollTop;
    var _b = getPositionFromBodyArea(pageX, pageY, dimension), bodyPositionX = _b.x, bodyPositionY = _b.y;
    var scrollX = bodyPositionX > leftSideWidth ? scrollLeft : 0;
    var scrolledPositionX = bodyPositionX + scrollX;
    var scrolledPositionY = bodyPositionY + scrollTop;
    return {
        x: scrolledPositionX,
        y: scrolledPositionY
    };
}
function judgeOverflow(_a, _b) {
    var containerX = _a.x, containerY = _a.y;
    var bodyHeight = _b.bodyHeight, bodyWidth = _b.bodyWidth;
    var overflowY = 0;
    var overflowX = 0;
    if (containerY < 0) {
        overflowY = -1;
    }
    else if (containerY > bodyHeight) {
        overflowY = 1;
    }
    if (containerX < 0) {
        overflowX = -1;
    }
    else if (containerX > bodyWidth) {
        overflowX = 1;
    }
    return {
        x: overflowX,
        y: overflowY
    };
}
function getOverflowFromMousePosition(pageX, pageY, bodyWidth, dimension) {
    var bodyHeight = dimension.bodyHeight;
    var _a = getPositionFromBodyArea(pageX, pageY, dimension), x = _a.x, y = _a.y;
    return judgeOverflow({ x: x, y: y }, { bodyWidth: bodyWidth, bodyHeight: bodyHeight });
}
function stopAutoScroll(selection) {
    var intervalIdForAutoScroll = selection.intervalIdForAutoScroll;
    if (intervalIdForAutoScroll !== null) {
        clearInterval(intervalIdForAutoScroll);
        selection.intervalIdForAutoScroll = null;
    }
}
function isAutoScrollable(overflowX, overflowY) {
    return !(overflowX === 0 && overflowY === 0);
}
function adjustScrollLeft(overflowX, viewport) {
    var scrollPixelScale = viewport.scrollPixelScale, scrollLeft = viewport.scrollLeft, maxScrollLeft = viewport.maxScrollLeft;
    if (overflowX < 0) {
        viewport.scrollLeft = Math.max(0, scrollLeft - scrollPixelScale);
    }
    else if (overflowX > 0) {
        viewport.scrollLeft = Math.max(maxScrollLeft, scrollLeft - scrollPixelScale);
    }
}
function adjustScrollTop(overflowY, viewport) {
    var scrollTop = viewport.scrollTop, maxScrollTop = viewport.maxScrollTop, scrollPixelScale = viewport.scrollPixelScale;
    if (overflowY < 0) {
        viewport.scrollTop = Math.max(0, scrollTop - scrollPixelScale);
    }
    else if (overflowY > 0) {
        viewport.scrollTop = Math.min(maxScrollTop, scrollTop + scrollPixelScale);
    }
}
function adjustScroll(viewport, overflow) {
    if (overflow.x) {
        adjustScrollLeft(overflow.x, viewport);
    }
    if (overflow.y) {
        adjustScrollTop(overflow.y, viewport);
    }
}
function setScrolling(_a, bodyWidth, selection, dimension, viewport) {
    var pageX = _a.pageX, pageY = _a.pageY;
    var overflow = getOverflowFromMousePosition(pageX, pageY, bodyWidth, dimension);
    stopAutoScroll(selection);
    if (isAutoScrollable(overflow.x, overflow.y)) {
        selection.intervalIdForAutoScroll = setInterval(adjustScroll.bind(null, viewport, overflow));
    }
}
function getFocusCellPos(store) {
    var columnCoords = store.columnCoords, rowCoords = store.rowCoords, focus = store.focus, dimension = store.dimension, viewport = store.viewport;
    var columnIndex = focus.columnIndex, rowIndex = focus.rowIndex, side = focus.side, cellPosRect = focus.cellPosRect;
    if (common_1.isNull(columnIndex) || common_1.isNull(rowIndex) || common_1.isNull(side) || common_1.isNull(cellPosRect)) {
        return null;
    }
    var left = cellPosRect.left, right = cellPosRect.right;
    var offsets = rowCoords.offsets, heights = rowCoords.heights;
    var areaWidth = columnCoords.areaWidth, widths = columnCoords.widths;
    var headerHeight = dimension.headerHeight, tableBorderWidth = dimension.tableBorderWidth, width = dimension.width;
    var scrollLeft = viewport.scrollLeft;
    var offsetLeft = Math.min(areaWidth.L - scrollLeft + tableBorderWidth, width - right);
    var focusCellWidth = widths[side][columnIndex];
    return {
        pageX: left + focusCellWidth + (side === 'L' ? 0 : offsetLeft),
        pageY: offsets[rowIndex] + heights[rowIndex] + headerHeight
    };
}
function selectionEnd(_a) {
    var selection = _a.selection;
    selection.inputRange = null;
    // @TODO: minimumColumnRange 고려 필요
    // selection.minimumColumnRange = null;
}
exports.selectionEnd = selectionEnd;
function selectionUpdate(store, dragStartData, dragData) {
    var _a;
    var dimension = store.dimension, viewport = store.viewport, columnCoords = store.columnCoords, rowCoords = store.rowCoords, selection = store.selection, column = store.column, id = store.id, data = store.data;
    var scrollTop = viewport.scrollTop, scrollLeft = viewport.scrollLeft;
    var widths = columnCoords.widths, areaWidth = columnCoords.areaWidth;
    var rowOffsets = rowCoords.offsets;
    var rowHeaderCount = column.rowHeaderCount;
    var pageX = dragData.pageX, pageY = dragData.pageY;
    var curInputRange = selection.inputRange;
    var visibleColumns = column.visibleColumns;
    var startRowIndex, startColumnIndex, endRowIndex;
    var viewInfo = { pageX: pageX, pageY: pageY, scrollTop: scrollTop, scrollLeft: scrollLeft };
    var scrolledPosition = getScrolledPosition(viewInfo, dimension, areaWidth.L);
    var totalColumnOffsets = getTotalColumnOffsets(widths, dimension.cellBorderWidth);
    var endColumnIndex = common_1.findOffsetIndex(totalColumnOffsets, scrolledPosition.x) - rowHeaderCount;
    endRowIndex = common_1.findOffsetIndex(rowOffsets, scrolledPosition.y);
    if (curInputRange === null) {
        var startViewInfo = {
            pageX: dragStartData.pageX,
            pageY: dragStartData.pageY,
            scrollTop: scrollTop,
            scrollLeft: scrollLeft
        };
        var startScrolledPosition = getScrolledPosition(startViewInfo, dimension, areaWidth.L);
        startRowIndex = common_1.findOffsetIndex(rowOffsets, startScrolledPosition.y);
        startColumnIndex =
            common_1.findOffsetIndex(totalColumnOffsets, startScrolledPosition.x) - rowHeaderCount;
    }
    else {
        startRowIndex = curInputRange.row[0];
        startColumnIndex = curInputRange.column[0];
    }
    if (startColumnIndex < 0 || endColumnIndex < 0 || startRowIndex < 0 || endRowIndex < 0) {
        return;
    }
    if (rowSpan_1.enableRowSpan(data.sortOptions.columnName)) {
        var rowRange = [startRowIndex, endRowIndex];
        var colRange = [startColumnIndex, endColumnIndex];
        _a = rowSpan_1.getRowRangeWithRowSpan(rowRange, colRange, visibleColumns, store.focus.rowIndex, data), startRowIndex = _a[0], endRowIndex = _a[1];
    }
    var inputRange = {
        row: [startRowIndex, endRowIndex],
        column: [startColumnIndex, endColumnIndex]
    };
    selection_1.changeSelectionRange(selection, inputRange, id);
}
exports.selectionUpdate = selectionUpdate;
function dragMoveBody(store, dragStartData, dragData) {
    var dimension = store.dimension, columnCoords = store.columnCoords, selection = store.selection, viewport = store.viewport;
    var areaWidth = columnCoords.areaWidth;
    selectionUpdate(store, dragStartData, dragData);
    setScrolling(dragData, areaWidth.L + areaWidth.R, selection, dimension, viewport);
}
exports.dragMoveBody = dragMoveBody;
function dragEnd(_a) {
    var selection = _a.selection;
    stopAutoScroll(selection);
}
exports.dragEnd = dragEnd;
function mouseDownBody(store, elementInfo, eventInfo) {
    var data = store.data, column = store.column, columnCoords = store.columnCoords, rowCoords = store.rowCoords, focus = store.focus, id = store.id;
    var pageX = eventInfo.pageX, pageY = eventInfo.pageY, shiftKey = eventInfo.shiftKey;
    var visibleColumnsBySide = column.visibleColumnsBySide;
    var side = elementInfo.side, scrollLeft = elementInfo.scrollLeft, scrollTop = elementInfo.scrollTop, left = elementInfo.left, top = elementInfo.top;
    var offsetLeft = pageX - left + scrollLeft;
    var offsetTop = pageY - top + scrollTop;
    var rowIndex = common_1.findOffsetIndex(rowCoords.offsets, offsetTop);
    var columnIndex = common_1.findOffsetIndex(columnCoords.offsets[side], offsetLeft);
    var columnName = visibleColumnsBySide[side][columnIndex].name;
    if (!column_1.isRowHeader(columnName)) {
        if (shiftKey) {
            var dragData = { pageX: pageX, pageY: pageY };
            var focusCellPos = getFocusCellPos(store);
            var focusData = common_1.isNull(focusCellPos) ? dragData : focusCellPos;
            selectionUpdate(store, focusData, dragData);
        }
        else {
            focus_1.changeFocus(focus, data, data.viewData[rowIndex].rowKey, columnName, id);
            selectionEnd(store);
        }
    }
}
exports.mouseDownBody = mouseDownBody;
function mouseDownHeader(store, name, parentHeader) {
    var _a;
    var data = store.data, selection = store.selection, id = store.id, column = store.column, focus = store.focus;
    var visibleColumns = column.visibleColumns, rowHeaderCount = column.rowHeaderCount, complexHeaderColumns = column.complexHeaderColumns;
    var endRowIndex = data.viewData.length - 1;
    var startColumnIndex, endColumnIndex;
    if (parentHeader) {
        _a = selection_2.getChildColumnRange(visibleColumns, complexHeaderColumns, name, rowHeaderCount), startColumnIndex = _a[0], endColumnIndex = _a[1];
    }
    else {
        startColumnIndex = endColumnIndex =
            common_1.findPropIndex('name', name, visibleColumns) - rowHeaderCount;
    }
    var inputRange = {
        row: [0, endRowIndex],
        column: [startColumnIndex, endColumnIndex]
    };
    focus_1.changeFocus(focus, data, data.rawData[0].rowKey, name, id);
    selection_1.changeSelectionRange(selection, inputRange, id);
}
exports.mouseDownHeader = mouseDownHeader;
function dragMoveHeader(store, dragData, startSelectedName) {
    var dimension = store.dimension, viewport = store.viewport, columnCoords = store.columnCoords, selection = store.selection, column = store.column, id = store.id;
    var scrollTop = viewport.scrollTop, scrollLeft = viewport.scrollLeft;
    var areaWidth = columnCoords.areaWidth, widths = columnCoords.widths;
    var rowHeaderCount = column.rowHeaderCount, visibleColumns = column.visibleColumns, complexHeaderColumns = column.complexHeaderColumns;
    var pageX = dragData.pageX, pageY = dragData.pageY;
    var curInputRange = selection.inputRange;
    if (curInputRange === null) {
        return;
    }
    var _a = selection_2.getChildColumnRange(visibleColumns, complexHeaderColumns, startSelectedName, rowHeaderCount), startColumnIdx = _a[0], endColumnIdx = _a[1];
    var viewInfo = { pageX: pageX, pageY: pageY, scrollTop: scrollTop, scrollLeft: scrollLeft };
    var scrolledPosition = getScrolledPosition(viewInfo, dimension, areaWidth.L);
    var totalColumnOffsets = getTotalColumnOffsets(widths, dimension.cellBorderWidth);
    var columnIndex = common_1.findOffsetIndex(totalColumnOffsets, scrolledPosition.x) - rowHeaderCount;
    var rowIndex = curInputRange.row[1];
    if (columnIndex < startColumnIdx) {
        startColumnIdx = columnIndex;
    }
    if (columnIndex > endColumnIdx) {
        endColumnIdx = columnIndex;
    }
    if (columnIndex >= 0) {
        var inputRange = {
            row: [0, rowIndex],
            column: [startColumnIdx, endColumnIdx]
        };
        selection_1.changeSelectionRange(selection, inputRange, id);
        setScrolling(dragData, areaWidth.L + areaWidth.R, selection, dimension, viewport);
    }
}
exports.dragMoveHeader = dragMoveHeader;
function mouseDownRowHeader(store, rowKey) {
    var selection = store.selection, id = store.id, column = store.column, data = store.data, focus = store.focus;
    var visibleColumns = column.visibleColumns, rowHeaderCount = column.rowHeaderCount;
    var rowIndex = common_1.findPropIndex('rowKey', rowKey, data.rawData);
    var endColumnIndex = visibleColumns.length - 1 - rowHeaderCount;
    var inputRange = {
        row: [rowIndex, rowIndex],
        column: [0, endColumnIndex]
    };
    focus_1.changeFocus(focus, data, data.rawData[rowIndex].rowKey, visibleColumns[rowHeaderCount].name, id);
    selection_1.changeSelectionRange(selection, inputRange, id);
}
exports.mouseDownRowHeader = mouseDownRowHeader;
function dragMoveRowHeader(store, dragData) {
    var dimension = store.dimension, viewport = store.viewport, columnCoords = store.columnCoords, rowCoords = store.rowCoords, selection = store.selection, id = store.id;
    var scrollTop = viewport.scrollTop, scrollLeft = viewport.scrollLeft;
    var areaWidth = columnCoords.areaWidth;
    var rowOffsets = rowCoords.offsets;
    var pageX = dragData.pageX, pageY = dragData.pageY;
    var curInputRange = selection.inputRange;
    if (curInputRange === null) {
        return;
    }
    var viewInfo = { pageX: pageX, pageY: pageY, scrollTop: scrollTop, scrollLeft: scrollLeft };
    var scrolledPosition = getScrolledPosition(viewInfo, dimension, areaWidth.L);
    var rowIndex = common_1.findOffsetIndex(rowOffsets, scrolledPosition.y);
    var startRowIndex = curInputRange.row[0];
    var columnIndex = curInputRange.column[1];
    var inputRange = {
        row: [startRowIndex, rowIndex],
        column: [0, columnIndex]
    };
    selection_1.changeSelectionRange(selection, inputRange, id);
}
exports.dragMoveRowHeader = dragMoveRowHeader;
//# sourceMappingURL=mouse.js.map