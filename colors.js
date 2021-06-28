// class for representing colors
class Color {

    r = 0;
    g = 0;
    b = 0;

    constructor(r, g, b) {
        this.r = Math.min(Math.max(r, 0), 1);
        this.g = Math.min(Math.max(g, 0), 1);
        this.b = Math.min(Math.max(b, 0), 1);
    }

    // exports as a simple tuple
    toTuple() {
        return (this.r, this.g, this.b);
    }

    // exports as a tuple of 3 RGB values
    to24Bit() {
        return (this.r_8b, this.g_8b, this.b_8b);
    }

    get r_8b() {return Math.floor(this.r * 0xFF)}
    get g_8b() {return Math.floor(this.g * 0xFF)}
    get b_8b() {return Math.floor(this.b * 0xFF)}
}

// generates the token used in a console message to color the background
function colorBGToken(color) {
    return `\u001B[48;2;${color.r_8b};${color.g_8b};${color.b_8b}m`
}

// generates the token used in a console message to color the message text
function colorFGToken(color) {
    return `\u001B[38;2;${color.r_8b};${color.g_8b};${color.b_8b}m`
}

// constant for resetting the console color
const resetToken = "\x1b[0m";

// color a given string of text a given color
function colorBG(logMsg, color) {
    logMsg = logMsg.replace(resetToken, "");
    return colorBGToken(color) + logMsg + resetToken;
}

// color a given string of text a given color
function colorFG(logMsg, color) {
    logMsg = logMsg.replace(resetToken, "");
    return colorFGToken(color) + logMsg + resetToken;
}

// generate a Color object from HSV color coordinates
function fromHSV(hue, saturation, value) {

    const chroma = value * saturation;
    const scaledHue = hue * 6;

    // integer to isolate the 6 separate cases for hue
    const hueRegion = Math.floor(scaledHue);

    // intermediate value for second largest component
    const X = chroma * (1 - Math.abs(scaledHue % 2 - 1));

    // constant to add to all colour components
    const m = value - chroma;

    switch (hueRegion) {
        case 0: // red to yellow
            return new Color(chroma + m, X + m, m);
        case 1: // yellow to green
            return new Color(X + m, chroma + m, m);
        case 2: // green to cyan
            return new Color(m, chroma + m, X + m);
        case 3: // cyan to blue
            return new Color(m, X + m, chroma + m);
        case 4: // blue to magenta
            return new Color(X + m, m, chroma + m);
        case 5: // magenta to red
            return new Color(chroma + m, m, X + m);
        default:
            return new Color(0, 0, 0);
    }
}

// color a given string of text in a rainbow style
function rainbow(logMsg, isBg = false, speed = 0.1) {
    let result = ""
    logMsg = logMsg.replace(resetToken, "");
    for (let h = 0; h < logMsg.length; h++) {
        const color = fromHSV((h * speed) % 1, 1, 1);
        result += isBg ? colorBGToken(color) : colorFGToken(color);
        result += logMsg[h];
    }
    result += resetToken;
    return result;
}

module.exports = {
    colorBGToken,
    colorFGToken,
    resetToken,
    colorBG,
    colorFG,
    fromHSV,
    rainbow,
    BLACK: new Color(0, 0, 0),
    RED: new Color(1, 0, 0),
    GREEN: new Color(0, 1, 0),
    BLUE: new Color(0, 0, 1),
    CYAN: new Color(0, 1, 1),
    MAGENTA: new Color(1, 0, 1),
    YELLOW: new Color(1, 1, 0),
    WHITE: new Color(1, 1, 1)
}
