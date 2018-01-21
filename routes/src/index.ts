import {Circle} from './circle';
import {Line} from 'line';
import * as M from 'matthew';
import {XY, XYR} from 'pos';
export class RouteGenerator {
    public static getMinimumRoute(vposB: XYR, vposE: XYR, rB: number, rE: number, res: number): Line {
        const routes = this.getAllRoute(vposB, vposE, rB, rE);
        let min = Number.MAX_VALUE;
        let route: Route;
        for (let i = 0; i < routes.length; i ++) {
            const r = routes[i];
            if (r.getLength() < min) {
                min = r.getLength();
                route = r;
            }
        };
        return route.generateRoute(res);
    }
    public static getAllRoute(vposB: XYR, vposE: XYR, rB: number, rE: number): Array<Route> {
        const cB1 = new Circle(
            Math.cos(vposB.r + M.H_PI) * rB + vposB.x,
            Math.sin(vposB.r + M.H_PI) * rB + vposB.y,
            rB,
            1,
            vposB.r - M.H_PI
        );
        const cB2 = new Circle(
            Math.cos(vposB.r - M.H_PI) * rB + vposB.x,
            Math.sin(vposB.r - M.H_PI) * rB + vposB.y,
            rB,
            -1,
            vposB.r + M.H_PI
        );
        const cE1 = new Circle(
            Math.cos(vposE.r + M.H_PI) * rE + vposE.x,
            Math.sin(vposE.r + M.H_PI) * rE + vposE.y,
            rE,
            1,
            vposE.r - M.H_PI
        );
        const cE2 = new Circle(
            Math.cos(vposE.r - M.H_PI) * rE + vposE.x,
            Math.sin(vposE.r - M.H_PI) * rE + vposE.y,
            rE,
            -1,
            vposE.r + M.H_PI
        );
        const allRoute: Array<Route> = [];
        let route: Route;
        route = this.getRoute(cB1, cE1);
        if (route) allRoute.push(route);
        route = this.getRoute(cB1, cE2);
        if (route) allRoute.push(route);
        route = this.getRoute(cB2, cE1);
        if (route) allRoute.push(route);
        route = this.getRoute(cB2, cE2);
        if (route) allRoute.push(route);
        return allRoute;
    }
    private static getRoute(c1: Circle, c2: Circle): Route {
        const dx = c2.x - c1.x;
        const dy = c2.y - c1.y;
        const l = dx * dx + dy * dy;
        const a1 = new XY(), a2 = new XY(), b1 = new XY(), b2 = new XY();
        const br = Math.atan2(c2.y - c1.y, c2.x - c1.x);
        const c1tr = c1.tr;
        const c2tr = c2.tr;
        let c1r: number;
        let c2r: number;
        let c1dr: number;
        let c2dr: number;
        this.circle(c1.x + Math.cos(c1tr) * c1.r, c1.y + Math.sin(c1tr) * c1.r, 3);
        this.circle(c2.x + Math.cos(c2tr) * c2.r, c2.y + Math.sin(c2tr) * c2.r, 3);
        if (c1.d == c2.d) {
            let d = l - (c2.r - c1.r) * (c2.r - c1.r);
            if (d < 0) return null;
            d = Math.sqrt(d);
            a1.x = c1.r * ((c1.r - c2.r) * dx + d * dy) / l + c1.x;
            a1.y = c1.r * ((c1.r - c2.r) * dy - d * dx) / l + c1.y;
            a2.x = c1.r * ((c1.r - c2.r) * dx - d * dy) / l + c1.x;
            a2.y = c1.r * ((c1.r - c2.r) * dy + d * dx) / l + c1.y;
            b1.x = c2.r * ((c2.r - c1.r) * -dx - d * -dy) / l + c2.x;
            b1.y = c2.r * ((c2.r - c1.r) * -dy + d * -dx) / l + c2.y;
            b2.x = c2.r * ((c2.r - c1.r) * -dx + d * -dy) / l + c2.x;
            b2.y = c2.r * ((c2.r - c1.r) * -dy - d * -dx) / l + c2.y;
            const r = Math.atan2(a1.y - c1.y, a1.x - c1.x) - br;
            if (c1.d > 0) {
                c2r = c1r = M.normalize(r + br);
                this.line(a1.x, a1.y, b1.x, b1.y);
            } else {
                c2r = c1r = M.normalize(-r + br);
                this.line(a2.x, a2.y, b2.x, b2.y);
            }
            this.line(
                c1.x,
                c1.y,
                Math.cos(c1r) * c1.r + c1.x,
                Math.sin(c1r) * c1.r + c1.y
            );
            this.line(
                c2.x,
                c2.y,
                Math.cos(c2r) * c2.r + c2.x,
                Math.sin(c2r) * c2.r + c2.y
            );
        } else if (c1.d != c2.d) {
            let d = l - (c2.r + c1.r) * (c2.r + c1.r);
            if (d < 0) return null;
            d = Math.sqrt(d);
            a1.x = c1.r * ((c2.r + c1.r) * dx + d * dy) / l + c1.x;
            a1.y = c1.r * ((c2.r + c1.r) * dy - d * dx) / l + c1.y;
            a2.x = c1.r * ((c2.r + c1.r) * dx - d * dy) / l + c1.x;
            a2.y = c1.r * ((c2.r + c1.r) * dy + d * dx) / l + c1.y;
            b1.x = c2.r * ((c1.r + c2.r) * -dx + d * -dy) / l + c2.x;
            b1.y = c2.r * ((c1.r + c2.r) * -dy - d * -dx) / l + c2.y;
            b2.x = c2.r * ((c1.r + c2.r) * -dx - d * -dy) / l + c2.x;
            b2.y = c2.r * ((c1.r + c2.r) * -dy + d * -dx) / l + c2.y;
            const r = Math.atan2(a1.y - c1.y, a1.x - c1.x) - br;
            if (c1.d > 0) {
                c1r = M.normalize(r + br);
                c2r = M.normalize(r + br + M.PI);
                this.line(a1.x, a1.y, b1.x, b1.y);
            } else {
                c1r = M.normalize(-r + br);
                c2r = M.normalize(-r + br + M.PI);
                this.line(a2.x, a2.y, b2.x, b2.y);
            }
            this.line(
                c1.x,
                c1.y,
                Math.cos(c1r) * c1.r + c1.x,
                Math.sin(c1r) * c1.r + c1.y
            );
            this.line(
                c2.x,
                c2.y,
                Math.cos(c2r) * c2.r + c2.x,
                Math.sin(c2r) * c2.r + c2.y
            );
        }
        if (c1.d > 0) {
            if (c1.tr < c1r) {
                c1dr = c1r - c1.tr;
            } else {
                c1dr = M.D_PI - (c1.tr - c1r);
            }
        } else {
            if (c1.tr < c1r) {
                c1dr = M.D_PI - (c1r - c1.tr);
            } else {
                c1dr = c1.tr - c1r;
            }
        }
        if (c2.d > 0) {
            if (c2r < c2.tr) {
                c2dr = c2.tr - c2r;
            } else {
                c2dr = M.D_PI - (c2r - c2.tr);
            }
        } else {
            if (c2r < c2.tr) {
                c2dr = M.D_PI - (c2.tr - c2r);
            } else {
                c2dr = c2r - c2.tr;
            }
        }
        this.circle(c1.x, c1.y, 2);
        this.circle(c2.x, c2.y, 2);
        this.circle(c1.x, c1.y, c1.r);
        this.circle(c2.x, c2.y, c2.r);
        return new Route(c1, c2, c1.tr, c2r, c1dr * c1.d, c2dr * c2.d);
    }
    public static getLine(bp: XY, ep: XY, res: number): Line {
        const line: Line = new Line();
        const tx = ep.x - bp.x;
        const ty = ep.y - bp.y;
        const r = Math.atan2(ty, tx);
        const dx = Math.cos(r) * res;
        const dy = Math.sin(r) * res;
        const l = Math.sqrt(tx * tx + ty * ty) - res;
        const L = l / res;
        for (let i = 0; i < L; i++) {
            line.push(new XY(
                dx * i + bp.x,
                dy * i + bp.y
            ));
        }
        return line;
    }
    private static line(x1: number, y1: number, x2: number, y2: number) {
        // if(!this.graphics) return;
        // this.graphics.moveTo(x1, y1);
        // this.graphics.lineTo(x2, y2);
    }
    private static circle(x: number, y: number, r: number) {
        // if(!this.graphics) return;
        // this.graphics.drawCircle(x, y, r);
    }
}
export class Route {
    public c1: Circle;
    public c2: Circle;
    public c1rb: number;
    public c2rb: number;
    public c1rl: number;
    public c2rl: number;
    constructor(c1: Circle, c2: Circle, c1rb: number, c2rb: number, c1rl: number, c2rl: number) {
        this.c1 = c1;
        this.c2 = c2;
        this.c1rb = c1rb;
        this.c2rb = c2rb;
        this.c1rl = c1rl;
        this.c2rl = c2rl;
    }
    public generateRoute(res: number, line: Line = new Line()): Line {
        const c1rres = res / (this.c1.r * 2 * M.PI) * M.D_PI;
        const c2rres = res / (this.c2.r * 2 * M.PI) * M.D_PI;
        let _x = Math.cos(this.c1rb) * this.c1.r + this.c1.x;
        let _y = Math.sin(this.c1rb) * this.c1.r + this.c1.y;
        let tr: number;
        const L = M.abs(this.c1rl);
        for (let r = 0; r < L; r += c1rres) {
            tr = this.c1rb + r * this.c1.d;
            _x = Math.cos(tr) * this.c1.r + this.c1.x;
            _y = Math.sin(tr) * this.c1.r + this.c1.y;
            line.push(new XY(_x, _y));
        }
        line.pop();
        this.getLineRoot(
            new XY(_x, _y),
            new XY(
                Math.cos(this.c2rb) * this.c2.r + this.c2.x,
                Math.sin(this.c2rb) * this.c2.r + this.c2.y
            ),
            res,
            line
        );
        const LL = M.abs(this.c2rl) - c2rres;
        for (let r = 0; r < LL; r += c2rres) {
            tr = this.c2rb + r * this.c2.d;
            _x = Math.cos(tr) * this.c2.r + this.c2.x;
            _y = Math.sin(tr) * this.c2.r + this.c2.y;
            line.push(new XY(_x, _y));
        }
        line.push(
            new XY(
                Math.cos(this.c2rb + (M.abs(this.c2rl)) * this.c2.d) * this.c2.r + this.c2.x,
                Math.sin(this.c2rb + (M.abs(this.c2rl)) * this.c2.d) * this.c2.r + this.c2.y,
            )
        );
        return line;
    }
    public getLength(): number {
        let l = 0;
        l += this.c1.r * 2 * M.PI * (M.abs(this.c1rl) / (M.D_PI));
        l += this.c2.r * 2 * M.PI * (M.abs(this.c2rl) / (M.D_PI));
        const t1x = Math.cos(this.c1rb + this.c1rl) * this.c1.r + this.c1.x;
        const t1y = Math.sin(this.c1rb + this.c1rl) * this.c1.r + this.c1.y;
        const t2x = Math.cos(this.c2rb) * this.c2.r + this.c2.x;
        const t2y = Math.sin(this.c2rb) * this.c2.r + this.c2.y;
        const dx = t1x - t2x;
        const dy = t1y - t2y;
        l += Math.sqrt(dx * dx + dy * dy);
        return l;
    }
    private getLineRoot(bp: XY, ep: XY, res: number, line: Line): void {
        const tx = ep.x - bp.x;
        const ty = ep.y - bp.y;
        const r = Math.atan2(ty, tx);
        const dx = Math.cos(r) * res;
        const dy = Math.sin(r) * res;
        const l = Math.sqrt(tx * tx + ty * ty) - res;
        const L = l / res;
        for (let i = 0; i < L; i++) {
            line.push(new XY(
                dx * i + bp.x,
                dy * i + bp.y
            ));
        }
    }
}