"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var column_1 = require("../store/column");
var data_1 = require("../store/data");
function setFrozenColumnCount(_a, count) {
    var column = _a.column;
    column.frozenCount = count;
}
exports.setFrozenColumnCount = setFrozenColumnCount;
function setColumnWidth(_a, side, index, width) {
    var column = _a.column;
    var columnItem = column.visibleColumnsBySide[side][index];
    columnItem.baseWidth = width;
    columnItem.fixedWidth = true;
}
exports.setColumnWidth = setColumnWidth;
function setColumns(_a, optColumns) {
    var column = _a.column, data = _a.data;
    var _b = column.dataForColumnCreation, columnOptions = _b.columnOptions, copyOptions = _b.copyOptions, treeColumnOptions = _b.treeColumnOptions, rowHeaders = _b.rowHeaders;
    var relationColumns = optColumns.reduce(function (acc, _a) {
        var _b = _a.relations, relations = _b === void 0 ? [] : _b;
        return acc
            .concat(column_1.getRelationColumns(relations))
            .filter(function (columnName, idx) { return acc.indexOf(columnName) === idx; });
    }, []);
    var columnInfos = optColumns.map(function (optColumn) {
        return column_1.createColumn(optColumn, columnOptions, relationColumns, copyOptions, treeColumnOptions);
    });
    column.allColumns = rowHeaders.concat(columnInfos);
    var allColumnMap = column.allColumnMap;
    var rawData = data.rawData;
    data.viewData.forEach(function (viewRow) {
        viewRow.__unobserveFns__.forEach(function (fn) { return fn(); });
    });
    data.viewData = rawData.map(function (row) { return data_1.createViewRow(row, allColumnMap, rawData); });
}
exports.setColumns = setColumns;
function resetColumnWidths(_a, widths) {
    var column = _a.column;
    column.visibleColumns.forEach(function (columnInfo, idx) {
        columnInfo.baseWidth = widths[idx];
    });
}
exports.resetColumnWidths = resetColumnWidths;
function hideColumn(_a, columnName) {
    var column = _a.column;
    var columnItem = column.allColumnMap[columnName];
    if (columnItem) {
        columnItem.hidden = true;
    }
}
exports.hideColumn = hideColumn;
function showColumn(_a, columnName) {
    var column = _a.column;
    var columnItem = column.allColumnMap[columnName];
    if (columnItem) {
        columnItem.hidden = false;
    }
}
exports.showColumn = showColumn;
function setComplexHeaderColumns(store, complexHeaderColumns) {
    store.column.complexHeaderColumns = complexHeaderColumns;
}
exports.setComplexHeaderColumns = setComplexHeaderColumns;
//# sourceMappingURL=column.js.map