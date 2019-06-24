"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var preact_1 = require("preact");
var tui_pagination_1 = tslib_1.__importDefault(require("tui-pagination"));
var hoc_1 = require("./hoc");
var dom_1 = require("../helper/dom");
var common_1 = require("../helper/common");
var instance_1 = require("../instance");
var PaginationComp = /** @class */ (function (_super) {
    tslib_1.__extends(PaginationComp, _super);
    function PaginationComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaginationComp.prototype.shouldComponentUpdate = function (nextProps) {
        return !common_1.shallowEqual(this.props.pageOptions, nextProps.pageOptions);
    };
    PaginationComp.prototype.componentDidMount = function () {
        if (!this.el) {
            return;
        }
        this.createPagination();
    };
    PaginationComp.prototype.componentWillReceiveProps = function (nextProps) {
        if (!this.el || !this.tuiPagination) {
            return;
        }
        var pageOptions = nextProps.pageOptions;
        var totalCount = pageOptions.totalCount, page = pageOptions.page, perPage = pageOptions.perPage;
        if (common_1.isNumber(perPage) && this.props.pageOptions.perPage !== perPage) {
            this.tuiPagination.setItemsPerPage(perPage);
        }
        if (common_1.isNumber(totalCount) && this.props.pageOptions.totalCount !== totalCount) {
            this.tuiPagination.reset(totalCount);
        }
        if (common_1.isNumber(page) && this.tuiPagination.getCurrentPage() !== page) {
            this.removeEventListener();
            this.tuiPagination.movePageTo(page);
            this.addEventListener();
        }
    };
    PaginationComp.prototype.componentWillUnmount = function () {
        if (this.tuiPagination) {
            this.removeEventListener();
        }
    };
    PaginationComp.prototype.createPagination = function () {
        var _a = this.props, pageOptions = _a.pageOptions, paginationHolder = _a.paginationHolder;
        var totalCount = pageOptions.totalCount, perPage = pageOptions.perPage, page = pageOptions.page;
        var options = {
            totalItems: totalCount,
            itemsPerPage: perPage,
            page: page
        };
        this.tuiPagination = new tui_pagination_1.default(this.el, options);
        this.addEventListener();
        paginationHolder.setPagination(this.tuiPagination);
    };
    PaginationComp.prototype.addEventListener = function () {
        var dataProvider = this.props.dataProvider;
        this.tuiPagination.on('beforeMove', function (evt) {
            var currentPage = evt.page;
            dataProvider.readData(currentPage);
        });
    };
    PaginationComp.prototype.removeEventListener = function () {
        this.tuiPagination.off('beforeMove');
    };
    PaginationComp.prototype.render = function (_a) {
        var _this = this;
        var pageOptions = _a.pageOptions;
        return (!common_1.isEmpty(pageOptions) && (preact_1.h("div", { ref: function (el) {
                _this.el = el;
            }, class: "tui-pagination " + dom_1.cls('pagination') })));
    };
    return PaginationComp;
}(preact_1.Component));
exports.Pagination = hoc_1.connect(function (_a) {
    var id = _a.id, data = _a.data;
    return ({
        pageOptions: data.pageOptions,
        dataProvider: instance_1.getDataProvider(id),
        paginationHolder: instance_1.getPaginationManager(id)
    });
})(PaginationComp);
//# sourceMappingURL=pagination.js.map