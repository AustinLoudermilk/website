import { createElementWithClass, dRect, isClicked, isColor, isWithin } from "../util/util.js";
import { Vector } from "../util/vector.js";

export default function Layer(id, size, settings) {
    this.id = id ?? "layer";
    this.size = size;

    this.components = [];

    this.onScreen = [];

    this.cvs = undefined;
    this.ctx = undefined;

    if(settings != undefined) {
        this._isVisible = settings.visible ?? true;
        this._hideOffscreen = settings.hideOffscreen ?? false;
        this._updateOffscreen = settings.updateOffscreen ?? true;
        this._sortZ = settings.sortZ ?? false;
        this._isStatic = settings.static ?? false;
        this._redraw = settings.redraw ?? true;
        this._bgColor = settings.bgColor ?? "";
    } else {
        this._isVisible = true;
        this._isStatic = false;
        this._redraw = true;
        this.bgColor = "";
    }
};

Layer.prototype.getCtx = function() {
    return this.ctx;
};

Layer.prototype.setVisible = function(val) { 
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this._isVisible = val ?? !this._isVisible; 
    this._redraw = true;
};

Layer.prototype.setColor = function(col) { 
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.bgColor = col;
    this._redraw = true;
};

Layer.prototype.setRedraw = function(val) { 
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this._redraw = val ?? !this._redraw;
};

Layer.prototype.init = function(container, settings) {
    if(settings != undefined) { this.bgColor = settings.bgColor ?? ""; }

    this._tick = this.onScreenDelay;

    this.cvs = createElementWithClass('canvas', 'canvas'); 
    container.appendChild(this.cvs);
    this.ctx = this.cvs.getContext('2d');

    if(settings != undefined) {
        this.cvs.style.zIndex = settings.zIndex ?? "1";
    }

    this.cvs.style.position = 'absolute';
    this.cvs.style.top = 0;
    this.cvs.style.left = 0;
    this.cvs.style.width = this.size.x;
    this.cvs.style.height = this.size.y;
    this.cvs.style.visibility = "hidden";
    this.cvs.className = 'scene-layer';
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

	this.ctx.scale(1, 1);

	this.ctx.mozImageSmoothingEnabled = false;
	this.ctx.webkitImageSmoothingEnabled = false;
	this.ctx.msImageSmoothingEnabled = false;
	this.ctx.imageSmoothingEnabled = false;
};

Layer.prototype.click = function(e) {
    for(let i in this.components) {
        if(this.components[i].click != undefined) {
            let pos = new Vector(e.clientX, e.clientY);
            if(isClicked(pos, this.components[i])) this.components[i].click(e);
        }
    };
};

Layer.prototype.addComponent = function(comp) { this.components.push(comp); };

Layer.prototype.update = function(camera) {
    for(let i in this.components) {
        if(camera !== undefined && !this._updateOffscreen) { 
            if(isWithin(this.components[i], camera.renderMask)) this.components[i].update();
        } else this.components[i].update();
    }
};

Layer.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    return "cleared";
};

Layer.prototype.draw = function(camera) {
    if(this._isVisible) {
        if(this._redraw) {
            if(camera != undefined) {
                this.ctx.clearRect(0, 0, this.size.x, this.size.y);
                if(isColor(this.bgColor)) dRect(this.ctx, 0, 0, this.size.x, this.size.y, this.bgColor, false, 0, true);
                
                if(this._hideOffscreen) {
                    this.onScreen = [];

                    for(let i in this.components) {
                        if(isWithin(this.components[i], camera.renderMask)) { this.onScreen.push(this.components[i]); };
                    }

                    if(this._sortZ) {
                        let map = this.onScreen.map(function (el, index) { return { index : index, value : el.pos.y }; });
                        map.sort(function (a, b) { return a.value - b.value; });
                        let zSorted = map.map(function (el) { return this.onScreen[el.index]; }.bind(this));
                        this.onScreen = zSorted;
                    }

                    for(let i in this.onScreen) { this.onScreen[i].draw(this.ctx, camera); }
                } else { 
                    for(let i in this.components) {
                        if(this.components[i].draw != undefined) this.components[i].draw(this.ctx, camera); 
                    }
                }
                
                if(this._isStatic && this._redraw) { this._redraw = false; }
            }
        }
    }
};