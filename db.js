/**
 * Basic Database Unit
 *
 * @param x
 * @param y
 * @param color
 * @param hits
 * @param lastHitBy
 *
 * @constructor
 */
function ColorTile(x, y, color, hits, lastHitBy) {
    this.x = x;
    this.y = y;

    if (color instanceof Color)
        this.color = color;
    else
        this.color = new Color(color);

    this.hits = hits || 0;
    this.lastHitBy = lastHitBy || 'init';
}

/**
 * Makes A Copy of This Tile
 * @returns {ColorTile}
 */
ColorTile.prototype.copy = function () {
    return new ColorTile(this.x, this.y, this.color.copy(), this.hits, this.lastHitBy);
};

let db = (function () {
    let _cells = [],
        _ctx,
        _stats = {
            functions: {}
        };

    for (let i = 0; i < CELLS; i++) {
        _cells.push(new ColorTile(i % W, Math.floor(i / W)));
    }


    // Private Functions
    function _put(tile) {
        _cells[tile.x % W + tile.y * H] = tile;
    }

    function _write() {
        // Reset For Every Write
        _stats.functions = {};

        for (let i = 0; i < _cells.length; i++) {
            let cell = _cells[i];
            _ctx.fillStyle = cell.color.rgb();
            _ctx.fillRect(cell.x * SIZE, cell.y * SIZE, SIZE, SIZE);
            _stats.functions[cell.lastHitBy] = _stats.functions[cell.lastHitBy] + 1 || 1;
        }
    }

    function _compareStats(left, right) {
        if (left.tiles < right.tiles)
            return 1;
        else if (left.tiles > right.tiles)
            return -1;

        return 0;
    }

    // Public Functions
    return {
        /**
         * Returns The ColorTile At (x,y)
         * Starts At (0,0),
         * Ends At (W - 1, H - 1)
         *
         * @param x {number}
         * @param y {number}
         * @returns {ColorTile}
         */
        get: function (x, y) {
            // A Copy Is Returned So The
            // Original May Not Be Modified Without put()
            return _cells[x % W +  y * H].copy();
        },

        /**
         * Puts A ColorTile of Color color At (x,y)
         *
         * @param x {number}
         * @param y {number}
         * @param color {Color}
         *
         * @param [lastHitBy] {string}
         * @default The Name of The Function That Called This One
         * Optional - If You're Calling put() From A Function Other Then
         * Your Main Function, The please Provide This Parameter
         */
        put: function (x, y, color, lastHitBy) {
            let tile = this.get(x, y);
            tile.hits++;

            if (color instanceof Color)
                tile.color = color.copy();
            else
                tile.color = new Color(color);

            // Either use the provided value, or attempt to derive it from the function
            tile.lastHitBy = lastHitBy || this.put.caller.name || 'anonymous';
            _put(tile);
        },

        /**
         * Puts tile At (tile.x, tile.y)
         * Note: tile.hits Is Ignored
         *
         * @param tile {ColorTile}
         * A ColorTile With Valid x, y, and color Members
         *
         * @param [lastHitBy] {string}
         * @default The Name of The Function That Called This One
         * Optional - If You're Calling put() From A Function Other Then
         * Your Main Function, The please Provide This Parameter
         */
        putTile: function (tile, lastHitBy) {
            this.put(
                tile.x,
                tile.y,
                tile.color.copy(),
                lastHitBy || tile.lastHitBy || this.putTile.caller.name
            );
        },

        /**
         * Syncs All Changes To The Canvas
         * Note: init(ctx) Must Be Called First
         */
        write: function () {
            _write();
        },

        /**
         * Initialize The 'database' With The Context That The
         * Database Represents
         *
         * @param ctx {CanvasRenderingContext2D}
         */
        init: function (ctx) {
            _ctx = ctx;
            _write();
        },

        /**
         * Gets The Name of Each Known Function
         * And How Many Tiles Have Been Written By Them
         * In Descending Order
         *
         * @returns {Array}
         * And Array of Objects With The Following Structure,
         * Sorted In Descending Order
         *
         * {
         * name {String}
         * The Name of The Function That Wrote The Tiles
         *
         * tiles {number}
         * The Number of Tiles That The Function Owns
         * }
         */
        getFunctionStats: function () {
            let arr = [];
            for (let func in _stats.functions) {
                if (_stats.functions.hasOwnProperty(func)) {
                    arr.push({
                        name: func.toString(),
                        tiles: _stats.functions[func]
                    })
                }
            }

            arr.sort(_compareStats);

            return arr;
        }
    }
})();