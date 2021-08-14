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
const time = console.time;
const timelog = console.timeLog;
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
        return log(colors.cycleColorText(msg, 1, false, black, white))
    } else {
        return log(colors.cycleColorText(msg, 1, false, white, black))
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

// Temp logs (show how many time it took to log)

function rainbowTemp(msg, val = 0.1, isBg = false) {
    if (isBg) {
        return temp = (time(text(colors.rainbow(msg, true, val), black)), timelog((text(colors.rainbow(msg, true, val), black))))
    } else {
        return temp = (time(colors.rainbow(msg, false, val)), timelog(colors.rainbow(msg, false, val)))
    }
};

function fireTemp(msg, isBg = false) {
    if (isBg) {
        return temp = (
            time(colors.manyGradientColorText(text(msg, black), true, red, {
                color: orange,
                InterpMethod: colors.InterpMethod.inc_quadratic,
                length: 2
            },
            {
                color: yellow,
                colorSpace: colors.ColorSpace.HSV
            }
            )),
            timelog(colors.manyGradientColorText(text(msg, black), true, red, {
                color: orange,
                InterpMethod: colors.InterpMethod.inc_quadratic,
                length: 2
            }, {
                color: yellow,
                colorSpace: colors.ColorSpace.HSV
            }
            ))
        )
    } else {
        return temp = (
            time(colors.manyGradientColorText(msg, false, red, {
                color: orange,
                InterpMethod: colors.InterpMethod.inc_quadratic,
                length: 2
            },
            {
                color: yellow,
                colorSpace: colors.ColorSpace.HSV
            }
            )),
            timelog(colors.manyGradientColorText(msg, false, red, {
                color: orange,
                InterpMethod: colors.InterpMethod.inc_quadratic,
                length: 2
            },
            {
                color: yellow,
                colorSpace: colors.ColorSpace.HSV
            }
            ))
        )
    }
}

function iceTemp(msg, isBg = false) {
    let ice = new colors.Gradient(customCol("#086fff"), white, colors.ColorSpace.RGB, colors.InterpMethod.inc_quadratic)
    if (isBg) {
        return temp = time(colors.gradientColorText(text(msg, black), ice, true)), timelog(colors.gradientColorText(text(msg, black), ice, true))
    } else {
        return temp = time(colors.gradientColorText(msg, ice, false)), timelog(colors.gradientColorText(msg, ice, false))
    }
}

function zebraTemp(msg, isBg = false) {
    if (isBg) {
        msg = colors.cycleColorText(msg, 1, true, white, black)
        return temp = time(colors.cycleColorText(msg, 1, false, black, white)), timelog(colors.cycleColorText(msg, 1, false, black, white))
    } else {
        return temp = time(colors.cycleColorText(msg, 1, false, white, black)), timelog(colors.cycleColorText(msg, 1, false, white, black))
    }
};

function custZebraTemp(msg, leng = 1, isBg = false, ...cols) {
    if (isBg) {
        let c_msg = text(msg, black)
        return temp = time(colors.cycleColorText(c_msg, leng, true, ...cols)), timelog(colors.cycleColorText(c_msg, leng, true, ...cols))
    } else {
        return temp = time(colors.cycleColorText(msg, leng, false, ...cols)), timelog(colors.cycleColorText(msg, leng, false, ...cols))
    }
};

function custGradTemp(msg, stCol = white, edCol = white, colSpace = colors.ColorSpace.HSV, isBg = false) {
    let c_grad = new colors.Gradient(stCol, edCol, colSpace)
    if (isBg) {
        return temp = time(colors.gradientColorText(msg, c_grad, true)), timelog(colors.gradientColorText(msg, c_grad, true))
    } else {
        return temp = time(colors.gradientColorText(msg, c_grad, false)), timelog(colors.gradientColorText(msg, c_grad, false))
    }
};

function custSGradTemp(msg, isBg = false, stCol = white, ...segments) {
    if (isBg) {
        return temp = time(colors.manyGradientColorText(msg, true, stCol, ...segments)), timelog(colors.manyGradientColorText(msg, true, stCol, ...segments))
    } else {
        return temp = time(colors.manyGradientColorText(msg, false, stCol, ...segments)), timelog(colors.manyGradientColorText(msg, false, stCol, ...segments))
    }
}

function customLogTemp(msg, tcolor = pink, isBg = false, bcolor = black) {
    if (isBg) {
        return temp = time(text(text(msg, bcolor), tcolor)), timelog(text(text(msg, bcolor), tcolor))
    } else {
        return temp = time(text(msg, tcolor)), timelog(text(msg, tcolor))
    }
} 

function blacklogTemp(msg, isBg = false) {
    if (isBg) {
        return temp = time(text(text(msg, black), white)), timelog(text(text(msg, black), white))
    } else {
        return temp = time(text(msg, black)), timelog(text(msg, black))
    }
};

function graylogTemp(msg, isBg = false) {
    if (isBg) {
        return temp = time(text(text(msg, gray), black)), timelog(text(text(msg, gray), black))
    } else {
        return temp = time(text(msg, gray)), timelog(text(msg, gray))
    }
}; 

function whitelogTemp(msg, isBg = false) {
    if (isBg) {
        return temp = time(text(text(msg, white), black)), timelog(text(text(msg, white), black))
    } else {
        return temp = time(text(msg, white)), timelog(text(msg, white))
    }
}; 

function redlogTemp(msg, isBg = false) {
    if (isBg) {
        return temp = time(text(text(msg, red), black)), timelog(text(text(msg, red), black))
    }
        return temp = time(text(msg, red)), timelog(text(msg, red))
};

function greenlogTemp(msg, isBg = false) {
    if (isBg) {
        return temp = time(text(text(msg, green), black)), timelog(text(text(msg, green), black))
    } else {
        return temp = time(text(msg, green)), timelog(text(text(msg, green), black))
    }
};

function bluelogTemp(msg, isBg = false) {
    if (isBg) {
        return temp = time(text(text(msg, blue), white)), timelog(text(text(msg, blue), white))
    } else {
        return temp = time(text(msg, blue)), timelog(text(msg, blue))
    }
};

function cyanlogTemp(msg, isBg = false) {
    if (isBg) {
        return temp = time(text(text(msg, cyan), black)), timelog(text(text(msg, cyan), black))
    } else {
        return temp = time(text(msg, cyan)), timelog(text(msg, cyan))
    }
};

function magentalogTemp(msg, isBg = false) {
    if (isBg) {
        return temp = time(text(text(msg, magenta), black)), timelog(text(text(msg, magenta), black))
    } else {
        return temp = time(text(msg, magenta)), timelog(text(msg, magenta))
    }
};

function yellowlogTemp(msg, isBg = false) {
    if (isBg) {
        return temp = time(text(text(msg, yellow), black)), timelog(text(text(msg, yellow), black))
    } else {
        return temp = time(text(msg, yellow)), timelog(text(msg, yellow))
    }
};

function goldlogTemp(msg, isBg = false) {
    if (isBg) {
        return temp = time(text(text(msg, gold), black)), timelog(text(text(msg, gold), black))
    } else {
        return temp = time(text(msg, gold)), timelog(text(msg, gold))
    }
}; 

function orangelogTemp(msg, isBg = false) {
    if (isBg) {
        return temp = time(text(text(msg, orange), black)), timelog(text(text(msg, orange), black))
    } else {
        return temp = time(text(msg, orange)), timelog(text(msg, orange))
    }
}; 

function brownlogTemp(msg, isBg = false) {
    if (isBg) {
        return temp = time(text(text(msg, brown), white)), timelog(text(text(msg, brown), white))
    } else {
        return temp = time(text(msg, brown)), timelog(text(msg, brown))
    }
}; 

function purplelogTemp(msg, isBg = false) {
    if (isBg) {
        return temp = time(text(text(msg, purple), white)), timelog(text(text(msg, purple), white))
    } else {
        return temp = time(text(msg, purple)), timelog(text(msg, purple))
    }
};

function silverlogTemp(msg, isBg = false) {
    if (isBg) {
        return temp = time(text(text(msg, silver), black)), timelog(text(text(msg, silver), black))
    } else {
        return temp = time(text(msg, silver)), time(text(msg, silver))
    }
};

function pinklogTemp(msg, isBg = false) {
    if (isBg) {
        return temp = time(text(text(msg, pink), black)), timelog(text(text(msg, pink), black))
    } else {
        return temp = time(text(msg, pink)), timelog(text(msg, pink))
    }
}

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
    pink: pinklog,
    time: {
        rainbow: rainbowTemp,
        fire: fireTemp,
        ice: iceTemp,
        zebra: zebraTemp,
        c_zebra: custZebraTemp,
        gradient: custGradTemp,
        c_gradient: custSGradTemp,
        costum: customLogTemp,
        black: blacklogTemp,
        gray: graylogTemp,
        white: whitelogTemp,
        red: redlogTemp,
        green: greenlogTemp,
        blue: bluelogTemp,
        cyan: cyanlogTemp,
        magenta: magentalogTemp,
        yellow: yellowlogTemp,
        gold: goldlogTemp,
        orange: orangelogTemp,
        brown: brownlogTemp,
        purple: purplelogTemp,
        silver: silverlogTemp,
        pink: pinklogTemp,
    }
};