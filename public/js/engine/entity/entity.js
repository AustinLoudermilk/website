class Entity {
    constructor(id, pos, size, sprites) {
        this.id = id ?? "";
        this.pos = pos ?? new Vector(0, 0);
        this.size = new Vector(size, size) ?? new Vector(32, 32);
        this.sprites = sprites;

        this.dir = 0;

        this._currSprite = null;

        this.isVisible = true;
        this.z = 0;

        this.drawBounds = false;
        this.bounds = {
            pos: new Vector(0, 0),
            size: new Vector(0, 0)
        };

        this.STATE = {
            isMoving: false,
            dir: 1,
        };  

        this.type = "entity";
        this.map = undefined;
    };

    init() {
        if(this.sprites.constructor === Array) {
            this._currSprite = this.sprites[0];

            let temp = [];
            for(let i in this.sprites) temp[i] = this.sprites[i];
            this.sprites = [];
            for(let i in temp) {
                this.sprites[temp[i].id] = temp[i];
                if(this.sprites[temp[i].id].type == "animated") this.sprites[temp[i].id].startAnim();
            }
        }
        else {
            this._currSprite = this.sprites;
            if(this._currSprite.type == "animated") this._currSprite.startAnim();
        }

        this.setBounds();
    };

    setBounds() {
        let offset = 0;
        this.bounds.pos = new Vector((this.size.x / 4), -(this.size.y / 4));
        this.bounds.size = new Vector(this.size.x / 2, this.size.y / 4);
        if(this.type == "player") log.c(this.bounds);
    };

    update(map) { };

    draw(ctx, camera) {
        let dCoord = new Vector( (this.pos.x - camera.viewport.pos.x), (this.pos.y - camera.viewport.pos.y));
        let drawPos = new Vector(dCoord.x - (this.size.x / 2), dCoord.y - (this.size.y / 2));

        this._currSprite.draw(ctx, drawPos, this.size);

        if(this.drawBounds) {
            let coordtxt = "x: " + Math.floor(this.pos.x) + " , y: " + Math.floor(this.pos.y);
            text(ctx, coordtxt, new Vector(dCoord.x, dCoord.y + (this.size.y / 2) + 8), 16, "#fff")
            //if(this.type == "player") 
            text(ctx, this.id, new Vector(dCoord.x, dCoord.y - (this.size.y / 2) + 8), 16, "#fff")

            let bPos = new Vector((dCoord.x - this.bounds.pos.x), (dCoord.y - this.bounds.pos.y));
            let bSize = new Vector(this.bounds.size.x, this.bounds.size.y);
            dRect(ctx, bPos.x, bPos.y, bSize.x, bSize.y, "#a14e32", false, 0, false);
        }
    };
}