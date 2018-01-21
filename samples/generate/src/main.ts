import Canvas from '../.src/canvas';
import {XYR, XY} from 'pos';
import {RouteGenerator as G} from 'routes';
import {effects} from 'line';
export default class Main extends Canvas {
    private n = 0;
    public init() {
        
    }
    public draw() {
        this.n ++;
        this.canvas.clear();
        const from = new XYR(
            this.mouse.x,
            this.mouse.y,
            this.n / 60
        );
        const to = new XYR(
            this.size.width / 2,
            this.size.height / 2,
            0
        );
        // 強制的にターゲットと逆を向く
        to.r = Math.atan2(to.y - from.y, to.x - from.x);
        // 全ルート取得
        G.getAllRoute(
            from,
            to,
            80,
            70
        ).forEach((r, n) => {
            // ルート灰色で描画
            this.canvas.lineStyle(2, 0xffffff - 0x333333 * n, 0.5);
            n *= 3;
            // sin波エフェクトをかける
            effects.sinWave(
                r.generateRoute(10),
                10,
                0.3
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
                80,
                70,
                10
            ),
            10,
            0.3
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