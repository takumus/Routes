export default class Canvas extends PIXI.Container {
    public mouse: {x: number, y:number};
    public size: {width: number, height: number};
    public canvas: PIXI.Graphics;
    public mousePressed = false;
    constructor() {
        super();
        this.mouse = {x: 0, y: 0};
        this.size = {width: 0, height: 0};
        this.canvas = new PIXI.Graphics();
        this.addChild(this.canvas);
        this.init();
    }
    public init() {
    }
    public draw() {
    }
    public mousedown() {
    }
    public mouseup() {
    }
    public mousemove() {
    }
    public resize(width: number, height: number) {
    }
}