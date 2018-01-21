"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pos_1 = require("pos");
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
