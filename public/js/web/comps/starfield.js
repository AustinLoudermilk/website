import { dCircle, dRect, map, text } from "../../engine/util/util.js";
import { Vector } from "../../engine/util/vector.js";
import Star from "./star.js";

export default class StarField {
    constructor(size, maxSpeed, minSpeed) {
        this.size = size;

        this.minSpeed = minSpeed;
        this.maxSpeed = maxSpeed;

        this.stars = [];

        this.offset = new Vector(0, 0);

        this._reset = 0;
    };

    initStar() {
        this._reset++;

        let x = (Math.floor(Math.random() * this.size.x));
        let y = (Math.floor(Math.random() * this.size.y));
        let z = Math.random() * this.getInitialZ();
        let v = Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed;

        let rad = (Math.floor(Math.random() * 3));

        if((Math.random() * 100) > 95) rad = (Math.floor(Math.random() * 5));
        if((Math.random() * 1000) > 995) rad = (Math.floor(Math.random() * 7));

        let r = 255 - (Math.floor(Math.random() * 100));
        let g = 255 - (Math.floor(Math.random() * 100));
        let b = 255 - (Math.floor(Math.random() * 100));

        return new Star(x, y, z, v, rad, { r: r, g: g, b: b });
    }

    addStars(amt) {
        for(let i = 0; i < amt; i++) 
           this.stars.push(this.initStar());
    }

    update() {
        // for(let i in this.stars) {
        //     let currStar = this.stars[i];
        //     currStar.z = currStar.z - this.speed;
        //     if (currStar.z < 1) {
        //         currStar.z = this.size.x;
        //         currStar.x = (Math.floor(Math.random() * this.size.x));
        //         currStar.y = (Math.floor(Math.random() * this.size.y));
        //         currStar.pz = currStar.z;
        //     }
        // }
    };

    getInitialZ() {
        return (this.size.x > this.size.h ? this.size.x : this.size.y) * 2;
    }

    draw(ctx) {
        text(ctx, (this.stars[0].pos.x / this.stars[0].z), new Vector(400, 100), 20, "#ffffff");
        for(let i in this.stars) {
            let currStar = this.stars[i];

            //---//

            currStar.z -= currStar.v;
            if (currStar.z <= 0) currStar = this.initStar();

            let newX = this.size.x * (currStar.pos.x / currStar.z) - this.offset.x;
            let newY = this.size.y * (currStar.pos.y / currStar.z) - this.offset.y;

            const maxZ = this.getInitialZ();

            const newRadius = (1 - map(currStar.z, 0, maxZ, 0, 1)) * currStar.rad;

            let opacity = Math.round(10 - map(currStar.z, 0, maxZ, 0, 10)) / 10;
            let trailOpacity = opacity / 4;

            //---//

            // let sx = map(currStar.pos.x / currStar.z, 0, 1, 0, this.size.x);
            // let sy = map(currStar.pos.y / currStar.z, 0, 1, 0, this.size.y);

            // let r = map(currStar.z, 0, this.size.x, 16, 0);

            currStar.pos.x = newX;//sx;// + (this.size.x / 2);
            currStar.pos.y = newY;//sy;// + (this.size.y / 2);
            currStar.rad = newRadius;//r;
            currStar.draw(ctx);

            // let px = map(currStar.pos.x / currStar.pz, 0, 1, 0, this.size.x);
            // let py = map(currStar.pos.y / currStar.pz, 0, 1, 0, this.size.y);

            // currStar.pz = currStar.z;

            //line(px, py, sx, sy);
        }
    };
}