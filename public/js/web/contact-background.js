import gVars from "../engine/global.js";
import milk from "../engine/milk.js";

import { Vector } from "../engine/util/vector.js";
import { dRect, isMobileDevice, constrain } from "../engine/util/util.js";

import mandelbrot from "./comps/mandelbrot.js";
import Star from "./comps/star.js";
import StarField from "./comps/starfield.js";

let appContainer = document.getElementById("contact-canvas");

let app = new milk(window.innerWidth, window.innerHeight, { 
    container: appContainer, 
    static: false,
    frameDelay: 0,
    bgColor: "#050404"
});
app.setDebug(gVars.__DEBUG__);

app.update = function() {
    this._renderer.update();
};

app.draw = function() {
    let renderCTX = this._renderer.getCtx();

    this._renderer.draw();

    // let mousePos = this.getMouseCoord();
    // dRect(renderCTX, mousePos.x, mousePos.y, 20, 20, 
    //     "#34ce90", true, 0, false, 0)
};

app.init([], () => {
    app.stars = [];
    app.starAmt = constrain((app.size.x * 15), 4000, 10000);

    log.c(app.starAmt);

    for(let i = 0; i < app.starAmt; i++) {
        let x = (Math.floor(Math.random() * app.width));
        let y = (Math.floor(Math.random() * app.height));
        let z, v = 0;

        let rad = (Math.floor(Math.random() * 3));

        if((Math.random() * 100) > 95) rad = (Math.floor(Math.random() * 5));
        if((Math.random() * 1000) > 995) rad = (Math.floor(Math.random() * 7));

        let r = 255 - (Math.floor(Math.random() * 100));
        let g = 255 - (Math.floor(Math.random() * 100));
        let b = 255 - (Math.floor(Math.random() * 100));

        app.stars.push(new Star(x, y, z, v, rad, { r: r, g: g, b: b }));
    }

    let stars = class {
        constructor(stars) {
            this.stars = stars;
        }

        update = () => {};
        draw = (ctx) => {
            for(let i = 0; i < this.stars.length; i++)
                this.stars[i].draw(ctx); 
        };
    }

    let tint = class {
        constructor(pos, size, rgba) {
            this.pos = pos;
            this.size = size;
            this.rgba = rgba;
        }

        update() {};

        draw(ctx) {
            dRect(ctx, this.pos.x, this.pos.y, this.size.x, this.size.y, this.rgba, false, 0, true);
        };
    }
    app.tint = new tint(new Vector(0, 0), app.size, "rgba( 0, 0, 0, 0.5 )");

    app.stars = new stars(app.stars);

    let panX = 2.1
    if(isMobileDevice()) panX = 1.5;

    app.mandset = new mandelbrot(app.width, app.height, 1000, panX, 0.6, 100);
    //app.mandset.generate();

    app.starfield = new StarField(app.size, 2, 5);
    app.starfield.addStars(800);

    app._renderer.addLayer("stars", app.size, { static: true });
    app._renderer.layers["stars"].addComponent(app.stars);

    //app.lvls["main"].addLayer("mand", app.size, { static: true });
    //app.lvls["main"].layers["mand"].addComponent(app.mandset);

    app._renderer.addLayer("tint", app.size, { static: true });
    app._renderer.layers["tint"].addComponent(app.tint);
});