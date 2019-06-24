"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var dom_1 = require("../helper/dom");
var common_1 = require("../helper/common");
var hoc_1 = require("./hoc");
var SummaryBodyCellComp = /** @class */ (function (_super) {
    tslib_1.__extends(SummaryBodyCellComp, _super);
    function SummaryBodyCellComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getTemplate = function () {
            var _a = _this.props, content = _a.content, summaryValue = _a.summaryValue;
            if (!content) {
                return '';
            }
            var template = content.template;
            return typeof template === 'string' ? template : template(summaryValue);
        };
        return _this;
    }
    SummaryBodyCellComp.prototype.shouldComponentUpdate = function (nextProps) {
        if (common_1.shallowEqual(nextProps, this.props)) {
            return false;
        }
        return true;
    };
    SummaryBodyCellComp.prototype.render = function () {
        var _a;
        var columnName = this.props.columnName;
        var attrs = (_a = {}, _a[dom_1.dataAttr.COLUMN_NAME] = columnName, _a);
        var template = this.getTemplate();
        return (preact_1.h("td", tslib_1.__assign({ class: dom_1.cls('cell', 'cell-summary'), dangerouslySetInnerHTML: { __html: template } }, attrs)));
    };
    return SummaryBodyCellComp;
}(preact_1.Component));
exports.SummaryBodyCellComp = SummaryBodyCellComp;
exports.SummaryBodyCell = hoc_1.connect(function (_a, _b) {
    var summary = _a.summary;
    var columnName = _b.columnName;
    var summaryColumnContents = summary.summaryColumnContents, summaryValues = summary.summaryValues;
    var content = summaryColumnContents[columnName];
    var summaryValue = summaryValues[columnName];
    return { content: content, summaryValue: summaryValue };
})(SummaryBodyCellComp);
//# sourceMappingURL=summaryBodyCell.js.map