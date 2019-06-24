"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var observable_1 = require("../helper/observable");
var column_1 = require("../helper/column");
var common_1 = require("../helper/common");
var listItemText_1 = require("../formatter/listItemText");
var tree_1 = require("../helper/tree");
var rowSpan_1 = require("../helper/rowSpan");
function getCellDisplayValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return String(value);
}
exports.getCellDisplayValue = getCellDisplayValue;
function getFormattedValue(props, formatter, defaultValue, relationListItems) {
    var value;
    if (formatter === 'listItemText') {
        value = listItemText_1.listItemText(props, relationListItems);
    }
    else if (typeof formatter === 'function') {
        value = formatter(props);
    }
    else if (typeof formatter === 'string') {
        value = formatter;
    }
    else {
        value = defaultValue;
    }
    var strValue = getCellDisplayValue(value);
    if (strValue && props.column.escapeHTML) {
        return common_1.encodeHTMLEntity(strValue);
    }
    return strValue;
}
function getRelationCbResult(fn, relationParams) {
    var result = common_1.isFunction(fn) ? fn(relationParams) : null;
    return common_1.isUndefined(result) ? null : result;
}
function getEditable(fn, relationParams) {
    var result = getRelationCbResult(fn, relationParams);
    return result === null ? true : result;
}
function getDisabled(fn, relationParams) {
    var result = getRelationCbResult(fn, relationParams);
    return result === null ? false : result;
}
function getListItems(fn, relationParams) {
    return getRelationCbResult(fn, relationParams);
}
function getRowHeaderValue(row, columnName) {
    if (column_1.isRowNumColumn(columnName)) {
        return row._attributes.rowNum;
    }
    if (column_1.isCheckboxColumn(columnName)) {
        return row._attributes.checked;
    }
    return '';
}
function getValidationCode(value, validation) {
    if (validation && validation.required && common_1.isBlank(value)) {
        return 'REQUIRED';
    }
    if (validation && validation.dataType === 'string' && !common_1.isString(value)) {
        return 'TYPE_STRING';
    }
    if (validation && validation.dataType === 'number' && !common_1.isNumber(value)) {
        return 'TYPE_NUMBER';
    }
    return '';
}
function createViewCell(row, column, relationMatched, relationListItems) {
    if (relationMatched === void 0) { relationMatched = true; }
    var name = column.name, formatter = column.formatter, editor = column.editor, validation = column.validation;
    var value = column_1.isRowHeader(name) ? getRowHeaderValue(row, name) : row[name];
    if (!relationMatched) {
        value = '';
    }
    var formatterProps = { row: row, column: column, value: value };
    var _a = row._attributes, disabled = _a.disabled, checkDisabled = _a.checkDisabled, className = _a.className;
    var columnClassName = common_1.isUndefined(className.column[name]) ? [] : className.column[name];
    return {
        editable: !!editor,
        className: className.row.concat(columnClassName).join(' '),
        disabled: column_1.isCheckboxColumn(name) ? checkDisabled : disabled,
        invalidState: getValidationCode(value, validation),
        formattedValue: getFormattedValue(formatterProps, formatter, value, relationListItems),
        value: value
    };
}
function createRelationViewCell(name, row, columnMap, valueMap) {
    var _a = valueMap[name], editable = _a.editable, disabled = _a.disabled, value = _a.value;
    var _b = columnMap[name].relationMap, relationMap = _b === void 0 ? {} : _b;
    Object.keys(relationMap).forEach(function (targetName) {
        var _a = relationMap[targetName], editableCallback = _a.editable, disabledCallback = _a.disabled, listItemsCallback = _a.listItems;
        var relationCbParams = { value: value, editable: editable, disabled: disabled, row: row };
        var targetEditable = getEditable(editableCallback, relationCbParams);
        var targetDisabled = getDisabled(disabledCallback, relationCbParams);
        var targetListItems = getListItems(listItemsCallback, relationCbParams) || [];
        var targetValue = row[targetName];
        var targetEditor = columnMap[targetName].editor;
        var targetEditorOptions = targetEditor && targetEditor.options;
        var relationMatched = common_1.isFunction(listItemsCallback)
            ? common_1.someProp('value', targetValue, targetListItems)
            : true;
        var cellData = createViewCell(row, columnMap[targetName], relationMatched, targetListItems);
        if (!targetEditable) {
            cellData.editable = false;
        }
        if (targetDisabled) {
            cellData.disabled = true;
        }
        // should set the relation list to relationListItemMap for preventing to share relation list in other rows
        if (targetEditorOptions) {
            targetEditorOptions.relationListItemMap = targetEditorOptions.relationListItemMap || {};
            targetEditorOptions.relationListItemMap[row.rowKey] = targetListItems;
        }
        valueMap[targetName] = cellData;
    });
}
function createViewRow(row, columnMap, rawData, treeColumnName, treeIcon) {
    var rowKey = row.rowKey;
    var initValueMap = {};
    Object.keys(columnMap).forEach(function (name) {
        initValueMap[name] = null;
    });
    var valueMap = observable_1.observable(initValueMap);
    var __unobserveFns__ = [];
    Object.keys(columnMap).forEach(function (name) {
        var _a = columnMap[name], related = _a.related, relationMap = _a.relationMap;
        // add condition expression to prevent to call watch function recursively
        if (!related) {
            __unobserveFns__.push(observable_1.observe(function () {
                valueMap[name] = createViewCell(row, columnMap[name]);
            }));
        }
        if (relationMap && Object.keys(relationMap).length) {
            __unobserveFns__.push(observable_1.observe(function () {
                createRelationViewCell(name, row, columnMap, valueMap);
            }));
        }
    });
    return tslib_1.__assign({ rowKey: rowKey,
        valueMap: valueMap,
        __unobserveFns__: __unobserveFns__ }, (treeColumnName && { treeInfo: tree_1.createTreeCellInfo(rawData, row, treeIcon) }));
}
exports.createViewRow = createViewRow;
function getAttributes(row, index) {
    var defaultAttr = {
        rowNum: index + 1,
        checked: false,
        disabled: false,
        checkDisabled: false,
        className: {
            row: [],
            column: {}
        }
    };
    if (row._attributes) {
        if (common_1.isBoolean(row._attributes.disabled) && common_1.isUndefined(row._attributes.checkDisabled)) {
            row._attributes.checkDisabled = row._attributes.disabled;
        }
        if (!common_1.isUndefined(row._attributes.className)) {
            row._attributes.className = tslib_1.__assign({ row: [], column: {} }, row._attributes.className);
        }
    }
    return observable_1.observable(tslib_1.__assign({}, defaultAttr, row._attributes));
}
function createMainRowSpanMap(rowSpan, rowKey) {
    var mainRowSpanMap = {};
    if (!rowSpan) {
        return mainRowSpanMap;
    }
    Object.keys(rowSpan).forEach(function (columnName) {
        var spanCount = rowSpan[columnName];
        mainRowSpanMap[columnName] = rowSpan_1.createRowSpan(true, rowKey, spanCount, spanCount);
    });
    return mainRowSpanMap;
}
function createSubRowSpan(prevRowSpanMap) {
    var subRowSpanMap = {};
    Object.keys(prevRowSpanMap).forEach(function (columnName) {
        var prevRowSpan = prevRowSpanMap[columnName];
        if (prevRowSpan.spanCount > -prevRowSpan.count + 1) {
            var mainRowKey = prevRowSpan.mainRowKey, count = prevRowSpan.count, spanCount = prevRowSpan.spanCount;
            var subRowCount = count >= 0 ? -1 : count - 1;
            subRowSpanMap[columnName] = rowSpan_1.createRowSpan(false, mainRowKey, subRowCount, spanCount);
        }
    });
    return subRowSpanMap;
}
function createRowSpanMap(row, rowSpan, prevRow) {
    var rowSpanMap = {};
    var rowKey = row.rowKey;
    if (!common_1.isEmpty(rowSpan)) {
        return createMainRowSpanMap(rowSpan, rowKey);
    }
    if (prevRow) {
        var prevRowSpanMap = prevRow.rowSpanMap;
        if (!common_1.isEmpty(prevRowSpanMap)) {
            return createSubRowSpan(prevRowSpanMap);
        }
    }
    return rowSpanMap;
}
function createRawRow(row, index, defaultValues, keyColumnName, prevRow) {
    // this rowSpan variable is attribute option before creating rowSpanDataMap
    var rowSpan;
    if (row._attributes) {
        rowSpan = row._attributes.rowSpan;
        // protect to create uneccesary reactive data
        delete row._attributes.rowSpan;
    }
    row.rowKey = keyColumnName ? row[keyColumnName] : index;
    row._attributes = getAttributes(row, index);
    row.rowSpanMap = createRowSpanMap(row, rowSpan, prevRow);
    defaultValues.forEach(function (_a) {
        var name = _a.name, value = _a.value;
        common_1.setDefaultProp(row, name, value);
    });
    return observable_1.observable(row);
}
exports.createRawRow = createRawRow;
function createData(data, column) {
    var defaultValues = column.defaultValues, keyColumnName = column.keyColumnName, allColumnMap = column.allColumnMap, _a = column.treeColumnName, treeColumnName = _a === void 0 ? '' : _a, _b = column.treeIcon, treeIcon = _b === void 0 ? true : _b;
    var rawData;
    if (treeColumnName) {
        rawData = tree_1.createTreeRawData(data, defaultValues, keyColumnName);
    }
    else {
        rawData = data.map(function (row, index, rows) {
            return createRawRow(row, index, defaultValues, keyColumnName, rows[index - 1]);
        });
    }
    var viewData = rawData.map(function (row) {
        return createViewRow(row, allColumnMap, rawData, treeColumnName, treeIcon);
    });
    return { rawData: rawData, viewData: viewData };
}
exports.createData = createData;
function create(data, column, pageOptions, useClientSort) {
    // @TODO add client pagination logic
    var _a = createData(data, column), rawData = _a.rawData, viewData = _a.viewData;
    var sortOptions = { columnName: 'rowKey', ascending: true, useClient: useClientSort };
    return observable_1.observable({
        disabled: false,
        rawData: rawData,
        viewData: viewData,
        sortOptions: sortOptions,
        pageOptions: pageOptions,
        get checkedAllRows() {
            var allRawData = this.rawData;
            var checkedRows = allRawData.filter(function (row) { return row._attributes.checked; });
            return checkedRows.length === allRawData.length;
        }
    });
}
exports.create = create;
//# sourceMappingURL=data.js.map