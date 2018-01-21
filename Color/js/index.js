"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Color = /** @class */ (function () {
    function Color(color) {
        if (color === void 0) { color = 0; }
        var _this = this;
        this.getColor = function () { return _this.color; };
        this.getR = function () { return _this.r; };
        this.getG = function () { return _this.g; };
        this.getB = function () { return _this.b; };
        this.getH = function () { return _this.h; };
        this.getS = function () { return _this.s; };
        this.getV = function () { return _this.v; };
        this.setColor(color);
    }
    Color.prototype.clone = function () {
        return new Color(this.color);
    };
    Color.prototype.setColor = function (color) {
        var r = color >> 16 & 0xff;
        var g = color >> 8 & 0xff;
        var b = color & 0xff;
        this.color = color;
        this.setRGB(r, g, b);
        return this;
    };
    Color.prototype.setHSV = function (h, s, v) {
        if (h === void 0) { h = -1; }
        if (s === void 0) { s = -1; }
        if (v === void 0) { v = -1; }
        h = h < 0 ? this.h : h;
        s = s < 0 ? this.s : s;
        v = v < 0 ? this.v : v;
        var r, g, b;
        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }
        this.r = r * 255;
        this.g = g * 255;
        this.b = b * 255;
        this.h = h;
        this.s = s;
        this.v = v;
        this.rgbToDecimal();
        return this;
    };
    Color.prototype.setRGB = function (r, g, b) {
        if (r === void 0) { r = -1; }
        if (g === void 0) { g = -1; }
        if (b === void 0) { b = -1; }
        r = r < 0 ? this.r : r;
        g = g < 0 ? this.g : g;
        b = b < 0 ? this.b : b;
        this.r = r;
        this.g = g;
        this.b = b;
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h;
        var v = max;
        var d = max - min;
        var s = max === 0 ? 0 : d / max;
        if (max === min) {
            h = 0;
        }
        else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        this.h = h;
        this.s = s;
        this.v = v;
        this.rgbToDecimal();
        return this;
    };
    Color.prototype.rgbToDecimal = function () {
        this.color = (this.r << 16) + (this.g << 8) + (this.b);
    };
    Color.transformRGB = function (color, to, p) {
        p = 1 - p;
        var r = color.getR() - to.getR();
        var g = color.getG() - to.getG();
        var b = color.getB() - to.getB();
        color.setRGB(to.getR() + r * p, to.getG() + g * p, to.getB() + b * p);
    };
    Color.transformHSV = function (color, to, p) {
        p = 1 - p;
        var h = color.getH() - to.getH();
        var s = color.getS() - to.getS();
        var v = color.getV() - to.getV();
        color.setHSV(to.getH() + h * p, to.getS() + s * p, to.getV() + v * p);
    };
    return Color;
}());
module.exports = Color; module.exports.default = Color; exports.default = Color;
