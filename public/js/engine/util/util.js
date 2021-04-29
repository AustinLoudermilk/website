// Function.prototype.inherits = function(parent) {
//     this.prototype = Object.create(parent.prototype);
// };

import { Vector } from "./vector.js";

export function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1-y2));
}

export function vMap(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

export function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for(var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
}

export function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function isCollide(a, b) {
    aX = a.pos.x;
    aY = a.pos.y;
    bX = (b.pos.x - (b.width / 2));
    bY = (b.pos.y - (b.height / 2));
    return !(
        ((aY + a.height) < (bY)) ||
        (aY > (bY + b.height)) ||
        ((aX + a.width) < bX) ||
        (aX > (bX + b.width))
    );
}

export function getSize(obj) {
    var size = 0, key;
    for (key in obj) if (obj.hasOwnProperty(key)) size++;
    return size;
};

export function random(min, max) {

    var rand = Math.random();
    if (typeof min === 'undefined') {
        return rand;
    } else if (typeof max === 'undefined') {
        if (min instanceof Array) {
            return min[Math.floor(rand * min.length)];
        } else {
            return rand * min;
        }
    } else {
        if (min > max) {
            var tmp = min;
            min = max;
            max = tmp;
        }

        return rand * (max-min) + min;
    }
};

export function isColor(col) {
    if(col != undefined) {
        if(col.length > 0) {
            var s = new Option().style;
            s.color = col;
            if((s.color == col) || ( /^#[0-9A-F]{6}$/i.test(col))) return true;
            else return false;
        } else return false;
    }
};

export function isWithin(rect1, rect2) {
    return (rect1.pos.x < rect2.pos.x + rect2.size.x &&
            rect1.pos.x + rect1.size.x > rect2.pos.x &&
            rect1.pos.y < rect2.pos.y + rect2.size.y &&
            rect1.pos.y + rect1.size.y > rect2.pos.y);
};

export function isClicked(pos, obj) {
    return (pos.x < obj.pos.x + obj.size.x &&
            pos.x > obj.pos.x &&
            pos.y < obj.pos.y + obj.size.y &&
            pos.y  > obj.pos.y);
};

export function distance(p1, p2) {
    return Math.sqrt( Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p1.y), 2) );
};

export function text(ctx, text, pos, size, color, font) {
    let t = text ?? "empty";
    let c = color ?? "#000000";
    let s = size ?? 30;

    let f = s.toString() + "px Arial";

    if(font != undefined) f = s.toString() + "px " + font;

    if(ctx === undefined) log("context is undefined");
    else {
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";

        ctx.fillStyle = c;
        ctx.font = f;
        ctx.fillText(t, pos.x, pos.y);
    }
}

export function createElementWithClass(type, className) {
    const element = document.createElement(type);
    element.className = className;
    document.body.appendChild(element);
    return element;
}

export function dLine(ctx, start, end, lineWidth, col, dashPattern) {
    ctx.lineWidth = lineWidth || 1;
    ctx.strokeStyle  = col || "#ffffff";

    if(dashPattern !== undefined) ctx.setLineDash(dashPattern);
    else ctx.setLineDash([]);

    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);

    ctx.stroke();
}

export function dCircle(ctx, x, y, r, color, fill, stroke, strokeStyle) {
    ctx.beginPath();
    ctx.fillStyle = color;

    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    
    if(fill != undefined) ctx.fill();

    if(stroke != undefined) {
        ctx.lineWidth = stroke;
        ctx.strokeStyle = strokeStyle;

        ctx.stroke();
    }
}

export function dRect(ctx, x, y, width, height, color, center, deg, fill, stroke) {
    if(color) {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
    } else {
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = color;
    }
    
    if(stroke) ctx.lineWidth = stroke;

    var pos = 0;
    if(center) pos = new Vector((x - (width / 2)), (y - (height / 2)));
    else pos = new Vector(x, y);

    x = pos.x;
    y = pos.y;

    var rad;
    if(deg > 0) {
        ctx.save();
        ctx.translate(x, y);

        rad = deg * Math.PI / 180;
        ctx.rotate(rad);

        x = width / 2 * (-1);
        y = height / 2 * (-1);
    }

    if(fill) ctx.fillRect(x, y, width, height);
    else {
        ctx.beginPath();
        ctx.rect(x, y, width, height); 
        ctx.stroke();
    }

    if(deg > 0) ctx.restore();
}

export function map(n, start1, stop1, start2, stop2, withinBounds) {
    const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    
    if (!withinBounds) return newval;

    if (start2 < stop2) return constrain(newval, start2, stop2);
    else return constrain(newval, stop2, start2);
};

export function constrain(n, low, high) {
    return Math.max(Math.min(n, high), low);
};

export function isMobileDevice() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};