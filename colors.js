"use strict";
//#region color
Object.defineProperty(exports, "__esModule", { value: true });
exports.rainbow = exports.manyGradientColorText_2 = exports.manyGradientColorText = exports.gradientColorText = exports.cycleColorText = exports.colorText = exports.fromHex = exports.fromHSI = exports.fromHSL = exports.fromHSV = exports.resetToken = exports.colorFGToken = exports.colorBGToken = exports.Gradient = exports.InterpMethod = exports.cyclicCubicInterp_deriv_long = exports.cyclicCubicInterp_deriv_short = exports.cyclicQerp_1_long = exports.cyclicQerp_1_short = exports.cyclicQerp_0_long = exports.cyclicQerp_0_short = exports.cyclicLerp_long = exports.cyclicLerp_short = exports.cubicInterp_pt = exports.cubicInterp_deriv = exports.qerp_1 = exports.qerp_0 = exports.lerp = exports.ColorSpace = exports.Color = void 0;
class Color {
    constructor(r, g, b) {
        this._r = Math.min(Math.max(r, 0), 1);
        this._g = Math.min(Math.max(g, 0), 1);
        this._b = Math.min(Math.max(b, 0), 1);
    }
    // exports as a simple array
    toRGB() {
        return [this._r, this._g, this._b];
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
    get r() {
        return this._r;
    }
    get g() {
        return this._g;
    }
    get b() {
        return this._b;
    }
    set r(r) {
        this._r = Math.min(Math.max(r, 0), 1);
    }
    set g(g) {
        this._g = Math.min(Math.max(g, 0), 1);
    }
    set b(b) {
        this._b = Math.min(Math.max(b, 0), 1);
    }
    get r_8b() { return Math.floor(this._r * 0xFF); }
    get g_8b() { return Math.floor(this._g * 0xFF); }
    get b_8b() { return Math.floor(this._b * 0xFF); }
    get chroma() {
        return Math.max(this._r, this._g, this._b) - Math.min(this._r, this._g, this._b);
    }
    set chroma(c) {
        if (c < 0)
            c = 0;
        let i = this.intensity;
        let oc = this.chroma;
        this._r = (this._r - i) * c / oc + i;
        this._g = (this._g - i) * c / oc + i;
        this._b = (this._b - i) * c / oc + i;
    }
    get hue() {
        if (this.chroma == 0)
            return 0;
        let hprime;
        switch (Math.max(this._r, this._g, this._b)) {
            case this._r:
                hprime = ((this._g - this._b) / this.chroma + 6) % 6;
                break;
            case this._g:
                hprime = (this._b - this._r) / this.chroma + 2;
                break;
            case this._b:
                hprime = (this._r - this._g) / this.chroma + 4;
                break;
            default:
                hprime = 0;
                break;
        }
        return hprime / 6;
    }
    set hue(h) {
        let replacements = fromHSV(h, this.saturation_V, this.value);
        this._r = replacements._r;
        this._g = replacements._g;
        this._b = replacements._b;
    }
    get intensity() {
        return avg(this._r, this._g, this._b);
    }
    set intensity(i) {
        let replacements = fromHSI(this.hue, this.saturation_I, i);
        this._r = replacements._r;
        this._g = replacements._g;
        this._b = replacements._b;
    }
    get value() {
        return Math.max(this._r, this._g, this._b);
    }
    set value(v) {
        let replacements = fromHSV(this.hue, this.saturation_V, v);
        this._r = replacements._r;
        this._g = replacements._g;
        this._b = replacements._b;
    }
    get lightness() {
        return mid(this._r, this._g, this._b);
    }
    set lightness(l) {
        let replacements = fromHSL(this.hue, this.saturation_L, l);
        this._r = replacements._r;
        this._g = replacements._g;
        this._b = replacements._b;
    }
    get saturation_V() {
        return this.value == 0 ? 0 : this.chroma / this.value;
    }
    set saturation_V(s) {
        let replacements = fromHSV(this.hue, s, this.value);
        this._r = replacements._r;
        this._g = replacements._g;
        this._b = replacements._b;
    }
    get saturation_L() {
        return this.lightness % 1 == 0 ? 0 : this.chroma / (1 - Math.abs(2 * this.lightness - 1));
    }
    set saturation_L(s) {
        let replacements = fromHSL(this.hue, s, this.lightness);
        this._r = replacements._r;
        this._g = replacements._g;
        this._b = replacements._b;
    }
    get saturation_I() {
        return this.intensity == 0 ? 0 : 1 - Math.min(this._r, this._g, this._b) / this.intensity;
    }
    set saturation_I(s) {
        let replacements = fromHSI(this.hue, s, this.intensity);
        this._r = replacements._r;
        this._g = replacements._g;
        this._b = replacements._b;
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
Color.SILVER = new Color(0.75, 0.75, 0.75);
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
// linear interpolation
function lerp(t, a, b) {
    return (b - a) * t + a;
}
exports.lerp = lerp;
// quadratic interpolation which starts at its turning point
function qerp_0(t, a, b) {
    return (b - a) * t * t + a;
}
exports.qerp_0 = qerp_0;
// quadratic interpolation which ends at its turning point
function qerp_1(t, a, b) {
    return (b - a) * (2 - t) * t + a;
}
exports.qerp_1 = qerp_1;
// cubic interpolation using derivatives
function cubicInterp_deriv(t, a, b, aprime = 0, bprime = 0) {
    return (2 * a - 2 * b + aprime + bprime) * t * t * t + (3 * b - 3 * a - 2 * aprime - bprime) * t * t + aprime * t + a;
}
exports.cubicInterp_deriv = cubicInterp_deriv;
// cubic interpolation using points
function cubicInterp_pt(t, p0, p1, p2, p3) {
    return (-0.5 * p0 + 1.5 * p1 - 1.5 * p2 + 0.5 * p3) * t * t * t + (p0 - 2.5 * p1 + 2 * p2 - 0.5 * p3) * t * t + (0.5 * p2 - 0.5 * p0) * t + p1;
}
exports.cubicInterp_pt = cubicInterp_pt;
// cyclical linear interpolation
function cyclicLerp_short(t, a, b, cycles = 0) {
    const diff = b - a;
    if (diff > 0.5) {
        return ((diff - 1 - cycles) * t + a + 1 + cycles) % 1;
    }
    else if (diff < -0.5) {
        return ((diff + 1 + cycles) * t + a) % 1;
    }
    else if (diff > 0) {
        return ((diff + cycles) * t + a) % 1;
    }
    else {
        return ((diff - cycles) * t + a + cycles) % 1;
    }
}
exports.cyclicLerp_short = cyclicLerp_short;
function cyclicLerp_long(t, a, b, cycles = 0) {
    const diff = b - a;
    if (diff > 0.5) {
        return ((diff + cycles) * t + a) % 1;
    }
    else if (diff < -0.5) {
        return ((diff - cycles) * t + a + cycles) % 1;
    }
    else if (diff > 0) {
        return ((diff - 1 - cycles) * t + a + 1 + cycles) % 1;
    }
    else {
        return ((diff + 1 + cycles) * t + a) % 1;
    }
}
exports.cyclicLerp_long = cyclicLerp_long;
// cyclical quadratic interpolation which starts at its turning point
function cyclicQerp_0_short(t, a, b, cycles = 0) {
    const diff = b - a;
    if (diff > 0.5) {
        return ((diff - 1 - cycles) * t * t + a + 1 + cycles) % 1;
    }
    else if (diff < -0.5) {
        return ((diff + 1 + cycles) * t * t + a) % 1;
    }
    else if (diff > 0) {
        return ((diff + cycles) * t * t + a) % 1;
    }
    else {
        return ((diff - cycles) * t * t + a + cycles) % 1;
    }
}
exports.cyclicQerp_0_short = cyclicQerp_0_short;
function cyclicQerp_0_long(t, a, b, cycles = 0) {
    const diff = b - a;
    if (diff > 0.5) {
        return ((diff + cycles) * t * t + a) % 1;
    }
    else if (diff < -0.5) {
        return ((diff - cycles) * t * t + a + cycles) % 1;
    }
    else if (diff > 0) {
        return ((diff - 1 - cycles) * t * t + a + 1 + cycles) % 1;
    }
    else {
        return ((diff + 1 + cycles) * t * t + a) % 1;
    }
}
exports.cyclicQerp_0_long = cyclicQerp_0_long;
// cyclical quadratic interpolation which ends at its turning point
function cyclicQerp_1_short(t, a, b, cycles = 0) {
    const diff = b - a;
    if (diff > 0.5) {
        return ((diff - 1 - cycles) * (2 - t) * t + a + 1 + cycles) % 1;
    }
    else if (diff < -0.5) {
        return ((diff + 1 + cycles) * (2 - t) * t + a) % 1;
    }
    else if (diff > 0) {
        return ((diff + cycles) * (2 - t) * t + a) % 1;
    }
    else {
        return ((diff - cycles) * (2 - t) * t + a + cycles) % 1;
    }
}
exports.cyclicQerp_1_short = cyclicQerp_1_short;
function cyclicQerp_1_long(t, a, b, cycles = 0) {
    const diff = b - a;
    if (diff > 0.5) {
        return ((diff + cycles) * (2 - t) * t + a) % 1;
    }
    else if (diff < -0.5) {
        return ((diff - cycles) * (2 - t) * t + a + cycles) % 1;
    }
    else if (diff > 0) {
        return ((diff - 1 - cycles) * (2 - t) * t + a + 1 + cycles) % 1;
    }
    else {
        return ((diff + 1 + cycles) * (2 - t) * t + a) % 1;
    }
}
exports.cyclicQerp_1_long = cyclicQerp_1_long;
// cyclical cubic interpolation using derivatives
function cyclicCubicInterp_deriv_short(t, a, b, aprime = 0, bprime = 0, cycles = 0) {
    const diff = b - a;
    if (diff > 0.5) {
        return ((-2 * (diff - 1 - cycles) + aprime + bprime) * t * t * t + (3 * (diff - 1 - cycles) - 2 * aprime - bprime) * t * t + aprime * t + a + 1 + cycles) % 1;
    }
    else if (diff < -0.5) {
        return ((-2 * (diff + 1 + cycles) + aprime + bprime) * t * t * t + (3 * (diff + 1 + cycles) - 2 * aprime - bprime) * t * t + aprime * t + a) % 1;
    }
    else if (diff > 0) {
        return ((-2 * (diff + cycles) + aprime + bprime) * t * t * t + (3 * (diff + cycles) - 2 * aprime - bprime) * t * t + aprime * t + a) % 1;
    }
    else {
        return ((-2 * (diff - cycles) + aprime + bprime) * t * t * t + (3 * (diff - cycles) - 2 * aprime - bprime) * t * t + aprime * t + a + cycles) % 1;
    }
}
exports.cyclicCubicInterp_deriv_short = cyclicCubicInterp_deriv_short;
function cyclicCubicInterp_deriv_long(t, a, b, aprime = 0, bprime = 0, cycles = 0) {
    const diff = b - a;
    if (diff > 0.5) {
        return ((-2 * (diff + cycles) + aprime + bprime) * t * t * t + (3 * (diff + cycles) - 2 * aprime - bprime) * t * t + aprime * t + a) % 1;
    }
    else if (diff < -0.5) {
        return ((-2 * (diff - cycles) + aprime + bprime) * t * t * t + (3 * (diff - cycles) - 2 * aprime - bprime) * t * t + aprime * t + a + cycles) % 1;
    }
    else if (diff > 0) {
        return ((-2 * (diff - 1 - cycles) + aprime + bprime) * t * t * t + (3 * (diff - 1 - cycles) - 2 * aprime - bprime) * t * t + aprime * t + a + 1 + cycles) % 1;
    }
    else {
        return ((-2 * (diff + 1 + cycles) + aprime + bprime) * t * t * t + (3 * (diff + 1 + cycles) - 2 * aprime - bprime) * t * t + aprime * t + a) % 1;
    }
}
exports.cyclicCubicInterp_deriv_long = cyclicCubicInterp_deriv_long;
var InterpMethod;
(function (InterpMethod) {
    InterpMethod[InterpMethod["linear"] = 0] = "linear";
    InterpMethod[InterpMethod["inc_quadratic"] = 1] = "inc_quadratic";
    InterpMethod[InterpMethod["dec_quadratic"] = 2] = "dec_quadratic";
    InterpMethod[InterpMethod["cubic"] = 3] = "cubic";
})(InterpMethod = exports.InterpMethod || (exports.InterpMethod = {}));
// represents a gradient between two colors
class Gradient {
    constructor(startColor, endColor, space = ColorSpace.RGB, interpolation = InterpMethod.linear, longRoute = false, cycles = 0) {
        this.colorSpace = space;
        this.interpMethod = interpolation;
        let { fromColor, toColor } = getCastingFtns(space);
        let { interpFtn, cyclicInterpFtn } = getInterpFtns(interpolation, longRoute);
        this._longRoute = longRoute;
        this.toColor = toColor;
        this.fromColor = fromColor;
        this.interpFtn = interpFtn;
        this.cyclicInterpFtn = cyclicInterpFtn;
        [this.s1, this.s2, this.s3] = fromColor(startColor);
        [this.e1, this.e2, this.e3] = fromColor(endColor);
        this.cyclicArg = getCyclicArg(space);
        this.cycles = cycles;
    }
    getAt(t) {
        return this.toColor(0b100 & this.cyclicArg ? this.cyclicInterpFtn(t, this.s1, this.e1, this.cycles) : this.interpFtn(t, this.s1, this.e1), 0b010 & this.cyclicArg ? this.cyclicInterpFtn(t, this.s2, this.e2, this.cycles) : this.interpFtn(t, this.s2, this.e2), 0b001 & this.cyclicArg ? this.cyclicInterpFtn(t, this.s3, this.e3, this.cycles) : this.interpFtn(t, this.s3, this.e3));
    }
    get startColor() {
        return this.toColor(this.s1, this.s2, this.s3);
    }
    get endColor() {
        return this.toColor(this.e1, this.e2, this.e3);
    }
    set startColor(c) {
        [this.s1, this.s2, this.s3] = this.fromColor(c);
    }
    set endColor(c) {
        [this.e1, this.e2, this.e3] = this.fromColor(c);
    }
    get interpolation() {
        return this.interpMethod;
    }
    get space() {
        return this.colorSpace;
    }
    set interpolation(interpolation) {
        this.interpMethod = interpolation;
        let { interpFtn, cyclicInterpFtn } = getInterpFtns(interpolation, this._longRoute);
        this.interpFtn = interpFtn;
        this.cyclicInterpFtn = cyclicInterpFtn;
    }
    set space(space) {
        this.colorSpace = space;
        let s = this.startColor, e = this.endColor;
        let { fromColor, toColor } = getCastingFtns(space);
        this.fromColor = fromColor;
        this.toColor = toColor;
        this.cyclicArg = getCyclicArg(space);
        this.startColor = s, this.endColor = e;
    }
    get longRoute() {
        return this._longRoute;
    }
    set longRoute(longRoute) {
        this._longRoute = longRoute;
        let { interpFtn, cyclicInterpFtn } = getInterpFtns(this.interpMethod, longRoute);
        this.interpFtn = interpFtn;
        this.cyclicInterpFtn = cyclicInterpFtn;
    }
}
exports.Gradient = Gradient;
// collects the appropriate casting functions for a given color space
function getCastingFtns(space) {
    let fromColor;
    let toColor;
    switch (space) {
        case ColorSpace.RGB:
            fromColor = (c) => c.toRGB();
            toColor = (r, g, b) => new Color(r, g, b);
            break;
        case ColorSpace.HSV:
            fromColor = (c) => c.toHSV();
            toColor = (h, s, v) => fromHSV(h, s, v);
            break;
        case ColorSpace.HSL:
            fromColor = (c) => c.toHSL();
            toColor = (h, s, l) => fromHSL(h, s, l);
            break;
        case ColorSpace.HSI:
            fromColor = (c) => c.toHSI();
            toColor = (h, s, i) => fromHSI(h, s, i);
            break;
        default:
            throw new Error("That color space is not yet supported within in this function.");
    }
    return { toColor, fromColor };
}
// collects the appropriate interpolation functions for a given interpolation method
function getInterpFtns(interpolation, longRoute = false) {
    let interpFtn;
    let cyclicInterpFtn;
    switch (interpolation) {
        case InterpMethod.linear:
            interpFtn = lerp;
            cyclicInterpFtn = longRoute ? cyclicLerp_long : cyclicLerp_short;
            break;
        case InterpMethod.inc_quadratic:
            interpFtn = qerp_0;
            cyclicInterpFtn = longRoute ? cyclicQerp_0_long : cyclicQerp_0_short;
            break;
        case InterpMethod.dec_quadratic:
            interpFtn = qerp_1;
            cyclicInterpFtn = longRoute ? cyclicQerp_1_long : cyclicQerp_1_short;
            break;
        case InterpMethod.cubic:
            interpFtn = cubicInterp_deriv;
            cyclicInterpFtn = longRoute ? (t, a, b, cycles) => cyclicCubicInterp_deriv_long(t, a, b, 0, 0, cycles) : (t, a, b, cycles) => cyclicCubicInterp_deriv_short(t, a, b, 0, 0, cycles);
            break;
        default:
            throw new Error("That interpolation method is not yet supported within this function");
    }
    return { interpFtn, cyclicInterpFtn };
}
// returns a number which indicates which components of a given color system are cyclical
function getCyclicArg(space) {
    return space == ColorSpace.RGB ? 0 : 0b100;
}
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
//#region text coloring
// calculates the number of characters within the given string that may be colored
function getColorableCount(text) {
    let colorableCount = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] == '\u001B') {
            do {
                i++;
            } while (text[i] != 'm');
            i++;
        }
        colorableCount++;
    }
    return colorableCount;
}
// color a given string of text a given color
function colorText(text, color, isBg = false) {
    text = text.replace(exports.resetToken, "");
    return (isBg ? colorBGToken(color) : colorFGToken(color)) + text + exports.resetToken;
}
exports.colorText = colorText;
// color a given string a given sequence of colors in a cyclical order
function cycleColorText(text, segmentLength, isBg, ...colors) {
    text = text.replace(exports.resetToken, "");
    let result = "";
    let c = 0;
    let getToken = isBg ? colorBGToken : colorFGToken;
    for (let i = 0; i < text.length; i++) {
        // skip characters used for recoloring
        if (text[i] == '\u001B') {
            do {
                result += text[i];
                i++;
            } while (text[i] != 'm');
            result += text[i];
            i++;
        }
        result += getToken(colors[Math.round(c / segmentLength) % colors.length]) + text[i];
        c++;
    }
    return result + exports.resetToken;
}
exports.cycleColorText = cycleColorText;
// color a given string according to a given gradient
function gradientColorText(text, gradient, isBg = false) {
    text = text.replace(exports.resetToken, "");
    let colorableCount = getColorableCount(text);
    let result = "";
    let t = 0;
    // we walk through the message, skipping any already existing color modifiers
    for (let i = 0; i < text.length; i++) {
        if (text[i] == '\u001B') {
            do {
                result += text[i];
                i++;
            } while (text[i] != 'm');
            result += text[i];
            i++;
        }
        // generate the color using the functions we got in the arguments
        const color = gradient.getAt(t / colorableCount);
        // add the current character colored with the color we created earlier
        result += isBg ? colorBGToken(color) : colorFGToken(color);
        result += text[i];
        t++;
    }
    return result;
}
exports.gradientColorText = gradientColorText;
// color a given string using multiple consecutive gradients defined using segments
function manyGradientColorText(text, isBg = false, startingColor, ...segments) {
    text = text.replace(exports.resetToken, "");
    // determine the length of the entire expression & create the gradients for each segment
    let totalLength = 0;
    let gradients = [];
    let lengths = [];
    for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        lengths.push(segment.length && segment.length > 0 ? segment.length : 1);
        totalLength += lengths[lengths.length - 1];
        if (i == 0)
            gradients.push(new Gradient(startingColor, segment.color, segment.colorSpace, segment.interpMethod));
        else
            gradients.push(new Gradient(segments[i - 1].color, segment.color, segment.colorSpace, segment.interpMethod));
    }
    let colorableCount = getColorableCount(text);
    let result = "";
    // global t value
    let gt = 0;
    const increment = totalLength / colorableCount;
    for (let i = 0; i < text.length; i++) {
        // skip characters used for recoloring
        if (text[i] == '\u001B') {
            do {
                result += text[i];
                i++;
            } while (text[i] != 'm');
            result += text[i];
            i++;
        }
        // local t value for current segment
        let lt = gt;
        let currentIndex;
        let currentLength = lengths[0];
        let currentGradient = gradients[0];
        // determine which segment we are in for this iteration, and how far through it
        for (currentIndex = 0; currentIndex < segments.length; currentIndex++) {
            currentLength = lengths[currentIndex];
            currentGradient = gradients[currentIndex];
            // we've found our current segment
            if (lt < currentLength)
                break;
            lt -= currentLength;
        }
        // we need lt to be in a range of [0, 1]
        lt /= currentLength;
        const color = currentGradient.getAt(lt);
        result += isBg ? colorBGToken(color) : colorFGToken(color);
        result += text[i];
        gt += increment;
    }
    return result + exports.resetToken;
}
exports.manyGradientColorText = manyGradientColorText;
function manyGradientColorText_2(text, isBg = false, ...gradients) {
    text = text.replace(exports.resetToken, "");
    let colorableCount = getColorableCount(text);
    let result = "";
    let gt = 0;
    const increment = gradients.length / colorableCount;
    for (let i = 0; i < text.length; i++) {
        // skip characters used for recoloring
        if (text[i] == '\u001B') {
            do {
                result += text[i];
                i++;
            } while (text[i] != 'm');
            result += text[i];
            i++;
        }
        let lt = gt % 1;
        let gradIndex = Math.trunc(gt);
        const color = gradients[gradIndex].getAt(lt);
        result += isBg ? colorBGToken(color) : colorFGToken(color);
        result += text[i];
        gt += increment;
    }
    return result + exports.resetToken;
}
exports.manyGradientColorText_2 = manyGradientColorText_2;
// color a given string of text in a rainbow style
/** @deprecated */
function rainbow(text, isBg = false, speed = 0.05) {
    let result = "";
    text = text.replace(exports.resetToken, "");
    let h = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i] == '\u001B') {
            do {
                result += text[i];
                i++;
            } while (text[i] != 'm');
            result += text[i];
            i++;
        }
        const color = fromHSV((h * speed) % 1, 1, 1);
        result += isBg ? colorBGToken(color) : colorFGToken(color);
        result += text[i];
        h++;
    }
    result += exports.resetToken;
    return result;
}
exports.rainbow = rainbow;
//#endregion
//#region test
if (process.argv[1] == __filename) {
    let a = new Color(Math.random(), Math.random(), Math.random());
    let b = new Color(Math.random(), Math.random(), Math.random());
    let gradient = new Gradient(a, b, Math.floor(4 * Math.random()), Math.floor(4 * Math.random()), Math.random() < 0.5, Math.floor(-Math.log(Math.random())));
    let msg = gradientColorText("In order to find reasonable combinations, much experimentation is recommended", gradient, false);
    a = new Color(Math.random(), Math.random(), Math.random());
    b = new Color(Math.random(), Math.random(), Math.random());
    gradient = new Gradient(a, b, Math.floor(4 * Math.random()), Math.floor(4 * Math.random()), Math.random() < 0.5, Math.floor(-Math.log(Math.random())));
    console.log(gradientColorText(msg, gradient, true));
}
//#endregion
