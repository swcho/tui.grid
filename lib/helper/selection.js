"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
function isSameInputRange(inp1, inp2) {
    if (common_1.isNull(inp1) || common_1.isNull(inp2)) {
        return inp1 === inp2;
    }
    return (inp1.column[0] === inp2.column[0] &&
        inp1.column[1] === inp2.column[1] &&
        inp1.row[0] === inp2.row[0] &&
        inp1.row[1] === inp2.row[1]);
}
exports.isSameInputRange = isSameInputRange;
function getSortedRange(range) {
    return range[0] > range[1] ? [range[1], range[0]] : range;
}
exports.getSortedRange = getSortedRange;
//# sourceMappingURL=selection.js.map