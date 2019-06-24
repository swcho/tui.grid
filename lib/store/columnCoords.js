"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("../helper/observable");
var common_1 = require("../helper/common");
function distributeExtraWidthEqually(extraWidth, targetIdxes, widths) {
    var targetLen = targetIdxes.length;
    var avgValue = Math.round(extraWidth / targetLen);
    var errorValue = avgValue * targetLen - extraWidth; // to correct total width
    var result = widths.slice();
    targetIdxes.forEach(function (idx) {
        result[idx] += avgValue;
    });
    if (targetLen) {
        result[targetIdxes[targetLen - 1]] -= errorValue;
    }
    return result;
}
function fillEmptyWidth(contentWidth, widths) {
    var remainTotalWidth = contentWidth - common_1.sum(widths);
    var emptyIndexes = common_1.findIndexes(function (width) { return !width; }, widths);
    return distributeExtraWidthEqually(remainTotalWidth, emptyIndexes, widths);
}
function applyMinimumWidth(minWidths, widths) {
    return widths.map(function (width, index) { return Math.max(width, minWidths[index]); });
}
function reduceExcessColumnWidthSub(totalRemainWidth, availableList, widths) {
    var avgValue = Math.round(totalRemainWidth / availableList.length);
    var newAvailableList = [];
    availableList.forEach(function (_a) {
        var index = _a[0], width = _a[1];
        // note that totalRemainWidth and avgValue are negative number.
        if (width < Math.abs(avgValue)) {
            totalRemainWidth += width;
            widths[index] -= width;
        }
        else {
            newAvailableList.push([index, width]);
        }
    });
    // call recursively until all available width are less than average
    if (availableList.length > newAvailableList.length) {
        return reduceExcessColumnWidthSub(totalRemainWidth, newAvailableList, widths);
    }
    var columnIndexes = availableList.map(function (_a) {
        var index = _a[0];
        return index;
    });
    return distributeExtraWidthEqually(totalRemainWidth, columnIndexes, widths);
}
function adjustWidths(minWidths, fixedFlags, availableWidth, fitToReducedTotal, widths) {
    var columnLength = widths.length;
    var totalExtraWidth = availableWidth - common_1.sum(widths);
    var fixedCount = fixedFlags.filter(Boolean).length;
    var fixedIndexes = common_1.findIndexes(function (v) { return !v; }, fixedFlags);
    var result;
    if (totalExtraWidth > 0 && columnLength > fixedCount) {
        result = distributeExtraWidthEqually(totalExtraWidth, fixedIndexes, widths);
    }
    else if (fitToReducedTotal && totalExtraWidth < 0) {
        var availableWidthInfos = fixedIndexes.map(function (index) { return [index, widths[index] - minWidths[index]]; });
        result = reduceExcessColumnWidthSub(totalExtraWidth, availableWidthInfos, widths);
    }
    else {
        result = widths;
    }
    return result;
}
function calculateWidths(columns, cellBorderWidth, contentsWidth) {
    var baseWidths = columns.map(function (_a) {
        var baseWidth = _a.baseWidth;
        return (baseWidth ? baseWidth - cellBorderWidth : 0);
    });
    var minWidths = columns.map(function (_a) {
        var minWidth = _a.minWidth;
        return minWidth - cellBorderWidth;
    });
    var fixedFlags = common_1.mapProp('fixedWidth', columns);
    return common_1.pipe(baseWidths, fillEmptyWidth.bind(null, contentsWidth), applyMinimumWidth.bind(null, minWidths), adjustWidths.bind(null, minWidths, fixedFlags, contentsWidth, true));
}
function calculateOffsets(widths, borderWidth) {
    var offsets = [0];
    for (var i = 1, len = widths.length; i < len; i += 1) {
        offsets[i] = offsets[i - 1] + widths[i - 1] + borderWidth;
    }
    return offsets;
}
function create(_a) {
    var column = _a.column, dimension = _a.dimension;
    return observable_1.observable({
        get widths() {
            var visibleColumns = column.visibleColumns, visibleFrozenCount = column.visibleFrozenCount;
            var widths = calculateWidths(visibleColumns, dimension.cellBorderWidth, dimension.contentsWidth);
            return {
                L: widths.slice(0, visibleFrozenCount),
                R: widths.slice(visibleFrozenCount)
            };
        },
        get offsets() {
            return {
                L: calculateOffsets(this.widths.L, dimension.cellBorderWidth),
                R: calculateOffsets(this.widths.R, dimension.cellBorderWidth)
            };
        },
        get areaWidth() {
            var visibleFrozenCount = column.visibleFrozenCount;
            var width = dimension.width, frozenBorderWidth = dimension.frozenBorderWidth, cellBorderWidth = dimension.cellBorderWidth;
            var leftAreaWidth = 0;
            if (visibleFrozenCount) {
                var leftBorderWidth = (visibleFrozenCount + 1) * cellBorderWidth;
                leftAreaWidth = common_1.sum(this.widths.L) + leftBorderWidth;
            }
            return {
                L: leftAreaWidth - frozenBorderWidth,
                R: width - leftAreaWidth
            };
        },
        get totalColumnWidth() {
            return {
                L: common_1.last(this.offsets.L) + common_1.last(this.widths.L),
                R: common_1.last(this.offsets.R) + common_1.last(this.widths.R)
            };
        }
    });
}
exports.create = create;
//# sourceMappingURL=columnCoords.js.map