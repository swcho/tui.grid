"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var dom_1 = require("../helper/dom");
var column_1 = require("../helper/column");
var hoc_1 = require("./hoc");
var common_1 = require("../helper/common");
var headerCheckbox_1 = require("./headerCheckbox");
var sortingButton_1 = require("./sortingButton");
var selection_1 = require("../query/selection");
var ComplexHeaderComp = /** @class */ (function (_super) {
    tslib_1.__extends(ComplexHeaderComp, _super);
    function ComplexHeaderComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComplexHeaderComp.prototype.getColumnHierarchy = function (column, mergedComplexColumns) {
        var _this = this;
        var complexHeaderColumns = this.props.complexHeaderColumns;
        var complexColumns = mergedComplexColumns || [];
        if (column) {
            complexColumns.push(column);
            if (complexHeaderColumns) {
                complexHeaderColumns.forEach(function (complexHeaderColumn) {
                    var childNames = complexHeaderColumn.childNames;
                    if (childNames) {
                        var index = common_1.findIndex(function (name) { return column.name === name; }, childNames);
                        if (index !== -1) {
                            _this.getColumnHierarchy(complexHeaderColumn, complexColumns);
                        }
                    }
                });
            }
        }
        return complexColumns;
    };
    ComplexHeaderComp.prototype.getHierarchyMaxRowCount = function (hierarchies) {
        var lengths = [0].concat(hierarchies.map(function (value) { return value.length; }));
        return Math.max.apply(Math, lengths);
    };
    ComplexHeaderComp.prototype.isSelected = function (name) {
        var _a = this.props, columnSelectionRange = _a.columnSelectionRange, visibleColumns = _a.visibleColumns, rowHeaderCount = _a.rowHeaderCount, complexHeaderColumns = _a.complexHeaderColumns;
        if (!columnSelectionRange) {
            return false;
        }
        var selectionStart = columnSelectionRange[0], selectionEnd = columnSelectionRange[1];
        var _b = selection_1.getChildColumnRange(visibleColumns, complexHeaderColumns, name, rowHeaderCount), columnStart = _b[0], columnEnd = _b[1];
        return (columnStart >= selectionStart &&
            columnStart <= selectionEnd &&
            columnEnd >= selectionStart &&
            columnEnd <= selectionEnd);
    };
    ComplexHeaderComp.prototype.createTableHeaderComponent = function (column, height, colspan, rowspan) {
        var name = column.name, header = column.header, sortable = column.sortable;
        return (preact_1.h("th", tslib_1.__assign({ key: name, "data-column-name": name, class: dom_1.cls('cell', 'cell-header', [!column_1.isRowHeader(name) && this.isSelected(name), 'cell-selected'], [column_1.isRowHeader(name), 'cell-row-header']), height: height }, !!colspan && { colspan: colspan }, !!rowspan && { rowspan: rowspan }),
            column_1.isCheckboxColumn(name) ? preact_1.h(headerCheckbox_1.HeaderCheckbox, null) : header,
            !!sortable && preact_1.h(sortingButton_1.SortingButton, null)));
    };
    ComplexHeaderComp.prototype.render = function () {
        var _this = this;
        var _a = this.props, columns = _a.columns, headerHeight = _a.headerHeight;
        var hierarchies = columns.map(function (column) { return _this.getColumnHierarchy(column).reverse(); });
        var maxRowCount = this.getHierarchyMaxRowCount(hierarchies);
        var rows = new Array(maxRowCount);
        var columnNames = new Array(maxRowCount);
        var colspans = [];
        var rowHeight = (maxRowCount ? Math.floor((headerHeight - 1) / maxRowCount) : 0) - 1;
        var rowspan = 1;
        var height;
        hierarchies.forEach(function (hierarchy, i) {
            var length = hierarchies[i].length;
            var curHeight = 0;
            hierarchy.forEach(function (column, j) {
                var columnName = column.name;
                rowspan = length - 1 === j && maxRowCount - length + 1 > 1 ? maxRowCount - length + 1 : 1;
                height = rowHeight * rowspan;
                if (j === length - 1) {
                    height = headerHeight - curHeight - 2;
                }
                else {
                    curHeight += height + 1;
                }
                if (columnNames[j] === columnName) {
                    rows[j].pop();
                    colspans[j] += 1;
                }
                else {
                    colspans[j] = 1;
                }
                columnNames[j] = columnName;
                rows[j] = rows[j] || [];
                rows[j].push(_this.createTableHeaderComponent(column, height, colspans[j], rowspan));
            });
        });
        return (preact_1.h("tbody", null, rows.map(function (row, index) { return (preact_1.h("tr", { key: "complex-header-" + index }, row)); })));
    };
    return ComplexHeaderComp;
}(preact_1.Component));
exports.ComplexHeader = hoc_1.connect(function (store, _a) {
    var side = _a.side;
    var _b = store.column, rowHeaderCount = _b.rowHeaderCount, visibleColumns = _b.visibleColumns, visibleColumnsBySide = _b.visibleColumnsBySide, complexHeaderColumns = _b.complexHeaderColumns, headerHeight = store.dimension.headerHeight, rangeBySide = store.selection.rangeBySide;
    return {
        headerHeight: headerHeight,
        columns: visibleColumnsBySide[side],
        complexHeaderColumns: complexHeaderColumns,
        columnSelectionRange: rangeBySide && rangeBySide[side].column ? rangeBySide[side].column : null,
        visibleColumns: visibleColumns,
        rowHeaderCount: rowHeaderCount
    };
})(ComplexHeaderComp);
//# sourceMappingURL=complexHeader.js.map