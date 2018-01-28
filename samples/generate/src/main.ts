import Canvas from '../.src/canvas';
import {XYR, XY} from 'pos';
import {RouteGenerator as G} from 'routes';
import {effects, Line} from 'line';
export default class Main extends Canvas {
    private n = 0;
    private prevMouse: XY;
    private lFromPos: PIXI.Text = this.createLabel("P1", 0x000000, 24);
    private lFromVec: PIXI.Text;
    private lToPos: PIXI.Text = this.createLabel("P2", 0x000000, 24);
    private lToVec: PIXI.Text;
    private colors = [
        0xff0000,
        0x00ff00,
        0x0000ff,
        0x00ffff
    ];
    public init() {
        this.prevMouse = new XY(0, 0);
    }
    public draw() {
        this.n ++;
        this.canvas.clear();
        this.canvas.beginFill(0xFFFFFF);
        this.canvas.drawRect(0, 0, this.size.width, this.size.height);
        this.canvas.endFill();
        const from = new XYR(
            this.prevMouse.x,
            this.prevMouse.y,
            0
        );
        const to = new XYR(
            this.size.width / 2,
            this.size.height / 2,
            -this.n/90
        );
        this.lToPos.x = to.x - 40;
        this.lToPos.y = to.y - 40;
        this.lFromPos.x = from.x - 40;
        this.lFromPos.y = from.y - 40;
        const vx = this.mouse.x - this.prevMouse.x;
        const vy = this.mouse.y - this.prevMouse.y;
        if (vx * vx + vy * vy > 3600) {
            this.prevMouse.x += vx * 0.1;
            this.prevMouse.y += vy * 0.1;
            from.x = this.prevMouse.x;
            from.y = this.prevMouse.y;
        }
        const dy = to.y - from.y;
        const dx = to.x - from.x;
        const radius1 = 80;
        const radius2 = 80;
        const waveFreq = 0.3;
        const waveAmp = 6;
        // 強制的にターゲットと逆を向く
        from.r = Math.atan2(vy, vx);
        // 全ルート取得
        let routes1 = G.getAllRoute(
            from,
            to,
            radius1,
            radius2,
            true
        );
        let line: Line;
        routes1 = routes1.sort((a, b) => a.getLength() - b.getLength());
        routes1.forEach((r, n) => {
            //if (n != 0) return;
            if (n == 0) {
                line = effects.sinWave(
                    r.generateRoute(10),
                    waveAmp,
                    waveFreq
                );
            }
            this.canvas.lineStyle(2, 0xEEEEEE, 1);
            this.canvas.drawCircle(r.debug.circle1.x, r.debug.circle1.y, r.debug.circle1.r);
            this.canvas.drawCircle(r.debug.circle2.x, r.debug.circle2.y, r.debug.circle2.r);
            this.canvas.moveTo(r.debug.p1.x, r.debug.p1.y);
            this.canvas.lineTo(r.debug.p2.x, r.debug.p2.y);
        });
        this.renderLine(line, 0xff0000, 3, 0.5, 0);
        // 目印
        this.drawMarker(from);
        this.drawMarker(to);
    }
    private renderLine(route: Line, color: number, thickness: number, alpha: number, offset: number) {
        this.canvas.endFill();
        this.canvas.lineStyle(thickness, color, alpha);
        route.forEach((p, i) => {
            if (i == 0) {
                this.canvas.moveTo(p.x + offset, p.y + offset);
            }else {
                this.canvas.lineTo(p.x + offset, p.y + offset);
            }
        })
    }
    private createLabel(text, color, size) {
        const label = new PIXI.Text(text, {
            fill: color,
            fontSize: size
        });
        this.addChild(label);
        return label;
    }
    private drawMarker(xyr: XYR, l: number = 60) {
        this.canvas.lineStyle();
        this.canvas.beginFill(0x666666);
        this.canvas.drawCircle(xyr.x, xyr.y, 12);
        this.canvas.endFill();
        this.canvas.lineStyle(3, 0x666666);
        this.canvas.moveTo(xyr.x, xyr.y);
        this.canvas.lineTo(
            Math.cos(xyr.r) * l + xyr.x,
            Math.sin(xyr.r) * l + xyr.y
        );
    }
}