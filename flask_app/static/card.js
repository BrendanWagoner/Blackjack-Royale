
class Card {
    constructor(suit, point_val, string_val){
        this.suit = suit;
        this.point_val = point_val;
        this.string_val = string_val;
    }

    card_info(){
        return `${this.string_val} of ${this.suit} : ${this.point_val}`
    }
}