import { dRect } from "../util/util.js";
import { Vector } from "../util/vector.js";

export class Tile {
    constructor(id, size, sprite, isSolid) {
        this.id = id;
        this.pos = new Vector(0, 0);
        this.size = size;
        this.sprite = sprite;
        this._isSolid = isSolid ?? true;

        this.type = "tile";
    }

    get isSolid() { return this._isSolid; }
    set isSolid(val) { this._isSolid = val; }

    setPos(pos) { this.pos = pos; }

    init() {};
    update() {};

    draw(ctx, camera) {
        let dCoord = new Vector((this.pos.x) - Math.floor(camera.viewport.pos.x), 
                                (this.pos.y) - Math.floor(camera.viewport.pos.y));

        if(this.sprite != undefined) this.sprite.draw(ctx, dCoord, this.size);
    }; 
}

export class ColorTile extends Tile {
    constructor(id, size, color, isSolid) {
        super(id, size, "color", isSolid);
        this.color = color;
    }

    draw(ctx, camera) {
        let dCoord = new Vector((this.pos.x) - Math.floor(camera.viewport.pos.x), 
                                (this.pos.y) - Math.floor(camera.viewport.pos.y));

        dRect(ctx, dCoord.x, dCoord.y, this.size.x, this.size.y, this.color, true, 0, true)
    }
}