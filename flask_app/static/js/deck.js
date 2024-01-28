class Deck {
  // establishes empty array for deck, and creates a array of all suits in cards
  // then for each suit, use a for loop to create 13 cards for each
  // then add card to the Deck.card array
  constructor() {
    this.cards = [];

    var suits = ["Spades", "Hearts", "Clubs", "Diamonds"];

    for (var s = 0; s < suits.length; s++) {
      var suit = suits[s];
      for (var i = 1; i < 14; i++) {
        var str_val = "";
        var val = 0;
        if (i === 1) {
          val = 1;
          str_val = "Ace";
        } else if (i === 11) {
          val = 10;
          str_val = "Jack";
        } else if (i === 12) {
          val = 10;
          str_val = "Queen";
        } else if (i === 13) {
          val = 10;
          str_val = "King";
        } else {
          val = i;
          str_val = i.toString();
        }
        this.cards.push(new Card(suit, val, str_val));
      }
    }
  }

  showCards() {
    for (var i = 0; i < this.cards.length; i++) {
      console.log(this.cards[i].cardInfo());
    }

    return this;
  }

  showFirstCard() {
    this.cards[0].cardInfo();

    return this;
  }

  // starting at the last card in the deck and moving in
  // for each loop we will pick a random number that is not bigger then i for an index j
  // and we will use i as an index, we will then swap positions of each
  // will repeat till loop is over
  shuffle() {
    for (var i = this.cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }

    return this;
  }

  // using recursion add first card in the deck array and remove it from array
  // repeat if amount is more than 1
  draw(hand, amount) {
    if (amount == 0) {
      return this;
    }

    hand.push(this.cards[0]);
    this.cards.splice(this.cards.indexOf(this.cards[0]), 1);
    this.draw(hand, amount - 1);
  }
}
