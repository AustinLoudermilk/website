import { dRect } from "../util/util.js";
import { Vector } from "../util/vector.js";

export function Sprite(id, sheet, sourcePos, size) {
    this.id = id ?? "Sprite";
    this.sheet = sheet;
    this.sourcePos = sourcePos;
    this.size = new Vector(size, size);

    if(typeof size === "object") this.size = size;
    else this.size = new Vector(size, size);

    this.type = "static";

    this.draw = function(ctx, pos, size) {
        ctx.drawImage(this.sheet, (this.sourcePos.x * this.size.x), (this.sourcePos.y * this.size.y), 
                this.size.x, this.size.y, pos.x, pos.y, size.x, size.y);
    };
};

export function ColoredSprite(id, color, size) {
    this.id = id;
    this.color = color;

    if(typeof size === "object") this.size = size;
    else this.size = new Vector(size, size);

    this.update = () => {};
    this.draw = (ctx, pos, size) => {
        dRect(ctx, pos.x, pos.y, size.x, size.y, this.color, false, 0, true, 0);
    };
}

export function AnimatedSprite(id, sheet, size, settings) {
    this.id = id ?? "Animated Sprite";
    this.sheet = sheet;

    this.type = "animated";

    if(typeof size === "object") this.size = size;
    else this.size = new Vector(size, size);

    this.defualtFrame = settings.defualtFrame ?? 0;
    this.lastFrame = settings.lastFrame;
    this.row = settings.row ?? 0;
    this.fps = settings.fps;
    this.loop = settings.loop ?? true;

    this.delay = settings.delay ?? 0;

    this.center = settings.center ?? true;
};

AnimatedSprite.prototype._isAnimating = false;
AnimatedSprite.prototype._onAnimComplete = undefined;
AnimatedSprite.prototype._currentFrame = 0;
AnimatedSprite.prototype._frameTick = 0;
AnimatedSprite.prototype._delay = 0;

AnimatedSprite.prototype.startAnim = function(oncomplete) {
    this._delay = this.delay;
    this._isAnimating = true;
    this._currentFrame = 0;
    this._frameTick = 0;
    this._delay = 0;
    this._animCompleted = false;

    if(oncomplete != undefined) this._onAnimComplete = oncomplete;

    return this;
};

AnimatedSprite.prototype.stopAnim = function() {
    this._isAnimating = false;
    return this;
};

AnimatedSprite.prototype.draw = function(ctx, pos, size) {
    if(this._delay == 0) {
        if(this.fps > 0 && this._isAnimating) {
            if(this._frameTick > this.fps) {
                if(this._currentFrame < this.lastFrame) this._currentFrame++;
                else if(this._currentFrame >= this.lastFrame) {
                    if(!this.loop) {
                        this._isAnimating = false;
                        this._currentFrame = this.lastFrame;
                        if(this._onAnimComplete != undefined) this._onAnimComplete();
                    } else { this._currentFrame = 0; }
                    this._delay = this.delay;
                }
                this._frameTick = 0;
            } else {
                this._frameTick++;
            }
        };
    } else this._delay--;
    
    ctx.drawImage(this.sheet, (this._currentFrame * this.size.x), this.row, 
        this.size.x, this.size.y, pos.x, pos.y, size.x, size.y);
};