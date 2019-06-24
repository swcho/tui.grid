"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isEdge() {
    var rEdge = /Edge\/(\d+)\./;
    return rEdge.exec(window.navigator.userAgent);
}
exports.isEdge = isEdge;
//# sourceMappingURL=browser.js.map