"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("../helper/common");
function getCellAddressByIndex(_a, rowIndex, columnIndex) {
    var data = _a.data, column = _a.column;
    return {
        rowKey: data.viewData[rowIndex].rowKey,
        columnName: column.visibleColumns[columnIndex].name
    };
}
exports.getCellAddressByIndex = getCellAddressByIndex;
function isCellDisabled(data, rowKey, columnName) {
    var viewData = data.viewData, disabled = data.disabled;
    var row = common_1.findProp('rowKey', rowKey, viewData);
    var rowDisabled = row.valueMap[columnName].disabled;
    return disabled || rowDisabled;
}
exports.isCellDisabled = isCellDisabled;
function getCheckedRows(_a) {
    var data = _a.data;
    return data.rawData.filter(function (_a) {
        var _attributes = _a._attributes;
        return _attributes.checked;
    });
}
exports.getCheckedRows = getCheckedRows;
function getConditionalRows(_a, conditions) {
    var data = _a.data;
    var rawData = data.rawData;
    if (common_1.isFunction(conditions)) {
        return rawData.filter(conditions);
    }
    var result = rawData;
    Object.keys(conditions).forEach(function (key) {
        result = result.filter(function (row) { return row[key] === conditions[key]; });
    });
    return result;
}
exports.getConditionalRows = getConditionalRows;
//# sourceMappingURL=data.js.map