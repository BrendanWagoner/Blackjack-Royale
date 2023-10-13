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
        console.log(this.hand[this.hand.length-1].card_info())
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
            this.total += this.hand.point_val
        }

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