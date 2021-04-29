import { dRect, text } from "../../engine/util/util.js";
import { Vector } from "../../engine/util/vector.js";

export default class Slime {
    constructor() {
    };

    update() {
    };

    draw(ctx) {
        text(ctx, "slime", new Vector(150, 150), 30, "#006600")
        dRect(ctx, 100, 100, 100, 100, "#ffffff");
    };
}