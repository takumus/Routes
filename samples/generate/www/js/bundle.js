/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var main_1 = __webpack_require__(1);
	var renderer;
	var stage = new PIXI.Container();
	var canvas;
	var stageWidth = 0, stageHeight = 0;
	var main;
	var init = function () {
	    renderer = PIXI.autoDetectRenderer(800, 800, { antialias: false, resolution: window.devicePixelRatio, transparent: false });
	    canvas = document.getElementById("content");
	    canvas.appendChild(renderer.view);
	    renderer.view.style.width = "100%";
	    renderer.view.style.height = "100%";
	    window.addEventListener("resize", resize);
	    window.addEventListener('orientationchange', resize);
	    main = new main_1.default();
	    window.addEventListener('mousedown', function (e) {
	        main.mouse.x = e.clientX;
	        main.mouse.y = e.clientY;
	        main.mousePressed = true;
	        main.mousedown();
	    });
	    window.addEventListener('mouseup', function (e) {
	        main.mousePressed = false;
	        main.mouseup();
	    });
	    window.addEventListener('mousemove', function (e) {
	        main.mouse.x = e.clientX;
	        main.mouse.y = e.clientY;
	        main.mousemove();
	    });
	    window.addEventListener('touchstart', function (e) {
	        main.mouse.x = e.touches[0].clientX;
	        main.mouse.y = e.touches[0].clientY;
	        main.mousePressed = true;
	        main.mousedown();
	    });
	    window.addEventListener('touchmove', function (e) {
	        main.mouse.x = e.touches[0].clientX;
	        main.mouse.y = e.touches[0].clientY;
	        main.mousemove();
	    });
	    window.addEventListener('touchend', function (e) {
	        if (e.touches.length > 0)
	            return;
	        main.mousePressed = false;
	        main.mouseup();
	    });
	    window.addEventListener('touchcancel', function (e) {
	        if (e.touches.length > 0)
	            return;
	        main.mousePressed = false;
	        main.mouseup();
	    });
	    stage.addChild(main);
	    draw();
	    resize();
	};
	var ppos = 0;
	var draw = function () {
	    requestAnimationFrame(draw);
	    main.draw();
	    renderer.render(stage);
	};
	var resize = function () {
	    var width = canvas.offsetWidth;
	    var height = canvas.offsetHeight;
	    stageWidth = width;
	    stageHeight = height;
	    main.size.width = width;
	    main.size.height = height;
	    main.resize(width, height);
	    renderer.resize(width, height);
	};
	window["init"] = init;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var canvas_1 = __webpack_require__(2);
	var pos_1 = __webpack_require__(3);
	var routes_1 = __webpack_require__(6);
	var line_1 = __webpack_require__(9);
	var Main = /** @class */ (function (_super) {
	    __extends(Main, _super);
	    function Main() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.n = 0;
	        return _this;
	    }
	    Main.prototype.init = function () {
	        this.prevMouse = new pos_1.XY(0, 0);
	    };
	    Main.prototype.draw = function () {
	        var _this = this;
	        this.n++;
	        this.canvas.clear();
	        var from = new pos_1.XYR(this.prevMouse.x, this.prevMouse.y, 0);
	        var to = new pos_1.XYR(this.size.width / 2, this.size.height / 2, this.n / 60);
	        var vx = this.mouse.x - this.prevMouse.x;
	        var vy = this.mouse.y - this.prevMouse.y;
	        if (vx * vx + vy * vy > 1000) {
	            this.prevMouse.x += vx * 0.1;
	            this.prevMouse.y += vy * 0.1;
	            from.x = this.prevMouse.x;
	            from.y = this.prevMouse.y;
	        }
	        var dy = to.y - from.y;
	        var dx = to.x - from.x;
	        var radius1 = 80;
	        var radius2 = 120;
	        var waveFreq = 0.3;
	        var waveAmp = 6;
	        // 強制的にターゲットと逆を向く
	        from.r = Math.atan2(vy, vx);
	        // 全ルート取得
	        routes_1.RouteGenerator.getAllRoute(from, to, radius1, radius2).forEach(function (r, n) {
	            // ルート灰色で描画
	            _this.canvas.lineStyle(2, 0xffffff - 0x333333 * n, 0.5);
	            n *= 3;
	            // sin波エフェクトをかける
	            line_1.effects.sinWave(r.generateRoute(10), waveAmp, waveFreq).forEach(function (p, i) {
	                if (i == 0) {
	                    _this.canvas.moveTo(p.x + n, p.y + n);
	                }
	                else {
	                    _this.canvas.lineTo(p.x + n, p.y + n);
	                }
	            });
	        });
	        // 最短ルートを計算 & 赤で描画
	        this.canvas.lineStyle(3, 0xff0000, 0.9);
	        line_1.effects.sinWave(routes_1.RouteGenerator.getMinimumRoute(from, to, radius1, radius2, 10), waveAmp, waveFreq).forEach(function (p, i) {
	            if (i == 0) {
	                _this.canvas.moveTo(p.x, p.y);
	            }
	            else {
	                _this.canvas.lineTo(p.x, p.y);
	            }
	        });
	        // 目印
	        var ll = 30;
	        this.canvas.lineStyle();
	        this.canvas.beginFill(0xffff00);
	        this.canvas.drawCircle(from.x, from.y, 4);
	        this.canvas.beginFill(0x00ffff);
	        this.canvas.drawCircle(to.x, to.y, 4);
	        this.canvas.endFill();
	        this.canvas.lineStyle(3, 0xffff00);
	        this.canvas.moveTo(from.x, from.y);
	        this.canvas.lineTo(Math.cos(from.r) * ll + from.x, Math.sin(from.r) * ll + from.y);
	        this.canvas.lineStyle(3, 0x00ffff);
	        this.canvas.moveTo(to.x, to.y);
	        this.canvas.lineTo(Math.cos(to.r) * ll + to.x, Math.sin(to.r) * ll + to.y);
	    };
	    return Main;
	}(canvas_1.default));
	exports.default = Main;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Canvas = /** @class */ (function (_super) {
	    __extends(Canvas, _super);
	    function Canvas() {
	        var _this = _super.call(this) || this;
	        _this.mousePressed = false;
	        _this.mouse = { x: 0, y: 0 };
	        _this.size = { width: 0, height: 0 };
	        _this.canvas = new PIXI.Graphics();
	        _this.addChild(_this.canvas);
	        _this.init();
	        return _this;
	    }
	    Canvas.prototype.init = function () {
	    };
	    Canvas.prototype.draw = function () {
	    };
	    Canvas.prototype.mousedown = function () {
	    };
	    Canvas.prototype.mouseup = function () {
	    };
	    Canvas.prototype.mousemove = function () {
	    };
	    Canvas.prototype.resize = function (width, height) {
	    };
	    return Canvas;
	}(PIXI.Container));
	exports.default = Canvas;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(4));
	__export(__webpack_require__(5));


/***/ }),
/* 4 */
/***/ (function(module, exports) {

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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

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


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var circle_1 = __webpack_require__(7);
	var line_1 = __webpack_require__(9);
	var M = __webpack_require__(8);
	var pos_1 = __webpack_require__(3);
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
	        var line = new line_1.Line();
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
	        if (line === void 0) { line = new line_1.Line(); }
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var M = __webpack_require__(8);
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


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	module.exports.PI = exports.PI = Math.PI;
	module.exports.H_PI = exports.H_PI = Math.PI / 2;
	module.exports.D_PI = exports.D_PI = Math.PI * 2;
	function normalize(r) {
	    r = r % exports.D_PI;
	    if (r < 0)
	        return exports.D_PI + r;
	    return r;
	}
	module.exports.normalize = exports.normalize = normalize;
	function abs(v) {
	    return v < 0 ? -v : v;
	}
	module.exports.abs = exports.abs = abs;
	function frandom(min, max) {
	    return min + (max - min) * Math.random();
	}
	module.exports.frandom = exports.frandom = frandom;
	function irandom(min, max) {
	    return Math.floor(min + (max - min + 1) * Math.random());
	}
	module.exports.irandom = exports.irandom = irandom;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	__export(__webpack_require__(10));
	var pos_1 = __webpack_require__(3);
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
	module.exports.Line = exports.Line = Line;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var pos_1 = __webpack_require__(3);
	var effects;
	(function (effects) {
	    function sinWave(line, amp, freq, randomBegin) {
	        if (randomBegin === void 0) { randomBegin = false; }
	        var newData = [];
	        var rad = randomBegin ? Math.random() * (Math.PI * 2) : 0;
	        newData.push(line.get(0).clone());
	        for (var i = 1; i < line.length - 1; i++) {
	            var p = line.get(i);
	            var vx = line.get(i - 1).x - p.x;
	            var vy = line.get(i - 1).y - p.y;
	            var np = new pos_1.XY();
	            var all = Math.sin(i / (line.length - 1) * Math.PI);
	            // all * allで開始、終了を極端にする。(先端への影響を少なく)
	            var offset = all * Math.sin(rad) * amp;
	            var vr = Math.sqrt(vx * vx + vy * vy);
	            rad += freq;
	            np.x = p.x + -(vy / vr * offset);
	            np.y = p.y + (vx / vr * offset);
	            newData.push(np);
	        }
	        newData.push(line.get(line.length - 1).clone());
	        line.clear();
	        newData.forEach(function (pos) {
	            line.push(pos);
	        });
	        return line;
	    }
	    effects.sinWave = sinWave;
	})(effects = exports.effects || (module.exports.effects = exports.effects = {}));


/***/ })
/******/ ]);