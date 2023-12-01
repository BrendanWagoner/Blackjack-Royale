// window.onload = function() {
//     let myModal = new bootstrap.Modal(
//         document.getElementById('myModal'), 
//         {}
//     );
//     myModal.show();
// }


class Game {
    constructor(){
        this.player = new Player();
        this.dealer = new Dealer();
        this.deck = new Deck();
    }

    // checks if target param is dealer class thats inside game class
    // updates total accordingly and after checks if target has a total of 21
    // returns true if so or false otherwise
    blackjackCheck(target){
        if (target === this.dealer){
            target.updateDealerTotal();
        }
        else{
            target.updateTotal()
        }

        if(target.total === 21){
            return true
        }
        return false
    }


    // shuffles deck, hands cards out to player and dealer then calculates
    // after it removes the start button from being seen, and reveals
    // the hit and stay button and adds functionality to them with addEventListener()
    setUpBoard(){
        this.deck.shuffle().draw(this.player.hand, 2)
        this.deck.draw(this.dealer.hand, 2)
        this.player.updateTotal().showHand()
        this.dealer.updateTotal().showHandFaceDown()
        
        document.getElementById('start-btn').style.display = 'none'
        document.getElementById('hit').style.display = ''
        document.getElementById('stay').style.display = ''

        document.getElementById('hit').addEventListener('click', () => {
            this.player.hit(this.deck);
            if(this.player.total > 21 || this.player.total === 21){
                document.getElementById('hit').style.display = 'none'
                document.getElementById('stay').style.display = 'none'
                this.dealerTurn();
            }
        })
        document.getElementById('stay').addEventListener('click', () => {
            this.player.stay();
            this.dealerTurn();
        })

        console.log('board set up')

        return this
    }

    // need to figure out what this does, this doesnt do anything besides check if player has blackjack
    playerTurn(){
        this.player.turn = true

        if(this.blackjackCheck(this.player)){
            document.getElementById('ui-text').innerText = 'Blackjack!'
            document.getElementById('hit').style.display = 'none'
            document.getElementById('stay').style.display = 'none'
            document.getElementById('play-again').style.display = ''

            return this
        }

        return this
    }

    
    // reveals hand, after checks if dealer has a blackjack
    // starts a while loop that lets the dealer hit till his total is bigger or equal to 17
    // after dealer is done we call the decideGame function to finish 
    dealerTurn(){
        console.log('dealers turn')
        this.dealer.showDealerHand()
        if(this.blackjackCheck(this.dealer) === true){
            document.getElementById('ui-text').innerText = 'Dealer Blackjack!'
            document.getElementById('hit').style.display = 'none'
            document.getElementById('stay').style.display = 'none'
            document.getElementById('play-again').style.display = ''
        }
        while (this.dealer.total < 17){
            this.dealer.dealerHit(this.deck)
        }

        this.decideGame()
        return this
    }

    bust(){
        document.getElementById('ui-text').innerText = 'You Busted!'
    }

    win(){

    }

    // checks who was closer to 21 without being over 21
    decideGame(){
        document.getElementById('play-again').addEventListener('click', () => {

        })
        if (this.player.total > 21 && this.dealer.total > 21){
            document.getElementById('ui-text').innerText = 'You Won!'
            document.getElementById('play-again').style.display = ''
        }
        if (this.player.total > this.dealer.total && this.player.total <= 21){
            document.getElementById('ui-text').innerText = 'You Won!'
            document.getElementById('play-again').style.display = ''
        }
        else if (this.player.total < this.dealer.total){
            document.getElementById('ui-text').innerText = 'You Won!'
            document.getElementById('play-again').style.display = ''
        }

        return this
    }

    // starts game
    gameLoop(){
        this.setUpBoard().playerTurn()

        return this
    }
}

var game = new Game()
// TODO Figure out how to establish turns
// TODO make a game class
// TODO Clean up gameloop logic

// TODO MAKE WEBSITE LOOK NICE
