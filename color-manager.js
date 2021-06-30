const colors = require('./colors');

const color = colors.Color;
const black = color.BLACK;
const gray = color.GRAY;
const white = color.WHITE;
const red = color.RED;
const green = color.GREEN;
const blue = color.BLUE;
const cyan = color.CYAN;
const magenta = color.MAGENTA;
const yellow = color.YELLOW;
const gold = color.GOLD;
const orange = color.ORANGE;
const brown = color.BROWN;
const purple = color.PURPLE;
const silver = color.SILVER;
const pink = color.PINK;

const log = console.log;
const text = colors.colorFG;
const bg = colors.colorBG;

function customCol(hex) {
    return colors.fromHex(hex)
}

function rainbow(msg, val = 0.1, isBg = false) {
    if (isBg) {
        return log(text(colors.rainbow(msg, true, val), black))
    } else {
        return log(colors.rainbow(msg, false, val))
    }
};

/*function fire(msg, isBg = false, colSpace = colors.ColorSpace.HSV) {
    if (isBg) {
        return log(colors.gradient(text(msg, black), red, yellow, true, colSpace))
    } else {
        return log(colors.gradient(msg, red, yellow, false, colSpace))
    }
};*/

function fire(msg, isBg = false) {
    if (isBg) {
        return log(colors.segmentedGradient(text(msg, black), true, red, {
            endCol: orange,
            InterpolationMethod: colors.InterpolationMethod.cubic,
            length: 2
        }, {
            endCol: yellow,
            colorSpace: colors.ColorSpace.HSV
        }))
    } else {
        return log(colors.segmentedGradient(msg, false, red, {
            endCol: orange,
            InterpolationMethod: colors.InterpolationMethod.linear,
            length: 2
        }, {
            endCol: yellow,
            colorSpace: colors.ColorSpace.HSV
        }))
    }
}

function ice(msg, isBg = false) {
    if (isBg) {
        return log(colors.gradient(text(msg, black), customCol("#086fff"), white, true, colors.ColorSpace.RGB))
    } else {
        return log(colors.gradient(msg, customCol("#086fff"), white, false, colors.ColorSpace.RGB))
    }
}

function custGrad(msg, stCol = white, edCol = white, colSpace = colors.ColorSpace.HSV, isBg = false) {
    if (isBg) {
        return log(colors.gradient(msg, stCol, edCol, true, colSpace))
    } else {
        return log(colors.gradient(msg, stCol, edCol, false, colSpace))
    }
};

function custSGrad(msg, isBg = false, stCol = white, ...segments) {
    if (isBg) {
        return log(colors.segmentedGradient(msg, true, stCol, ...segments))
    } else {
        return log(colors.segmentedGradient(msg, false, stCol, ...segments))
    }
}

function customLog(msg, tcolor = pink, isBg = false, bcolor = black) {
    if (isBg) {
        return log(text(bg(msg, bcolor), tcolor))
    } else {
        return log(text(msg, tcolor))
    }
} 

function blacklog(msg, isBg = false) {
    if (isBg) {
        return log(text(bg(msg, black), white))
    } else {
        return log(text(msg, black))
    }
};

function graylog(msg, isBg = false) {
    if (isBg) {
        return log(text(bg(msg, gray), black))
    } else {
        return log(text(msg, gray))
    }
}; 

function whitelog(msg, isBg = false) {
    if (isBg) {
        return log(text(bg(msg, white), black))
    } else {
        return log(text(msg, white))
    }
}; 

function redlog(msg, isBg = false) {
    if (isBg) {
        return log(text(bg(msg, red), black))
    }
        return log(text(msg, red))
};

function greenlog(msg, isBg = false) {
    if (isBg) {
        return log(text(bg(msg, green), black))
    } else {
        return log(text(msg, green))
    }
};

function bluelog(msg, isBg = false) {
    if (isBg) {
        return log(text(bg(msg, blue), white))
    } else {
        return log(text(msg, blue))
    }
};

function cyanlog(msg, isBg = false) {
    if (isBg) {
        return log(text(bg(msg, cyan), black))
    } else {
        return log(text(msg, cyan))
    }
};

function magentalog(msg, isBg = false) {
    if (isBg) {
        return log(text(bg(msg, magenta), black))
    } else {
        return log(text(msg, magenta))
    }
};

function yellowlog(msg, isBg = false) {
    if (isBg) {
        return log(text(bg(msg, yellow), black))
    } else {
        return log(text(msg, yellow))
    }
};

function goldlog(msg, isBg = false) {
    if (isBg) {
        return log(text(bg(msg, gold), black))
    } else {
        return log(text(msg, gold))
    }
}; 

function orangelog(msg, isBg = false) {
    if (isBg) {
        return log(text(bg(msg, orange), black))
    } else {
        return log(text(msg, orange))
    }
}; 

function brownlog(msg, isBg = false) {
    if (isBg) {
        return log(text(bg(msg, brown), white))
    } else {
        return log(text(msg, brown))
    }
}; 

function purplelog(msg, isBg = false) {
    if (isBg) {
        return log(text(bg(msg, purple), white))
    } else {
        return log(text(msg, purple))
    }
};

function silverlog(msg, isBg = false) {
    if (isBg) {
        return log(text(bg(msg, silver), black))
    } else {
        return log(text(msg, silver))
    }
};

function pinklog(msg, isBg = false) {
    if (isBg) {
        return log(text(bg(msg, pink), black))
    } else {
        return log(text(msg, pink))
    }
};

module.exports.colors = {
    RGB: colors.ColorSpace.RGB,
    HSL: colors.ColorSpace.HSL,
    HSV: colors.ColorSpace.HSV,
    HSI: colors.ColorSpace.HSI,
    Cubic: colors.InterpolationMethod.cubic,
    Linear: colors.InterpolationMethod.linear,
    hex: customCol,
    black,
    gray,
    white,
    red,
    green,
    blue,
    cyan,
    magenta,
    yellow,
    gold,
    orange,
    brown,
    purple,
    silver,
    pink
};

module.exports.logs = {
    rainbow,
    fire,
    ice,
    gradient: custGrad,
    sgradient: custSGrad,
    costum: customLog,
    black: blacklog,
    gray: graylog,
    white: whitelog,
    red: redlog,
    green: greenlog,
    blue: bluelog,
    cyan: cyanlog,
    magenta: magentalog,
    yellow: yellowlog,
    gold: goldlog,
    orange: orangelog,
    brown: brownlog,
    purple: purplelog,
    silver: silverlog,
    pink: pinklog
};