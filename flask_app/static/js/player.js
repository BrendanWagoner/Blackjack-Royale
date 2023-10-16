class Player {
    constructor(name){
        this.name = name
        this.hand = []
        this.total = 0
    }

    show_hand(){
        var phrase = 'My hand consists of '
        for(var i=0; i<this.hand.length; i++){
            if(this.hand[i] === this.hand[this.hand.length - 1]){
                phrase = phrase + `and ${this.hand[i].card_info()}`
            }
            else{
                phrase = phrase + `${this.hand[i].card_info()}, `
            }
        }
        console.log(phrase)

        return this
    }

    hit(deck){
        deck.draw(this.hand, 1)
        // how to add column class to div and add card info
        var cardsInHand = document.createElement('div')
        cardsInHand.setAttribute('id', 'card-in-hand')
        document.getElementById('player-hand').appendChild(cardsInHand)
        let img = document.createElement('img')
        img.src = `static/img/${this.hand[this.hand.length-1].string_val}_of_${this.hand[this.hand.length-1].suit}.png`
        img.width = 127
        img.height = 172
        document.getElementById('card-in-hand').appendChild(img)
        this.update_total()

        return this        
    }

    update_total(){
        this.total = 0
        this.arrange_cards()
        for(var i=0; i<this.hand.length; i++){
            if(this.hand[i].string_val === 'Ace'){
                this.ace_logic(this.hand[i])
            }
            this.total += this.hand[i].point_val
        }
        console.log(this.total)
        document.getElementById('player-total').innerText = this.total
        return this
    }

    arrange_cards(){
        var ace_values = []

        for(var i=0; i<this.hand.length; i++){
            if(this.hand[i].string_val === 'Ace'){
                ace_values.push(this.hand[i])
                this.hand.splice(this.hand[i], 1)
                for(var j=0; j<ace_values.length; j++){
                    this.hand.push(ace_values[j])
                }
            }
        }
        return this
    }

    ace_logic(card){
        if(this.total + 11 <= 21){
            card.point_val = 11
            return this
        }
        else{
            card.point_val = 1
            return this
        }
    }
}