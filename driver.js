function Driver(studentFunctions, asap, time) {
    this.studentFunctions = studentFunctions;
    this._asap = asap || false;
    this.time = time || TIME || 1000;
    this._procId = 0;
}

Driver.prototype.tick = function () {
    var arr = shuffle(this.studentFunctions);

    for (var i = 0; i < arr.length; i++)
        arr[i]();

    db.write();

    if (this._asap)
        this._procId = requestAnimationFrame(this.tick.bind(this));
    else
        this._procId = setTimeout(this.tick.bind(this), this.time);

};

Driver.prototype.start = function () {
    if (this._asap)
        this._procId = requestAnimationFrame(this.tick.bind(this));
    else
        this._procId = setTimeout(this.tick.bind(this), this.time);
};

Driver.prototype.stop = function () {
    if (this._procId === 0)
        return;

    if (this._asap)
        cancelAnimationFrame(this._procId);
    else
        clearTimeout(this._procId);

    this._procId = 0;
};

Driver.prototype.switchMode = function () {
    this.stop();
    this._asap = !this._asap;
    this.start();
};
