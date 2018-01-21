export * from './effects';
import {XY, XYR} from 'pos';
export class Line {
    private array: Array<XY>;
    private prevPositionOffset: XY;
    private prevScaleOffset: XY;
    constructor(data: Array<XY>|Array<{x: number, y: number}> = []) {
        this.array = [];
        for (let i = 0; i < data.length; i ++) {
            const p = data[i];
            this.push(new XY(p.x, p.y));
        }
        this.prevPositionOffset = new XY();
        this.prevScaleOffset = new XY();
    }
    public push(pos: XY) {
        this.array.push(pos);
    }
    public shift() {
        return this.array.shift();
    }
    public pop() {
        return this.array.pop();
    }
    public get(index: number) {
        return this.array[index];
    }
    public forEach(callbackfn: (value: XY, index: number, array: XY[]) => void, thisArg?: any) {
        this.array.forEach(callbackfn, thisArg);
    }
    public get length() {
        return this.array.length;
    }
    public setPositionOffset(pos: XY): void {
        this.array.forEach((p) => {
            p.x += pos.x - this.prevPositionOffset.x;
            p.y += pos.y - this.prevPositionOffset.y;
        });
        this.prevPositionOffset = pos.clone();
    }
    public setScaleOffset(scale: XY): void {
        this.array.forEach((p) => {
            p.x /= this.prevScaleOffset.x;
            p.y /= this.prevScaleOffset.y;
            p.x *= scale.x;
            p.y *= scale.y;
        });
        this.prevScaleOffset = scale.clone();
    }
    public getRect(): XY {
        let minX = Number.MAX_VALUE;
        let maxX = Number.MIN_VALUE;
        let minY = Number.MAX_VALUE;
        let maxY = Number.MIN_VALUE;
        for (let i = 0; i < this.length; i ++) {
            const p = this[i];
            if (minX > p.x) minX = p.x;
            else if (maxX < p.x) maxX = p.x;
            if (minY > p.y) minY = p.y;
            else if (maxY < p.y) maxY = p.y;
        }
        return new XY(maxX - minX, maxY - minY);
    }
    public getHeadVecPos(): XYR {
        return this._getVecPos(
            this[0],
            this[1]
        );
    }
    public getTailVecPos(): XYR {
        return this._getVecPos(
            this[this.length - 1],
            this[this.length - 2]
        );
    }
    public pushLine(line: Line): Line {
        if (line.length < 1) return this;
        line = line.clone();
        if (this.length > 0 && line[0].equals(this[this.length - 1])) line.shift();
        line.forEach((p) => {
            this.push(p.clone());
        })
        return this;
    }
    public clone(): Line {
        const data: Line = new Line();
        this.forEach((p) => {
            data.push(p.clone());
        });
        return data;
    }
    public clear() {
        this.array = [];
    }
    public toString(): string {
        return JSON.stringify(this);
    }
    private _getVecPos(fp: XY, sp: XY): XYR {
        return new XYR(
            fp.x,
            fp.y,
            Math.atan2(
                sp.y - fp.y,
                sp.x - fp.x
            )
        );
    }
    public getVecPos(id: number): XYR {
        let p1 = this[id];
        let p2 = this[id + 1];
        if (!p2) {
            p1 = this[id - 1];
            p2 = this[id];
        }
        return this._getVecPos(p1, p2);
    }
}