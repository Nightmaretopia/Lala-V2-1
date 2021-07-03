const colors = require('./colors');

const Color = colors.Color;
const black = Color.BLACK;
const gray = Color.GRAY;
const white = Color.WHITE;
const red = Color.RED;
const green = Color.GREEN;
const blue = Color.BLUE;
const cyan = Color.CYAN;
const magenta = Color.MAGENTA;
const yellow = Color.YELLOW;
const gold = Color.GOLD;
const orange = Color.ORANGE;
const brown = Color.BROWN;
const purple = Color.PURPLE;
const silver = Color.SILVER;
const pink = Color.PINK;

const log = console.log;
const text = colors.colorText;

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

function fire(msg, isBg = false) {
    if (isBg) {
        return log(colors.manyGradientColorText(text(msg, black), true, red, {
            color: orange,
            InterpMethod: colors.InterpMethod.inc_quadratic,
            length: 2
        }, {
            color: yellow,
            colorSpace: colors.ColorSpace.HSV
        }))
    } else {
        return log(colors.manyGradientColorText(msg, false, red, {
            color: orange,
            InterpMethod: colors.InterpMethod.inc_quadratic,
            length: 2
        }, {
            color: yellow,
            colorSpace: colors.ColorSpace.HSV
        }))
    }
}

function ice(msg, isBg = false) {
    let ice = new colors.Gradient(customCol("#086fff"), white, colors.ColorSpace.RGB, colors.InterpMethod.inc_quadratic)
    if (isBg) {
        return log(colors.gradientColorText(text(msg, black), ice, true))
    } else {
        return log(colors.gradientColorText(msg, ice, false))
    }
}

function zebra(msg, isBg = false) {
    if (isBg) {
        msg = colors.cycleColorText(msg, 1, true, white, black)
        log(colors.cycleColorText(msg, 1, false, black, white))
    } else {
        log(colors.cycleColorText(msg, 1, false, white, black))
    }
};

function custZebra(msg, leng = 1, isBg = false, ...cols) {
    if (isBg) {
        let c_msg = text(msg, black)
        return log(colors.cycleColorText(c_msg, leng, true, ...cols))
    } else {
        return log(colors.cycleColorText(msg, leng, false, ...cols))
    }
};

function custGrad(msg, stCol = white, edCol = white, colSpace = colors.ColorSpace.HSV, isBg = false) {
    let c_grad = new colors.Gradient(stCol, edCol, colSpace)
    if (isBg) {
        return log(colors.gradientColorText(msg, c_grad, true))
    } else {
        return log(colors.gradientColorText(msg, c_grad, false))
    }
};

function custSGrad(msg, isBg = false, stCol = white, ...segments) {
    if (isBg) {
        return log(colors.manyGradientColorText(msg, true, stCol, ...segments))
    } else {
        return log(colors.manyGradientColorText(msg, false, stCol, ...segments))
    }
}

function customLog(msg, tcolor = pink, isBg = false, bcolor = black) {
    if (isBg) {
        return log(text(text(msg, bcolor), tcolor))
    } else {
        return log(text(msg, tcolor))
    }
} 

function blacklog(msg, isBg = false) {
    if (isBg) {
        return log(text(text(msg, black), white))
    } else {
        return log(text(msg, black))
    }
};

function graylog(msg, isBg = false) {
    if (isBg) {
        return log(text(text(msg, gray), black))
    } else {
        return log(text(msg, gray))
    }
}; 

function whitelog(msg, isBg = false) {
    if (isBg) {
        return log(text(text(msg, white), black))
    } else {
        return log(text(msg, white))
    }
}; 

function redlog(msg, isBg = false) {
    if (isBg) {
        return log(text(text(msg, red), black))
    }
        return log(text(msg, red))
};

function greenlog(msg, isBg = false) {
    if (isBg) {
        return log(text(text(msg, green), black))
    } else {
        return log(text(msg, green))
    }
};

function bluelog(msg, isBg = false) {
    if (isBg) {
        return log(text(text(msg, blue), white))
    } else {
        return log(text(msg, blue))
    }
};

function cyanlog(msg, isBg = false) {
    if (isBg) {
        return log(text(text(msg, cyan), black))
    } else {
        return log(text(msg, cyan))
    }
};

function magentalog(msg, isBg = false) {
    if (isBg) {
        return log(text(text(msg, magenta), black))
    } else {
        return log(text(msg, magenta))
    }
};

function yellowlog(msg, isBg = false) {
    if (isBg) {
        return log(text(text(msg, yellow), black))
    } else {
        return log(text(msg, yellow))
    }
};

function goldlog(msg, isBg = false) {
    if (isBg) {
        return log(text(text(msg, gold), black))
    } else {
        return log(text(msg, gold))
    }
}; 

function orangelog(msg, isBg = false) {
    if (isBg) {
        return log(text(text(msg, orange), black))
    } else {
        return log(text(msg, orange))
    }
}; 

function brownlog(msg, isBg = false) {
    if (isBg) {
        return log(text(text(msg, brown), white))
    } else {
        return log(text(msg, brown))
    }
}; 

function purplelog(msg, isBg = false) {
    if (isBg) {
        return log(text(text(msg, purple), white))
    } else {
        return log(text(msg, purple))
    }
};

function silverlog(msg, isBg = false) {
    if (isBg) {
        return log(text(text(msg, silver), black))
    } else {
        return log(text(msg, silver))
    }
};

function pinklog(msg, isBg = false) {
    if (isBg) {
        return log(text(text(msg, pink), black))
    } else {
        return log(text(msg, pink))
    }
};

module.exports.colors = {
    RGB: colors.ColorSpace.RGB,
    HSL: colors.ColorSpace.HSL,
    HSV: colors.ColorSpace.HSV,
    HSI: colors.ColorSpace.HSI,
    Cubic: colors.InterpMethod.cubic,
    Linear: colors.InterpMethod.linear,
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
    zebra,
    c_zebra: custZebra,
    gradient: custGrad,
    c_gradient: custSGrad,
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