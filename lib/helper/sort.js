"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
function comparator(valueA, valueB, ascending) {
    var isBlankA = common_1.isBlank(valueA);
    var isBlankB = common_1.isBlank(valueB);
    var result = 0;
    if (isBlankA && !isBlankB) {
        result = -1;
    }
    else if (!isBlankA && isBlankB) {
        result = 1;
    }
    else if (valueA < valueB) {
        result = -1;
    }
    else if (valueA > valueB) {
        result = 1;
    }
    return ascending ? result : -result;
}
exports.comparator = comparator;
function getSortedData(data, sortKey, ascending) {
    var rawData = data.rawData.slice();
    var viewData = data.viewData.slice();
    rawData.sort(function (a, b) { return comparator(a[sortKey], b[sortKey], ascending); });
    viewData.sort(function (a, b) {
        var _a = sortKey === 'rowKey'
            ? [a.rowKey, b.rowKey]
            : [a.valueMap[sortKey].value, b.valueMap[sortKey].value], valueA = _a[0], valueB = _a[1];
        return comparator(valueA, valueB, ascending);
    });
    return { rawData: rawData, viewData: viewData };
}
exports.getSortedData = getSortedData;
//# sourceMappingURL=sort.js.map