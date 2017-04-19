function Driver(studentFunctions, asap, time, ticksCounter, statsBody, timer) {
    this.studentFunctions = studentFunctions;
    this._asap = asap || false;
    this.time = time || TIME || 1000;
    this._ticksCounter  = ticksCounter;
    this._statsTableBody = statsBody;
    this._timerElem = timer;
    this._startTime  = new Date();
    this._procId = 0;
    this._ticks = 0;
}

Driver.prototype.tick = function () {
    var arr = shuffle(this.studentFunctions);

    for (var i = 0; i < arr.length; i++)
        arr[i]();

    db.write();

    if (this._ticksCounter)
        this._ticksCounter.innerHTML = this._ticks;

    if (this._statsTableBody)
        this.printStats();

    this._ticks++;

   if (this._timerElem)
       setInterval(this._timerTick.bind(this), 1000);

    if (this._asap)
        this._procId = requestAnimationFrame(this.tick.bind(this));
    else
        this._procId = setTimeout(this.tick.bind(this), this.time);
};

Driver.prototype.printStats = function () {
    var stats = db.getFunctionStats();
    var htmlAcc = "";

    stats.forEach(function (stat) {
        htmlAcc += "<tr>";
        htmlAcc += "<td>" + stat.name + "</td>";
        htmlAcc += "<td>" + stat.tiles + "</td>";
        htmlAcc += "</tr>";
    });

    this._statsTableBody.innerHTML = htmlAcc;
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

Driver.prototype._timerTick = function () {
    var timeDiff = new Date() - this._startTime;
    //strip the ms
    timeDiff /= 1000;

    var seconds = Math.round(timeDiff % 60);

    timeDiff = Math.floor(timeDiff / 60);
    var minutes = Math.round(timeDiff % 60);

    timeDiff = Math.floor(timeDiff / 60);
    var hours = Math.round(timeDiff % 24);

    timeDiff = Math.floor(timeDiff / 24);
    var days = timeDiff ;

    var acc = '';
    if (days > 0)
        acc += 'Days: ' + days + ' ';
    if (hours > 0)
        acc += 'Hours: ' + hours + ' ';
    if (minutes > 0)
        acc += 'Minutes: ' + minutes + ' ';
    if (seconds > 0)
        acc += 'Seconds: ' + seconds;

    if (this._timerElem)
        this._timerElem.innerHTML = acc;
};

Driver.prototype.switchMode = function () {
    this.stop();
    this._asap = !this._asap;
    this.start();
};
