"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var container_1 = require("./container");
var Root = /** @class */ (function (_super) {
    tslib_1.__extends(Root, _super);
    function Root() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Root.prototype.getChildContext = function () {
        return {
            store: this.props.store,
            dispatch: this.props.dispatch
        };
    };
    Root.prototype.render = function () {
        return preact_1.h(container_1.Container, { rootElement: this.props.rootElement });
    };
    return Root;
}(preact_1.Component));
exports.Root = Root;
//# sourceMappingURL=root.js.map