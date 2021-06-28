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

function fromHex(hex) {

    // remove any leading formatting characters
    hex = hex.replace("#", "");

    const colorValue = Number.parseInt(hex, 16);

    let r;
    let g;
    let b;

    switch (hex.length) {

        // 8-bit color
        case 2:
            r = (colorValue & 0b1110_0000) / 0b1110_0000;
            g = (colorValue & 0b0001_1100) / 0b0001_1100;
            b = (colorValue & 0b0000_0011) / 0b0000_0011;
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
            r = (colorValue & 0xFF0000) / 0xFF0000;
            g = (colorValue & 0x00FF00) / 0x00FF00;
            b = (colorValue & 0x0000FF) / 0x0000FF;
            break;
        
        // 36-bit color
        case 9:
            r = (colorValue & 0xFFF000000) / 0xFFF000000;
            g = (colorValue & 0x000FFF000) / 0x000FFF000;
            b = (colorValue & 0x000000FFF) / 0x000000FFF;
            break;
        
        // 48-bit color
        case 12:
            r = (colorValue & 0xFFFF_0000_0000) / 0xFFFF_0000_0000;
            g = (colorValue & 0x0000_FFFF_0000) / 0x0000_FFFF_0000;
            b = (colorValue & 0x0000_0000_FFFF) / 0x0000_0000_FFFF;
            break;

        default:
            throw new Error("Invalid color format");
    }

    return new Color(r, g, b);
}

// color a given string of text in a rainbow style
function rainbow(logMsg, isBg = false, speed = 0.1) {

    let result = ""
    logMsg = logMsg.replace(resetToken, "");
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
    fromHex,
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

if (process.argv[1] == __filename) {

    let myColor = new Color(0.9, 0.2, 0.2);

    let msg = colorBG("Hello World!", myColor);
    console.log(msg);

    myColor = fromHex("#198ed7");
    msg = colorFG(msg, myColor);
    console.log(msg);

    myColor = fromHSV(0.48, 0.9, 0.3);
    msg = colorBG("HSV teal!", myColor);
    console.log(msg);

    console.log(rainbow("Here's a rainbow!"));

    msg = rainbow("I love rainbows, don't you? They're pretty awesome", true, 0.05);
    console.log(colorFG(msg, module.exports.BLACK));

    msg = colorFG("I love rainbows, don't you? They're pretty awesome", module.exports.BLACK);
    console.log(rainbow(msg, true, 0.02));
}
