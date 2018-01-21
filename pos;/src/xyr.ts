export class XYR {
    public x: number = 0;
    public y: number = 0;
    public r: number = 0;
    constructor(x: number = 0, y: number = 0, r: number = 0) {
        this.x = x;
        this.y = y;
        this.r = r;
    }
    public clone(): XYR {
        return new XYR(this.x, this.y, this.r);
    }
}