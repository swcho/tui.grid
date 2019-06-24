"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getInvalidRows(_a) {
    var data = _a.data, column = _a.column;
    var invalidRows = [];
    data.viewData.forEach(function (_a) {
        var rowKey = _a.rowKey, valueMap = _a.valueMap;
        var invalidColumns = column.validationColumns.filter(function (_a) {
            var name = _a.name;
            return !!valueMap[name].invalidState;
        });
        if (invalidColumns.length) {
            var errors = invalidColumns.map(function (_a) {
                var name = _a.name;
                return ({
                    columnName: name,
                    errorCode: valueMap[name].invalidState
                });
            });
            invalidRows.push({ rowKey: rowKey, errors: errors });
        }
    });
    return invalidRows;
}
exports.getInvalidRows = getInvalidRows;
//# sourceMappingURL=validation.js.map