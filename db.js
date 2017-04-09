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
    return new ColorTile(this.x, this.y, this.color, this.hits, this.lastHitBy);
};

var db = (function () {
    var _cells = [],
        _ctx;

    // Init _cells In Its Own Scope,
    // So i Does Not Pollute The Closure
    // Run When It Is Encountered
    (function () {
        for (var i = 0; i < CELLS; i++) {
            _cells.push(new ColorTile(i % W, Math.floor(i / W)));
        }
    })();

    // Private Functions
    function _put(tile) {
        _cells[tile.x % W + tile.y * H] = tile;
    }

    function _write() {
        for (var i = 0; i < _cells.length; i++) {
            var cell = _cells[i];
            _ctx.fillStyle = cell.color.rgb();
            _ctx.fillRect(cell.x * SIZE, cell.y * SIZE, SIZE, SIZE);
        }
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
            var cell = _cells[x % W +  y * H];

            // A Copy Is Returned So The
            // Original May Not Be Modified Without put()
            return cell.copy();
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
            var tile = this.get(x, y);
            tile.hits++;

            if (color instanceof Color)
                tile.color = color;
            else
                tile.color = new Color(color);

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
            this.put(tile.x, tile.y, tile.color, tile.lastHitBy || this.putTile.caller.name);
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
        }
    }
})();