"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var i18n_1 = tslib_1.__importDefault(require("../../i18n"));
var confirmMessageMap = {
    CREATE: 'net.confirmCreate',
    UPDATE: 'net.confirmUpdate',
    DELETE: 'net.confirmDelete',
    MODIFY: 'net.confirmModify'
};
var alertMessageMap = {
    CREATE: 'net.noDataToCreate',
    UPDATE: 'net.noDataToUpdate',
    DELETE: 'net.noDataToDelete',
    MODIFY: 'net.noDataToModify'
};
function getConfirmMessage(type, count) {
    return i18n_1.default.get(confirmMessageMap[type], { count: String(count) });
}
exports.getConfirmMessage = getConfirmMessage;
function getAlertMessage(type) {
    return i18n_1.default.get(alertMessageMap[type]);
}
exports.getAlertMessage = getAlertMessage;
//# sourceMappingURL=message.js.map