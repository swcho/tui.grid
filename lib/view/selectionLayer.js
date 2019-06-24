"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var dom_1 = require("../helper/dom");
var hoc_1 = require("./hoc");
var SelectionLayerComp = /** @class */ (function (_super) {
    tslib_1.__extends(SelectionLayerComp, _super);
    function SelectionLayerComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionLayerComp.prototype.render = function () {
        var styles = this.props.styles;
        return preact_1.h("div", null, !!styles && preact_1.h("div", { class: dom_1.cls('layer-selection'), style: styles }));
    };
    return SelectionLayerComp;
}(preact_1.Component));
exports.SelectionLayer = hoc_1.connect(function (_a, _b) {
    var rangeAreaInfo = _a.selection.rangeAreaInfo;
    var side = _b.side;
    var styles = rangeAreaInfo && rangeAreaInfo[side];
    return { styles: styles };
})(SelectionLayerComp);
//# sourceMappingURL=selectionLayer.js.map