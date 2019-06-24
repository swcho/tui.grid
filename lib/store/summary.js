"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("../helper/observable");
var summary_1 = require("../helper/summary");
function create(_a) {
    var column = _a.column, data = _a.data, summary = _a.summary;
    var summaryColumnContents = {};
    var summaryValues = {};
    if (Object.keys(summary).length) {
        var rawData_1 = data.rawData;
        var orgColumnContent = summary.columnContent, orgDefaultContent = summary.defaultContent;
        var castedDefaultContent_1 = summary_1.castToSummaryColumnContent(orgDefaultContent || '');
        var columnContent_1 = orgColumnContent || {};
        column.allColumns.forEach(function (_a) {
            var name = _a.name;
            observable_1.observe(function () {
                var columnValues = rawData_1.map(function (row) { return row[name]; });
                var castedColumnContent = summary_1.castToSummaryColumnContent(columnContent_1[name]);
                var content = summary_1.extractSummaryColumnContent(castedColumnContent, castedDefaultContent_1);
                summaryColumnContents[name] = content;
                summaryValues[name] = summary_1.createSummaryValue(content, columnValues);
            });
        });
        summaryColumnContents = observable_1.observable(summaryColumnContents);
        summaryValues = observable_1.observable(summaryValues);
    }
    return { summaryColumnContents: summaryColumnContents, summaryValues: summaryValues };
}
exports.create = create;
//# sourceMappingURL=summary.js.map