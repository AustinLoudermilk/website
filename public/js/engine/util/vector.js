export function Vector(x, y) {
    this.x = x || 0;
    this.y = y || 0;

    this.add = function(num) {
        if(num instanceof Vector) {
            this.x += num.x;
            this.y += num.y;
        } else {
            this.x += num;
            this.y += num;
        }
    };

    this.sub = function(num) {
        if(num instanceof Vector) {
            this.x -= num.x;
            this.y -= num.y;
        } else {
            this.x -= num;
            this.y -= num;
        }
    };

    this.mul = function(num) {
        this.x *= num;
        this.y *= num;
    };

    this.div = function(num) {
        this.x /= num;
        this.y /= num;
    };

    this.dir = function() {
        var angle = Math.atan2(this.y, this.x);
        var degrees = ((180 * angle) / Math.PI);
        return ((360 + Math.round(degrees)) % 360);
    };

    this.mag = function() {
        return (Math.sqrt((this.x * this.x) + (this.y * this.y)));
    };

    this.setMag = function(mag) {
        var dir = this.dir();
        this.x = Math.cos(dir) * mag;
	    this.y = Math.sin(dir) * mag;
    };

    this.fromAngle = function(ang) {
        return new Vector(Math.cos(ang), Math.sin(ang));
    };

    this.copy = function() {
        return new Vector(this.x, this.y);  
    };

    this.addV = function(v2) {
        this.x += v2.x;
        this.y += v2.y;
    };

    this.subV = function(v2) {
        this.x -= v2.x;
        this.y -= v2.y;
    };
}

Vector.prototype.normalize = function() {
    if(this.mag() > 0) this.div(this.mag());
};

Vector.prototype.random2d = function() {
    return this.fromAngle(Math.random() * Math.PI * 2);
};

function addVector(v1, v2) {
    vec = v1.copy();
    vec.add(v2)
    return vec;
}

function subVector(v1, v2) {
    return new Vector((v1.x - v2.x), (v1.y - v2.y));
}

function mulVector(v1, v2) {
    return new Vector((v1.x * v2.x), (v1.y * v2.y));
}

export function random2d() {
    let temp = new Vector();
    return temp.fromAngle(Math.random() * Math.PI * 2);
}