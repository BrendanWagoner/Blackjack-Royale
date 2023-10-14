var playerOne = new Player();
var gameDeck = new Deck();

function startGame(){
    gameDeck.shuffle();
    playerOne.hit(gameDeck).hit(gameDeck).show_hand()
}

// TODO SHOW WHAT CARDS ARE IN MY HAND ON PAGE
// TODO CREATE DEALER
// TODO ADD GAME LOGIC
// TODO MAKE WEBSITE LOOK NICE
