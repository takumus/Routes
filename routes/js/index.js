"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var circle_1 = require("./circle");
var line_1 = require("line");
var M = require("matthew");
var pos_1 = require("pos");
var RouteGenerator = /** @class */ (function () {
    function RouteGenerator() {
    }
    RouteGenerator.getMinimumRoute = function (vposB, vposE, rB, rE, res) {
        var routes = this.getAllRoute(vposB, vposE, rB, rE);
        var min = Number.MAX_VALUE;
        var route;
        for (var i = 0; i < routes.length; i++) {
            var r = routes[i];
            if (r.getLength() < min) {
                min = r.getLength();
                route = r;
            }
        }
        ;
        return route.generateRoute(res);
    };
    RouteGenerator.getAllRoute = function (vposB, vposE, rB, rE) {
        var cB1 = new circle_1.Circle(Math.cos(vposB.r + M.H_PI) * rB + vposB.x, Math.sin(vposB.r + M.H_PI) * rB + vposB.y, rB, 1, vposB.r - M.H_PI);
        var cB2 = new circle_1.Circle(Math.cos(vposB.r - M.H_PI) * rB + vposB.x, Math.sin(vposB.r - M.H_PI) * rB + vposB.y, rB, -1, vposB.r + M.H_PI);
        var cE1 = new circle_1.Circle(Math.cos(vposE.r + M.H_PI) * rE + vposE.x, Math.sin(vposE.r + M.H_PI) * rE + vposE.y, rE, 1, vposE.r - M.H_PI);
        var cE2 = new circle_1.Circle(Math.cos(vposE.r - M.H_PI) * rE + vposE.x, Math.sin(vposE.r - M.H_PI) * rE + vposE.y, rE, -1, vposE.r + M.H_PI);
        var allRoute = [];
        var route;
        route = this.getRoute(cB1, cE1);
        if (route)
            allRoute.push(route);
        route = this.getRoute(cB1, cE2);
        if (route)
            allRoute.push(route);
        route = this.getRoute(cB2, cE1);
        if (route)
            allRoute.push(route);
        route = this.getRoute(cB2, cE2);
        if (route)
            allRoute.push(route);
        return allRoute;
    };
    RouteGenerator.getRoute = function (c1, c2) {
        var dx = c2.x - c1.x;
        var dy = c2.y - c1.y;
        var l = dx * dx + dy * dy;
        var a1 = new pos_1.XY(), a2 = new pos_1.XY(), b1 = new pos_1.XY(), b2 = new pos_1.XY();
        var br = Math.atan2(c2.y - c1.y, c2.x - c1.x);
        var c1tr = c1.tr;
        var c2tr = c2.tr;
        var c1r;
        var c2r;
        var c1dr;
        var c2dr;
        this.circle(c1.x + Math.cos(c1tr) * c1.r, c1.y + Math.sin(c1tr) * c1.r, 3);
        this.circle(c2.x + Math.cos(c2tr) * c2.r, c2.y + Math.sin(c2tr) * c2.r, 3);
        if (c1.d == c2.d) {
            var d = l - (c2.r - c1.r) * (c2.r - c1.r);
            if (d < 0)
                return null;
            d = Math.sqrt(d);
            a1.x = c1.r * ((c1.r - c2.r) * dx + d * dy) / l + c1.x;
            a1.y = c1.r * ((c1.r - c2.r) * dy - d * dx) / l + c1.y;
            a2.x = c1.r * ((c1.r - c2.r) * dx - d * dy) / l + c1.x;
            a2.y = c1.r * ((c1.r - c2.r) * dy + d * dx) / l + c1.y;
            b1.x = c2.r * ((c2.r - c1.r) * -dx - d * -dy) / l + c2.x;
            b1.y = c2.r * ((c2.r - c1.r) * -dy + d * -dx) / l + c2.y;
            b2.x = c2.r * ((c2.r - c1.r) * -dx + d * -dy) / l + c2.x;
            b2.y = c2.r * ((c2.r - c1.r) * -dy - d * -dx) / l + c2.y;
            var r = Math.atan2(a1.y - c1.y, a1.x - c1.x) - br;
            if (c1.d > 0) {
                c2r = c1r = M.normalize(r + br);
                this.line(a1.x, a1.y, b1.x, b1.y);
            }
            else {
                c2r = c1r = M.normalize(-r + br);
                this.line(a2.x, a2.y, b2.x, b2.y);
            }
            this.line(c1.x, c1.y, Math.cos(c1r) * c1.r + c1.x, Math.sin(c1r) * c1.r + c1.y);
            this.line(c2.x, c2.y, Math.cos(c2r) * c2.r + c2.x, Math.sin(c2r) * c2.r + c2.y);
        }
        else if (c1.d != c2.d) {
            var d = l - (c2.r + c1.r) * (c2.r + c1.r);
            if (d < 0)
                return null;
            d = Math.sqrt(d);
            a1.x = c1.r * ((c2.r + c1.r) * dx + d * dy) / l + c1.x;
            a1.y = c1.r * ((c2.r + c1.r) * dy - d * dx) / l + c1.y;
            a2.x = c1.r * ((c2.r + c1.r) * dx - d * dy) / l + c1.x;
            a2.y = c1.r * ((c2.r + c1.r) * dy + d * dx) / l + c1.y;
            b1.x = c2.r * ((c1.r + c2.r) * -dx + d * -dy) / l + c2.x;
            b1.y = c2.r * ((c1.r + c2.r) * -dy - d * -dx) / l + c2.y;
            b2.x = c2.r * ((c1.r + c2.r) * -dx - d * -dy) / l + c2.x;
            b2.y = c2.r * ((c1.r + c2.r) * -dy + d * -dx) / l + c2.y;
            var r = Math.atan2(a1.y - c1.y, a1.x - c1.x) - br;
            if (c1.d > 0) {
                c1r = M.normalize(r + br);
                c2r = M.normalize(r + br + M.PI);
                this.line(a1.x, a1.y, b1.x, b1.y);
            }
            else {
                c1r = M.normalize(-r + br);
                c2r = M.normalize(-r + br + M.PI);
                this.line(a2.x, a2.y, b2.x, b2.y);
            }
            this.line(c1.x, c1.y, Math.cos(c1r) * c1.r + c1.x, Math.sin(c1r) * c1.r + c1.y);
            this.line(c2.x, c2.y, Math.cos(c2r) * c2.r + c2.x, Math.sin(c2r) * c2.r + c2.y);
        }
        if (c1.d > 0) {
            if (c1.tr < c1r) {
                c1dr = c1r - c1.tr;
            }
            else {
                c1dr = M.D_PI - (c1.tr - c1r);
            }
        }
        else {
            if (c1.tr < c1r) {
                c1dr = M.D_PI - (c1r - c1.tr);
            }
            else {
                c1dr = c1.tr - c1r;
            }
        }
        if (c2.d > 0) {
            if (c2r < c2.tr) {
                c2dr = c2.tr - c2r;
            }
            else {
                c2dr = M.D_PI - (c2r - c2.tr);
            }
        }
        else {
            if (c2r < c2.tr) {
                c2dr = M.D_PI - (c2.tr - c2r);
            }
            else {
                c2dr = c2r - c2.tr;
            }
        }
        this.circle(c1.x, c1.y, 2);
        this.circle(c2.x, c2.y, 2);
        this.circle(c1.x, c1.y, c1.r);
        this.circle(c2.x, c2.y, c2.r);
        return new Route(c1, c2, c1.tr, c2r, c1dr * c1.d, c2dr * c2.d);
    };
    RouteGenerator.getLine = function (bp, ep, res) {
        var line = new line_1.default();
        var tx = ep.x - bp.x;
        var ty = ep.y - bp.y;
        var r = Math.atan2(ty, tx);
        var dx = Math.cos(r) * res;
        var dy = Math.sin(r) * res;
        var l = Math.sqrt(tx * tx + ty * ty) - res;
        var L = l / res;
        for (var i = 0; i < L; i++) {
            line.push(new pos_1.XY(dx * i + bp.x, dy * i + bp.y));
        }
        return line;
    };
    RouteGenerator.line = function (x1, y1, x2, y2) {
        // if(!this.graphics) return;
        // this.graphics.moveTo(x1, y1);
        // this.graphics.lineTo(x2, y2);
    };
    RouteGenerator.circle = function (x, y, r) {
        // if(!this.graphics) return;
        // this.graphics.drawCircle(x, y, r);
    };
    return RouteGenerator;
}());
module.exports.RouteGenerator = exports.RouteGenerator = RouteGenerator;
var Route = /** @class */ (function () {
    function Route(c1, c2, c1rb, c2rb, c1rl, c2rl) {
        this.c1 = c1;
        this.c2 = c2;
        this.c1rb = c1rb;
        this.c2rb = c2rb;
        this.c1rl = c1rl;
        this.c2rl = c2rl;
    }
    Route.prototype.generateRoute = function (res, line) {
        if (line === void 0) { line = new line_1.default(); }
        var c1rres = res / (this.c1.r * 2 * M.PI) * M.D_PI;
        var c2rres = res / (this.c2.r * 2 * M.PI) * M.D_PI;
        var _x = Math.cos(this.c1rb) * this.c1.r + this.c1.x;
        var _y = Math.sin(this.c1rb) * this.c1.r + this.c1.y;
        var tr;
        var L = M.abs(this.c1rl);
        for (var r = 0; r < L; r += c1rres) {
            tr = this.c1rb + r * this.c1.d;
            _x = Math.cos(tr) * this.c1.r + this.c1.x;
            _y = Math.sin(tr) * this.c1.r + this.c1.y;
            line.push(new pos_1.XY(_x, _y));
        }
        line.pop();
        this.getLineRoot(new pos_1.XY(_x, _y), new pos_1.XY(Math.cos(this.c2rb) * this.c2.r + this.c2.x, Math.sin(this.c2rb) * this.c2.r + this.c2.y), res, line);
        var LL = M.abs(this.c2rl) - c2rres;
        for (var r = 0; r < LL; r += c2rres) {
            tr = this.c2rb + r * this.c2.d;
            _x = Math.cos(tr) * this.c2.r + this.c2.x;
            _y = Math.sin(tr) * this.c2.r + this.c2.y;
            line.push(new pos_1.XY(_x, _y));
        }
        line.push(new pos_1.XY(Math.cos(this.c2rb + (M.abs(this.c2rl)) * this.c2.d) * this.c2.r + this.c2.x, Math.sin(this.c2rb + (M.abs(this.c2rl)) * this.c2.d) * this.c2.r + this.c2.y));
        return line;
    };
    Route.prototype.getLength = function () {
        var l = 0;
        l += this.c1.r * 2 * M.PI * (M.abs(this.c1rl) / (M.D_PI));
        l += this.c2.r * 2 * M.PI * (M.abs(this.c2rl) / (M.D_PI));
        var t1x = Math.cos(this.c1rb + this.c1rl) * this.c1.r + this.c1.x;
        var t1y = Math.sin(this.c1rb + this.c1rl) * this.c1.r + this.c1.y;
        var t2x = Math.cos(this.c2rb) * this.c2.r + this.c2.x;
        var t2y = Math.sin(this.c2rb) * this.c2.r + this.c2.y;
        var dx = t1x - t2x;
        var dy = t1y - t2y;
        l += Math.sqrt(dx * dx + dy * dy);
        return l;
    };
    Route.prototype.getLineRoot = function (bp, ep, res, line) {
        var tx = ep.x - bp.x;
        var ty = ep.y - bp.y;
        var r = Math.atan2(ty, tx);
        var dx = Math.cos(r) * res;
        var dy = Math.sin(r) * res;
        var l = Math.sqrt(tx * tx + ty * ty) - res;
        var L = l / res;
        for (var i = 0; i < L; i++) {
            line.push(new pos_1.XY(dx * i + bp.x, dy * i + bp.y));
        }
    };
    return Route;
}());
module.exports.Route = exports.Route = Route;
