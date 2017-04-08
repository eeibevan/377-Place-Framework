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
    this.color = color || COLORS[1];
    this.hits = hits || 0;
    this.lastHitBy = lastHitBy || 'init';
}

ColorTile.prototype.copy = function () {
    return new ColorTile(this.x, this.y, this.color, this.hits, this.lastHitBy);
};

var db = (function () {
    var _cells = [],
        _ctx;

    // Init _cells In Its Own Scope,
    // So i Does Not Pollute The Closure
    (function () {
        for (var i = 0; i < CELLS; i++) {
            _cells.push(new ColorTile(i % W, Math.floor(i / W)));
        }
    })();

    function _put(tile) {
        _cells[tile.x % W + tile.y * H] = tile;
    }

    function _write() {
        for (var i = 0; i < _cells.length; i++) {
            var cell = _cells[i];
            _ctx.fillStyle = cell.color;
            _ctx.fillRect(cell.x * SIZE, cell.y * SIZE, SIZE, SIZE);
        }
    }

    return {
        get: function (x, y) {
            // A Copy Is Returned So The
            // Original May Not Be Modified Without put()
            return _cells[x % W +  y * H].copy();
        },
        put: function (x, y, color) {
            var tile = this.get(x, y);
            tile.hits++;
            tile.color = color;
            tile.lastHitBy = this.put.caller.name || 'anonymous';
            _put(tile);
        },
        write: function () {
            _write();
        },
        init: function (ctx) {
            _ctx = ctx;
            _write();
        }
    }
})();