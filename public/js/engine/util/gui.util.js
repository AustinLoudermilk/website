
export default function gui(settings) {
    this.obj = settings.obj;
    this.id = settings.id ?? "gui";
    
    this.GUI = new dat.gui.GUI();
    this.GUI.remember(this.obj);

    this.track = settings.track;

    this.enable = () => {
        if(this.track == undefined) {
            for(let o in this.obj) {
                let key = this.obj[o];
                if(typeof key === 'object' && typeof key != 'function' && key !== null) {
                    currFolder = "f" + o;
                    eval('var ' + currFolder + " = this.GUI.addFolder('" + o + "');");
                    for(let i in key) {
                        if(typeof key[i] != 'object' && typeof key[i] != 'function' && key[i] !== null) {
                            eval(currFolder + ".add(key, i)");
                        }
                    }
                    eval(currFolder + '.close()');
                } else this.GUI.add(this.obj, o); 
            }
        } else {
            for(let t in settings.track) {
                let key = eval("this.obj." +  settings.track[t]);
                if(typeof key === 'object' && typeof key != 'function' && key !== null) {
                    currFolder = "f" + t;
                    eval('var ' + currFolder + " = this.GUI.addFolder('" + settings.track[t] + "');");
                    for(let i in key) {
                        if(typeof key[i] != 'object' && typeof key[i] != 'function' && key[i] !== null) {
                            eval(currFolder + ".add(key, i)");
                        }
                    }
                    eval(currFolder + '.close()');
                } else this.GUI.add(this.obj, settings.track[t]);
            }
        }
    };

    this.disable = () => { };
}