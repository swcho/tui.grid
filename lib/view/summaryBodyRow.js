"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var summaryBodyCell_1 = require("./summaryBodyCell");
var common_1 = require("../helper/common");
var SummaryBodyRow = /** @class */ (function (_super) {
    tslib_1.__extends(SummaryBodyRow, _super);
    function SummaryBodyRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SummaryBodyRow.prototype.shouldComponentUpdate = function (nextProps) {
        if (common_1.shallowEqual(nextProps, this.props)) {
            return false;
        }
        return true;
    };
    SummaryBodyRow.prototype.render = function (_a) {
        var columns = _a.columns;
        var columnNames = columns.map(function (_a) {
            var name = _a.name;
            return name;
        });
        return (preact_1.h("tbody", null,
            preact_1.h("tr", null, columnNames.map(function (name) { return (preact_1.h(summaryBodyCell_1.SummaryBodyCell, { key: name, columnName: name })); }))));
    };
    return SummaryBodyRow;
}(preact_1.Component));
exports.SummaryBodyRow = SummaryBodyRow;
//# sourceMappingURL=summaryBodyRow.js.map