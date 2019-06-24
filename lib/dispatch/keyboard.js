"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var keyboard_1 = require("../query/keyboard");
var focus_1 = require("./focus");
var selection_1 = require("./selection");
var column_1 = require("../helper/column");
var rowSpan_1 = require("../helper/rowSpan");
var selection_2 = require("../helper/selection");
function getNextCellIndexWithRowSpan(store, command, currentRowIndex, columnRange, cellIndexes) {
    var rowIndex = cellIndexes[0];
    var columnIndex = cellIndexes[1];
    var _a = selection_2.getSortedRange(columnRange), startColumnIndex = _a[0], endColumnIndex = _a[1];
    for (var index = startColumnIndex; index <= endColumnIndex; index += 1) {
        var nextRowIndex = keyboard_1.getNextCellIndex(store, command, [currentRowIndex, index])[0];
        if ((command === 'up' && nextRowIndex < rowIndex) ||
            (command === 'down' && nextRowIndex > rowIndex)) {
            rowIndex = nextRowIndex;
        }
    }
    return [rowIndex, columnIndex];
}
function moveFocus(store, command) {
    var focus = store.focus, data = store.data, visibleColumns = store.column.visibleColumns, id = store.id;
    var viewData = data.viewData;
    var rowIndex = focus.rowIndex, columnIndex = focus.totalColumnIndex;
    if (rowIndex === null || columnIndex === null) {
        return;
    }
    var _a = keyboard_1.getNextCellIndex(store, command, [rowIndex, columnIndex]), nextRowIndex = _a[0], nextColumnIndex = _a[1];
    var nextColumnName = visibleColumns[nextColumnIndex].name;
    if (!column_1.isRowHeader(nextColumnName)) {
        focus.navigating = true;
        focus_1.changeFocus(focus, data, viewData[nextRowIndex].rowKey, nextColumnName, id);
    }
}
exports.moveFocus = moveFocus;
function editFocus(_a, command) {
    var column = _a.column, focus = _a.focus;
    var rowKey = focus.rowKey, columnName = focus.columnName;
    if (rowKey === null || columnName === null) {
        return;
    }
    if (command === 'currentCell') {
        var columnInfo = column.allColumnMap[columnName];
        if (columnInfo && columnInfo.editor) {
            focus.navigating = false;
            focus.editingAddress = { rowKey: rowKey, columnName: columnName };
        }
    }
}
exports.editFocus = editFocus;
function changeSelection(store, command) {
    var _a;
    var selection = store.selection, focus = store.focus, data = store.data, _b = store.column, visibleColumns = _b.visibleColumns, rowHeaderCount = _b.rowHeaderCount, id = store.id;
    var viewData = data.viewData, sortOptions = data.sortOptions;
    var focusRowIndex = focus.rowIndex, totalFocusColumnIndex = focus.totalColumnIndex;
    var currentInputRange = selection.inputRange;
    if (focusRowIndex === null || totalFocusColumnIndex === null) {
        return;
    }
    if (!currentInputRange) {
        currentInputRange = selection.inputRange = {
            row: [focusRowIndex, focusRowIndex],
            column: [totalFocusColumnIndex - rowHeaderCount, totalFocusColumnIndex - rowHeaderCount]
        };
    }
    var rowLength = viewData.length;
    var columnLength = visibleColumns.length;
    var rowStartIndex = currentInputRange.row[0];
    var rowIndex = currentInputRange.row[1];
    var columnStartIndex = currentInputRange.column[0];
    var columnIndex = currentInputRange.column[1];
    var nextCellIndexes;
    if (command === 'all') {
        rowStartIndex = 0;
        columnStartIndex = 0;
        nextCellIndexes = [rowLength - 1, columnLength - 1];
    }
    else {
        nextCellIndexes = keyboard_1.getNextCellIndex(store, command, [rowIndex, columnIndex]);
        if (rowSpan_1.enableRowSpan(sortOptions.columnName)) {
            nextCellIndexes = getNextCellIndexWithRowSpan(store, command, rowIndex, [columnStartIndex, columnIndex], nextCellIndexes);
        }
    }
    var nextRowIndex = nextCellIndexes[0], nextColumnIndex = nextCellIndexes[1];
    var startRowIndex = rowStartIndex;
    var endRowIndex = nextRowIndex;
    if (rowSpan_1.enableRowSpan(sortOptions.columnName)) {
        var rowRange = [startRowIndex, endRowIndex];
        var colRange = [columnStartIndex, nextColumnIndex];
        _a = rowSpan_1.getRowRangeWithRowSpan(rowRange, colRange, visibleColumns, focus.rowIndex, data), startRowIndex = _a[0], endRowIndex = _a[1];
    }
    var inputRange = {
        row: [startRowIndex, endRowIndex],
        column: [columnStartIndex, nextColumnIndex]
    };
    selection_1.changeSelectionRange(selection, inputRange, id);
}
exports.changeSelection = changeSelection;
function removeContent(store) {
    var column = store.column, data = store.data;
    var visibleColumns = column.visibleColumns;
    var rawData = data.rawData;
    var removeRange = keyboard_1.getRemoveRange(store);
    if (!removeRange) {
        return;
    }
    var _a = removeRange.column, columnStart = _a[0], columnEnd = _a[1], _b = removeRange.row, rowStart = _b[0], rowEnd = _b[1];
    visibleColumns
        .slice(columnStart, columnEnd + 1)
        .filter(function (_a) {
        var editor = _a.editor;
        return !!editor;
    })
        .forEach(function (_a) {
        var name = _a.name;
        rawData.slice(rowStart, rowEnd + 1).forEach(function (row) {
            row[name] = '';
        });
    });
}
exports.removeContent = removeContent;
function setFocusInfo(store, rowKey, columnName, navigating) {
    var focus = store.focus, id = store.id, data = store.data;
    focus.navigating = navigating;
    focus_1.changeFocus(focus, data, rowKey, columnName, id);
}
exports.setFocusInfo = setFocusInfo;
//# sourceMappingURL=keyboard.js.map