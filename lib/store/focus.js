"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("../helper/observable");
var common_1 = require("../helper/common");
var rowSpan_1 = require("../helper/rowSpan");
function create(_a) {
    var column = _a.column, data = _a.data, rowCoords = _a.rowCoords, columnCoords = _a.columnCoords, editingEvent = _a.editingEvent;
    return observable_1.observable({
        rowKey: null,
        columnName: null,
        prevRowKey: null,
        prevColumnName: null,
        editingAddress: null,
        editingEvent: editingEvent,
        navigating: false,
        get side() {
            if (this.columnName === null) {
                return null;
            }
            return common_1.someProp('name', this.columnName, column.visibleColumnsBySide.R) ? 'R' : 'L';
        },
        get columnIndex() {
            var _a = this, columnName = _a.columnName, side = _a.side;
            if (columnName === null || side === null) {
                return null;
            }
            return common_1.findPropIndex('name', columnName, column.visibleColumnsBySide[side]);
        },
        get totalColumnIndex() {
            var visibleColumnsBySide = column.visibleColumnsBySide;
            var _a = this, columnIndex = _a.columnIndex, side = _a.side;
            if (columnIndex === null) {
                return columnIndex;
            }
            return side === 'R' ? columnIndex + visibleColumnsBySide.L.length : columnIndex;
        },
        get rowIndex() {
            var rowKey = this.rowKey;
            if (rowKey === null) {
                return null;
            }
            return common_1.findPropIndex('rowKey', rowKey, data.rawData);
        },
        get cellPosRect() {
            var _a = this, columnIndex = _a.columnIndex, rowIndex = _a.rowIndex, side = _a.side, columnName = _a.columnName;
            var rawData = data.rawData, sortOptions = data.sortOptions;
            if (columnIndex === null || rowIndex === null || side === null || columnName === null) {
                return null;
            }
            var left = columnCoords.offsets[side][columnIndex];
            var right = left + columnCoords.widths[side][columnIndex];
            var top = rowCoords.offsets[rowIndex];
            var bottom = top + rowCoords.heights[rowIndex];
            var rowSpan = rowSpan_1.getRowSpan(rowIndex, columnName, rawData);
            if (rowSpan_1.enableRowSpan(sortOptions.columnName) && rowSpan) {
                var verticalPos = rowSpan_1.getVerticalPosWithRowSpan(columnName, rowSpan, rowCoords, rawData);
                return { left: left, right: right, top: verticalPos[0], bottom: verticalPos[1] };
            }
            return { left: left, right: right, top: top, bottom: bottom };
        }
    });
}
exports.create = create;
//# sourceMappingURL=focus.js.map