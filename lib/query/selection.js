"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../helper/common");
var column_1 = require("../helper/column");
function sortByVisibleColumns(visibleColumns, childNames) {
    var result = [];
    visibleColumns.forEach(function (column) {
        if (common_1.includes(childNames, column.name)) {
            result.push(column.name);
        }
    });
    return result;
}
function getLeafChildColumnNames(complexHeaderColumns, name) {
    var column = common_1.findProp('name', name, complexHeaderColumns);
    if (!column) {
        return [name];
    }
    var result = [];
    column.childNames.forEach(function (childName) {
        if (column_1.isParentColumnHeader(complexHeaderColumns, childName)) {
            result = result.concat(getLeafChildColumnNames(complexHeaderColumns, childName));
        }
        else {
            result = result.concat([childName]);
        }
    });
    return result;
}
exports.getLeafChildColumnNames = getLeafChildColumnNames;
function getChildColumnRange(visibleColumns, complexHeaderColumns, name, rowHeaderCount) {
    var unsortedChildNames = getLeafChildColumnNames(complexHeaderColumns, name);
    var childNames = sortByVisibleColumns(visibleColumns, unsortedChildNames);
    var startIndex = common_1.findPropIndex('name', childNames[0], visibleColumns) - rowHeaderCount;
    var endIndex = common_1.findPropIndex('name', childNames[childNames.length - 1], visibleColumns) - rowHeaderCount;
    return [startIndex, endIndex];
}
exports.getChildColumnRange = getChildColumnRange;
//# sourceMappingURL=selection.js.map