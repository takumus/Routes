export class Circle {
    public x: number;
    public y: number;
    public r: number;
    public tr: number;
    public d: number;
    /**
     * Create a point.
     * @param x - circle's x
     * @param y - circle's y
     * @param r - circle's radius
     * @param d - circle's direction
     * @param tr - circle's target radian
     */
    constructor(x: number = 0, y: number = 0, r: number = 0, d: number = 0, tr: number = 0) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.d = d;
        this.tr = tr;
    }
}