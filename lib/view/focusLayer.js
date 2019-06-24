"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var dom_1 = require("../helper/dom");
var hoc_1 = require("./hoc");
var FocusLayerComp = /** @class */ (function (_super) {
    tslib_1.__extends(FocusLayerComp, _super);
    function FocusLayerComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FocusLayerComp.prototype.render = function () {
        var _a = this.props, active = _a.active, cellPosRect = _a.cellPosRect, cellBorderWidth = _a.cellBorderWidth;
        if (cellPosRect === null) {
            return null;
        }
        var top = cellPosRect.top, left = cellPosRect.left, right = cellPosRect.right, bottom = cellPosRect.bottom;
        var height = bottom - top;
        var width = right - left;
        var leftStyle = {
            top: top,
            left: left,
            width: cellBorderWidth,
            height: height + cellBorderWidth
        };
        var topStyle = {
            top: top === 0 ? cellBorderWidth : top,
            left: left,
            width: width + cellBorderWidth,
            height: cellBorderWidth
        };
        var rightStyle = {
            top: top,
            left: left + width,
            width: cellBorderWidth,
            height: height + cellBorderWidth
        };
        var bottomStyle = {
            top: top + height,
            left: left,
            width: width + cellBorderWidth,
            height: cellBorderWidth
        };
        return (preact_1.h("div", { class: dom_1.cls('layer-focus', [!active, 'layer-focus-deactive']) },
            preact_1.h("div", { class: dom_1.cls('layer-focus-border'), style: leftStyle }),
            preact_1.h("div", { class: dom_1.cls('layer-focus-border'), style: topStyle }),
            preact_1.h("div", { class: dom_1.cls('layer-focus-border'), style: rightStyle }),
            preact_1.h("div", { class: dom_1.cls('layer-focus-border'), style: bottomStyle })));
    };
    return FocusLayerComp;
}(preact_1.Component));
exports.FocusLayer = hoc_1.connect(function (_a, _b) {
    var focus = _a.focus, dimension = _a.dimension;
    var side = _b.side;
    var cellPosRect = focus.cellPosRect, editingAddress = focus.editingAddress, navigating = focus.navigating;
    return {
        active: !!editingAddress || navigating,
        cellPosRect: side === focus.side ? cellPosRect : null,
        cellBorderWidth: dimension.cellBorderWidth
    };
})(FocusLayerComp);
//# sourceMappingURL=focusLayer.js.map