class Deck {
    constructor(){
        this.cards = [];

        var suits = ['spades', 'hearts', 'clubs', 'diamonds'];
        
        for(var s=0; s<suits.length; s++){
            var suit = suits[s];
            for(var i=1; i<14; i++){
                var str_val = '';
                var val = 0;
                if(i === 1){
                    val = 11;
                    str_val = 'Ace';
                }
                else if(i === 11){
                    val = 10;
                    str_val = 'Jack';
                }
                else if(i === 12){
                    val = 10;
                    str_val = 'Queen';
                }
                else if(i === 13){
                    val = 10;
                    str_val = 'King';
                }
                else {
                    val = i
                    str_val = i.toString()
                }
                this.cards.push(new Card(suit, val, str_val))
            }
        }
    }

    show_cards(){
        for(var i=0; i<this.cards.length; i++){
            console.log(this.cards[i].card_info())
        }
    }

    
    show_cards(){
        for(var i=0; i<this.cards.length; i++){
            console.log(this.cards[i].card_info())
        }

        return this
    }

    show_first_card(){
        this.cards[0].card_info()

        return this
    }

    shuffle(){
        for (var i = this.cards.length-1; i>0; i--){
            var j = Math.floor(Math.random() * (i+1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]

        }

        return this
    }

    draw(hand, amount=1){
        for(var i=0; i<amount; i++){
            hand.push(this.cards[i])
            var index = this.cards.indexOf(this.cards[i])
            this.cards.splice(index, 1)
        }

        return this
    }
}

