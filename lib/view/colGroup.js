"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var hoc_1 = require("./hoc");
var dom_1 = require("../helper/dom");
var ColGroupComp = /** @class */ (function (_super) {
    tslib_1.__extends(ColGroupComp, _super);
    function ColGroupComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColGroupComp.prototype.render = function (_a) {
        var _b;
        var columns = _a.columns, widths = _a.widths, borderWidth = _a.borderWidth;
        var attrs = (_b = {}, _b[dom_1.dataAttr.COLUMN_NAME] = name, _b);
        return (preact_1.h("colgroup", null, columns.map(function (_a, idx) {
            var name = _a.name;
            return (preact_1.h("col", tslib_1.__assign({ key: name }, attrs, { style: { width: widths[idx] + borderWidth } })));
        })));
    };
    return ColGroupComp;
}(preact_1.Component));
exports.ColGroup = hoc_1.connect(function (_a, _b) {
    var columnCoords = _a.columnCoords, viewport = _a.viewport, dimension = _a.dimension, column = _a.column;
    var side = _b.side, useViewport = _b.useViewport;
    return ({
        widths: columnCoords.widths[side],
        columns: useViewport && side === 'R' ? viewport.columns : column.visibleColumnsBySide[side],
        borderWidth: dimension.cellBorderWidth
    });
})(ColGroupComp);
//# sourceMappingURL=colGroup.js.map