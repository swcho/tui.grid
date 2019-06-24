"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getHorizontalScrollPosition(rightSideWidth, cellPosRect, scrollLeft, tableBorderWidth) {
    var left = cellPosRect.left, right = cellPosRect.right;
    if (left < scrollLeft) {
        return left;
    }
    if (right > scrollLeft + rightSideWidth - tableBorderWidth) {
        return right - rightSideWidth + tableBorderWidth;
    }
    return null;
}
function getVerticalScrollPosition(height, cellPosRect, scrollTop, tableBorderWidth) {
    var top = cellPosRect.top, bottom = cellPosRect.bottom;
    if (top < scrollTop) {
        return top + tableBorderWidth;
    }
    if (bottom > scrollTop + height) {
        return bottom - height + tableBorderWidth;
    }
    return null;
}
function setScrollPosition(viewport, changedScrollTop, changedScrollLeft) {
    if (changedScrollLeft !== null) {
        viewport.scrollLeft = changedScrollLeft;
    }
    if (changedScrollTop !== null) {
        viewport.scrollTop = changedScrollTop;
    }
}
function setScrollToFocus(store) {
    var _a = store.dimension, bodyHeight = _a.bodyHeight, scrollbarWidth = _a.scrollbarWidth, tableBorderWidth = _a.tableBorderWidth, areaWidth = store.columnCoords.areaWidth, _b = store.focus, cellPosRect = _b.cellPosRect, side = _b.side, viewport = store.viewport;
    var scrollLeft = viewport.scrollLeft, scrollTop = viewport.scrollTop;
    if (cellPosRect === null || side === null) {
        return;
    }
    var changedScrollLeft = side === 'R'
        ? getHorizontalScrollPosition(areaWidth.R - scrollbarWidth, cellPosRect, scrollLeft, tableBorderWidth)
        : null;
    var changedScrollTop = getVerticalScrollPosition(bodyHeight - scrollbarWidth, cellPosRect, scrollTop, tableBorderWidth);
    setScrollPosition(viewport, changedScrollTop, changedScrollLeft);
}
exports.setScrollToFocus = setScrollToFocus;
function setScrollToSelection(store) {
    var _a = store.dimension, bodyHeight = _a.bodyHeight, scrollbarWidth = _a.scrollbarWidth, tableBorderWidth = _a.tableBorderWidth, _b = store.columnCoords, areaWidth = _b.areaWidth, widths = _b.widths, columnOffsets = _b.offsets, _c = store.rowCoords, heights = _c.heights, rowOffsets = _c.offsets, inputRange = store.selection.inputRange, viewport = store.viewport;
    if (!inputRange) {
        return;
    }
    var scrollLeft = viewport.scrollLeft, scrollTop = viewport.scrollTop;
    var rowIndex = inputRange.row[1];
    var columnIndex = inputRange.column[1];
    var cellSide = columnIndex > widths.L.length - 1 ? 'R' : 'L';
    var rightSideColumnIndex = columnIndex - widths.L.length;
    var left = columnOffsets[cellSide][rightSideColumnIndex];
    var right = left + widths[cellSide][rightSideColumnIndex];
    var top = rowOffsets[rowIndex];
    var bottom = top + heights[rowIndex];
    var cellPosRect = { left: left, right: right, top: top, bottom: bottom };
    var changedScrollLeft = cellSide === 'R'
        ? getHorizontalScrollPosition(areaWidth.R - scrollbarWidth, cellPosRect, scrollLeft, tableBorderWidth)
        : null;
    var changedScrollTop = getVerticalScrollPosition(bodyHeight - scrollbarWidth, cellPosRect, scrollTop, tableBorderWidth);
    setScrollPosition(viewport, changedScrollTop, changedScrollLeft);
}
exports.setScrollToSelection = setScrollToSelection;
function setScrollLeft(_a, scrollLeft) {
    var viewport = _a.viewport;
    viewport.scrollLeft = scrollLeft;
}
exports.setScrollLeft = setScrollLeft;
function setScrollTop(_a, scrollTop) {
    var viewport = _a.viewport;
    viewport.scrollTop = scrollTop;
}
exports.setScrollTop = setScrollTop;
//# sourceMappingURL=viewport.js.map