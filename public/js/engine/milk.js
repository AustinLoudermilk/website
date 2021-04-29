import debug from "./util/log.js";
import assetManager from "./graphics/assetManager.js";
import renderer from "./render/renderer.js";
import { Vector } from "./util/vector.js";
import keyListener from "./handlers/keys.js"

import { createElementWithClass } from "./util/util.js"

export default function Milk(width, height, settings) {

	this._existingContainer = null;

	this.title = null;

	this._static = false;
	this._redraw = true;

	this._frameDelay = 0;

	this.rendererSet = {};

	if(settings != undefined) {
		if(settings.canvas != undefined)
			this.rendererSet.canvas = settings.canvas;

		if(settings.container != undefined)
			this._existingContainer = settings.container;

		if(settings.title != undefined)
			this.title = settings.title;

		if(settings.static != undefined)
			this._static = settings.static;

		if(settings.frameDelay != undefined)
			this._frameDelay = settings.frameDelay;

		if(settings.bgColor != undefined)
			this.rendererSet.bgColor = settings.bgColor;
	}

	this.width = width;
	this.height = height;
	this.size = new Vector(this.width, this.height)

	if(this._existingContainer == null) this.container = createElementWithClass("div", "app");
	else this.container = this._existingContainer;

	this.container.style.width = width;
	this.container.style.height = height;

	this._renderer = new renderer("main_renderer", new Vector(this.width, this.height), this.rendererSet);

	this.assests = new assetManager();

	this.mouseDown = (e) => {};
	this.mouseUp = (e) => {};
	this.mouseScroll = (e) => {};
	this.click  = (e) => {};
	this.draw   = () => {};
	this.update = () => {};

	this.ticks = [];
	this.fps = 0; 

	this.getFPS = () => { return this.fps; };

	this.keyCodes = {
		A : 65,
		B : 66,
		C : 67,
		D : 68,
		E : 69,
		F : 70,
		G : 71,
		H : 72,
		I : 73,
		J : 74,
		K : 75,
		L : 76,
		M : 77,
		N : 78,
		O : 79,
		P : 80,
		Q : 81,
		R : 82,
		S : 83,
		T : 84,
		U : 85,
		V : 86,
		W : 87,
		X : 88,
		Y : 89,
		Z : 90,

		ZERO : 48,
		ONE : 49,
		TWO : 50,
		THREE : 51,
		FOUR : 52,
		FIVE : 53,
		SIX : 54,
		SEVEN : 45,
		EIGHT : 46,
		NINE : 57,
	
		SHIFT: 16,
		SPACE: 32
	};

	this.debug = false;
	this.setDebug = (mode) => { this.debug = mode; debug(mode) };

	this.STATE = {
		status: "IDLE",
	};

	this.getState = () => { return this.STATE; }
};

Milk.prototype.init = function(res, gameInit) {
	if(this.debug == false) this.setDebug(this.debug);
	log.c('%c' + this.title + " loading...", 'background: #846fa6; color: #dac9f5; padding: 4px;');

	if(this.title != null) document.title = this.title;

	this.gameInit = gameInit;

	/* Listeners */
	this.currMousePos = new Vector(0, 0);
	document.onmousemove = this.onMouseMove.bind(this);

	this.isMouseDown = false;
	this.container.addEventListener('click', this.eClicked.bind(this), false);
	this.container.addEventListener('mousedown', this.eMouseDown.bind(this), false);
	
	this.container.addEventListener('mouseup', this.eMouseUp.bind(this), false);

	this.container.addEventListener('wheel', this.eMouseScroll.bind(this), false);

	this.keyL = new keyListener();
	document.addEventListener('keydown', this.keyL.onKeydown, false);
	document.addEventListener('keyup', this.keyL.onKeyup, false);

	/* INIT RENDERER */
	this._renderer.init(this.container);

	/* MANAGE ASSESTS HERE */
	this.assests.queueDownload(res);
	this.assests.downloadAll(this.start.bind(this));
};

Milk.prototype.eMouseDown = function(event) { this.isMouseDown = true; }
Milk.prototype.eMouseUp = function(event) { this.isMouseDown = false; }

Milk.prototype.onMouseMove = function(event) {
	this.currMousePos.x = event.clientX;
	this.currMousePos.y = event.clientY;
}
Milk.prototype.getMouseCoord = function() { return this.currMousePos; }

Milk.prototype.eMouseScroll = function(event) { event.preventDefault(); this.mouseScroll(event); }
Milk.prototype.eClicked = function(event) { this.click(event); }
Milk.prototype.eDraw = function() { this.draw(); };
Milk.prototype.eUpdate = function() { this.update(); };

Milk.prototype.start = function() {
	this.gameInit();
	
	this._main = function () {
		if(this._redraw) {
			this.now = performance.now();
			while (this.ticks.length > 0 && this.ticks[0] <= this.now - 1000) { this.ticks.shift(); }
			this.ticks.push(this.now);
			this.fps = this.ticks.length;

			this.now = performance.now();
			var delta  = this.now - this.last;
			this.last = this.now;

			this.dt = this.dt + delta;

			if (this.dt < this.rate) {
				requestAnimationFrame(this._main);
				return;
			} else {
				this.eUpdate();
				this.eDraw();

				if(this._static) { this._redraw = false; }
			}

			if(this._frameDelay > 0) {
				window.setTimeout(() => {
					requestAnimationFrame(this._main)
				}, this._frameDelay);
			} else requestAnimationFrame(this._main);
		}
	}.bind(this);

	this._main();
	log.c('%c' + this.title + " started",'background: #657d85; color: #8dbccc; padding: 4px;');
}