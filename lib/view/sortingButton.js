"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var dom_1 = require("../helper/dom");
var hoc_1 = require("./hoc");
var instance_1 = require("../instance");
var SortingButtonComp = /** @class */ (function (_super) {
    tslib_1.__extends(SortingButtonComp, _super);
    function SortingButtonComp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (ev) {
            var target = ev.target;
            if (!dom_1.hasClass(target, 'btn-sorting')) {
                return;
            }
            var _a = _this.props, dispatch = _a.dispatch, sortOptions = _a.sortOptions, dataProvider = _a.dataProvider;
            var th = dom_1.findParent(target, 'cell');
            var targetColumnName = th.getAttribute('data-column-name');
            var targetAscending = true;
            if (sortOptions) {
                var columnName = sortOptions.columnName, ascending = sortOptions.ascending;
                targetAscending = columnName === targetColumnName ? !ascending : targetAscending;
            }
            if (sortOptions.useClient) {
                dispatch('sort', targetColumnName, targetAscending);
            }
            else {
                dispatch('changeSortBtn', targetColumnName, targetAscending);
                var data = {
                    sortColumn: targetColumnName,
                    sortAscending: targetAscending
                };
                dataProvider.readData(1, data, true);
            }
        };
        return _this;
    }
    SortingButtonComp.prototype.render = function () {
        var _a = this.props.sortOptions, columnName = _a.columnName, ascending = _a.ascending;
        return (preact_1.h("a", { class: dom_1.cls('btn-sorting', [
                columnName === name,
                ascending ? 'btn-sorting-up' : 'btn-sorting-down'
            ]), onClick: this.handleClick }));
    };
    return SortingButtonComp;
}(preact_1.Component));
exports.SortingButton = hoc_1.connect(function (store) {
    var data = store.data, id = store.id;
    return {
        sortOptions: data.sortOptions,
        dataProvider: instance_1.getDataProvider(id)
    };
})(SortingButtonComp);
//# sourceMappingURL=sortingButton.js.map