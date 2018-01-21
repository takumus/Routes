export default class Color {
    private color;
    private h;
    private s;
    private v;
    private r;
    private g;
    private b;
    private old;
    constructor(color?: number);
    clone(): Color;
    setColor(color: number): Color;
    setHSV(h?: number, s?: number, v?: number): Color;
    setRGB(r?: number, g?: number, b?: number): Color;
    private rgbToDecimal();
    getColor: () => number;
    getR: () => number;
    getG: () => number;
    getB: () => number;
    getH: () => number;
    getS: () => number;
    getV: () => number;
    static transformRGB(color: Color, to: Color, p: number): void;
    static transformHSV(color: Color, to: Color, p: number): void;
}
