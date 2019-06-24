"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var headerArea_1 = require("./headerArea");
var bodyArea_1 = require("./bodyArea");
var summaryArea_1 = require("./summaryArea");
var dom_1 = require("../helper/dom");
var hoc_1 = require("./hoc");
var LeftSideComp = /** @class */ (function (_super) {
    tslib_1.__extends(LeftSideComp, _super);
    function LeftSideComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeftSideComp.prototype.render = function (_a) {
        var width = _a.width, scrollX = _a.scrollX;
        var style = { width: width, display: 'block' };
        var summaryPosition = this.props.summaryPosition;
        return (preact_1.h("div", { class: dom_1.cls('lside-area'), style: style },
            preact_1.h(headerArea_1.HeaderArea, { side: "L" }),
            summaryPosition === 'top' && preact_1.h(summaryArea_1.SummaryArea, { side: "L" }),
            preact_1.h(bodyArea_1.BodyArea, { side: "L" }),
            summaryPosition === 'bottom' && preact_1.h(summaryArea_1.SummaryArea, { side: "L" }),
            scrollX && preact_1.h("div", { class: dom_1.cls('scrollbar-left-bottom') })));
    };
    return LeftSideComp;
}(preact_1.Component));
exports.LeftSide = hoc_1.connect(function (_a) {
    var columnCoords = _a.columnCoords, dimension = _a.dimension;
    return ({
        width: columnCoords.areaWidth.L,
        scrollX: dimension.scrollX,
        summaryPosition: dimension.summaryPosition
    });
})(LeftSideComp);
//# sourceMappingURL=leftSide.js.map