"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("..//helper/observable");
var data_1 = require("./data");
var column_1 = require("./column");
var dimension_1 = require("./dimension");
var viewport_1 = require("./viewport");
var columnCoords_1 = require("./columnCoords");
var rowCoords_1 = require("./rowCoords");
var focus_1 = require("./focus");
var summary_1 = require("./summary");
var selection_1 = require("./selection");
var renderState_1 = require("./renderState");
function createStore(id, options) {
    var el = options.el, width = options.width, rowHeight = options.rowHeight, bodyHeight = options.bodyHeight, heightResizable = options.heightResizable, minBodyHeight = options.minBodyHeight, _a = options.columnOptions, columnOptions = _a === void 0 ? {} : _a, keyColumnName = options.keyColumnName, _b = options.rowHeaders, rowHeaders = _b === void 0 ? [] : _b, _c = options.copyOptions, copyOptions = _c === void 0 ? {} : _c, _d = options.summary, summaryOptions = _d === void 0 ? {} : _d, _e = options.selectionUnit, selectionUnit = _e === void 0 ? 'cell' : _e, _f = options.showDummyRows, showDummyRows = _f === void 0 ? false : _f, _g = options.editingEvent, editingEvent = _g === void 0 ? 'dblclick' : _g, scrollX = options.scrollX, scrollY = options.scrollY, _h = options.useClientSort, useClientSort = _h === void 0 ? true : _h, _j = options.pageOptions, pageOptions = _j === void 0 ? {} : _j, _k = options.treeColumnOptions, treeColumnOptions = _k === void 0 ? { name: '' } : _k, _l = options.header, header = _l === void 0 ? {} : _l;
    var frozenBorderWidth = columnOptions.frozenBorderWidth;
    var summaryHeight = summaryOptions.height, summaryPosition = summaryOptions.position;
    var _m = header.height, headerHeight = _m === void 0 ? 40 : _m, _o = header.complexColumns, complexColumns = _o === void 0 ? [] : _o;
    var column = column_1.create({
        columns: options.columns,
        columnOptions: columnOptions,
        rowHeaders: rowHeaders,
        copyOptions: copyOptions,
        keyColumnName: keyColumnName,
        treeColumnOptions: treeColumnOptions,
        complexColumns: complexColumns
    });
    var data = data_1.create(Array.isArray(options.data) ? options.data : [], column, pageOptions, useClientSort);
    var dimension = dimension_1.create({
        column: column,
        width: width,
        domWidth: el.clientWidth,
        rowHeight: rowHeight,
        bodyHeight: bodyHeight,
        minBodyHeight: minBodyHeight,
        heightResizable: heightResizable,
        frozenBorderWidth: frozenBorderWidth,
        summaryHeight: summaryHeight,
        summaryPosition: summaryPosition,
        scrollX: scrollX,
        scrollY: scrollY,
        headerHeight: headerHeight
    });
    var columnCoords = columnCoords_1.create({ column: column, dimension: dimension });
    var rowCoords = rowCoords_1.create({ data: data, dimension: dimension });
    var viewport = viewport_1.create({
        data: data,
        column: column,
        dimension: dimension,
        rowCoords: rowCoords,
        columnCoords: columnCoords,
        showDummyRows: showDummyRows
    });
    var focus = focus_1.create({ data: data, column: column, columnCoords: columnCoords, rowCoords: rowCoords, editingEvent: editingEvent });
    var summary = summary_1.create({ column: column, data: data, summary: summaryOptions });
    var selection = selection_1.create({ selectionUnit: selectionUnit, columnCoords: columnCoords, column: column, dimension: dimension, rowCoords: rowCoords });
    var renderState = renderState_1.create(data);
    // manual observe to resolve circular references
    observable_1.observe(function () {
        dimension_1.setBodyHeight(dimension, rowCoords);
    });
    return observable_1.observable({
        id: id,
        data: data,
        column: column,
        dimension: dimension,
        columnCoords: columnCoords,
        rowCoords: rowCoords,
        viewport: viewport,
        focus: focus,
        summary: summary,
        selection: selection,
        renderState: renderState
    });
}
exports.createStore = createStore;
//# sourceMappingURL=create.js.map