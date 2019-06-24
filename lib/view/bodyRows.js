"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var bodyRow_1 = require("./bodyRow");
var bodyDummyRow_1 = require("./bodyDummyRow");
var common_1 = require("../helper/common");
var hoc_1 = require("./hoc");
var BodyRowsComp = /** @class */ (function (_super) {
    tslib_1.__extends(BodyRowsComp, _super);
    function BodyRowsComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BodyRowsComp.prototype.shouldComponentUpdate = function (nextProps) {
        if (common_1.shallowEqual(nextProps, this.props)) {
            return false;
        }
        return true;
    };
    BodyRowsComp.prototype.render = function (_a) {
        var rows = _a.rows, rowIndexOffset = _a.rowIndexOffset, columns = _a.columns, dummyRowCount = _a.dummyRowCount;
        var columnNames = columns.map(function (_a) {
            var name = _a.name;
            return name;
        });
        return (preact_1.h("tbody", null,
            rows.map(function (row, index) { return (preact_1.h(bodyRow_1.BodyRow, { key: row.rowKey, rowIndex: index + rowIndexOffset, viewRow: row, columns: columns })); }),
            common_1.range(dummyRowCount).map(function (index) { return (preact_1.h(bodyDummyRow_1.BodyDummyRow, { key: "dummy-" + index, index: rows.length + index, columnNames: columnNames })); })));
    };
    return BodyRowsComp;
}(preact_1.Component));
exports.BodyRows = hoc_1.connect(function (_a, _b) {
    var viewport = _a.viewport, column = _a.column;
    var side = _b.side;
    return ({
        rowIndexOffset: viewport.rowRange[0],
        rows: viewport.rows,
        columns: side === 'L' ? column.visibleColumnsBySide.L : viewport.columns,
        dummyRowCount: viewport.dummyRowCount
    });
})(BodyRowsComp);
//# sourceMappingURL=bodyRows.js.map