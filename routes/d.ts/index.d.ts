import { Circle } from './circle';
import { Line } from 'line';
import { XY, XYR } from 'pos';
export declare class RouteGenerator {
    static getMinimumRoute(vposB: XYR, vposE: XYR, rB: number, rE: number, res: number, debug?: boolean): Line;
    static getAllRoute(vposB: XYR, vposE: XYR, rB: number, rE: number, debug?: boolean): Array<Route>;
    private static getRoute(c1, c2, _debug);
    static getLine(bp: XY, ep: XY, res: number): Line;
}
export declare class Debug {
    circle1: Circle;
    circle2: Circle;
    p1: XY;
    p2: XY;
    constructor();
}
export declare class Route {
    c1: Circle;
    c2: Circle;
    c1rb: number;
    c2rb: number;
    c1rl: number;
    c2rl: number;
    debug: Debug;
    constructor(c1: Circle, c2: Circle, c1rb: number, c2rb: number, c1rl: number, c2rl: number, debug?: Debug);
    generateRoute(res: number, line?: Line): Line;
    getLength(): number;
    private getLineRoot(bp, ep, res, line);
}
