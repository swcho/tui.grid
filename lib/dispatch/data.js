"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var clipboard_1 = require("../query/clipboard");
var common_1 = require("../helper/common");
var sort_1 = require("../helper/sort");
var clipboard_2 = require("../helper/clipboard");
var data_1 = require("../store/data");
var observable_1 = require("../helper/observable");
var rowCoords_1 = require("../store/rowCoords");
var selection_1 = require("./selection");
var eventBus_1 = require("../event/eventBus");
var gridEvent_1 = tslib_1.__importDefault(require("../event/gridEvent"));
var instance_1 = require("../instance");
var tree_1 = require("./tree");
var rowSpan_1 = require("../helper/rowSpan");
var renderState_1 = require("../helper/renderState");
function setValue(_a, rowKey, columnName, value) {
    var column = _a.column, data = _a.data, id = _a.id;
    var rawData = data.rawData, sortOptions = data.sortOptions;
    var targetRow = common_1.findProp('rowKey', rowKey, rawData);
    if (!targetRow || targetRow[columnName] === value) {
        return;
    }
    var targetColumn = common_1.findProp('name', columnName, column.visibleColumns);
    var gridEvent = new gridEvent_1.default({ rowKey: rowKey, columnName: columnName, value: value });
    if (targetColumn && targetColumn.onBeforeChange) {
        targetColumn.onBeforeChange(gridEvent);
    }
    if (gridEvent.isStopped()) {
        return;
    }
    if (targetRow) {
        var rowSpanMap = targetRow.rowSpanMap;
        targetRow[columnName] = value;
        instance_1.getDataManager(id).push('UPDATE', targetRow);
        if (!common_1.isEmpty(rowSpanMap) && rowSpan_1.enableRowSpan(sortOptions.columnName)) {
            var spanCount = rowSpanMap[columnName].spanCount;
            var mainRowIndex = common_1.findPropIndex('rowKey', rowKey, rawData);
            // update sub rows value
            for (var count = 1; count < spanCount; count += 1) {
                rawData[mainRowIndex + count][columnName] = value;
                instance_1.getDataManager(id).push('UPDATE', rawData[mainRowIndex + count]);
            }
        }
    }
    if (targetColumn && targetColumn.onAfterChange) {
        gridEvent = new gridEvent_1.default({ rowKey: rowKey, columnName: columnName, value: value });
        targetColumn.onAfterChange(gridEvent);
    }
}
exports.setValue = setValue;
function isUpdatableRowAttr(name, checkDisabled, allDisabled) {
    return !(name === 'checked' && (checkDisabled || allDisabled));
}
exports.isUpdatableRowAttr = isUpdatableRowAttr;
function setRowAttribute(_a, rowKey, attrName, value) {
    var data = _a.data;
    var disabled = data.disabled, rawData = data.rawData;
    var targetRow = common_1.findProp('rowKey', rowKey, rawData);
    if (targetRow && isUpdatableRowAttr(attrName, targetRow._attributes.checkDisabled, disabled)) {
        targetRow._attributes[attrName] = value;
    }
}
exports.setRowAttribute = setRowAttribute;
function setAllRowAttribute(_a, attrName, value) {
    var data = _a.data;
    data.rawData.forEach(function (row) {
        if (isUpdatableRowAttr(attrName, row._attributes.checkDisabled, data.disabled)) {
            row._attributes[attrName] = value;
        }
    });
}
exports.setAllRowAttribute = setAllRowAttribute;
function setColumnValues(store, columnName, value, checkCellState) {
    if (checkCellState === void 0) { checkCellState = false; }
    // @TODO Check Cell State
    store.data.rawData.forEach(function (targetRow) {
        targetRow[columnName] = value;
    });
}
exports.setColumnValues = setColumnValues;
function check(store, rowKey) {
    var _a = store.column, allColumnMap = _a.allColumnMap, _b = _a.treeColumnName, treeColumnName = _b === void 0 ? '' : _b;
    var eventBus = eventBus_1.getEventBus(store.id);
    var gridEvent = new gridEvent_1.default({ rowKey: rowKey });
    /**
     * Occurs when a checkbox in row header is checked
     * @event Grid#check
     * @property {number | string} rowKey - rowKey of the checked row
     * @property {Grid} instance - Current grid instance
     */
    eventBus.trigger('check', gridEvent);
    setRowAttribute(store, rowKey, 'checked', true);
    if (allColumnMap[treeColumnName]) {
        tree_1.changeTreeRowsCheckedState(store, rowKey, true);
    }
}
exports.check = check;
function uncheck(store, rowKey) {
    var _a = store.column, allColumnMap = _a.allColumnMap, _b = _a.treeColumnName, treeColumnName = _b === void 0 ? '' : _b;
    var eventBus = eventBus_1.getEventBus(store.id);
    var gridEvent = new gridEvent_1.default({ rowKey: rowKey });
    /**
     * Occurs when a checkbox in row header is unchecked
     * @event Grid#uncheck
     * @property {number | string} rowKey - rowKey of the unchecked row
     * @property {Grid} instance - Current grid instance
     */
    eventBus.trigger('uncheck', gridEvent);
    setRowAttribute(store, rowKey, 'checked', false);
    if (allColumnMap[treeColumnName]) {
        tree_1.changeTreeRowsCheckedState(store, rowKey, false);
    }
}
exports.uncheck = uncheck;
function checkAll(store) {
    setAllRowAttribute(store, 'checked', true);
}
exports.checkAll = checkAll;
function uncheckAll(store) {
    setAllRowAttribute(store, 'checked', false);
}
exports.uncheckAll = uncheckAll;
function changeSortBtn(_a, columnName, ascending) {
    var data = _a.data;
    var sortOptions = data.sortOptions;
    if (sortOptions.columnName !== columnName || sortOptions.ascending !== ascending) {
        data.sortOptions = tslib_1.__assign({}, sortOptions, { columnName: columnName, ascending: ascending });
    }
}
exports.changeSortBtn = changeSortBtn;
function sort(store, columnName, ascending) {
    var data = store.data;
    var sortOptions = data.sortOptions;
    if (!sortOptions.useClient) {
        return;
    }
    changeSortBtn(store, columnName, ascending);
    var _a = sort_1.getSortedData(data, columnName, ascending), rawData = _a.rawData, viewData = _a.viewData;
    if (!common_1.arrayEqual(rawData, data.rawData)) {
        data.rawData = rawData;
        data.viewData = viewData;
    }
}
exports.sort = sort;
function applyPasteDataToRawData(store, pasteData, indexToPaste) {
    var _a = store.data, rawData = _a.rawData, viewData = _a.viewData, visibleColumns = store.column.visibleColumns, id = store.id;
    var _b = indexToPaste.row, startRowIndex = _b[0], endRowIndex = _b[1], _c = indexToPaste.column, startColumnIndex = _c[0], endColumnIndex = _c[1];
    var columnNames = common_1.mapProp('name', visibleColumns);
    for (var rowIdx = 0; rowIdx + startRowIndex <= endRowIndex; rowIdx += 1) {
        var pasted = false;
        var rawRowIndex = rowIdx + startRowIndex;
        for (var columnIdx = 0; columnIdx + startColumnIndex <= endColumnIndex; columnIdx += 1) {
            var name_1 = columnNames[columnIdx + startColumnIndex];
            if (clipboard_2.isColumnEditable(viewData, rawRowIndex, name_1)) {
                pasted = true;
                rawData[rawRowIndex][name_1] = pasteData[rowIdx][columnIdx];
            }
        }
        if (pasted) {
            instance_1.getDataManager(id).push('UPDATE', rawData[rawRowIndex]);
        }
    }
}
function paste(store, pasteData) {
    var selection = store.selection, id = store.id;
    if (selection.range) {
        pasteData = clipboard_1.copyDataToRange(selection.range, pasteData);
    }
    var rangeToPaste = clipboard_1.getRangeToPaste(store, pasteData);
    applyPasteDataToRawData(store, pasteData, rangeToPaste);
    selection_1.changeSelectionRange(selection, rangeToPaste, id);
}
exports.paste = paste;
function setDisabled(store, disabled) {
    store.data.disabled = disabled;
}
exports.setDisabled = setDisabled;
function setRowDisabled(store, disabled, rowKey, withCheckbox) {
    var rawData = store.data.rawData;
    var row = common_1.findProp('rowKey', rowKey, rawData);
    if (row) {
        row._attributes.disabled = disabled;
        if (withCheckbox) {
            row._attributes.checkDisabled = disabled;
        }
    }
}
exports.setRowDisabled = setRowDisabled;
function setRowCheckDisabled(store, disabled, rowKey) {
    var rawData = store.data.rawData;
    var row = common_1.findProp('rowKey', rowKey, rawData);
    if (row) {
        row._attributes.checkDisabled = disabled;
    }
}
exports.setRowCheckDisabled = setRowCheckDisabled;
function appendRow(_a, row, options) {
    var data = _a.data, column = _a.column, rowCoords = _a.rowCoords, dimension = _a.dimension, id = _a.id, renderState = _a.renderState;
    var rawData = data.rawData, viewData = data.viewData, sortOptions = data.sortOptions;
    var heights = rowCoords.heights;
    var defaultValues = column.defaultValues, allColumnMap = column.allColumnMap;
    var _b = options.at, at = _b === void 0 ? rawData.length : _b;
    var prevRow = rawData[at - 1];
    var rawRow = data_1.createRawRow(row, rawData.length, defaultValues);
    var viewRow = data_1.createViewRow(rawRow, allColumnMap, rawData);
    rawData.splice(at, 0, rawRow);
    viewData.splice(at, 0, viewRow);
    heights.splice(at, 0, rowCoords_1.getRowHeight(rawRow, dimension.rowHeight));
    if (prevRow && rowSpan_1.enableRowSpan(sortOptions.columnName)) {
        rowSpan_1.updateRowSpanWhenAppend(rawData, prevRow, options.extendPrevRowSpan || false);
    }
    observable_1.notify(data, 'rawData');
    observable_1.notify(data, 'viewData');
    observable_1.notify(rowCoords, 'heights');
    renderState.state = 'DONE';
    instance_1.getDataManager(id).push('CREATE', rawRow);
}
exports.appendRow = appendRow;
function removeRow(_a, rowKey, options) {
    var data = _a.data, rowCoords = _a.rowCoords, id = _a.id, renderState = _a.renderState;
    var rawData = data.rawData, viewData = data.viewData, sortOptions = data.sortOptions;
    var heights = rowCoords.heights;
    var rowIdx = common_1.findPropIndex('rowKey', rowKey, rawData);
    var nextRow = rawData[rowIdx + 1];
    var removedRow = rawData.splice(rowIdx, 1);
    viewData.splice(rowIdx, 1);
    heights.splice(rowIdx, 1);
    if (nextRow && rowSpan_1.enableRowSpan(sortOptions.columnName)) {
        rowSpan_1.updateRowSpanWhenRemove(rawData, removedRow[0], nextRow, options.keepRowSpanData || false);
    }
    observable_1.notify(data, 'rawData');
    observable_1.notify(data, 'viewData');
    observable_1.notify(rowCoords, 'heights');
    renderState.state = renderState_1.getRenderState(data.rawData);
    instance_1.getDataManager(id).push('DELETE', removedRow[0]);
}
exports.removeRow = removeRow;
function clearData(_a) {
    var data = _a.data, id = _a.id, renderState = _a.renderState;
    data.rawData.forEach(function (row) {
        instance_1.getDataManager(id).push('DELETE', row);
    });
    data.rawData = [];
    data.viewData = [];
    renderState.state = 'EMPTY';
}
exports.clearData = clearData;
function resetData(_a, inputData) {
    var data = _a.data, column = _a.column, dimension = _a.dimension, rowCoords = _a.rowCoords, id = _a.id, renderState = _a.renderState;
    var _b = data_1.createData(inputData, column), rawData = _b.rawData, viewData = _b.viewData;
    var rowHeight = dimension.rowHeight;
    data.rawData = rawData;
    data.viewData = viewData;
    rowCoords.heights = rawData.map(function (row) { return rowCoords_1.getRowHeight(row, rowHeight); });
    renderState.state = renderState_1.getRenderState(rawData);
    // @TODO need to execute logic by condition
    instance_1.getDataManager(id).setOriginData(inputData);
    instance_1.getDataManager(id).clearAll();
}
exports.resetData = resetData;
function addRowClassName(store, rowKey, className) {
    var rawData = store.data.rawData;
    var row = common_1.findProp('rowKey', rowKey, rawData);
    if (row) {
        var rowClassMap = row._attributes.className.row;
        var isExist = common_1.includes(rowClassMap, className);
        if (!isExist) {
            rowClassMap.push(className);
            observable_1.notify(row._attributes, 'className');
        }
    }
}
exports.addRowClassName = addRowClassName;
function removeRowClassName(store, rowKey, className) {
    var rawData = store.data.rawData;
    var row = common_1.findProp('rowKey', rowKey, rawData);
    if (row) {
        common_1.removeArrayItem(className, row._attributes.className.row);
        observable_1.notify(row._attributes, 'className');
    }
}
exports.removeRowClassName = removeRowClassName;
function addCellClassName(store, rowKey, columnName, className) {
    var rawData = store.data.rawData;
    var row = common_1.findProp('rowKey', rowKey, rawData);
    if (row) {
        var columnClassMap = row._attributes.className.column;
        if (common_1.isUndefined(columnClassMap[columnName])) {
            columnClassMap[columnName] = [className];
        }
        else {
            var isExist = common_1.includes(columnClassMap[columnName], className);
            if (!isExist) {
                columnClassMap[columnName].push(className);
            }
        }
        observable_1.notify(row._attributes, 'className');
    }
}
exports.addCellClassName = addCellClassName;
function removeCellClassName(store, rowKey, columnName, className) {
    var rawData = store.data.rawData;
    var row = common_1.findProp('rowKey', rowKey, rawData);
    if (row) {
        var columnClassMap = row._attributes.className.column;
        if (common_1.isUndefined(columnClassMap[columnName])) {
            return;
        }
        common_1.removeArrayItem(className, columnClassMap[columnName]);
        observable_1.notify(row._attributes, 'className');
    }
}
exports.removeCellClassName = removeCellClassName;
function setRowHeight(_a, rowIndex, rowHeight) {
    var data = _a.data, rowCoords = _a.rowCoords;
    data.rawData[rowIndex]._attributes.height = rowHeight;
    rowCoords.heights[rowIndex] = rowHeight;
    observable_1.notify(rowCoords, 'heights');
}
exports.setRowHeight = setRowHeight;
function setPagination(_a, pageOptions) {
    var data = _a.data;
    var perPage = data.pageOptions.perPage;
    data.pageOptions = tslib_1.__assign({}, pageOptions, { perPage: perPage });
}
exports.setPagination = setPagination;
function changeColumnHeadersByName(_a, columnsMap) {
    var column = _a.column;
    var complexHeaderColumns = column.complexHeaderColumns, allColumnMap = column.allColumnMap;
    Object.keys(columnsMap).forEach(function (columnName) {
        var col = allColumnMap[columnName];
        if (col) {
            col.header = columnsMap[columnName];
        }
        if (complexHeaderColumns.length) {
            var complexCol = common_1.findProp('name', columnName, complexHeaderColumns);
            if (complexCol) {
                complexCol.header = columnsMap[columnName];
            }
        }
    });
    observable_1.notify(column, 'allColumns');
}
exports.changeColumnHeadersByName = changeColumnHeadersByName;
//# sourceMappingURL=data.js.map