import Main from '../src/main';
let renderer:PIXI.WebGLRenderer|PIXI.CanvasRenderer;
const stage:PIXI.Container = new PIXI.Container();
let canvas:HTMLCanvasElement;
let stageWidth:number = 0, stageHeight:number = 0;
let main: Main;
const init = ()=> {
	renderer = PIXI.autoDetectRenderer(800, 800, {antialias: false, resolution: window.devicePixelRatio, transparent:false});
	canvas = <HTMLCanvasElement>document.getElementById("content");
	canvas.appendChild(renderer.view);
	renderer.view.style.width = "100%";
	renderer.view.style.height = "100%";
	window.addEventListener("resize", resize);
	window.addEventListener('orientationchange', resize);
	main = new Main();
	window.addEventListener('mousedown', (e: MouseEvent) => {
		main.mouse.x = e.clientX;
		main.mouse.y = e.clientY;
		main.mousePressed = true;
		main.mousedown();
	});
	window.addEventListener('mouseup', (e: MouseEvent) => {
		main.mousePressed = false;
		main.mouseup();
	});
	window.addEventListener('mousemove', (e: MouseEvent) => {
		main.mouse.x = e.clientX;
		main.mouse.y = e.clientY;
		main.mousemove();
	});

	window.addEventListener('touchstart', (e: TouchEvent) => {
		main.mouse.x = e.touches[0].clientX;
		main.mouse.y = e.touches[0].clientY;
		main.mousePressed = true;
		main.mousedown();
	});
	window.addEventListener('touchmove', (e: TouchEvent) => {
		main.mouse.x = e.touches[0].clientX;
		main.mouse.y = e.touches[0].clientY;
		main.mousemove();
	});
	window.addEventListener('touchend', (e: TouchEvent) => {
		if (e.touches.length > 0) return;
		main.mousePressed = false;
		main.mouseup();
	});
	window.addEventListener('touchcancel', (e: TouchEvent) => {
		if (e.touches.length > 0) return;
		main.mousePressed = false;
		main.mouseup();
	});

	stage.addChild(main);
	draw();
	resize();
}
let ppos = 0;
const draw = ()=> {
	requestAnimationFrame(draw);
	main.draw();
	renderer.render(stage);
}
const resize = ()=> {
	const width:number = canvas.offsetWidth;
	const height:number = canvas.offsetHeight;
	stageWidth = width;
	stageHeight = height;
	main.size.width = width;
	main.size.height = height;
	main.resize(width, height);
	renderer.resize(width, height);
}
window["init"] = init;