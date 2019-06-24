"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var encoder_1 = require("./helper/encoder");
var gridEvent_1 = tslib_1.__importDefault(require("../event/gridEvent"));
var GridAjax = /** @class */ (function () {
    function GridAjax(options) {
        var _this = this;
        this.shouldEncode = function () {
            return _this.method === 'GET' || _this.method === 'DELETE';
        };
        this.handleReadyStateChange = function () {
            var _a = _this, xhr = _a.xhr, callback = _a.callback, eventBus = _a.eventBus, callbackWhenever = _a.callbackWhenever;
            if (xhr.readyState !== XMLHttpRequest.DONE) {
                return;
            }
            callbackWhenever();
            var gridEvent = new gridEvent_1.default({ xhr: xhr });
            /**
             * Occurs when the response is received from the server
             * @event Grid#response
             * @type {module:event/gridEvent}
             * @property {XmlHttpRequest} xhr - XmlHttpRequest
             * @property {Grid} instance - Current grid instance
             */
            eventBus.trigger('response', gridEvent);
            if (gridEvent.isStopped()) {
                return;
            }
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.result) {
                    /**
                     * Occurs after the response event, if the result is true
                     * @event Grid#successResponse
                     * @type {module:event/gridEvent}
                     * @property {XmlHttpRequest} xhr - XmlHttpRequest
                     * @property {Grid} instance - Current grid instance
                     */
                    eventBus.trigger('successResponse', gridEvent);
                }
                else if (!response.result) {
                    /**
                     * Occurs after the response event, if the result is false
                     * @event Grid#failResponse
                     * @type {module:event/gridEvent}
                     * @property {XmlHttpRequest} xhr - XmlHttpRequest
                     * @property {Grid} instance - Current grid instance
                     */
                    eventBus.trigger('failResponse', gridEvent);
                }
                if (gridEvent.isStopped()) {
                    return;
                }
                callback(response);
            }
            else {
                /**
                 * Occurs after the response event, if the response is Error
                 * @event Grid#errorResponse
                 * @type {module:event/gridEvent}
                 * @property {XmlHttpRequest} xhr - XmlHttpRequest
                 * @property {Grid} instance - Current grid instance
                 */
                eventBus.trigger('errorResponse', gridEvent);
            }
        };
        var method = options.method, url = options.url, withCredentials = options.withCredentials, _a = options.params, params = _a === void 0 ? {} : _a, _b = options.callback, callback = _b === void 0 ? function () { } : _b, callbackWhenever = options.callbackWhenever, eventBus = options.eventBus;
        this.method = method.toUpperCase();
        this.url = url;
        this.params = params;
        this.callback = callback;
        this.callbackWhenever = callbackWhenever;
        this.eventBus = eventBus;
        this.xhr = new XMLHttpRequest();
        this.xhr.withCredentials = withCredentials;
    }
    GridAjax.prototype.open = function () {
        var _a = this, method = _a.method, url = _a.url, params = _a.params, xhr = _a.xhr, shouldEncode = _a.shouldEncode;
        if (shouldEncode()) {
            xhr.open(method, url + "?" + encoder_1.encodeParams(params));
        }
        else {
            xhr.open(method, url);
            // @TODO neeto to application/json content-type options and custom options(authorization, custom header etc..)
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoder');
        }
        xhr.onreadystatechange = this.handleReadyStateChange;
    };
    GridAjax.prototype.send = function () {
        var _a = this, url = _a.url, method = _a.method, xhr = _a.xhr, shouldEncode = _a.shouldEncode, eventBus = _a.eventBus, callbackWhenever = _a.callbackWhenever;
        var options = {
            url: url,
            method: method,
            withCredentials: xhr.withCredentials,
            params: this.params
        };
        var gridEvent = new gridEvent_1.default({ options: options });
        /**
         * Occurs before the http request is sent
         * @event Grid#beforeRequest
         * @type {module:event/gridEvent}
         * @property {Grid} instance - Current grid instance
         */
        eventBus.trigger('beforeRequest', gridEvent);
        if (gridEvent.isStopped()) {
            callbackWhenever();
            return;
        }
        var params = shouldEncode() ? null : encoder_1.encodeParams(this.params, true);
        xhr.send(params);
    };
    return GridAjax;
}());
exports.default = GridAjax;
//# sourceMappingURL=gridAjax.js.map