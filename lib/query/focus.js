"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isFocusedCell(focus, rowKey, columnName) {
    return rowKey === focus.rowKey && columnName === focus.columnName;
}
exports.isFocusedCell = isFocusedCell;
//# sourceMappingURL=focus.js.map