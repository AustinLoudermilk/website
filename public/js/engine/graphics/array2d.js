import { dRect } from "../util/util.js";
import { Vector } from "../util/vector.js";

export default function Array2d(gridSize, tileSize, defVal) {

    this.size = gridSize;
    this.tileSize = tileSize;
    this.defVal = defVal || 0;

    this.gridTileSize = new Vector(Math.floor(this.size.x / this.tileSize), Math.floor(this.size.y / this.tileSize));

    this.needsUpdate = [];

    this.grid = [];
    this.color = "#d6f8d6";

    this.getSize = () => { return this.size };
    this.getTileSize = () => { return this.tileSize };

    this.generate = () => {
        for(let x = 0; x < this.gridTileSize.x; x++) {
            if(this.grid[x] == undefined) this.grid[x] = [];
            for(let y = 0; y < this.gridTileSize.y; y++) {
                this.grid[x][y] = this.defVal;
            }
        }
    };

    this.resetCoord = (x, y) => { this.grid[x][y] = this.defVal; }

    this.swap = (pos, pos2) => {
        //log.c(pos, pos2);

        let s1 = this.getCoord(pos.x, pos.y);
        let s2 = this.getCoord(pos2.x, pos2.y);

        this.resetCoord(pos.x, pos.y);
        this.resetCoord(pos2.x, pos2.y);

        this.setCoord(pos.x, pos.y, s2);
        this.setCoord(pos2.x, pos2.y, s1);
    };

    this.toGridCoord = (x, y) => { return new Vector(Math.floor(x / this.tileSize), Math.floor(y / this.tileSize)); };
    this.toWorldCoord = (x, y) => { return new Vector((x * this.tileSize), (y * this.tileSize)); };

    this.getCoord = (x, y) => {
        if(x < 0 || y < 0 || x > (this.gridTileSize.x - 1) || (y > this.gridTileSize.y - 1)) return -1;
        else return this.grid[x][y];
    };

    this.setCoord = (x, y, val) => {
        if(this.getCoord(x, y) !== -1)
            this.grid[x][y] = val;
    };

    this.draw = (ctx) => {
        if(this.showGrid) this.drawGrid(ctx);
    };

    this.update = () => {};
};