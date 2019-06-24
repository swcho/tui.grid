"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var common_1 = require("../helper/common");
var eventBus_1 = require("../event/eventBus");
var selection_1 = require("../helper/selection");
var gridEvent_1 = tslib_1.__importDefault(require("../event/gridEvent"));
var rowSpan_1 = require("../helper/rowSpan");
function changeSelectionRange(selection, inputRange, id) {
    if (!selection_1.isSameInputRange(selection.inputRange, inputRange)) {
        selection.inputRange = inputRange;
        var eventBus = eventBus_1.getEventBus(id);
        var gridEvent = new gridEvent_1.default({ range: selection.range });
        eventBus.trigger('selection', gridEvent);
    }
}
exports.changeSelectionRange = changeSelectionRange;
function setSelection(store, range) {
    var _a;
    var selection = store.selection, data = store.data, visibleColumns = store.column.visibleColumns, id = store.id;
    var viewData = data.viewData, sortOptions = data.sortOptions;
    var rowLength = viewData.length;
    var columnLength = visibleColumns.length;
    var startRowIndex = common_1.clamp(range.start[0], 0, rowLength - 1);
    var endRowIndex = common_1.clamp(range.end[0], 0, rowLength - 1);
    var startColumnIndex = common_1.clamp(range.start[1], 0, columnLength - 1);
    var endColumnIndex = common_1.clamp(range.end[1], 0, columnLength - 1);
    if (rowSpan_1.enableRowSpan(sortOptions.columnName)) {
        var rowRange = [startRowIndex, endRowIndex];
        var colRange = [startColumnIndex, endColumnIndex];
        _a = rowSpan_1.getRowRangeWithRowSpan(rowRange, colRange, visibleColumns, null, data), startRowIndex = _a[0], endRowIndex = _a[1];
    }
    var inputRange = {
        row: [startRowIndex, endRowIndex],
        column: [startColumnIndex, endColumnIndex]
    };
    changeSelectionRange(selection, inputRange, id);
}
exports.setSelection = setSelection;
//# sourceMappingURL=selection.js.map