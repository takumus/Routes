import { XY, XYR } from 'pos';
export default class Line {
    private array;
    private prevPositionOffset;
    private prevScaleOffset;
    constructor(data?: Array<XY> | Array<{
        x: number;
        y: number;
    }>);
    push(pos: XY): void;
    shift(): XY;
    pop(): XY;
    forEach: (callbackfn: (value: XY, index: number, array: XY[]) => void, thisArg?: any) => void;
    readonly length: number;
    setPositionOffset(pos: XY): void;
    setScaleOffset(scale: XY): void;
    getRect(): XY;
    getHeadVecPos(): XYR;
    getTailVecPos(): XYR;
    pushLine(line: Line): Line;
    clone(): Line;
    clear(): void;
    toString(): string;
    private _getVecPos(fp, sp);
    getVecPos(id: number): XYR;
}
