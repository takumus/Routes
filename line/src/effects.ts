import {XY} from 'pos';
import {Line} from '.';
export namespace effects {
    export function sinWave(line: Line, amp: number, freq: number, randomBegin: boolean = false): Line {
        const newData: Array<XY> = [];
        let rad = randomBegin ? Math.random() * (Math.PI * 2) : 0;
        newData.push(line.get(0).clone());
        for (let i = 1; i < line.length  - 1; i ++) {
            const p = line.get(i);
            const vx = line.get(i - 1).x - p.x;
            const vy = line.get(i - 1).y - p.y;
            const np = new XY();
            const all = Math.sin(i / (line.length - 1) * Math.PI);
            // all * allで開始、終了を極端にする。(先端への影響を少なく)
            const offset = all * Math.sin(rad) * amp;
            const vr = Math.sqrt(vx * vx + vy * vy);
            rad += freq;
            np.x = p.x + -(vy / vr * offset);
            np.y = p.y +  (vx / vr * offset);
            newData.push(np);
        }
        newData.push(line.get(line.length - 1).clone());
        line.clear();
        newData.forEach((pos) => {
            line.push(pos);
        });
        return line;
    }
}