"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pos_1 = require("pos");
var Line = /** @class */ (function () {
    function Line(data) {
        if (data === void 0) { data = []; }
        this.forEach = this.array.forEach;
        this.array = [];
        for (var i = 0; i < data.length; i++) {
            var p = data[i];
            this.push(new pos_1.XY(p.x, p.y));
        }
        this.prevPositionOffset = new pos_1.XY();
        this.prevScaleOffset = new pos_1.XY();
    }
    //public forEach = this.array.forEach;
    Line.prototype.push = function (pos) {
        this.array.push(pos);
    };
    Line.prototype.shift = function () {
        return this.array.shift();
    };
    Line.prototype.pop = function () {
        return this.array.pop();
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
            var p = this[i];
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
        return this._getVecPos(this[0], this[1]);
    };
    Line.prototype.getTailVecPos = function () {
        return this._getVecPos(this[this.length - 1], this[this.length - 2]);
    };
    Line.prototype.pushLine = function (line) {
        var _this = this;
        if (line.length < 1)
            return this;
        line = line.clone();
        if (this.length > 0 && line[0].equals(this[this.length - 1]))
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
        var p1 = this[id];
        var p2 = this[id + 1];
        if (!p2) {
            p1 = this[id - 1];
            p2 = this[id];
        }
        return this._getVecPos(p1, p2);
    };
    return Line;
}());
module.exports = Line; module.exports.default = Line; exports.default = Line;
