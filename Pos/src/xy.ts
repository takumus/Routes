export class XY {
    public x: number = 0;
    public y: number = 0;
    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
    public clone(): XY {
        return new XY(this.x, this.y);
    }
    public equals(pos: XY, diff: number = 1): boolean {
        const dx = pos.x - this.x;
        const dy = pos.y - this.y;
        return dx * dx + dy * dy < diff;
    }
    public round(n: number) {
        n = Math.pow(10, n);
        this.x = Math.floor(this.x * n) / n;
        this.y = Math.floor(this.y * n) / n;
    }
    public distance(pos: XY): number {
        const tx = pos.x - this.x;
        const ty = pos.y - this.y;
        return Math.sqrt(tx * tx + ty * ty);
    }
}