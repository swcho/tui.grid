"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var hoc_1 = require("./hoc");
var dom_1 = require("../helper/dom");
var column_1 = require("../helper/column");
var BodyDummyRowComp = function (_a) {
    var columnNames = _a.columnNames, rowHeight = _a.rowHeight, index = _a.index;
    var isOddRow = !!(index % 2);
    return (preact_1.h("tr", { style: { height: rowHeight }, class: dom_1.cls([isOddRow, 'row-odd'], [!isOddRow, 'row-even']) }, columnNames.map(function (name) {
        var _a;
        var attrs = (_a = {}, _a[dom_1.dataAttr.COLUMN_NAME] = name, _a);
        return (preact_1.h("td", tslib_1.__assign({}, attrs, { key: index, class: dom_1.cls('cell', 'cell-dummy', [column_1.isRowHeader(name), 'cell-row-header']) })));
    })));
};
exports.BodyDummyRow = hoc_1.connect(function (_a) {
    var rowHeight = _a.dimension.rowHeight;
    return ({
        rowHeight: rowHeight
    });
})(BodyDummyRowComp);
//# sourceMappingURL=bodyDummyRow.js.map