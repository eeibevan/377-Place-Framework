var lastName1 = (function () {
    // These Variables Keep Their State
    // Even After lastNameMain1() Returns
    var privateVar = 5;
    var colorEx = Color.Random();

    // This function Is Only Visible Inside This Closure
    function privateFunction(x) {
        return x + 1;
    }

    // This is your main function, and the only
    // One That Is Called From The Outside
    // Be Sure To Return It
    function lastNameMain1() {
        // Gets The tile At (x: 5, y: 5)
        // For The Structure of The Returned Object
        // See: ColorTile in db.js
        var tile = db.get(5,5);

        // Calling A Private Function
        var example = privateFunction(5);

        // When You Write To The Canvas (Using db.put())
        // Try To Do It Here, So lastHitBy Is Registered Correctly
        // Or Pass 'lastNameMain' To db.put()
        // Like db.put(1,1, Color.Yellow(), 'lastNameMain')
        // Note: That Parameter Is Optional
        db.put(5, 5, Color.Green(), 'lastNameMain1');

        // Also Valid
        // lastHitBy Will Be 'lastNameMain1' Here
        //
        // db.put(5, 5, Color.Green());
    }

    // Return Your Main Function
    return lastNameMain1;
})();

var lastName2 = (function () {

    function lastNameMain2() {
        var tile = db.get(3,3);

        // You Can Also Put A Tile Directly
        // The hits & lastHitBy Values Are Correctly
        // Set When This Method Is Called
        tile.color = Color.Cyan();
        db.putTile(tile)
    }

    return lastNameMain2;
})();

// Be Sure To Add Your Functions To This Array
// As It Is What's Iterated Thorough Every Tick
//
// Note: The Array Is Randomised Every Tick,
// So Your Functions May Not Be Called In Order
studentFunctions.push(lastName1);
studentFunctions.push(lastName2);
