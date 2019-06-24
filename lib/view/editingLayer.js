"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var hoc_1 = require("./hoc");
var editingLayerInner_1 = require("./editingLayerInner");
var EditingLayerComp = /** @class */ (function (_super) {
    tslib_1.__extends(EditingLayerComp, _super);
    function EditingLayerComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditingLayerComp.prototype.render = function (_a) {
        var editingAddress = _a.editingAddress;
        if (!editingAddress) {
            return null;
        }
        var rowKey = editingAddress.rowKey, columnName = editingAddress.columnName;
        return preact_1.h(editingLayerInner_1.EditingLayerInner, { rowKey: rowKey, columnName: columnName });
    };
    return EditingLayerComp;
}(preact_1.Component));
exports.EditingLayerComp = EditingLayerComp;
exports.EditingLayer = hoc_1.connect(function (_a) {
    var editingAddress = _a.focus.editingAddress;
    return ({
        editingAddress: editingAddress
    });
})(EditingLayerComp);
//# sourceMappingURL=editingLayer.js.map