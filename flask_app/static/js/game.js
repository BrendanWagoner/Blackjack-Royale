var playerOne = new Player();
var dealer = new Dealer();
var gameDeck = new Deck();

function startGame(){
    gameDeck.shuffle().draw(playerOne.hand, 2)
    console.log(playerOne.hand)
    gameDeck.draw(dealer.hand, 2);
    playerOne.updateTotal().showHand()
    dealer.updateTotal().showHandFaceDown()
    document.getElementById('start-btn').style.display = 'none'
    document.getElementById('hit').style.display = ''
    document.getElementById('stay').style.display = ''
    return this
}

function gameLoop(){
    startGame()
    playerOne.playerTurn()
}
// TODO CREATE DEALER
// TODO ADD GAME LOGIC
// TODO MAKE WEBSITE LOOK NICE
