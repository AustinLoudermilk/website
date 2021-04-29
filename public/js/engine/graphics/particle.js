import { dRect } from "../util/util.js";
import { Vector, random2d } from "../util/vector.js";

export function Particle(pos, life, colors, vel, acc, size) {
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
    this.life = life;
    this.dead = false;

    this.update = function() {
        if(this.life > 0) {
            this.life--;

            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mul(0);
        } else this.dead = true;
    };

    this.size = size || new Vector(1, 1);

    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.draw = function(ctx) {
        if(this.life > 0) dRect(ctx, this.pos.x, this.pos.y, this.size.x, this.size.y, this.color, true, 0, true);
    };
}

export function Emitter(pos, amt, settings) {
    this.pos = pos;
    this.amt = amt;

    this.settings = settings;

    this.parts = [];

    this.init = function() {
        // if(this.settings !== undefined) {

        // } else {

        // }

        // for(let i = 0; i < this.amt; i++) {
            
        // }
    };

    this.update = function() {
        for(let i in this.parts) this.parts[i].update(); 
    };

    this.draw = function(ctx) {
        for(let i in this.parts) this.parts[i].draw(ctx); 
    };
};