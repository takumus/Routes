import { Circle } from './circle';
import Line from 'line';
import { XY, XYR } from 'pos';
export declare class RouteGenerator {
    static getMinimumRoute(vposB: XYR, vposE: XYR, rB: number, rE: number, res: number): Line;
    static getAllRoute(vposB: XYR, vposE: XYR, rB: number, rE: number): Array<Route>;
    private static getRoute(c1, c2);
    static getLine(bp: XY, ep: XY, res: number): Line;
    private static line(x1, y1, x2, y2);
    private static circle(x, y, r);
}
export declare class Route {
    c1: Circle;
    c2: Circle;
    c1rb: number;
    c2rb: number;
    c1rl: number;
    c2rl: number;
    constructor(c1: Circle, c2: Circle, c1rb: number, c2rb: number, c1rl: number, c2rl: number);
    generateRoute(res: number, line?: Line): Line;
    getLength(): number;
    private getLineRoot(bp, ep, res, line);
}
