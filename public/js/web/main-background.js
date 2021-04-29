import gVars from "../engine/global.js";
import milk from "../engine/milk.js";

import Slime from "./comps/slime.js";

let appContainer = document.getElementById("main-canvas");

let app = new milk(window.innerWidth, window.innerHeight, { container: appContainer, static: false });
app.setDebug(gVars.__DEBUG__);

app.update = function() {
};

app.draw = function() {
    let renderCTX = this._renderer.getCtx();

    this._renderer.draw();
};

app.init([], () => {
    
    let slime = new Slime();

    app._renderer.addLayer("main", app.size, { static: true });
    app._renderer.layers["main"].addComponent(slime);
});