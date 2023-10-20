class Card {
    constructor(suit, point_val, string_val){
        this.suit = suit;
        this.point_val = point_val;
        this.string_val = string_val;
    }

    // returns a string using the Card classes attributes
    cardInfo(){
        return `${this.string_val} of ${this.suit} : ${this.point_val}`
    }
}