"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dom_1 = require("../helper/dom");
var common_1 = require("../helper/common");
var column_1 = require("../helper/column");
function getTargetInfo(nativeEvent) {
    var targetType = 'etc';
    var target = nativeEvent.target;
    var cell = dom_1.findParentByTagName(target, 'td');
    var rowKey, columnName;
    if (cell) {
        var address = dom_1.getCellAddress(cell);
        if (address) {
            rowKey = address.rowKey;
            columnName = address.columnName;
            targetType = column_1.isRowHeader(address.columnName) ? 'rowHeader' : 'cell';
        }
        else {
            targetType = 'dummy';
        }
    }
    else {
        cell = dom_1.findParentByTagName(target, 'th');
        if (cell) {
            columnName = cell.getAttribute(dom_1.dataAttr.COLUMN_NAME);
            targetType = 'columnHeader';
        }
    }
    return common_1.pruneObject({
        nativeEvent: nativeEvent,
        targetType: targetType,
        rowKey: rowKey,
        columnName: columnName
    });
}
/**
 * Event class for public event of Grid
 * @module event/gridEvent
 * @param {Object} data - Event data for handler
 */
var GridEvent = /** @class */ (function () {
    function GridEvent(_a) {
        var event = _a.event, props = tslib_1.__rest(_a, ["event"]);
        this.stopped = false;
        if (event) {
            this.assignData(getTargetInfo(event));
        }
        if (props) {
            this.assignData(props);
        }
    }
    /**
     * Stops propogation of this event.
     * @memberof event/gridEvent
     */
    GridEvent.prototype.stop = function () {
        this.stopped = true;
    };
    GridEvent.prototype.isStopped = function () {
        return this.stopped;
    };
    GridEvent.prototype.assignData = function (data) {
        common_1.assign(this, data);
    };
    GridEvent.prototype.setInstance = function (instance) {
        common_1.assign(this, { instance: instance });
    };
    return GridEvent;
}());
exports.default = GridEvent;
//# sourceMappingURL=gridEvent.js.map