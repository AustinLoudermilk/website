export default function uiText(id, pos, txt, settings) {
    this.id = id ?? "txt";
    this.txt = txt;

    this.pos = pos ?? new Vector(0, 0);
    
    this.color = settings?.color ?? "#000000";
    this.size = settings?.size + "px" ?? "20px";
    this.font = settings?.font ?? "Arial";
    this.align = settings?.align ?? "left";

    this.font = this.size + " " + this.font;

    this.updateText = function(txt) { this.txt = txt; };

    this.update = function() {};

    this.draw = function(ctx) {
        ctx.textBaseline = 'middle';

        ctx.textAlign = this.align;

        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.fillText(this.txt, this.pos.x, this.pos.y);
    };
};