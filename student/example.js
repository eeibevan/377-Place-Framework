// Fills From The Top Down
// Changes Color When The End Is Reached
var example = (function () {
    var x = 0;
    var y = 0;
    var colorIndex = 2;

    function black1() {
        db.put(x, y, COLORS[colorIndex]);
        x++;
        if (x >= W) {
            x = 0;
            y++;
        }
        if (y >= H) {
            y = 0;
            colorIndex++;

            if (colorIndex > 16)
                colorIndex = 0;
        }
    }

    return black1;
})();

// Fills From The Bottom Up With Black
var example2 = (function () {
    var x = W - 1;
    var y = H - 1;
    var colorIndex = 0;


    function black2() {
        db.put(x, y, COLORS[colorIndex]);
        x--;
        if (x < 0) {
            x = W - 1;
            y--;
        }
        if (y < 0) {
            y = H - 1;
        }

    }

    return black2;
})();

// Fills From The Left To Right With Yellow
var example3 = (function () {
    var x = 0;
    var y = 0;
    var colorIndex = 5;

    function black3() {
        db.put(x, y, COLORS[colorIndex]);
        y++;

        if (y >= H) {
            y = 0;
            x++;
        }
        if (x >= W) {
            x = 0;
        }
    }

    return black3;
})();

studentFunctions.push(example);
studentFunctions.push(example2);
studentFunctions.push(example3);