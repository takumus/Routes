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
