"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var observable_1 = require("../helper/observable");
var column_1 = require("../helper/column");
var common_1 = require("../helper/common");
var default_1 = require("../renderer/default");
var manager_1 = require("../editor/manager");
var rowHeaderInput_1 = require("../renderer/rowHeaderInput");
var ROW_HEADERS_MAP = {
    rowNum: '_number',
    checkbox: '_checked'
};
var defMinWidth = {
    ROW_HEADER: 40,
    COLUMN: 50
};
var DEF_ROW_HEADER_INPUT = '<input type="checkbox" name="_checked" />';
function getBuiltInEditorOptions(editorType, options) {
    var editInfo = manager_1.editorMap[editorType];
    return {
        type: editInfo[0],
        options: tslib_1.__assign({}, editInfo[1], options)
    };
}
function getEditorOptions(editor) {
    if (common_1.isFunction(editor)) {
        return { type: editor };
    }
    if (common_1.isString(editor)) {
        return getBuiltInEditorOptions(editor);
    }
    if (common_1.isObject(editor)) {
        return common_1.isString(editor.type)
            ? getBuiltInEditorOptions(editor.type, editor.options)
            : editor;
    }
    return null;
}
function getRendererOptions(renderer) {
    if (common_1.isObject(renderer) && !common_1.isFunction(renderer) && common_1.isFunction(renderer.type)) {
        return renderer;
    }
    return { type: default_1.DefaultRenderer };
}
function getTreeInfo(treeColumnOptions, name) {
    if (treeColumnOptions && treeColumnOptions.name === name) {
        var _a = treeColumnOptions.useIcon, useIcon = _a === void 0 ? true : _a;
        return { tree: { useIcon: useIcon } };
    }
    return null;
}
function getRelationMap(relations) {
    var relationMap = {};
    relations.forEach(function (relation) {
        var editable = relation.editable, disabled = relation.disabled, listItems = relation.listItems, _a = relation.targetNames, targetNames = _a === void 0 ? [] : _a;
        targetNames.forEach(function (targetName) {
            relationMap[targetName] = {
                editable: editable,
                disabled: disabled,
                listItems: listItems
            };
        });
    });
    return relationMap;
}
function getRelationColumns(relations) {
    var relationColumns = [];
    relations.forEach(function (relation) {
        var _a = relation.targetNames, targetNames = _a === void 0 ? [] : _a;
        targetNames.forEach(function (targetName) {
            relationColumns.push(targetName);
        });
    });
    return relationColumns;
}
exports.getRelationColumns = getRelationColumns;
function createColumn(column, columnOptions, relationColumns, gridCopyOptions, treeColumnOptions) {
    var name = column.name, header = column.header, width = column.width, minWidth = column.minWidth, align = column.align, hidden = column.hidden, resizable = column.resizable, editor = column.editor, renderer = column.renderer, relations = column.relations, sortable = column.sortable, copyOptions = column.copyOptions, validation = column.validation, formatter = column.formatter, onBeforeChange = column.onBeforeChange, onAfterChange = column.onAfterChange, whiteSpace = column.whiteSpace;
    var editorOptions = getEditorOptions(editor);
    var rendererOptions = getRendererOptions(renderer);
    return observable_1.observable(tslib_1.__assign({ name: name, escapeHTML: !!column.escapeHTML, header: header || name, hidden: Boolean(hidden), resizable: common_1.isUndefined(resizable) ? Boolean(columnOptions.resizable) : Boolean(resizable), align: align || 'left', fixedWidth: typeof width === 'number', copyOptions: tslib_1.__assign({}, gridCopyOptions, copyOptions), baseWidth: (width === 'auto' ? 0 : width) || 0, minWidth: minWidth || columnOptions.minWidth || defMinWidth.COLUMN, relationMap: getRelationMap(relations || []), related: common_1.includes(relationColumns, name), sortable: sortable, validation: validation ? tslib_1.__assign({}, validation) : {}, renderer: rendererOptions, formatter: formatter,
        onBeforeChange: onBeforeChange,
        onAfterChange: onAfterChange,
        whiteSpace: whiteSpace }, (!!editorOptions && { editor: editorOptions }), getTreeInfo(treeColumnOptions, name)));
}
exports.createColumn = createColumn;
function createRowHeader(data) {
    var rowHeader = typeof data === 'string'
        ? { name: ROW_HEADERS_MAP[data] }
        : tslib_1.__assign({ name: ROW_HEADERS_MAP[data.type] }, common_1.omit(data, 'type'));
    var name = rowHeader.name, header = rowHeader.header, align = rowHeader.align, renderer = rowHeader.renderer, width = rowHeader.width, minWidth = rowHeader.minWidth;
    var baseMinWith = typeof minWidth === 'number' ? minWidth : defMinWidth.ROW_HEADER;
    var baseWidth = (width === 'auto' ? baseMinWith : width) || baseMinWith;
    var rowNumColumn = column_1.isRowNumColumn(name);
    var defaultHeader = rowNumColumn ? 'No. ' : DEF_ROW_HEADER_INPUT;
    var rendererOptions = renderer || {
        type: rowNumColumn ? default_1.DefaultRenderer : rowHeaderInput_1.RowHeaderInputRenderer
    };
    return observable_1.observable({
        name: name,
        header: header || defaultHeader,
        hidden: false,
        resizable: false,
        align: align || 'center',
        renderer: getRendererOptions(rendererOptions),
        fixedWidth: true,
        baseWidth: baseWidth,
        escapeHTML: false,
        minWidth: baseMinWith
    });
}
function create(_a) {
    var columns = _a.columns, columnOptions = _a.columnOptions, rowHeaders = _a.rowHeaders, copyOptions = _a.copyOptions, keyColumnName = _a.keyColumnName, treeColumnOptions = _a.treeColumnOptions, complexColumns = _a.complexColumns;
    var relationColumns = columns.reduce(function (acc, _a) {
        var relations = _a.relations;
        acc = acc.concat(getRelationColumns(relations || []));
        return acc.filter(function (columnName, idx) { return acc.indexOf(columnName) === idx; });
    }, []);
    var rowHeaderInfos = rowHeaders.map(function (rowHeader) { return createRowHeader(rowHeader); });
    var columnInfos = columns.map(function (column) {
        return createColumn(column, columnOptions, relationColumns, copyOptions, treeColumnOptions);
    });
    var allColumns = rowHeaderInfos.concat(columnInfos);
    var treeColumnName = treeColumnOptions.name, _b = treeColumnOptions.useIcon, treeIcon = _b === void 0 ? true : _b, _c = treeColumnOptions.useCascadingCheckbox, treeCascadingCheckbox = _c === void 0 ? true : _c;
    return observable_1.observable(tslib_1.__assign({ keyColumnName: keyColumnName, frozenCount: columnOptions.frozenCount || 0, dataForColumnCreation: {
            copyOptions: copyOptions,
            columnOptions: columnOptions,
            treeColumnOptions: treeColumnOptions,
            relationColumns: relationColumns,
            rowHeaders: rowHeaderInfos
        }, allColumns: allColumns, complexHeaderColumns: complexColumns, get allColumnMap() {
            return common_1.createMapFromArray(this.allColumns, 'name');
        },
        get rowHeaderCount() {
            return rowHeaderInfos.length;
        },
        get visibleColumns() {
            return this.allColumns.filter(function (_a) {
                var hidden = _a.hidden;
                return !hidden;
            });
        },
        get visibleColumnsBySide() {
            var frozenLastIndex = this.frozenCount + this.rowHeaderCount;
            return {
                L: this.visibleColumns.slice(0, frozenLastIndex),
                R: this.visibleColumns.slice(frozenLastIndex)
            };
        },
        get defaultValues() {
            return this.allColumns
                .filter(function (_a) {
                var defaultValue = _a.defaultValue;
                return Boolean(defaultValue);
            })
                .map(function (_a) {
                var name = _a.name, defaultValue = _a.defaultValue;
                return ({ name: name, value: defaultValue });
            });
        },
        get visibleFrozenCount() {
            return this.visibleColumnsBySide.L.length;
        },
        get validationColumns() {
            return this.allColumns.filter(function (_a) {
                var validation = _a.validation;
                return !!validation;
            });
        },
        get ignoredColumns() {
            return this.allColumns.filter(function (_a) {
                var ignored = _a.ignored;
                return ignored;
            }).map(function (_a) {
                var name = _a.name;
                return name;
            });
        } }, (treeColumnName && { treeColumnName: treeColumnName, treeIcon: treeIcon, treeCascadingCheckbox: treeCascadingCheckbox })));
}
exports.create = create;
//# sourceMappingURL=column.js.map