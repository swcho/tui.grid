"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../helper/common");
var keyboard_1 = require("../helper/keyboard");
var rowSpan_1 = require("../helper/rowSpan");
function getNextCellIndex(store, command, _a) {
    var rowIndex = _a[0], columnIndex = _a[1];
    var data = store.data, visibleColumns = store.column.visibleColumns, _b = store.dimension, bodyHeight = _b.bodyHeight, cellBorderWidth = _b.cellBorderWidth, _c = store.rowCoords, offsets = _c.offsets, heights = _c.heights;
    var rawData = data.rawData, viewData = data.viewData, sortOptions = data.sortOptions;
    var columnName = visibleColumns[columnIndex].name;
    switch (command) {
        case 'up':
            if (rowSpan_1.enableRowSpan(sortOptions.columnName)) {
                rowIndex = rowSpan_1.getRowSpanTopIndex(rowIndex, columnName, rawData);
            }
            rowIndex = keyboard_1.getPrevRowIndex(rowIndex, heights);
            break;
        case 'down':
            if (rowSpan_1.enableRowSpan(sortOptions.columnName)) {
                rowIndex = rowSpan_1.getRowSpanBottomIndex(rowIndex, columnName, rawData);
            }
            rowIndex = keyboard_1.getNextRowIndex(rowIndex, heights);
            break;
        case 'left':
            columnIndex -= 1;
            break;
        case 'right':
            columnIndex += 1;
            break;
        case 'firstCell':
            columnIndex = 0;
            rowIndex = 0;
            break;
        case 'lastCell':
            columnIndex = visibleColumns.length - 1;
            rowIndex = viewData.length - 1;
            break;
        case 'pageUp': {
            var movedPosition = keyboard_1.getPageMovedPosition(rowIndex, offsets, bodyHeight, true);
            rowIndex = keyboard_1.getPageMovedIndex(offsets, cellBorderWidth, movedPosition);
            break;
        }
        case 'pageDown': {
            var movedPosition = keyboard_1.getPageMovedPosition(rowIndex, offsets, bodyHeight, false);
            rowIndex = keyboard_1.getPageMovedIndex(offsets, cellBorderWidth, movedPosition);
            break;
        }
        case 'firstColumn':
            columnIndex = 0;
            break;
        case 'lastColumn':
            columnIndex = visibleColumns.length - 1;
            break;
        default:
            break;
    }
    rowIndex = common_1.clamp(rowIndex, 0, viewData.length - 1);
    columnIndex = common_1.clamp(columnIndex, 0, visibleColumns.length - 1);
    return [rowIndex, columnIndex];
}
exports.getNextCellIndex = getNextCellIndex;
function getRemoveRange(store) {
    var focus = store.focus, selection = store.selection;
    var totalColumnIndex = focus.totalColumnIndex, rowIndex = focus.rowIndex;
    var range = selection.range;
    if (range) {
        return range;
    }
    if (!common_1.isNull(totalColumnIndex) && !common_1.isNull(rowIndex)) {
        return {
            column: [totalColumnIndex, totalColumnIndex],
            row: [rowIndex, rowIndex]
        };
    }
    return null;
}
exports.getRemoveRange = getRemoveRange;
//# sourceMappingURL=keyboard.js.map