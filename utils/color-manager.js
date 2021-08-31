"use strict";
const colors = require('./colors');

class Colors {
    constructor() {
        this.times = console.time;
        this.timeLog = console.timeLog;
        this.text = colors.colorText;
        this.reset = colors.resetToken;
        this.black = colors.Color.BLACK;
        this.gray = colors.Color.GRAY;
        this.white = colors.Color.WHITE;
        this.red = colors.Color.RED;
        this.green = colors.Color.GREEN;
        this.blue = colors.Color.BLUE;
        this.cyan = colors.Color.CYAN;
        this.magenta = colors.Color.MAGENTA;
        this.yellow = colors.Color.YELLOW;
        this.gold = colors.Color.GOLD;
        this.orange = colors.Color.ORANGE;
        this.brown = colors.Color.BROWN;
        this.purple = colors.Color.PURPLE;
        this.silver = colors.Color.SILVER;
        this.pink = colors.Color.PINK;
        this.hsv = colors.ColorSpace.HSV;
        this.hsl = colors.ColorSpace.HSL;
        this.hsi = colors.ColorSpace.HSI;
        this.rgb = colors.ColorSpace.RGB;
        this.linear = colors.InterpMethod.linear;
        this.inc_quadratic = colors.InterpMethod.inc_quadratic;
        this.dec_quadratic = colors.InterpMethod.dec_quadratic;
        this.cubic = colors.InterpMethod.cubic
        this.gradient = colors.Gradient;
        this.gradientText = colors.gradientColorText;
        this.gradientsText = colors.manyGradientColorText;
        this.rainbowCreate = colors.rainbow;
        this.cycleColor = colors.cycleColorText;
    }
    color(hex) {
        return colors.fromHex(hex)
    }
    fire(msg ,isBg = false) {
        if (isBg) {
            return this.gradientsText(this.text(msg, this.black), true, this.red, {
                color: this.orange,
                InterpMethod: this.quadratic,
                length: 2
            }, {
                color: this.yellow,
                colorSpace: this.hsv
            })
        } else {
            return this.gradientsText(msg, false, this.red, {
                color: this.orange,
                InterpMethod: this.quadratic,
                length: 2
            }, {
                color: this.yellow,
                colorSpace: this.hsv
            })
        }
    }
    ice(msg, isBg = false) {
        const ice = new this.gradient(this.color("#088fff"), this.white, this.rgb, this.quadratic)
        if (isBg) {
            return this.gradientText(this.text(msg, this.black), ice, true)
        } else {
            return this.gradientText(msg, ice, false)
        }
    }
    rainbow(msg, isBg = false, val = 0.1) {
        if (isBg) {
            return this.text(this.rainbowCreate(msg, true, val), this.black)
        } else {
            return this.rainbowCreate(msg, false, val)
        }
    }
    zebra(msg, isBg = false) {
        if (isBg) {
            msg = this.cycleColor(msg, 1, true, this.white, this.black)
            return this.cycleColor(msg, 1, false, this.black, this.white)
        } else {
            return this.cycleColor(msg, 1, false, this.white, this.black)
        }
    }
    customZebra(msg, leng = 1, isBg = false, textCol = this.black, ...cols) {
        msg = this.text(msg, textCol)
        return this.cycleColor(msg, leng, isBg, ...cols)
    }
    customGrad(msg, stCol = this.white, edCol = this.white, colSpace = this.hsv, inter = this.quadratic, isBg = false) {
        const c_grad = new this.gradient(stCol, edCol, colSpace, inter)
        return this.gradientText(msg, c_grad, isBg)
    }
    customManyGrad(msg, isBg = false, stCol = this.white, ...colors) {
        return this.gradientsText(msg, isBg, stCol, ...colors)
    }
    time(log) {
        const logs = (this.times(log), this.timeLog(log))
        return logs
    }
    customLog(log, color, isBg = false, bgColor) {
        if (isBg) {
            return this.text(this.text(log, bgColor, true), color)
        } else {
            return this.text(log, color, false)
        }
    }
};

module.exports = {
    colors: new Colors()
}