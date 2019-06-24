"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("./common");
var CUSTOM_LF_SUBCHAR = '___tui_grid_lf___';
var CUSTOM_CR_SUBCHAR = '___tui_grid_cr___';
var CUSTOM_LF_REGEXP = new RegExp(CUSTOM_LF_SUBCHAR, 'g');
var CUSTOM_CR_REGEXP = new RegExp(CUSTOM_CR_SUBCHAR, 'g');
var LF = '\n';
var CR = '\r';
function setDataInSpanRange(value, data, colspanRange, rowspanRange) {
    var startColspan = colspanRange[0], endColspan = colspanRange[1];
    var startRowspan = rowspanRange[0], endRowspan = rowspanRange[1];
    for (var rowIdx = startRowspan; rowIdx < endRowspan; rowIdx += 1) {
        for (var columnIdx = startColspan; columnIdx < endColspan; columnIdx += 1) {
            data[rowIdx][columnIdx] = startRowspan === rowIdx && startColspan === columnIdx ? value : ' ';
        }
    }
}
exports.setDataInSpanRange = setDataInSpanRange;
function convertTableToData(rows) {
    var data = [];
    var colspanRange, rowspanRange;
    for (var index = 0; index < rows.length; index += 1) {
        data[index] = [];
    }
    common_1.fromArray(rows).forEach(function (tr, rowIndex) {
        var columnIndex = 0;
        common_1.fromArray(tr.cells).forEach(function (td) {
            var text = td.textContent || td.innerText;
            while (data[rowIndex][columnIndex]) {
                columnIndex += 1;
            }
            colspanRange = [columnIndex, columnIndex + (td.colSpan || 1)];
            rowspanRange = [rowIndex, rowIndex + (td.rowSpan || 1)];
            setDataInSpanRange(text, data, colspanRange, rowspanRange);
            columnIndex = colspanRange[1];
        });
    });
    return data;
}
exports.convertTableToData = convertTableToData;
function removeDoubleQuotes(text) {
    if (text.match(CUSTOM_LF_REGEXP)) {
        return text.substring(1, text.length - 1).replace(/""/g, '"');
    }
    return text;
}
function replaceNewlineToSubchar(text) {
    return text.replace(/"([^"]|"")*"/g, function (value) {
        return value.replace(LF, CUSTOM_LF_SUBCHAR).replace(CR, CUSTOM_CR_SUBCHAR);
    });
}
function convertTextToData(text) {
    // Each newline cell data is wrapping double quotes in the text and
    // newline characters should be replaced with substitution characters temporarily
    // before spliting the text by newline characters.
    text = replaceNewlineToSubchar(text);
    return text.split(/\r?\n/).map(function (row) {
        return row.split('\t').map(function (column) {
            return removeDoubleQuotes(column)
                .replace(CUSTOM_LF_REGEXP, LF)
                .replace(CUSTOM_CR_REGEXP, CR);
        });
    });
}
exports.convertTextToData = convertTextToData;
function getCustomValue(customValue, value, rowAttrs, column) {
    return typeof customValue === 'function' ? customValue(value, rowAttrs, column) : customValue;
}
exports.getCustomValue = getCustomValue;
function getTextWithCopyOptionsApplied(valueMap, rawData, column) {
    var text = valueMap.value;
    var copyOptions = column.copyOptions, editor = column.editor;
    var editorOptions = editor && editor.options;
    // priority: customValue > useListItemText > useFormattedValue > original Data
    if (copyOptions) {
        if (copyOptions.customValue) {
            text = getCustomValue(copyOptions.customValue, valueMap.value, rawData, column);
        }
        else if (copyOptions.useListItemText && editorOptions) {
            var listItems_1 = editorOptions.listItems;
            var value = valueMap.value;
            var valueList = [value];
            var result_1 = [];
            if (typeof value === 'string') {
                valueList = value.split(',');
            }
            valueList.forEach(function (val) {
                var listItem = common_1.find(function (item) { return item.value === val; }, listItems_1);
                result_1.push(listItem ? listItem.text : val);
            });
            text = result_1.join(',');
        }
        else if (copyOptions.useFormattedValue) {
            text = "" + valueMap.formattedValue;
        }
    }
    if (typeof text === 'undefined' || text === null) {
        return '';
    }
    return String(text);
}
exports.getTextWithCopyOptionsApplied = getTextWithCopyOptionsApplied;
function isColumnEditable(viewData, rowIndex, columnName) {
    var _a = viewData[rowIndex].valueMap[columnName], disabled = _a.disabled, editable = _a.editable;
    return editable && !disabled;
}
exports.isColumnEditable = isColumnEditable;
function isSupportWindowClipboardData() {
    return !!window.clipboardData;
}
exports.isSupportWindowClipboardData = isSupportWindowClipboardData;
//# sourceMappingURL=clipboard.js.map