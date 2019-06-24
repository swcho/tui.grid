"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("../helper/observable");
function create(data) {
    var state = data.rawData.length ? 'DONE' : 'EMPTY';
    return observable_1.observable({ state: state });
}
exports.create = create;
//# sourceMappingURL=renderState.js.map