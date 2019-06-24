"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var dom_1 = require("../helper/dom");
var hoc_1 = require("./hoc");
var i18n_1 = tslib_1.__importDefault(require("../i18n"));
var common_1 = require("../helper/common");
var StateLayerComp = /** @class */ (function (_super) {
    tslib_1.__extends(StateLayerComp, _super);
    function StateLayerComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StateLayerComp.prototype.shouldComponentUpdate = function (nextProps) {
        return !common_1.shallowEqual(nextProps, this.props);
    };
    StateLayerComp.prototype.render = function (_a) {
        var state = _a.state, top = _a.top, height = _a.height, left = _a.left, right = _a.right;
        var display = state === 'DONE' ? 'none' : 'block';
        var layerStyle = { display: display, top: top, height: height, left: left, right: right };
        var message = null;
        if (state === 'EMPTY') {
            message = i18n_1.default.get('display.noData');
        }
        else if (state === 'LOADING') {
            message = i18n_1.default.get('display.loadingData');
        }
        return (preact_1.h("div", { class: dom_1.cls('layer-state'), style: layerStyle },
            preact_1.h("div", { class: dom_1.cls('layer-state-content') },
                preact_1.h("p", null, message),
                state === 'LOADING' && preact_1.h("div", { class: dom_1.cls('layer-state-loading') }))));
    };
    return StateLayerComp;
}(preact_1.Component));
exports.StateLayer = hoc_1.connect(function (_a) {
    var data = _a.data, renderState = _a.renderState, dimension = _a.dimension;
    var headerHeight = dimension.headerHeight, bodyHeight = dimension.bodyHeight, cellBorderWidth = dimension.cellBorderWidth, tableBorderWidth = dimension.tableBorderWidth, scrollXHeight = dimension.scrollXHeight, scrollYWidth = dimension.scrollYWidth;
    var state = renderState.state;
    return {
        state: state === 'DONE' && data.rawData.length === 0 ? 'EMPTY' : state,
        top: headerHeight + cellBorderWidth + 1,
        height: bodyHeight - scrollXHeight - tableBorderWidth,
        left: 0,
        right: scrollYWidth
    };
})(StateLayerComp);
//# sourceMappingURL=stateLayer.js.map