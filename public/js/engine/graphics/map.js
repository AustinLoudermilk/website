export default class Map {
    constructor(id, size, tileSize) {
        this.id = id;
        this.size = size;
        this.tileSize = tileSize;

        this.map = [[]];

        this.mTileSize = new Vector(Math.floor(this.size.x / this.tileSize), Math.floor(this.size.y / this.tileSize));

        this.bounds = {
            pos: new Vector(0, 0),
            size: this.size,
        }

        this.spawn = new Vector(0, 0);

        this.type = "map";
    }

    getSpawn() { return this.spawn; }

    getTile(pos) {
        return this.map[Math.floor(pos.x / this.tileSize)][Math.floor(pos.y / this.tileSize)];
    };

    init() {};

    update() {};

    draw(ctx, camera) {
        let bound = {
            pos: new Vector(Math.floor(camera.renderMask.pos.x / this.tileSize), Math.floor(camera.renderMask.pos.y / this.tileSize)),
            size: new Vector(Math.floor(camera.renderMask.size.x / this.tileSize), Math.floor(camera.renderMask.size.y / this.tileSize))
        };

        for(var x = bound.pos.x; x < (bound.pos.x + bound.size.x) + 2; x++) {
            for(var y = bound.pos.y; y < (bound.pos.y + bound.size.y) + 2; y++) {
                if(this.map[x] != undefined) {
                    if(this.map[x][y] != undefined) this.map[x][y].draw(ctx, camera);
                }
            }
        }
    };
};

let temp = 0;
class CustomMap extends Map {
    constructor(id, img, tileSize, tileLib) {
        let size = new Vector(img.width * tileSize, img.height * tileSize);
        super(id, size, tileSize);

        this.img = img;
        this.tileLib = tileLib;
    };

    generate() {
        let canvas = document.createElement('canvas');
        canvas.width = this.img.width;
        canvas.height = this.img.height;

        let ctx = canvas.getContext('2d');
        ctx.drawImage(this.img, 0, 0);
        
        let pixels = ctx.getImageData(0, 0, this.img.width, this.img.height);
        let pixelData = pixels.data;

        let colors = [];
    
        for (let i = 0, len = pixels.data.length; i < len; i += 4) {
            let r = pixelData[i];
            let g = pixelData[i + 1];
            let b = pixelData[i + 2];

            colors.push(rgbToHex(r, g, b));
        };
        

        for(var x = 0; x < this.mTileSize.x; x++) {
            for(var y = 0; y < this.mTileSize.y; y++) {
                if(!this.map[x]) this.map[x] = [];

                let getTile = this.tileLib[colors[this.mTileSize.x * y + x]];

                if(getTile == "spawn") this.spawn = new Vector(x * this.tileSize, y * this.tileSize);
                
                if(typeof getTile == "string") getTile = this.tileLib[this.tileLib["null"]];
                if(getTile.constructor === Array) {
                    let temp = getTile[Math.floor(Math.random() * getTile.length)]
                    getTile = temp;
                }

                let newTile = undefined;
                if(getTile != undefined) {
                    newTile = Object.assign(Object.create(Object.getPrototypeOf(getTile)), getTile);
                    newTile.pos = new Vector(x * this.tileSize, y * this.tileSize);
                } else newTile = new ColorTile("null", this.tileSize, "#000000", true);
                

                this.map[x][y] = newTile;
            }
        }
    };
};

class RandomMap extends Map {
    constructor(id, size, tileSize, tiles, edgeTiles) {
        super(id, size, tileSize);
        this.tiles = tiles;

        this.edgeTiles = edgeTiles;
    }

    generate() {
        this.spawn = new Vector(this.size.x / 2, this.size.y / 2);

        let randomTile = undefined;
        for(var x = 0; x < this.mTileSize.x; x++) {
            for(var y = 0; y < this.mTileSize.y; y++) {
                if(!this.map[x]) this.map[x] = [];

                let newTile = undefined;

                let rndTileID = Math.floor(Math.random() * (this.tiles.length));
                let rndBush = Math.floor(Math.random() * 100);
                if(rndBush < 5) newTile = this.edgeTiles[9];
                else newTile = this.tiles[rndTileID];

                if(x == 1 && y > 1) newTile = this.edgeTiles[0];//lm
                else if(x > 1 && y == 1) newTile = this.edgeTiles[2];//tm
                else if(x == this.mTileSize.x - 3) newTile = this.edgeTiles[4];//rm
                else if(y == this.mTileSize.y - 3) newTile = this.edgeTiles[6];//bm

                if(x == 1 && y == 1) newTile = this.edgeTiles[1];//tlc
                else if(x == this.mTileSize.x - 3 && y == 1) newTile = this.edgeTiles[3];//trc
                else if(x == this.mTileSize.x - 3 && y == this.mTileSize.y - 3) newTile = this.edgeTiles[5];//brc
                else if(x == 1 && y == this.mTileSize.y - 3) newTile = this.edgeTiles[7];//blc

                if(x == 0 || y == 0) newTile = this.edgeTiles[8];
                if(x == this.mTileSize.x - 2) newTile = this.edgeTiles[8];
                if(y == this.mTileSize.y - 2) newTile = this.edgeTiles[8];

                randomTile = Object.assign(Object.create(Object.getPrototypeOf(newTile)), newTile)
                randomTile.pos = new Vector(x * this.tileSize, y * this.tileSize);
                this.map[x][y] = randomTile;
            }
        }
    };
}