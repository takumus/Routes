"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var M = require("matthew");
var Circle = /** @class */ (function () {
    /**
     * Create a point.
     * @param x - circle's x
     * @param y - circle's y
     * @param r - circle's radius
     * @param d - circle's direction
     * @param tr - circle's target radian
     */
    function Circle(x, y, r, d, tr) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (r === void 0) { r = 0; }
        if (d === void 0) { d = 0; }
        if (tr === void 0) { tr = 0; }
        this.x = x;
        this.y = y;
        this.r = r;
        this.d = d;
        this.tr = M.normalize(tr);
    }
    return Circle;
}());
module.exports.Circle = exports.Circle = Circle;
