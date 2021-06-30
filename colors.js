"use strict";
//#region color
Object.defineProperty(exports, "__esModule", { value: true });
exports.rainbow = exports.segmentedGradient = exports.gradient = exports.fromHex = exports.fromHSI = exports.fromHSL = exports.fromHSV = exports.colorFG = exports.colorBG = exports.resetToken = exports.colorFGToken = exports.colorBGToken = exports.InterpolationMethod = exports.cyclicalCubicInterpolate_derivativeBased = exports.cyclicalLerp = exports.cubicInterpolate_pointBased = exports.cubicInterpolate_derivativeBased = exports.lerp = exports.ColorSpace = exports.Color = void 0;
class Color {
    constructor(r, g, b) {
        this.r = Math.min(Math.max(r, 0), 1);
        this.g = Math.min(Math.max(g, 0), 1);
        this.b = Math.min(Math.max(b, 0), 1);
    }
    // exports as a simple array
    toRGB() {
        return [this.r, this.g, this.b];
    }
    // exports as an array of 3 RGB values
    to24Bit() {
        return [this.r_8b, this.g_8b, this.b_8b];
    }
    toHSV() {
        return [this.hue, this.saturation_V, this.value];
    }
    toHSL() {
        return [this.hue, this.saturation_L, this.lightness];
    }
    toHSI() {
        return [this.hue, this.saturation_I, this.intensity];
    }
    get r_8b() { return Math.floor(this.r * 0xFF); }
    get g_8b() { return Math.floor(this.g * 0xFF); }
    get b_8b() { return Math.floor(this.b * 0xFF); }
    get chroma() {
        return Math.max(this.r, this.g, this.b) - Math.min(this.r, this.g, this.b);
    }
    get hue() {
        if (this.chroma == 0)
            return 0;
        let hprime;
        switch (Math.max(this.r, this.g, this.b)) {
            case this.r:
                hprime = ((this.g - this.b) / this.chroma + 6) % 6;
                break;
            case this.g:
                hprime = (this.b - this.r) / this.chroma + 2;
                break;
            case this.b:
                hprime = (this.r - this.g) / this.chroma + 4;
                break;
            default:
                hprime = 0;
                break;
        }
        return hprime / 6;
    }
    get intensity() {
        return avg(this.r, this.g, this.b);
    }
    get value() {
        return Math.max(this.r, this.g, this.b);
    }
    get lightness() {
        return mid(this.r, this.g, this.b);
    }
    get saturation_V() {
        return this.value == 0 ? 0 : this.chroma / this.value;
    }
    get saturation_L() {
        return this.lightness % 1 == 0 ? 0 : this.chroma / (1 - Math.abs(2 * this.lightness - 1));
    }
    get saturation_I() {
        return this.intensity == 0 ? 0 : 1 - Math.min(this.r, this.g, this.b) / this.intensity;
    }
}
exports.Color = Color;
Color.BLACK = new Color(0, 0, 0);
Color.GRAY = new Color(0.5, 0.5, 0.5);
Color.WHITE = new Color(1, 1, 1);
Color.RED = new Color(1, 0, 0);
Color.GREEN = new Color(0, 1, 0);
Color.BLUE = new Color(0, 0, 1);
Color.CYAN = new Color(0, 1, 1);
Color.MAGENTA = new Color(1, 0, 1);
Color.YELLOW = new Color(1, 1, 0);
Color.GOLD = new Color(0.5, 0.5, 0);
Color.ORANGE = new Color(1, 0.5, 0);
Color.BROWN = new Color(0.5, 0.25, 0);
Color.PURPLE = new Color(0.5, 0, 1);
Color.SILVER = new Color(0.8, 0.8, 0.8);
Color.PINK = new Color(1, 0.6, 0.8);
var ColorSpace;
(function (ColorSpace) {
    ColorSpace[ColorSpace["RGB"] = 0] = "RGB";
    ColorSpace[ColorSpace["HSV"] = 1] = "HSV";
    ColorSpace[ColorSpace["HSL"] = 2] = "HSL";
    ColorSpace[ColorSpace["HSI"] = 3] = "HSI";
})(ColorSpace = exports.ColorSpace || (exports.ColorSpace = {}));
//#endregion
//#region averages
function mid(...values) {
    return (Math.max(...values) + Math.min(...values)) / 2;
}
function avg(...values) {
    return sum(...values) / values.length;
}
function sum(...values) {
    return values.reduce((a, b) => a + b);
}
//#endregion
//#region interpolation
function lerp(t, a, b) {
    return (b - a) * t + a;
}
exports.lerp = lerp;
function cubicInterpolate_derivativeBased(t, a, b, aprime = 0, bprime = 0) {
    return a + aprime * t + (3 * b - 3 * a - 2 * aprime - bprime) * t * t + (2 * a - 2 * b + aprime + bprime) * t * t * t;
}
exports.cubicInterpolate_derivativeBased = cubicInterpolate_derivativeBased;
function cubicInterpolate_pointBased(t, p0, p1, p2, p3) {
    return p1 + (0.5 * p2 - 0.5 * p0) * t + (p0 - 2.5 * p1 + 2 * p2 - 0.5 * p3) * t * t + (-0.5 * p0 + 1.5 * p1 - 1.5 * p2 + 0.5 * p3) * t * t * t;
}
exports.cubicInterpolate_pointBased = cubicInterpolate_pointBased;
function cyclicalLerp(t, a, b) {
    const diff = b - a;
    if (diff > 0.5) {
        return ((b - a - 1) * t + a + 1) % 1;
    }
    else if (diff < -0.5) {
        return ((b - a + 1) * t + a + 1) % 1;
    }
    else {
        return (b - a) * t + a;
    }
}
exports.cyclicalLerp = cyclicalLerp;
function cyclicalCubicInterpolate_derivativeBased(t, a, b, aprime = 0, bprime = 0) {
    const diff = b - a;
    if (diff > 0.5) {
        return cubicInterpolate_derivativeBased(t, a + 1, b, aprime, bprime) % 1;
    }
    else if (diff < -0.5) {
        return cubicInterpolate_derivativeBased(t, a, b + 1, aprime, bprime) % 1;
    }
    else {
        return cubicInterpolate_derivativeBased(t, a, b, aprime, bprime);
    }
}
exports.cyclicalCubicInterpolate_derivativeBased = cyclicalCubicInterpolate_derivativeBased;
var InterpolationMethod;
(function (InterpolationMethod) {
    InterpolationMethod[InterpolationMethod["linear"] = 0] = "linear";
    InterpolationMethod[InterpolationMethod["cubic"] = 1] = "cubic";
})(InterpolationMethod = exports.InterpolationMethod || (exports.InterpolationMethod = {}));
//#endregion
//#region console color tokens
// generates the token used in a console message to color the background
function colorBGToken(color) {
    return `\u001B[48;2;${color.r_8b};${color.g_8b};${color.b_8b}m`;
}
exports.colorBGToken = colorBGToken;
// generates the token used in a console message to color the message text
function colorFGToken(color) {
    return `\u001B[38;2;${color.r_8b};${color.g_8b};${color.b_8b}m`;
}
exports.colorFGToken = colorFGToken;
// constant for resetting the console color
exports.resetToken = "\x1b[0m";
//#endregion
//#region uniform text coloring
// color a given string of text a given color
function colorBG(logMsg, color) {
    logMsg = logMsg.replace(exports.resetToken, "");
    return colorBGToken(color) + logMsg + exports.resetToken;
}
exports.colorBG = colorBG;
// color a given string of text a given color
function colorFG(logMsg, color) {
    logMsg = logMsg.replace(exports.resetToken, "");
    return colorFGToken(color) + logMsg + exports.resetToken;
}
exports.colorFG = colorFG;
//#endregion
//#region generate color
// all inputs and outputs are in the range [0, 1]
function fromHSV(hue, saturation, value) {
    const chroma = value * saturation;
    const scaledHue = hue * 6;
    // integer to isolate the 6 separate cases for hue
    const hueRegion = Math.floor(scaledHue);
    // intermediate value for second largest component
    const X = chroma * (1 - Math.abs(scaledHue % 2 - 1));
    // constant to add to all colour components
    const m = value - chroma;
    return fromCXM(hueRegion, chroma, X, m);
}
exports.fromHSV = fromHSV;
function fromHSL(hue, saturation, lightness) {
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const scaledHue = hue * 6;
    // integer to isolate the 6 separate cases for hue
    const hueRegion = Math.floor(scaledHue);
    // intermediate value for second largest component
    const X = chroma * (1 - Math.abs(scaledHue % 2 - 1));
    // constant to add to all colour components
    const m = lightness - chroma * 0.5;
    return fromCXM(hueRegion, chroma, X, m);
}
exports.fromHSL = fromHSL;
function fromHSI(hue, saturation, intensity) {
    const scaledHue = hue * 6;
    // integer to isolate the 6 separate cases for hue
    const hueRegion = Math.floor(scaledHue);
    const Z = 1 - Math.abs(scaledHue % 2 - 1);
    const chroma = 3 * intensity * saturation / (1 + Z);
    // intermediate value for second largest component
    const X = chroma * Z;
    // constant to add to all colour components
    const m = intensity * (1 - saturation);
    return fromCXM(hueRegion, chroma, X, m);
}
exports.fromHSI = fromHSI;
// common last step for creating colors from hue and variations of saturation & brightness
function fromCXM(hueRegion, chroma, X, m) {
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
            return Color.BLACK;
    }
}
// generate a Color from a given hex value
function fromHex(hex) {
    // remove any leading formatting characters
    hex = hex.replace("#", "").replace("0x", "");

    const colorValue = Number.parseInt(hex, 16);
    let r;
    let g;
    let b;
    switch (hex.length) {
        // 8-bit color
        case 2:
            r = (colorValue & 224) / 224;
            g = (colorValue & 28) / 28;
            b = (colorValue & 3) / 3;
            break;
        // 12-bit color
        case 3:
            r = (colorValue & 0xF00) / 0xF00;
            g = (colorValue & 0x0F0) / 0x0F0;
            b = (colorValue & 0x00F) / 0x00F;
            break;
        // 16-bit color
        case 4:
            r = (colorValue & 0xF800) / 0xF800;
            g = (colorValue & 0x07E0) / 0x07E0;
            b = (colorValue & 0x001F) / 0x001F;
            break;
        // 24-bit color
        case 6:
            r = (colorValue & 16711680) / 16711680;
            g = (colorValue & 65280) / 65280;
            b = (colorValue & 255) / 255;
            break;
        // 36-bit color
        case 9:
            r = (colorValue & 68702699520) / 68702699520;
            g = (colorValue & 16773120) / 16773120;
            b = (colorValue & 4095) / 4095;
            break;
        // 48-bit color
        case 12:
            r = (colorValue & 281470681743360) / 281470681743360;
            g = (colorValue & 4294901760) / 4294901760;
            b = (colorValue & 65535) / 65535;
            break;
        default:
            throw new Error("Invalid color format");
    }
    return new Color(r, g, b);
}
exports.fromHex = fromHex;
//#endregion
//#region non-uniform text coloring helpers
function getCyclicalArg(space) {
    return space == ColorSpace.RGB ? 0 : 0b100;
}
// fetches the appropriate functions for a given choice of color space and interpolation method
function getFunctions(space, interpolation) {
    // which color space?
    let toColorSpace;
    let fromColorSpace;
    switch (space) {
        case ColorSpace.RGB:
            toColorSpace = (c) => c.toRGB();
            fromColorSpace = (r, g, b) => new Color(r, g, b);
            break;
        case ColorSpace.HSV:
            toColorSpace = (c) => c.toHSV();
            fromColorSpace = (h, s, v) => fromHSV(h, s, v);
            break;
        case ColorSpace.HSL:
            toColorSpace = (c) => c.toHSL();
            fromColorSpace = (h, s, l) => fromHSL(h, s, l);
            break;
        case ColorSpace.HSI:
            toColorSpace = (c) => c.toHSI();
            fromColorSpace = (h, s, i) => fromHSI(h, s, i);
            break;
        default:
            throw new Error("That color space is not yet supported within in this function.");
    }
    // which interpolation method?
    let interpolationFtn;
    let cyclicalInterpolationFtn;
    switch (interpolation) {
        case InterpolationMethod.linear:
            interpolationFtn = lerp;
            cyclicalInterpolationFtn = cyclicalLerp;
            break;
        case InterpolationMethod.cubic:
            interpolationFtn = cubicInterpolate_derivativeBased;
            cyclicalInterpolationFtn = cyclicalCubicInterpolate_derivativeBased;
            break;
        default:
            throw new Error("That interpolation method is not yet supported within this function");
    }
    return { toColorSpace, fromColorSpace, interpolationFtn, cyclicalInterpolationFtn };
}
// responsible for generating the base gradient 
function partialGradient(logMsg, startCol, endCol, isBg, 
// the function we use to interpolate
interpolationFtn, 
// a cyclical version of the same function
cyclicalInterpolationFtn, 
// bit mask to determine which arguments are cyclical
cyclicalArguments, 
// the function to generate the intermediate form from the Color class
toColorSpace, 
// the function to recreate the Color from the calculated mean
fromColorSpace) {
    // we need to figure out how to break up the domain
    let colorableCount = getColorableCount(logMsg);
    // convert to the form used for our interpolation
    const s = toColorSpace(startCol);
    const e = toColorSpace(endCol);
    let result = "";
    let t = 0;
    // we walk through the message, skipping any already existing color modifiers
    for (let i = 0; i < logMsg.length; i++) {
        if (logMsg[i] == '\u001B') {
            do {
                result += logMsg[i];
                i++;
            } while (logMsg[i] != 'm');
            result += logMsg[i];
            i++;
        }
        // generate the color using the functions we got in the arguments
        const color = getInterpolatedColor(s, e, t / colorableCount, interpolationFtn, cyclicalInterpolationFtn, cyclicalArguments, fromColorSpace);
        // add the current character colored with the color we created earlier
        result += isBg ? colorBGToken(color) : colorFGToken(color);
        result += logMsg[i];
        t++;
    }
    return result;
}
// interpolate between two colors using functions given as arguments
function getInterpolatedColor(startCol, endCol, t, 
// the function we use to interpolate
interpolationFtn, 
// a cyclical version of the same function
cyclicalInterpolationFtn, 
// bit mask to determine which arguments are cyclical
cyclicalArguments, 
// the function to recreate the Color from the calculated mean
fromColorSpace) {
    return fromColorSpace(0b100 & cyclicalArguments ? cyclicalInterpolationFtn(t, startCol[0], endCol[0]) : interpolationFtn(t, startCol[0], endCol[0]), 0b010 & cyclicalArguments ? cyclicalInterpolationFtn(t, startCol[1], endCol[1]) : interpolationFtn(t, startCol[1], endCol[1]), 0b001 & cyclicalArguments ? cyclicalInterpolationFtn(t, startCol[2], endCol[2]) : interpolationFtn(t, startCol[2], endCol[2]));
}
// calculates the number of characters within the given string that may be colored
function getColorableCount(logMsg) {
    let colorableCount = 0;
    for (let i = 0; i < logMsg.length; i++) {
        if (logMsg[i] == '\u001B') {
            do {
                i++;
            } while (logMsg[i] != 'm');
            i++;
        }
        colorableCount++;
    }
    return colorableCount;
}
// color a given string of text based on a gradient
function gradient(logMsg, startCol, endCol, isBg = false, space = ColorSpace.RGB, interpolation = InterpolationMethod.linear) {
    logMsg = logMsg.replace(exports.resetToken, "");
    let { interpolationFtn, cyclicalInterpolationFtn, toColorSpace, fromColorSpace } = getFunctions(space, interpolation);
    return partialGradient(logMsg, startCol, endCol, isBg, interpolationFtn, cyclicalInterpolationFtn, getCyclicalArg(space), toColorSpace, fromColorSpace) + exports.resetToken;
}
exports.gradient = gradient;
// color a given string of text based on an interconnected set of gradients
function segmentedGradient(logMsg, isBg, startingColor, ...segments) {
    logMsg = logMsg.replace(exports.resetToken, "");
    // determine the length of the entire expression
    let totalLength = 0;
    for (const segment of segments)
        totalLength += segment.length && segment.length > 0 ? segment.length : 1;
    let colorableCount = getColorableCount(logMsg);
    let result = "";
    // global t value
    let gt = 0;
    const increment = totalLength / colorableCount;
    for (let i = 0; i < logMsg.length; i++) {
        // skip characters used for recoloring
        if (logMsg[i] == '\u001B') {
            do {
                result += logMsg[i];
                i++;
            } while (logMsg[i] != 'm');
            result += logMsg[i];
            i++;
        }
        // local t value for current segment
        let lt = gt;
        let currentIndex;
        let currentSegment = segments[0];
        // determine which segment we are in for this iteration, and how far through it
        for (currentIndex = 0; currentIndex < segments.length; currentIndex++) {
            currentSegment = segments[currentIndex];
            if (!currentSegment.length)
                currentSegment.length = 1;
            // we've found our current segment
            if (lt < currentSegment.length)
                break;
            lt -= currentSegment.length;
        }
        // we need lt to be in a range of [0, 1]
        if (currentSegment.length)
            lt /= currentSegment.length;
        // if color space or interpolation method isn't given, use appropriate defaults
        currentSegment.colorSpace = currentSegment.colorSpace ? currentSegment.colorSpace : ColorSpace.RGB;
        currentSegment.interpolationMethod = currentSegment.interpolationMethod ? currentSegment.interpolationMethod : InterpolationMethod.linear;
        const { interpolationFtn, cyclicalInterpolationFtn, fromColorSpace, toColorSpace } = getFunctions(currentSegment.colorSpace, currentSegment.interpolationMethod);
        // our starting color comes from the previous iteration, or startingColor if we've just begun
        let sc;
        if (currentIndex == 0) {
            sc = toColorSpace(startingColor);
        }
        else {
            sc = toColorSpace(segments[currentIndex - 1].endCol);
        }
        let ec = toColorSpace(currentSegment.endCol);
        const color = getInterpolatedColor(sc, ec, lt, interpolationFtn, cyclicalInterpolationFtn, getCyclicalArg(currentSegment.colorSpace), fromColorSpace);
        result += isBg ? colorBGToken(color) : colorFGToken(color);
        result += logMsg[i];
        gt += increment;
    }
    return result + exports.resetToken;
}
exports.segmentedGradient = segmentedGradient;
// color a given string of text in a rainbow style
function rainbow(logMsg, isBg = false, speed = 0.05) {
    let result = "";
    logMsg = logMsg.replace(exports.resetToken, "");
    let h = 0;
    for (let i = 0; i < logMsg.length; i++) {
        if (logMsg[i] == '\u001B') {
            do {
                result += logMsg[i];
                i++;
            } while (logMsg[i] != 'm');
            result += logMsg[i];
            i++;
        }
        const color = fromHSV((h * speed) % 1, 1, 1);
        result += isBg ? colorBGToken(color) : colorFGToken(color);
        result += logMsg[i];
        h++;
    }
    result += exports.resetToken;
    return result;
}
exports.rainbow = rainbow;
//#endregion
//#region test
if (process.argv[1] == __filename) {
    let myColor;
    let msg;
    // the constructor expects values between 0 and 1, representing red, green and blue
    myColor = new Color(0.1, 0.7, 0.3);
    // gradients can be produced between pairs of colors
    msg = gradient("Colors can blend beautifully", Color.CYAN, Color.ORANGE, false, ColorSpace.HSV);
    console.log(msg);
    // multiple gradients can be used together for a more complex pattern gradient
    msg = segmentedGradient("This gradient is made up of multiple parts!", false, Color.WHITE, {
        endCol: Color.GRAY
    }, {
        endCol: Color.PINK,
        interpolationMethod: InterpolationMethod.cubic,
        length: 2
    }, {
        endCol: Color.GOLD,
        colorSpace: ColorSpace.HSL
    });
    console.log(msg);
}
//#endregion
