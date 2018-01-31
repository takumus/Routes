"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./effects"));
var pos_1 = require("pos");
var Line = /** @class */ (function () {
    function Line(data) {
        if (data === void 0) { data = []; }
        this.array = [];
        for (var i = 0; i < data.length; i++) {
            var p = data[i];
            this.push(new pos_1.XY(p.x, p.y));
        }
        this.prevPositionOffset = new pos_1.XY();
        this.prevScaleOffset = new pos_1.XY();
    }
    Line.prototype.push = function (pos) {
        this.array.push(pos);
    };
    Line.prototype.shift = function () {
        return this.array.shift();
    };
    Line.prototype.pop = function () {
        return this.array.pop();
    };
    Line.prototype.get = function (index) {
        return this.array[index];
    };
    Line.prototype.forEach = function (callbackfn, thisArg) {
        this.array.forEach(callbackfn, thisArg);
    };
    Object.defineProperty(Line.prototype, "length", {
        get: function () {
            return this.array.length;
        },
        enumerable: true,
        configurable: true
    });
    Line.prototype.setPositionOffset = function (pos) {
        var _this = this;
        this.array.forEach(function (p) {
            p.x += pos.x - _this.prevPositionOffset.x;
            p.y += pos.y - _this.prevPositionOffset.y;
        });
        this.prevPositionOffset = pos.clone();
    };
    Line.prototype.setScaleOffset = function (scale) {
        var _this = this;
        this.array.forEach(function (p) {
            p.x /= _this.prevScaleOffset.x;
            p.y /= _this.prevScaleOffset.y;
            p.x *= scale.x;
            p.y *= scale.y;
        });
        this.prevScaleOffset = scale.clone();
    };
    Line.prototype.getRect = function () {
        var minX = Number.MAX_VALUE;
        var maxX = Number.MIN_VALUE;
        var minY = Number.MAX_VALUE;
        var maxY = Number.MIN_VALUE;
        for (var i = 0; i < this.length; i++) {
            var p = this.get(i);
            if (minX > p.x)
                minX = p.x;
            else if (maxX < p.x)
                maxX = p.x;
            if (minY > p.y)
                minY = p.y;
            else if (maxY < p.y)
                maxY = p.y;
        }
        return new pos_1.XY(maxX - minX, maxY - minY);
    };
    Line.prototype.getHeadVecPos = function () {
        return this._getVecPos(this.get(0), this.get(1));
    };
    Line.prototype.getTailVecPos = function () {
        return this._getVecPos(this.get(this.length - 1), this.get(this.length - 2));
    };
    Line.prototype.pushLine = function (line) {
        var _this = this;
        if (line.length < 1)
            return this;
        line = line.clone();
        if (this.length > 0 && line.get(0).equals(this.get(this.length - 1)))
            line.shift();
        line.forEach(function (p) {
            _this.push(p.clone());
        });
        return this;
    };
    Line.prototype.clone = function () {
        var data = new Line();
        this.forEach(function (p) {
            data.push(p.clone());
        });
        return data;
    };
    Line.prototype.clear = function () {
        this.array = [];
    };
    Line.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Line.prototype._getVecPos = function (fp, sp) {
        return new pos_1.XYR(fp.x, fp.y, Math.atan2(sp.y - fp.y, sp.x - fp.x));
    };
    Line.prototype.getVecPos = function (id) {
        var p1 = this.get(id);
        var p2 = this.get(id + 1);
        if (!p2) {
            p1 = this.get(id - 1);
            p2 = this.get(id);
        }
        return this._getVecPos(p1, p2);
    };
    Line.prototype.getPosByPercent = function (p) {
        p = p < 0 ? 0 : p > 1 ? 1 : p;
        var index = Math.floor(p * (this.length - 1));
        var pos = this.get(index).clone();
        var l = 1 / (this.length - 1);
        var per = (p - l * index) / l;
        if (per > 0) {
            var nPos = this.get(index + 1);
            var dx = (nPos.x - pos.x) * per;
            var dy = (nPos.y - pos.y) * per;
            pos.x += dx;
            pos.y += dy;
        }
        return pos;
    };
    return Line;
}());
module.exports.Line = exports.Line = Line;
