"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XYR = /** @class */ (function () {
    function XYR(x, y, r) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (r === void 0) { r = 0; }
        this.x = 0;
        this.y = 0;
        this.r = 0;
        this.x = x;
        this.y = y;
        this.r = r;
    }
    XYR.prototype.clone = function () {
        return new XYR(this.x, this.y, this.r);
    };
    return XYR;
}());
module.exports.XYR = exports.XYR = XYR;
