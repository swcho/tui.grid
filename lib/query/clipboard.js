"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clipboard_1 = require("../helper/clipboard");
function getRangeToPaste(store, pasteData) {
    var range = store.selection.range, _a = store.focus, rowIndex = _a.rowIndex, totalColumnIndex = _a.totalColumnIndex, visibleColumns = store.column.visibleColumns, viewData = store.data.viewData;
    var startRowIndex, startColumnIndex;
    if (range) {
        startRowIndex = range.row[0];
        startColumnIndex = range.column[0];
    }
    else {
        startRowIndex = rowIndex;
        startColumnIndex = totalColumnIndex;
    }
    var endRowIndex = Math.min(pasteData.length + startRowIndex, viewData.length) - 1;
    var endColumnIndex = Math.min(pasteData[0].length + startColumnIndex, visibleColumns.length) - 1;
    return {
        row: [startRowIndex, endRowIndex],
        column: [startColumnIndex, endColumnIndex]
    };
}
exports.getRangeToPaste = getRangeToPaste;
function copyDataToRange(range, pasteData) {
    var rowLength = range.row[1] - range.row[0] + 1;
    var colLength = range.column[1] - range.column[0] + 1;
    var dataRowLength = pasteData.length;
    var dataColLength = pasteData[0].length;
    var rowDupCount = Math.floor(rowLength / dataRowLength) - 1;
    var colDupCount = Math.floor(colLength / dataColLength) - 1;
    var result = pasteData.slice();
    for (var i = 0; i < rowDupCount; i += 1) {
        pasteData.forEach(function (row) {
            result.push(row.slice(0));
        });
    }
    result.forEach(function (row) {
        var rowData = row.slice(0);
        for (var i = 0; i < colDupCount; i += 1) {
            row.push.apply(row, rowData);
        }
    });
    return result;
}
exports.copyDataToRange = copyDataToRange;
function getValueToString(store) {
    var visibleColumns = store.column.visibleColumns, _a = store.focus, rowIndex = _a.rowIndex, columnName = _a.columnName, totalColumnIndex = _a.totalColumnIndex, _b = store.data, viewData = _b.viewData, rawData = _b.rawData;
    if (rowIndex === null || columnName === null || totalColumnIndex === null) {
        return '';
    }
    var valueMap = viewData[rowIndex].valueMap[columnName];
    return clipboard_1.getTextWithCopyOptionsApplied(valueMap, rawData, visibleColumns[totalColumnIndex]);
}
function getValuesToString(store) {
    var range = store.selection.range, visibleColumns = store.column.visibleColumns, _a = store.data, viewData = _a.viewData, rawData = _a.rawData;
    if (!range) {
        return '';
    }
    var row = range.row, column = range.column;
    var rowList = viewData.slice(row[0], row[1] + 1);
    var columnInRange = visibleColumns.slice(column[0], column[1] + 1);
    return rowList
        .map(function (_a) {
        var valueMap = _a.valueMap;
        return columnInRange
            .map(function (_a, index) {
            var name = _a.name;
            return clipboard_1.getTextWithCopyOptionsApplied(valueMap[name], rawData, visibleColumns[index]);
        })
            .join('\t');
    })
        .join('\n');
}
function getText(store) {
    var selection = store.selection, _a = store.focus, rowIndex = _a.rowIndex, columnName = _a.columnName;
    if (selection.range) {
        return getValuesToString(store);
    }
    if (rowIndex !== null && columnName !== null) {
        return getValueToString(store);
    }
    return '';
}
exports.getText = getText;
//# sourceMappingURL=clipboard.js.map