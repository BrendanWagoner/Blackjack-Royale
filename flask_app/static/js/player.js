class Player {
    constructor(name){
        if(name){
            this.name = name
        }
        this.hand = []
        this.total = 0
        this.turn = false
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
            img.width = 157
            img.height = 222
            document.getElementById('cards-in-hand').appendChild(img)
        }

        return this
    }

    // uses Deck method draw to push a card into the end of this.hand array
    // after use updateTotal() and showHand() to display total and current hand
    hit(deck){
        if(this.turn === true){
            deck.draw(this.hand, 1)
            this.updateTotal().showHand()
            document.getElementById('ui-text').innerText = `You drew ${this.hand[this.hand.length-1].cardInfo()}, your total is ${this.total}`
            
            return this 
        }

        document.getElementById('ui-text').innerText = 'Not your turn'

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

        if (this.total > 21){
            this.stay()
        }
        
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

    stay(){
        this.turn = false
        document.getElementById('hit').style.display = 'none'
        document.getElementById('stay').style.display = 'none'
        document.getElementById('ui-text').innerText = 'Dealers Turn'

        return this
    }

    blackjackCheck(){
        this.updateTotal()

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
            img.width = 157
            img.height = 222
            document.getElementById('cards-in-dealers-hand').appendChild(img)
        }
    }
    showDealerHand(){
        var cardsInHand = document.createElement('div')
        document.getElementById('dealer-hand').innerText = ''
        cardsInHand.setAttribute('id', 'cards-in-dealers-hand')
        document.getElementById('dealer-hand').appendChild(cardsInHand)
        
        for(var i=0; i<this.hand.length;i++){
            let img = document.createElement('img')
            img.src = `static/img/${this.hand[i].string_val}_of_${this.hand[i].suit}.png`
            img.width = 157
            img.height = 222
            document.getElementById('cards-in-dealers-hand').appendChild(img)
        }
    }

    updateDealerTotal(){
        this.total = 0

        for(var i=0; i<this.hand.length; i++){
            this.total += this.hand[i].point_val
        }
        this.aceCheck()
        document.getElementById('dealer-total').innerText = this.total
        
        return this
    }

    dealerHit(deck){
        deck.draw(this.hand, 1)
        this.updateDealerTotal().showDealerHand()

        return this    
    }

    dealerTurn(deck){
        console.log('dealers turn')
        this.showDealerHand()
        while (this.total < 17){
            this.dealerHit(deck)
        }

        return this
    }
}