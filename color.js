const COLORS = ["rgb(255, 255, 255)", // White
"rgb(228, 228, 228)", // Light Grey
"rgb(136, 136, 136)", // Grey
"rgb(34, 34, 34)", // Black
"rgb(255, 167, 209)", // Light Pink
"rgb(229, 0, 0)", // Red
"rgb(229, 149, 0)", // Dark Orange
"rgb(160, 106, 66)", // Light Brown
"rgb(229, 217, 0)", // Yellow
"rgb(148, 224, 68)", // Light Green
"rgb(2, 190, 1)", // Green
"rgb(0, 211, 221)", // Cyan
"rgb(0, 131, 199)", // Light Blue
"rgb(0, 0, 234)", // Blue
"rgb(207, 110, 228)", // Light Purple
"rgb(130, 0, 128)"]; // Purple

function Color(color) {
    this.index = 0;

    if (typeof color === 'string') {
        var found = COLORS.indexOf(color);
        if (found !== -1 )
            this.index = found;
    } else if (typeof color === 'number') {
        if (color > 0 && color < COLORS.length - 1)
            this.index = color;
    } else if (typeof color === 'object' && color instanceof Color) {
        this.index = color.index;
    }
}

Color.prototype.rgb = function () {
    return COLORS[this.index];
};

Color.prototype.toString = function () {
    return this.rgb();
};


Color.White = function () {
    return new Color(0);
};

Color.LightGrey = function () {
    return new Color(1);
};

Color.Grey = function () {
    return new Color(2)
};

Color.Black = function () {
    return new Color(3)
};

Color.LightPink = function () {
    return new Color(4)
};

Color.Red = function () {
    return new Color(5)
};

Color.Orange = function () {
    return new Color(6);
};

Color.LightBrown = function () {
    return new Color(7);
};

Color.Yellow = function () {
    return new Color(8);
};

Color.LightGreen = function () {
    return new Color(9);
};

Color.Green = function () {
    return new Color(10);
};

Color.Cyan = function () {
    return new Color(11);
};

Color.LightBlue = function () {
    return new Color(12);
};

Color.Blue = function () {
    return new Color(13);
};

Color.LightPurple = function () {
    return new Color(14);
};

Color.Purple = function () {
    return new Color(15);
};

Color.Random = function () {
    return new Color(Math.floor(Math.random() * COLORS.length));
};