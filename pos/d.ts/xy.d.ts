export declare class XY {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    clone(): XY;
    equals(pos: XY, diff?: number): boolean;
    round(n: number): void;
    distance(pos: XY): number;
    copyTo(pos: XY): void;
}
