"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XY = /** @class */ (function () {
    function XY(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    XY.prototype.clone = function () {
        return new XY(this.x, this.y);
    };
    XY.prototype.equals = function (pos, diff) {
        if (diff === void 0) { diff = 1; }
        var dx = pos.x - this.x;
        var dy = pos.y - this.y;
        return dx * dx + dy * dy < diff;
    };
    XY.prototype.round = function (n) {
        n = Math.pow(10, n);
        this.x = Math.floor(this.x * n) / n;
        this.y = Math.floor(this.y * n) / n;
    };
    XY.prototype.distance = function (pos) {
        var tx = pos.x - this.x;
        var ty = pos.y - this.y;
        return Math.sqrt(tx * tx + ty * ty);
    };
    return XY;
}());
module.exports.XY = exports.XY = XY;
