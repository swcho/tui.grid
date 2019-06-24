"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setWidth(_a, width, autoWidth) {
    var dimension = _a.dimension;
    dimension.autoWidth = autoWidth;
    dimension.width = width;
}
exports.setWidth = setWidth;
function setHeight(_a, height) {
    var dimension = _a.dimension;
    var headerHeight = dimension.headerHeight, summaryHeight = dimension.summaryHeight, tableBorderWidth = dimension.tableBorderWidth;
    dimension.bodyHeight = height - headerHeight - summaryHeight - tableBorderWidth;
}
exports.setHeight = setHeight;
function setBodyHeight(_a, bodyHeight) {
    var dimension = _a.dimension;
    dimension.autoHeight = false;
    dimension.bodyHeight = Math.max(bodyHeight, dimension.minBodyHeight);
}
exports.setBodyHeight = setBodyHeight;
function setOffsetTop(store, offsetTop) {
    store.dimension.offsetTop = offsetTop;
}
exports.setOffsetTop = setOffsetTop;
function setOffsetLeft(store, offsetLeft) {
    store.dimension.offsetLeft = offsetLeft;
}
exports.setOffsetLeft = setOffsetLeft;
function setHeaderHeight(store, height) {
    store.dimension.headerHeight = height;
}
exports.setHeaderHeight = setHeaderHeight;
function refreshLayout(store, containerEl, parentEl) {
    var dimension = store.dimension;
    var autoWidth = dimension.autoWidth, fitToParentHeight = dimension.fitToParentHeight;
    var clientHeight = containerEl.clientHeight, clientWidth = containerEl.clientWidth, scrollTop = containerEl.scrollTop, scrollLeft = containerEl.scrollLeft;
    var _a = containerEl.getBoundingClientRect(), top = _a.top, left = _a.left;
    setOffsetTop(store, top + scrollTop);
    setOffsetLeft(store, left + scrollLeft);
    setWidth(store, clientWidth, autoWidth);
    if (fitToParentHeight && parentEl && parentEl.clientHeight !== clientHeight) {
        setHeight(store, parentEl.clientHeight);
    }
}
exports.refreshLayout = refreshLayout;
//# sourceMappingURL=dimension.js.map