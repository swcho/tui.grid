"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var common_1 = require("../helper/common");
var observable_1 = require("../helper/observable");
var paramNameMap = {
    CREATE: 'createdRows',
    UPDATE: 'updatedRows',
    DELETE: 'deletedRows'
};
function getDataWithOptions(targetRows, options) {
    if (options === void 0) { options = {}; }
    var _a = options.checkedOnly, checkedOnly = _a === void 0 ? false : _a, _b = options.withRawData, withRawData = _b === void 0 ? false : _b, _c = options.rowKeyOnly, rowKeyOnly = _c === void 0 ? false : _c, _d = options.ignoredColumns, ignoredColumns = _d === void 0 ? [] : _d;
    var rows = targetRows.map(function (row) { return observable_1.getOriginObject(row); });
    if (checkedOnly) {
        rows = rows.filter(function (row) { return row._attributes.checked; });
    }
    if (ignoredColumns.length) {
        rows = rows.map(function (row) { return common_1.omit.apply(void 0, [row].concat(ignoredColumns)); });
    }
    if (!withRawData) {
        rows = rows.map(function (row) { return common_1.omit(row, '_attributes'); });
    }
    if (rowKeyOnly) {
        return rows.map(function (row) { return row.rowKey; });
    }
    return rows;
}
exports.getDataWithOptions = getDataWithOptions;
function createManager() {
    var originData = [];
    var dataMap = {
        CREATE: [],
        UPDATE: [],
        DELETE: []
    };
    var splice = function (type, rowKey, row) {
        var index = common_1.findIndex(function (createdRow) { return createdRow.rowKey === rowKey; }, dataMap[type]);
        if (index !== -1) {
            if (common_1.isUndefined(row)) {
                dataMap[type].splice(index, 1);
            }
            else {
                dataMap[type].splice(index, 1, row);
            }
        }
    };
    var spliceAll = function (rowKey, row) {
        splice('CREATE', rowKey, row);
        splice('UPDATE', rowKey, row);
        splice('DELETE', rowKey, row);
    };
    return {
        // only for restore
        setOriginData: function (data) {
            originData = data.map(function (row) { return (tslib_1.__assign({}, row)); });
        },
        getOriginData: function () {
            return originData;
        },
        getModifiedData: function (type, options) {
            var _a;
            return _a = {}, _a[paramNameMap[type]] = getDataWithOptions(dataMap[type], options), _a;
        },
        getAllModifiedData: function (options) {
            var _this = this;
            return Object.keys(dataMap)
                .map(function (key) { return _this.getModifiedData(key, options); })
                .reduce(function (acc, data) { return (tslib_1.__assign({}, acc, data)); }, {});
        },
        isModified: function () {
            return !!(dataMap.CREATE.length || dataMap.UPDATE.length || dataMap.DELETE.length);
        },
        push: function (type, row) {
            var rowKey = row.rowKey;
            // filter duplicated row
            if (type === 'UPDATE') {
                splice('CREATE', rowKey, row);
                splice('UPDATE', rowKey, row);
            }
            if (type === 'DELETE') {
                splice('CREATE', rowKey);
                splice('UPDATE', rowKey);
            }
            if (!common_1.someProp('rowKey', rowKey, dataMap[type])) {
                dataMap[type].push(row);
            }
        },
        clear: function (rowsMap) {
            Object.keys(rowsMap).forEach(function (key) {
                var rows = rowsMap[key];
                rows.forEach(function (row) {
                    spliceAll(common_1.isObject(row) ? row.rowKey : row);
                });
            });
        },
        clearAll: function () {
            dataMap.CREATE = [];
            dataMap.UPDATE = [];
            dataMap.DELETE = [];
        }
    };
}
exports.createManager = createManager;
//# sourceMappingURL=modifiedDataManager.js.map