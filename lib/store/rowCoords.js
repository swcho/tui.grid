"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("../helper/observable");
var common_1 = require("../helper/common");
function getRowHeight(row, defaultRowHeight) {
    var _a = row._attributes, height = _a.height, tree = _a.tree;
    var rowHeight = tree && tree.hiddenChild ? 0 : height;
    return common_1.isNumber(rowHeight) ? rowHeight : defaultRowHeight;
}
exports.getRowHeight = getRowHeight;
function create(_a) {
    var data = _a.data, dimension = _a.dimension;
    var rowHeight = dimension.rowHeight;
    return observable_1.observable({
        heights: data.rawData.map(function (row) { return getRowHeight(row, rowHeight); }),
        get offsets() {
            var offsets = [0];
            var heights = this.heights;
            for (var i = 1, len = heights.length; i < len; i += 1) {
                offsets[i] = offsets[i - 1] + heights[i - 1];
            }
            return offsets;
        },
        get totalRowHeight() {
            return common_1.last(this.offsets) + common_1.last(this.heights);
        }
    });
}
exports.create = create;
//# sourceMappingURL=rowCoords.js.map