import { dRect, constrain } from "../../engine/util/util.js";
import { Vector } from "../../engine/util/vector.js";

export default class mandelbrot {
    constructor(w, h, mag, panX, panY, iterations) {
        this.size = new Vector(w, h);

        this.mag = mag;
        this.pan = new Vector(panX, panY);

        this.maxI = iterations;

        this.set = [];
    }

    checkSet(x, y) {
        let real = x;
        let imag = y;

        for(var i = 0; i < this.maxI; i++) {
            var tempReal = (real * real) - (imag * imag) + x;
            var tempImag = (2 * real * imag) + y;

            real = tempReal;
            imag = tempImag;

            if (real * imag > 5) return (i / this.maxI * 100);
        }

        return 0;
    }

    generate(){
        let i = 0;
        for(let x = 0; x < this.size.x; x++) {
            for(let y = 0; y < this.size.y; y++) {
                let inSet = this.checkSet(x / this.mag - this.pan.x, y / this.mag - this.pan.y);
                let newCol = "#000000"

                if(inSet != 0) newCol = 'hsl(0, 100%, ' + inSet + '%)';

                if(inSet) this.set.push({
                    pos: new Vector(x, y),
                    col: newCol
                });
                i++;
            } 
        }
    }

    update() {
    }

    draw(ctx) {
        for(let i = 0; i < this.set.length; i++) {
            dRect(ctx, this.set[i].pos.x, this.set[i].pos.y, 1, 1, this.set[i].col, false, 0, true);
        }
    }
}