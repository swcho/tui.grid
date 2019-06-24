"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var summary_1 = require("../helper/summary");
function setSummaryColumnContent(_a, columnName, columnContent) {
    var summary = _a.summary, data = _a.data;
    var rawData = data.rawData;
    var columnValues = rawData.map(function (row) { return row[columnName]; });
    var castedColumnContent = summary_1.castToSummaryColumnContent(columnContent);
    var content = summary_1.extractSummaryColumnContent(castedColumnContent, null);
    summary.summaryColumnContents[columnName] = content;
    summary.summaryValues[columnName] = summary_1.createSummaryValue(content, columnValues);
}
exports.setSummaryColumnContent = setSummaryColumnContent;
//# sourceMappingURL=summary.js.map