export default class uiElement {
    constructor(id, pos, sprite) {
        this.id = id;
        this.pos = pos;
        this.sprite = sprite;
        this.size = this.sprite.size;

        this._isVisible = true;
    };

    click(e) {};

    update() {};

    draw(ctx) {
        if(this._isVisible) this.sprite.draw(ctx, this.pos, this.size);
    };
}