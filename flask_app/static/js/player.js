class Player {
    constructor(name){
        if(name){
            this.name = name
        }
        this.hand = []
        this.total = 0
    }

    // sets initial phrase to variable first, then loops through each card in hand
    // and adds a string from the cards method card.cardInfo()
    // if last card will add before info and a period after
    displayHand(){
        var phrase = 'My hand consists of '
        for(var i=0; i<this.hand.length; i++){
            if(this.hand[i] === this.hand[this.hand.length - 1]){
                phrase = phrase + `and ${this.hand[i].cardInfo()}.`
            }
            else{
                phrase = phrase + `${this.hand[i].cardInfo()}, `
            }
        }
        console.log(phrase)

        return this
    }

    // clears div 'player-hand' and then creates div 'cards-in-hand'
    // for each card in this.hand attach img relating to card to div 'cards-in-hand' 
    showHand(){
        var cardsInHand = document.createElement('div')
        document.getElementById('player-hand').innerText = ''
        cardsInHand.setAttribute('id', 'cards-in-hand')
        document.getElementById('player-hand').appendChild(cardsInHand)
        
        for(var i=0; i<this.hand.length;i++){
            let img = document.createElement('img')
            img.src = `static/img/${this.hand[i].string_val}_of_${this.hand[i].suit}.png`
            img.width = 127
            img.height = 172
            document.getElementById('cards-in-hand').appendChild(img)
        }

        return this
    }

    // uses Deck method draw to push a card into the end of this.hand array
    // after use updateTotal() and showHand() to display total and current hand
    hit(deck){
        deck.draw(this.hand, 1)
        this.updateTotal().showHand()

        return this        
    }

    // sets this.total to 0, then loops for each card in hand
    // and for each card adds the total to this.total
    // after the for loop it uses this.aceCheck() for when theres aces in the hand
    updateTotal(){
        this.total = 0

        for(var i=0; i<this.hand.length; i++){
            this.total += this.hand[i].point_val
        }
        this.aceCheck()
        document.getElementById('player-total').innerText = this.total
        
        return this
    }

    // loop through the hand array, and check if its string value 
    // if its an Ace, and if so add to the aceCount
    // after check if theres an aceCount is bigger than 0 
    // and total is less than 12, add 10 to the total
    aceCheck(){
        var aceCount = 0;
    
        for(var i=0; i<this.hand.length;i++){
            if(this.hand[i].string_val === 'Ace'){
                aceCount++
            }
        }
        if (aceCount > 0 && this.total < 12){
            this.total += 10
        }

        return this
    }

    playerTurn(){
        this.updateTotal()
        var ui = document.getElementById('ui-text')
        if(this.blackjackCheck()){
            ui.innerText = 'Blackjack!'
            return this
        }
        ui.innerText = 'What will you do?'


    }

    blackjackCheck(){
        if(this.total === 21){
            return true
        }
        return false
    }
}

class Dealer extends Player{
    showHandFaceDown(){
        var cardsInHand = document.createElement('div')
        document.getElementById('dealer-hand').innerText = ''
        cardsInHand.setAttribute('id', 'cards-in-dealers-hand')
        document.getElementById('dealer-hand').appendChild(cardsInHand)
        
        for(var i=0; i<this.hand.length;i++){
            let img = document.createElement('img')
            img.src = `static/img/blue_cardback.png`
            img.width = 127
            img.height = 172
            document.getElementById('cards-in-dealers-hand').appendChild(img)
        }
    }
}