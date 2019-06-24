"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MS_7_DAYS = 7 * 24 * 60 * 60 * 1000;
function isExpired(date) {
    var now = new Date().getTime();
    return now - date > MS_7_DAYS;
}
function imagePing(url, trackingInfo) {
    var queryString = Object.keys(trackingInfo)
        .map(function (id, index) {
        var idWithType = id;
        return "" + (index ? '&' : '') + idWithType + "=" + trackingInfo[idWithType];
    })
        .join('');
    var trackingElement = document.createElement('img');
    trackingElement.src = url + "?" + queryString;
    trackingElement.style.display = 'none';
    document.body.appendChild(trackingElement);
    document.body.removeChild(trackingElement);
    return trackingElement;
}
function sendHostname() {
    var hostname = location.hostname;
    var applicationKeyForStorage = "TOAST UI grid for " + hostname + ": Statistics";
    var date = window.localStorage.getItem(applicationKeyForStorage);
    if (date && !isExpired(Number(date))) {
        return;
    }
    window.localStorage.setItem(applicationKeyForStorage, String(new Date().getTime()));
    setTimeout(function () {
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            imagePing('https://www.google-analytics.com/collect', {
                v: 1,
                t: 'event',
                tid: 'UA-129951906-1',
                cid: hostname,
                dp: hostname,
                dh: 'grid',
                el: 'grid',
                ec: 'use'
            });
        }
    }, 1000);
}
exports.sendHostname = sendHostname;
//# sourceMappingURL=googleAnalytics.js.map