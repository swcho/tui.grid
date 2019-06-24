"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculate(values) {
    var cnt = values.length;
    var min = Number.MAX_VALUE;
    var max = Number.MIN_VALUE;
    var sum = 0;
    var avg = 0;
    for (var i = 0; i < cnt; i += 1) {
        var value = Number(values[i]);
        if (isNaN(value)) {
            value = 0;
        }
        sum += value;
        if (min > value) {
            min = value;
        }
        if (max < value) {
            max = value;
        }
    }
    if (!cnt) {
        max = min = avg = 0;
    }
    else {
        avg = sum / cnt;
    }
    return { sum: sum, min: min, max: max, avg: avg, cnt: cnt };
}
exports.calculate = calculate;
function castToSummaryColumnContent(content) {
    if (!content) {
        return null;
    }
    return typeof content === 'string'
        ? { template: content, useAutoSummary: false }
        : {
            template: content.template,
            useAutoSummary: typeof content.useAutoSummary === 'undefined' ? true : content.useAutoSummary
        };
}
exports.castToSummaryColumnContent = castToSummaryColumnContent;
function createSummaryValue(content, columnValues) {
    var initSummaryMap = { sum: 0, min: 0, max: 0, avg: 0, cnt: 0 };
    return content && content.useAutoSummary ? calculate(columnValues) : initSummaryMap;
}
exports.createSummaryValue = createSummaryValue;
function extractSummaryColumnContent(content, defaultContent) {
    var summaryColumnContent = null;
    if (content) {
        summaryColumnContent = content;
    }
    else if (!content && defaultContent) {
        summaryColumnContent = defaultContent;
    }
    return summaryColumnContent;
}
exports.extractSummaryColumnContent = extractSummaryColumnContent;
//# sourceMappingURL=summary.js.map