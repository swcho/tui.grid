"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var common_1 = require("../helper/common");
var gridAjax_1 = tslib_1.__importDefault(require("./gridAjax"));
var eventBus_1 = require("../event/eventBus");
var instance_1 = require("../instance");
var message_1 = require("./helper/message");
var modifiedDataManager_1 = require("./modifiedDataManager");
var ServerSideDataProvider = /** @class */ (function () {
    function ServerSideDataProvider(store, dispatch, dataSource) {
        var _this = this;
        this.handleSuccessReadData = function (response) {
            var result = response.result, data = response.data;
            if (!result || common_1.isUndefined(data)) {
                return;
            }
            _this.dispatch('resetData', data.contents);
            _this.dispatch('setPagination', data.pagination);
        };
        var api = dataSource.api, _a = dataSource.initialRequest, initialRequest = _a === void 0 ? true : _a, _b = dataSource.withCredentials, withCredentials = _b === void 0 ? false : _b;
        this.initialRequest = initialRequest;
        this.api = api;
        this.withCredentials = withCredentials;
        this.lastRequiredData = { perPage: store.data.pageOptions.perPage };
        this.store = store;
        this.dispatch = dispatch;
        if (this.initialRequest) {
            this.readData(1);
        }
    }
    ServerSideDataProvider.prototype.createRequestOptions = function (options) {
        if (options === void 0) { options = {}; }
        var defaultOptions = {
            checkedOnly: false,
            modifiedOnly: true,
            showConfirm: true,
            withCredentials: this.withCredentials
        };
        return tslib_1.__assign({}, defaultOptions, options);
    };
    ServerSideDataProvider.prototype.createRequestParams = function (type, options) {
        var checkedOnly = options.checkedOnly, modifiedOnly = options.modifiedOnly;
        var ignoredColumns = this.store.column.ignoredColumns;
        var manager = instance_1.getDataManager(this.store.id);
        if (modifiedOnly) {
            return type === 'MODIFY'
                ? manager.getAllModifiedData({ checkedOnly: checkedOnly, ignoredColumns: ignoredColumns })
                : manager.getModifiedData(type, { checkedOnly: checkedOnly, ignoredColumns: ignoredColumns });
        }
        return { rows: modifiedDataManager_1.getDataWithOptions(this.store.data.rawData, { checkedOnly: checkedOnly, ignoredColumns: ignoredColumns }) };
    };
    ServerSideDataProvider.prototype.readData = function (page, data, resetData) {
        var _this = this;
        if (data === void 0) { data = {}; }
        if (resetData === void 0) { resetData = false; }
        if (!this.api) {
            return;
        }
        var _a = this, api = _a.api, withCredentials = _a.withCredentials;
        var perPage = this.store.data.pageOptions.perPage;
        var _b = api.readData, method = _b.method, url = _b.url;
        var dataWithType = data;
        // assign request params
        var params = resetData
            ? tslib_1.__assign({ perPage: perPage }, dataWithType, { page: page }) : tslib_1.__assign({}, this.lastRequiredData, dataWithType, { page: page });
        this.lastRequiredData = params;
        var request = new gridAjax_1.default({
            method: method,
            url: url,
            params: params,
            callback: this.handleSuccessReadData,
            callbackWhenever: function () { return _this.dispatch('setRenderState', 'DONE'); },
            withCredentials: withCredentials,
            eventBus: eventBus_1.getEventBus(this.store.id)
        });
        this.dispatch('setRenderState', 'LOADING');
        request.open();
        request.send();
    };
    ServerSideDataProvider.prototype.createData = function (url, method, options) {
        this.send({ url: url, method: method, options: options, requestTypeCode: 'CREATE' });
    };
    ServerSideDataProvider.prototype.updateData = function (url, method, options) {
        this.send({ url: url, method: method, options: options, requestTypeCode: 'UPDATE' });
    };
    ServerSideDataProvider.prototype.deleteData = function (url, method, options) {
        this.send({ url: url, method: method, options: options, requestTypeCode: 'DELETE' });
    };
    ServerSideDataProvider.prototype.modifyData = function (url, method, options) {
        this.send({ url: url, method: method, options: options, requestTypeCode: 'MODIFY' });
    };
    ServerSideDataProvider.prototype.request = function (requestType, options) {
        var url = options.url, method = options.method;
        if (this.api && common_1.isObject(this.api[requestType])) {
            url = url || this.api[requestType].url;
            method = method || this.api[requestType].method;
        }
        if (!url || !method) {
            throw new Error('url and method should be essential for request.');
        }
        var requestOptions = this.createRequestOptions(options);
        this[requestType](url, method, requestOptions);
    };
    ServerSideDataProvider.prototype.reloadData = function () {
        this.readData(this.lastRequiredData.page || 1);
    };
    ServerSideDataProvider.prototype.send = function (sendOptions) {
        var _this = this;
        var url = sendOptions.url, method = sendOptions.method, options = sendOptions.options, requestTypeCode = sendOptions.requestTypeCode;
        var manager = instance_1.getDataManager(this.store.id);
        var params = this.createRequestParams(requestTypeCode, options);
        if (!options.showConfirm || this.confirm(requestTypeCode, this.getCount(params))) {
            var withCredentials = options.withCredentials;
            var request = new gridAjax_1.default({
                method: method,
                url: url,
                params: params,
                callback: function () { return manager.clear(params); },
                callbackWhenever: function () { return _this.dispatch('setRenderState', 'DONE'); },
                withCredentials: common_1.isUndefined(withCredentials) ? this.withCredentials : withCredentials,
                eventBus: eventBus_1.getEventBus(this.store.id)
            });
            this.dispatch('setRenderState', 'LOADING');
            request.open();
            request.send();
        }
    };
    ServerSideDataProvider.prototype.getCount = function (rowsMap) {
        return Object.keys(rowsMap).reduce(function (acc, key) { return acc + rowsMap[key].length; }, 0);
    };
    // @TODO need to options for custom conrifm UI
    ServerSideDataProvider.prototype.confirm = function (type, count) {
        return count ? confirm(message_1.getConfirmMessage(type, count)) : alert(message_1.getAlertMessage(type));
    };
    return ServerSideDataProvider;
}());
function createProvider(store, dispatch, data) {
    if (!Array.isArray(data) && common_1.isObject(data)) {
        return new ServerSideDataProvider(store, dispatch, data);
    }
    // dummy instance
    var providerErrorFn = function () {
        throw new Error('cannot execute server side API. for using this API, have to set dataSource');
    };
    return {
        createData: providerErrorFn,
        updateData: providerErrorFn,
        deleteData: providerErrorFn,
        modifyData: providerErrorFn,
        request: providerErrorFn,
        readData: providerErrorFn,
        reloadData: providerErrorFn
    };
}
exports.createProvider = createProvider;
//# sourceMappingURL=serverSideDataProvider.js.map