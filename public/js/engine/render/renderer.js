import { createElementWithClass } from "../util/util.js";
import { Vector } from "../util/vector.js";
import camera from "./camera.js"

import Layer from "./layer.js";

export default function Renderer(id, size, settings) {
    this.id = id;
    this.size = size;
    
    this.camera = new camera("main_camera", new Vector(0, 0), this.size);

    this._initCanvas = true;

    if(settings != undefined) { 
        if(settings.canvas != undefined) this._initCanvas = settings.canvas;
        this._bgColor = settings.bgColor ?? "";
    }

    this.layers = [];

    this._container = undefined;
    this._level = undefined;

    this._hasLayers = false;
}

Renderer.prototype.setLevel = function(lvl, settings) {
    while (this.bufferDiv.firstChild) this.bufferDiv.removeChild(this.bufferDiv.firstChild);

    this._level = lvl;
    this._level.setBufferDiv(this.bufferDiv);
    this._level.init(settings);
    return this._level;
};

Renderer.prototype.init = function(container) {
    this.bufferDiv = createElementWithClass('div', 'buffer');

    this.camera.init();

    if(this._initCanvas == true) this.cvs = createElementWithClass('canvas', 'mainBuffer'); 
    else this.cvs = this._initCanvas;

    container.appendChild(this.cvs);

    if(this._bgColor != undefined) container.style.backgroundColor = this._bgColor;

    this.ctx = this.cvs.getContext('2d');

    this.cvs.style.zIndex = "0";

    this.cvs.style.position = 'absolute';
    this.cvs.style.top = "0px";
    this.cvs.style.left = "0px";
    this.cvs.style.width = this.size.x;
    this.cvs.style.height = this.size.y;
    this.cvs.id = this.id;

    const devicePixelRatio = window.devicePixelRatio || 1;

	const backingStoreRatio = (
		this.ctx.webkitBackingStorePixelRatio ||
		this.ctx.mozBackingStorePixelRatio ||
		this.ctx.msBackingStorePixelRatio ||
		this.ctx.oBackingStorePixelRatio ||
		this.ctx.backingStorePixelRatio || 1
	);

	const ratio = devicePixelRatio / backingStoreRatio;

	if (devicePixelRatio !== backingStoreRatio) {
		this.cvs.width = this.size.x * ratio;
		this.cvs.height = this.size.y * ratio;

		this.cvs.style.width = this.size.x + 'px';
		this.cvs.style.height = this.size.y + 'px';
	}
	else {
		this.cvs.width = this.size.x;
		this.cvs.height = this.size.y;
		this.cvs.style.width = '';
		this.cvs.style.height = '';
	}

	this.ctx.scale(ratio, ratio);

	this.ctx.mozImageSmoothingEnabled = false;
	this.ctx.webkitImageSmoothingEnabled = false;
	this.ctx.msImageSmoothingEnabled = false;
	this.ctx.imageSmoothingEnabled = false;
};

Renderer.prototype.addLayer = function(id, size, settings) {
    if(!this._hasLayers) this._hasLayers = true;

    let lyr = new Layer(id, size, settings);
    lyr.init(this.bufferDiv);

    this.layers[id] = lyr;
};

Renderer.prototype.getCtx = function() { return this.ctx; };

Renderer.prototype.click = function(e) { this._level.click(e); };

Renderer.prototype.update = function() { 
    this.camera.update(); 
    if(this._level != undefined) this._level.update(this.camera);
    else {
        for(let i in this.layers) 
            this.layers[i].update(this.camera);
    }
};

Renderer.prototype.draw = function() {
    if(this.camera.rendering) {
        this.ctx.clearRect(0, 0, this.size.x, this.size.y);
        if(this._level != undefined) {
            this._level.draw(this.camera);
            for(let i in this._level.layers) this.ctx.drawImage(this._level.layers[i].cvs, 0, 0);
        } else if(this._hasLayers) {
            for(let i in this.layers) this.layers[i].draw(this.camera);
            for(let i in this.layers) this.ctx.drawImage(this.layers[i].cvs, 0, 0);
        } else log.c("No data in renderer!");
    }
};