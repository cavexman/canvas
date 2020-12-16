export const pointInRect = ({x, y}, {t, l, b, r}) => {
    if (x < l || x > r) {
        return false;
    }
    if (y < t || y > b) {
        return false;
    }
    // add condition for circle
    return true;
};

export const rectAroundPoint = ({x, y}, size) => {
    return {
        t: y - size,
        l: x - size,
        b: y + size,
        r: x + size,
    };
};

export const getAbsoluteOffsetFromBody = ( el ) =>
{   // finds the offset of el from the body or html element
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) )
    {
        _x += el.offsetLeft - el.scrollLeft + el.clientLeft;
        _y += el.offsetTop - el.scrollTop + el.clientTop;
        el = el.offsetParent;
    }
    console.log("offset", {_x, _y})
    return { top: _y, left: _x };
}