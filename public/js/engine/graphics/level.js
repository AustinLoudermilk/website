import Layer from "../render/layer.js";
import { Vector } from "../util/vector.js";

export default class Level {
    constructor(id, size) {
        this.id = id;

        this.size = new Vector(size.x, size.y);

        this.layers = [];

        this.bufferDiv = undefined;

        this.background = new Layer("background", this.size, { static: false, hideOffscreen: false });
        this.layers.push(this.background);
    };

    setBufferDiv(bufferDiv) { this.bufferDiv = bufferDiv; }

    init(settings) {
        let bgCol = ""
        if(settings !== undefined) { bgCol = settings.bgColor ?? "" }

        this.background.init(this.bufferDiv, { zIndex: -1, bgColor: bgCol });
    };

    click = function(e) { for(let i in this.layers) this.layers[i].click(e); };
    
    addLayer = function(id, size, settings) {
        let lyr = new Layer(id, size, settings);
        lyr.init(this.bufferDiv);

        this.layers[id] = lyr;
    };

    update(camera) {
        for(let i in this.layers) this.layers[i].update(camera, this.map);
    };

    draw(camera) {
        for(let i in this.layers) this.layers[i].draw(camera);
    };
}