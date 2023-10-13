var playerOne = new Player();
var gameDeck = new Deck();

function startGame(){
    gameDeck.shuffle();
    gameDeck.draw(playerOne.hand, 2)
    playerOne.show_hand()
}

// TODO SHOW WHAT CARDS ARE IN MY HAND ON PAGE
// TODO CREATE DEALER
// TODO ADD GAME LOGIC
// TODO MAKE WEBSITE LOOK NICE
