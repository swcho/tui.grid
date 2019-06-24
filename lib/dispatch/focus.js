"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var gridEvent_1 = tslib_1.__importDefault(require("../event/gridEvent"));
var eventBus_1 = require("../event/eventBus");
var data_1 = require("../query/data");
var focus_1 = require("../query/focus");
var rowSpan_1 = require("../helper/rowSpan");
function startEditing(store, rowKey, columnName) {
    var data = store.data, focus = store.focus, column = store.column;
    if (data_1.isCellDisabled(data, rowKey, columnName) || !focus_1.isFocusedCell(focus, rowKey, columnName)) {
        return;
    }
    var columnInfo = column.allColumnMap[columnName];
    if (columnInfo && columnInfo.editor) {
        focus.navigating = false;
        focus.editingAddress = { rowKey: rowKey, columnName: columnName };
    }
}
exports.startEditing = startEditing;
function finishEditing(_a, rowKey, columnName) {
    var focus = _a.focus;
    var editingAddress = focus.editingAddress;
    if (editingAddress &&
        editingAddress.rowKey === rowKey &&
        editingAddress.columnName === columnName) {
        focus.editingAddress = null;
        focus.navigating = true;
    }
}
exports.finishEditing = finishEditing;
function changeFocus(focus, data, rowKey, columnName, id) {
    if (focus_1.isFocusedCell(focus, rowKey, columnName)) {
        return;
    }
    var rawData = data.rawData, sortOptions = data.sortOptions;
    var eventBus = eventBus_1.getEventBus(id);
    var gridEvent = new gridEvent_1.default({
        rowKey: rowKey,
        columnName: columnName,
        prevColumnName: focus.columnName,
        prevRowKey: focus.rowKey
    });
    eventBus.trigger('focusChange', gridEvent);
    if (!gridEvent.isStopped()) {
        var focusRowKey = rowKey;
        if (rowKey && columnName && rowSpan_1.enableRowSpan(sortOptions.columnName)) {
            var rowSpan = rowSpan_1.getRowSpanByRowKey(rowKey, columnName, rawData);
            if (rowSpan) {
                focusRowKey = rowSpan.mainRowKey;
            }
        }
        focus.prevColumnName = focus.columnName;
        focus.prevRowKey = focus.rowKey;
        focus.columnName = columnName;
        focus.rowKey = focusRowKey;
    }
}
exports.changeFocus = changeFocus;
//# sourceMappingURL=focus.js.map