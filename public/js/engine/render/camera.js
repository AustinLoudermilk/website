import { Vector } from "../util/vector.js";

export default function Camera(id, pos, viewSize) {
    this.id = id ?? "camera";

    this.rendering = false;

    this.viewport = {
        pos: pos,
        size: viewSize
    },

    this.renderBuffer = 50;
    this.renderMask = {
        pos: this.viewport.pos,
        size: new Vector(this.viewport.size.x + this.renderBuffer, this.viewport.size.y + this.renderBuffer)
    },

    this.deadzone = new Vector(0, 0);
    this._offset = new Vector(0, 0);

    this.bounds = undefined;

    this.following = undefined;
}

Camera.prototype.init = function() {
    this.rendering = true;
};

Camera.prototype.follow = function(obj, deadzone, bounds) {
    this.following = obj;
    this.deadzone = deadzone;
    this.bounds = bounds;
};

Camera.prototype.update = function() {
    this.renderMask.pos = this.viewport.pos;
    if(this.following != undefined) {
        if (this.following.pos.x - this.viewport.pos.x + this.deadzone.x > this.viewport.size.x)
            this.viewport.pos.x = this.following.pos.x - (this.viewport.size.x - this.deadzone.x);
        else if (this.following.pos.x - this.deadzone.x < this.viewport.pos.x)
            this.viewport.pos.x = this.following.pos.x - this.deadzone.x;

        if (this.following.pos.y - this.viewport.pos.y + this.deadzone.y > this.viewport.size.y)
            this.viewport.pos.y = this.following.pos.y - (this.viewport.size.y - this.deadzone.y);
        else if (this.following.pos.y - this.deadzone.y < this.viewport.pos.y)
            this.viewport.pos.y = this.following.pos.y - this.deadzone.y;

        if(this.bounds != undefined) {
            if (this.viewport.pos.x < this.bounds.pos.x) this.viewport.pos.x = this.bounds.pos.x;
            if (this.viewport.pos.y < this.bounds.pos.y) this.viewport.pos.y = this.bounds.pos.y;
            if ((this.viewport.pos.x + this.viewport.size.x) > this.bounds.size.x) 
                this.viewport.pos.x = this.bounds.size.x - this.viewport.size.x;
            if ((this.viewport.pos.y + this.viewport.size.y) > this.bounds.size.y) 
                this.viewport.pos.y = this.bounds.size.y - this.viewport.size.y;
        }
    }
};