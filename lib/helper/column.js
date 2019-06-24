"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
function isRowHeader(columnName) {
    return ['_number', '_checked'].indexOf(columnName) > -1;
}
exports.isRowHeader = isRowHeader;
function isRowNumColumn(columnName) {
    return columnName === '_number';
}
exports.isRowNumColumn = isRowNumColumn;
function isCheckboxColumn(columnName) {
    return columnName === '_checked';
}
exports.isCheckboxColumn = isCheckboxColumn;
function isParentColumnHeader(complexHeaderColumns, name) {
    return !!complexHeaderColumns.length && common_1.some(function (item) { return item.name === name; }, complexHeaderColumns);
}
exports.isParentColumnHeader = isParentColumnHeader;
//# sourceMappingURL=column.js.map