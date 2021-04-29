import { dLine } from "../util/util.js";
import { Vector } from "../util/vector.js";

export default function Grid(id, cellSize, gridSize, col, lineWidth, linePattern) {
    this.id = id;

    if(typeof yourVariable != 'object') this.cellSize = new Vector(cellSize, cellSize);
    else this.cellSize = cellSize;
    
    this.gridSize = gridSize;
    
    this.col = col || "#ffffff";
    this.lineWidth = lineWidth || 1;
    this.linePattern = linePattern || [];

    this.update = () => {};

    this.draw = (ctx) => {
        for(let x = 0; x < this.gridSize.x; x += this.cellSize.y) {
            let s = new Vector(x, 0);
            let e = new Vector(x, this.gridSize.y);
            dLine(ctx, s, e, this.lineWidth, this.col, this.linePattern);
        }

        for(let y = 0; y < this.gridSize.y; y += this.cellSize.y) {
            let s = new Vector(0, y);
            let e = new Vector(this.gridSize.x, y);
            dLine(ctx, s, e, this.lineWidth, this.col, this.linePattern);
        }
    };
}