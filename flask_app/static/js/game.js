var playerOne = new Player();
var dealer = new Dealer();
var gameDeck = new Deck();

function startGame(){
    playerOne.turn = false
    gameDeck.shuffle().draw(playerOne.hand, 2)
    gameDeck.draw(dealer.hand, 2)
    playerOne.updateTotal().showHand()
    dealer.updateTotal().showHandFaceDown()
    console.log('board set up')

    document.getElementById('start-btn').style.display = 'none'
    document.getElementById('hit').style.display = ''
    document.getElementById('stay').style.display = ''

    return this
}

function gameLoop(){
    console.log('starting game...')
    startGame()
    console.log('player turn')
    playerOne.playerTurn()
    console.log('dealer turn')
    dealer.dealerTurn(gameDeck)

    // dealer turn
    // decide who won
    // give or take chips
}

// TODO ADD GAME LOGIC
// TODO MAKE WEBSITE LOOK NICE
