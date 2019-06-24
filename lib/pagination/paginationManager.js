"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createPaginationManager() {
    var pagination = null;
    return {
        setPagination: function (targetPagination) {
            pagination = targetPagination;
        },
        getPagination: function () {
            return pagination;
        }
    };
}
exports.createPaginationManager = createPaginationManager;
//# sourceMappingURL=paginationManager.js.map