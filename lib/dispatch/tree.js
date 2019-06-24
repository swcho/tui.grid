"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var data_1 = require("../store/data");
var rowCoords_1 = require("../store/rowCoords");
var common_1 = require("../helper/common");
var observable_1 = require("../helper/observable");
var data_2 = require("../dispatch/data");
var tree_1 = require("../query/tree");
var tree_2 = require("../helper/tree");
var eventBus_1 = require("../event/eventBus");
var gridEvent_1 = tslib_1.__importDefault(require("../event/gridEvent"));
function changeExpandedState(row, expanded) {
    var tree = row._attributes.tree;
    if (tree) {
        tree.expanded = expanded;
    }
}
function changeHiddenChildState(row, hidden) {
    var tree = row._attributes.tree;
    if (tree) {
        tree.hiddenChild = hidden;
    }
}
function expand(store, row, recursive, silent) {
    var data = store.data, rowCoords = store.rowCoords, dimension = store.dimension;
    var rawData = data.rawData;
    var heights = rowCoords.heights;
    if (row) {
        if (!tree_2.isLeaf(row)) {
            changeExpandedState(row, true);
        }
        tree_2.traverseDescendantRows(rawData, row, function (childRow) {
            if (recursive) {
                changeExpandedState(childRow, true);
            }
            var parentRow = tree_1.getParentRow(store, childRow.rowKey);
            var hiddenChild = parentRow ? tree_2.getHiddenChildState(parentRow) : false;
            changeHiddenChildState(childRow, hiddenChild);
            var index = common_1.findPropIndex('rowKey', childRow.rowKey, rawData);
            heights[index] = rowCoords_1.getRowHeight(childRow, dimension.rowHeight);
        });
        if (silent) {
            observable_1.notify(rowCoords, 'heights');
        }
    }
}
function expandByRowKey(store, rowKey, recursive) {
    var row = common_1.findProp('rowKey', rowKey, store.data.rawData);
    if (row) {
        var eventBus = eventBus_1.getEventBus(store.id);
        var gridEvent = new gridEvent_1.default({ rowKey: rowKey });
        /**
         * Occurs when the row having child rows is expanded
         * @event Grid#expand
         * @type {module:event/gridEvent}
         * @property {number|string} rowKey - rowKey of the expanded row
         * @property {Grid} instance - Current grid instance
         */
        eventBus.trigger('expand', gridEvent);
        expand(store, row, recursive, true);
    }
}
exports.expandByRowKey = expandByRowKey;
function expandAll(store) {
    var data = store.data, rowCoords = store.rowCoords;
    data.rawData.forEach(function (row) {
        expand(store, row, true, false);
    });
    observable_1.notify(rowCoords, 'heights');
}
exports.expandAll = expandAll;
function collapse(store, row, recursive, silent) {
    var data = store.data, rowCoords = store.rowCoords;
    var rawData = data.rawData;
    var heights = rowCoords.heights;
    if (row) {
        if (!tree_2.isLeaf(row)) {
            changeExpandedState(row, false);
        }
        tree_2.traverseDescendantRows(rawData, row, function (childRow) {
            if (recursive) {
                changeExpandedState(childRow, false);
            }
            var parentRow = tree_1.getParentRow(store, childRow.rowKey);
            var hiddenChild = parentRow ? tree_2.getHiddenChildState(parentRow) : true;
            changeHiddenChildState(childRow, hiddenChild);
            var index = common_1.findPropIndex('rowKey', childRow.rowKey, rawData);
            heights[index] = 0;
        });
        if (silent) {
            observable_1.notify(rowCoords, 'heights');
        }
    }
}
function collapseByRowKey(store, rowKey, recursive) {
    var row = common_1.findProp('rowKey', rowKey, store.data.rawData);
    if (row) {
        var eventBus = eventBus_1.getEventBus(store.id);
        var gridEvent = new gridEvent_1.default({ rowKey: rowKey });
        /**
         * Occurs when the row having child rows is collapsed
         * @event Grid#collapse
         * @type {module:event/gridEvent}
         * @property {number|string} rowKey - rowKey of the collapsed row
         * @property {Grid} instance - Current grid instance
         */
        eventBus.trigger('collapse', gridEvent);
        collapse(store, row, recursive, true);
    }
}
exports.collapseByRowKey = collapseByRowKey;
function collapseAll(store) {
    var data = store.data, rowCoords = store.rowCoords;
    data.rawData.forEach(function (row) {
        collapse(store, row, true, false);
    });
    observable_1.notify(rowCoords, 'heights');
}
exports.collapseAll = collapseAll;
function setCheckedState(disabled, row, state) {
    if (row && data_2.isUpdatableRowAttr('checked', row._attributes.checkDisabled, disabled)) {
        row._attributes.checked = state;
    }
}
function changeAncestorRowsCheckedState(store, rowKey) {
    var _a = store.data, rawData = _a.rawData, disabled = _a.disabled;
    var row = common_1.findProp('rowKey', rowKey, rawData);
    if (row) {
        tree_2.traverseAncestorRows(rawData, row, function (parentRow) {
            var childRowKeys = tree_2.getChildRowKeys(parentRow);
            var checkedChildRows = childRowKeys.filter(function (childRowKey) {
                var childRow = common_1.findProp('rowKey', childRowKey, rawData);
                return !!childRow && childRow._attributes.checked;
            });
            var checked = childRowKeys.length === checkedChildRows.length;
            setCheckedState(disabled, parentRow, checked);
        });
    }
}
function changeDescendantRowsCheckedState(store, rowKey, state) {
    var _a = store.data, rawData = _a.rawData, disabled = _a.disabled;
    var row = common_1.findProp('rowKey', rowKey, rawData);
    if (row) {
        tree_2.traverseDescendantRows(rawData, row, function (childRow) {
            setCheckedState(disabled, childRow, state);
        });
    }
}
function changeTreeRowsCheckedState(store, rowKey, state) {
    var _a = store.column, treeColumnName = _a.treeColumnName, treeCascadingCheckbox = _a.treeCascadingCheckbox;
    if (treeColumnName && treeCascadingCheckbox) {
        changeDescendantRowsCheckedState(store, rowKey, state);
        changeAncestorRowsCheckedState(store, rowKey);
    }
}
exports.changeTreeRowsCheckedState = changeTreeRowsCheckedState;
function appendTreeRow(store, row, options) {
    var data = store.data, column = store.column, rowCoords = store.rowCoords, dimension = store.dimension;
    var rawData = data.rawData, viewData = data.viewData;
    var defaultValues = column.defaultValues, allColumnMap = column.allColumnMap, treeColumnName = column.treeColumnName, treeIcon = column.treeIcon;
    var heights = rowCoords.heights;
    var _a = options.parentRowKey, parentRowKey = _a === void 0 ? null : _a;
    var parentRowIdx, parentRow, startIdx;
    if (!common_1.isNull(parentRowKey)) {
        parentRowIdx = common_1.findPropIndex('rowKey', parentRowKey, rawData);
        parentRow = rawData[parentRowIdx];
        startIdx = parentRowIdx + tree_1.getDescendantRows(store, parentRow.rowKey).length + 1;
    }
    else {
        parentRow = null;
        startIdx = rawData.length;
    }
    var rawRows = tree_2.flattenTreeData([row], defaultValues, parentRow, column.keyColumnName);
    rawData.splice.apply(rawData, [startIdx, 0].concat(rawRows));
    var viewRows = rawRows.map(function (rawRow) {
        return data_1.createViewRow(rawRow, allColumnMap, rawData, treeColumnName, treeIcon);
    });
    viewData.splice.apply(viewData, [startIdx, 0].concat(viewRows));
    var rowHeights = rawRows.map(function (rawRow) { return rowCoords_1.getRowHeight(rawRow, dimension.rowHeight); });
    heights.splice.apply(heights, [startIdx, 0].concat(rowHeights));
    observable_1.notify(data, 'rawData');
    observable_1.notify(data, 'viewData');
    observable_1.notify(rowCoords, 'heights');
    // @todo net 연동
}
exports.appendTreeRow = appendTreeRow;
function removeTreeRow(store, rowKey, options) {
    var data = store.data, rowCoords = store.rowCoords;
    var rawData = data.rawData, viewData = data.viewData;
    var heights = rowCoords.heights;
    if (!common_1.isNull(rowKey)) {
        var parentRow = tree_1.getParentRow(store, rowKey);
        if (parentRow) {
            tree_2.removeChildRowKey(parentRow, parentRow.rowKey);
        }
    }
    var startIdx = common_1.findPropIndex('rowKey', rowKey, rawData);
    var endIdx = tree_1.getDescendantRows(store, rowKey).length + 1;
    rawData.splice(startIdx, endIdx);
    viewData.splice(startIdx, endIdx);
    heights.splice(startIdx, endIdx);
    observable_1.notify(data, 'rawData');
    observable_1.notify(data, 'viewData');
    observable_1.notify(rowCoords, 'heights');
    // @todo net 연동
}
exports.removeTreeRow = removeTreeRow;
//# sourceMappingURL=tree.js.map