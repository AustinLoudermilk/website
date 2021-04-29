import { dCircle } from "../../engine/util/util.js";
import { Vector } from "../../engine/util/vector.js";

export default class Star {
    constructor(x, y, z, v, radius, rgb) {
        this.pos = new Vector(x, y);
        this.z = z;
        this.pz = z;

        this.v = v;

        this.rad = radius;
        this.rgb = rgb;

        this.trans = 1;
    };

    update() {
        
    };

    draw(ctx) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba("+ this.rgb.r + "," + this.rgb.g + "," + this.rgb.b + ")";

        dCircle(ctx, this.pos.x, this.pos.y, this.rad, 
            "rgba("+ this.rgb.r +","+ this.rgb.g +","+ this.rgb.b +"," + this.trans + ")", true)
    };
}