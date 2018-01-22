import Canvas from '../.src/canvas';
import {XYR, XY} from 'pos';
import {RouteGenerator as G} from 'routes';
import {effects} from 'line';
export default class Main extends Canvas {
    private n = 0;
    private prevMouse: XY;
    public init() {
        this.prevMouse = new XY(0, 0);
    }
    public draw() {
        this.n ++;
        this.canvas.clear();
        const from = new XYR(
            this.prevMouse.x,
            this.prevMouse.y,
            0
        );
        const to = new XYR(
            this.size.width / 2,
            this.size.height / 2,
            this.n / 60
        );
        const vx = this.mouse.x - this.prevMouse.x;
        const vy = this.mouse.y - this.prevMouse.y;
        if (vx * vx + vy * vy > 1000) {
            this.prevMouse.x += vx * 0.1;
            this.prevMouse.y += vy * 0.1;
            from.x = this.prevMouse.x;
            from.y = this.prevMouse.y;
        }
        const dy = to.y - from.y;
        const dx = to.x - from.x;
        const radius1 = 80;
        const radius2 = 120;
        const waveFreq = 0.3;
        const waveAmp = 6;
        // 強制的にターゲットと逆を向く
        from.r = Math.atan2(vy, vx);
        // 全ルート取得
        G.getAllRoute(
            from,
            to,
            radius1,
            radius2
        ).forEach((r, n) => {
            // ルート灰色で描画
            this.canvas.lineStyle(2, 0xffffff - 0x333333 * n, 0.5);
            n *= 3;
            // sin波エフェクトをかける
            effects.sinWave(
                r.generateRoute(10),
                waveAmp,
                waveFreq
            ).forEach((p, i) => {
                if (i == 0) {
                    this.canvas.moveTo(p.x + n, p.y + n);
                }else {
                    this.canvas.lineTo(p.x + n, p.y + n);
                }
            });
        });
        // 最短ルートを計算 & 赤で描画
        this.canvas.lineStyle(3, 0xff0000, 0.9);
        effects.sinWave(
            G.getMinimumRoute(
                from,
                to,
                radius1,
                radius2,
                10
            ),
            waveAmp,
            waveFreq
        ).forEach((p, i) => {
            if (i == 0) {
                this.canvas.moveTo(p.x, p.y);
            }else {
                this.canvas.lineTo(p.x, p.y);
            }
        });
        // 目印
        const ll = 30;
        this.canvas.lineStyle();
        this.canvas.beginFill(0xffff00);
        this.canvas.drawCircle(from.x, from.y, 4);
        this.canvas.beginFill(0x00ffff);
        this.canvas.drawCircle(to.x, to.y, 4);
        this.canvas.endFill();
        this.canvas.lineStyle(3, 0xffff00);
        this.canvas.moveTo(from.x, from.y);
        this.canvas.lineTo(
            Math.cos(from.r) * ll + from.x,
            Math.sin(from.r) * ll + from.y
        );
        this.canvas.lineStyle(3, 0x00ffff);
        this.canvas.moveTo(to.x, to.y);
        this.canvas.lineTo(
            Math.cos(to.r) * ll + to.x,
            Math.sin(to.r) * ll + to.y
        );
    }
}