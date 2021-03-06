// Fills From The Top Down
// With Random Colors
var example = (function () {
    var x = 0;
    var y = 0;
    var color = Color.Blue();

    function blackMain1() {
        db.put(x, y, color);
        x++;
        color = Color.Random();
        if (x >= W) {
            x = 0;
            y++;
        }
        if (y >= H)
            y = 0;
    }

    return blackMain1;
})();

// Fills From The Bottom Up With Black
var example2 = (function () {
    var x = W - 1;
    var y = H - 1;
    var color = Color.Black();

    function blackMain2() {
        db.put(x, y, color);
        x--;
        if (x < 0) {
            x = W - 1;
            y--;
        }
        if (y < 0) {
            y = H - 1;
        }

    }

    return blackMain2;
})();

// Fills From The Left To Right With Yellow
var example3 = (function () {
    var x = 0;
    var y = 0;
    var color = Color.Yellow();

    function blackMain3() {
        db.put(x, y, color);
        y++;

        if (y >= H) {
            y = 0;
            x++;
        }
        if (x >= W) {
            x = 0;
        }
    }

    return blackMain3;
})();

if (RUN_EXAMPLES) {
    studentFunctions.push(example);
    studentFunctions.push(example2);
    studentFunctions.push(example3);
}
