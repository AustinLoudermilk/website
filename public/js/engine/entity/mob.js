class Mob extends Entity {
    constructor(id, pos, size, sprites) {
        super(id, pos, size, sprites);  

        this.vel = new Vector(0, 0);
	    this.friction = 0.6;
	    this.speed = 2;

        this._isAlive = true;
    };

    move (vec, map) {
        if(vec.x < 0) this.STATE.dir = 1; //left
		else if(vec.x > 0) this.STATE.dir = 3; //right
        
        let boundsPos = new Vector(this.pos.x - this.bounds.pos.x, this.pos.y - this.bounds.pos.y);
        let buffer = this.speed;
        if(vec.x > 0) {
            let nextTile1 = map.getTile(new Vector(
                boundsPos.x + this.bounds.size.x + buffer,
                boundsPos.y + buffer,
            ));
            let nextTile2 = map.getTile(new Vector(
                boundsPos.x + this.bounds.size.x + buffer,
                boundsPos.y + this.bounds.size.y - buffer
            ));

            if(!nextTile1._isSolid && !nextTile2._isSolid) this.vel.x += vec.x;
        } else {
            let nextTile1 = map.getTile(new Vector(
                boundsPos.x - buffer,
                boundsPos.y + buffer
            ));
            let nextTile2 = map.getTile(new Vector(
                boundsPos.x - buffer,
                boundsPos.y + this.bounds.size.y - buffer
            ));

            if(!nextTile1._isSolid && !nextTile2._isSolid) this.vel.x += vec.x;
        }
        if(vec.y > 0) {
            let nextTile1 = map.getTile(new Vector(
                boundsPos.x + buffer,
                boundsPos.y + this.bounds.size.y + buffer
            ));
            let nextTile2 = map.getTile(new Vector(
                boundsPos.x + this.bounds.size.x - buffer,
                boundsPos.y + this.bounds.size.y + buffer
            ));

            if(!nextTile1._isSolid && !nextTile2._isSolid) this.vel.y += vec.y;
        } else {
            let nextTile1 = map.getTile(new Vector(
                boundsPos.x + buffer,
                boundsPos.y - buffer
            ));
            let nextTile2 = map.getTile(new Vector(
                boundsPos.x + this.bounds.size.x - buffer,
                boundsPos.y - buffer
            ));

            if(!nextTile1._isSolid && !nextTile2._isSolid) this.vel.y += vec.y;
        }
	};

    moveTo (vec) {
		this.pos.x = vec.x;
		this.pos.y = vec.y;
	};

    update() {
        if(this._isAlive) {
            this.vel.y *= this.friction;
            this.vel.x *= this.friction;
            
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;

            if(this.worldBounds != undefined) {
                if(this.pos.x - (this.size.x / 2) < 0) this.pos.x = (this.size.x / 2);
                if(this.pos.y - (this.size.y / 2) < 0) this.pos.y = (this.size.x / 2);
                if(this.pos.x + (this.size.x / 2) > this.worldBounds.size.x) this.pos.x = this.worldBounds.size.x - (this.size.y / 2);
                if(this.pos.y + (this.size.y / 2) > this.worldBounds.size.y) this.pos.y = this.worldBounds.size.y - (this.size.y / 2);
            }
        }
    };

    collision() { return false; };
}