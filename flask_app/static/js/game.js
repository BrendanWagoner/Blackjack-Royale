// window.onload = function() {
//     let myModal = new bootstrap.Modal(
//         document.getElementById('myModal'),
//         {}
//     );
//     myModal.show();
// }

class Game {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  // checks if target param is dealer class thats inside game class
  // updates total accordingly and after checks if target has a total of 21
  // returns true if so or false otherwise
  blackjackCheck(target) {
    if (target === this.dealer) {
      target.updateDealerTotal();
    } else {
      target.updateTotal();

      if (target.total === 21) {
        document.getElementById("ui-text").innerText = "Player Blackjack!";

        this.player.coins +=
          parseFloat(document.getElementById("pot-counter").innerText) +
          parseFloat(document.getElementById("pot-counter").innerText) * 1.5;
        document.getElementById("coin-counter").innerText = this.player.coins;
        document.getElementById("pot-counter").innerText = 0;

        document.getElementById("hit").style.display = "none";
        document.getElementById("stay").style.display = "none";
        document.getElementById("play-again").style.display = "";
        if (
          document.getElementById("play-again").getAttribute("listener") !==
          "true"
        ) {
          document
            .getElementById("play-again")
            .addEventListener("click", () => {
              this.gameLoop();
            });
          document
            .getElementById("play-again")
            .setAttribute("listener", "true");
          console.log('event "play again" added.');
        }
      }
    }
    return this;
  }

  // shuffles deck, hands cards out to player and dealer then calculates
  // after it removes the start button from being seen, and reveals
  // the hit and stay button and adds functionality to them with addEventListener()
  setUpBoard() {
    if (this.deck.cards.length < 21) {
      this.deck = new Deck();
    }
    this.deck.shuffle().draw(this.player.hand, 2);
    this.deck.draw(this.dealer.hand, 2);
    this.player.updateTotal().showHand();
    this.dealer.updateDealerTotal().showHandFaceDown();

    document.getElementById("start-btn").style.display = "none";
    document.getElementById("play-again").style.display = "none";
    document.getElementById("hit").style.display = "";
    document.getElementById("stay").style.display = "";
    document.getElementById("ui-text").innerText = "What will you do?";

    if (document.getElementById("hit").getAttribute("listener") !== "true") {
      document.getElementById("hit").addEventListener("click", () => {
        this.player.hit(this.deck);
        console.log("hit");
        if (this.player.total > 21 || this.player.total === 21) {
          this.lose();
          document.getElementById("hit").style.display = "none";
          document.getElementById("stay").style.display = "none";
          this.dealerTurn();
        }
      });

      document.getElementById("hit").setAttribute("listener", "true");
      console.log('event "hit" added');
    }

    if (document.getElementById("stay").getAttribute("listener") !== "true") {
      document.getElementById("stay").addEventListener("click", () => {
        this.player.stay();
        document.getElementById("hit").style.display = "none";
        document.getElementById("stay").style.display = "none";
        console.log(`stayed at ${this.player.total}`);
        this.dealerTurn();
      });
      document.getElementById("stay").setAttribute("listener", "true");
      console.log('event "stay" added.');
    }

    this.blackjackCheck(this.player);
    console.log("board set up");

    return this;
  }

  // reveals hand, after checks if dealer has a blackjack
  // starts a while loop that lets the dealer hit till his total is bigger or equal to 17
  // after dealer is done we call the decideGame function to finish
  dealerTurn() {
    console.log("dealers turn");
    this.dealer.showDealerHand();
    if (this.blackjackCheck(this.dealer) === true) {
      document.getElementById("ui-text").innerText = "Dealer Blackjack!";
      document.getElementById("play-again").style.display = "";
      document.getElementById("play-again").addEventListener("click", () => {
        this.gameLoop();
      });
    }
    while (this.dealer.total < 17) {
      this.dealer.dealerHit(this.deck);
    }

    this.decideGame();
    return this;
  }

  // checks who was closer to 21 without being over 21
  decideGame() {
    console.log("deciding...");

    if (this.player.total > this.dealer.total && this.player.total <= 21) {
      this.win();
    } else if (this.dealer.total > 21 && this.player.total <= 21) {
      this.win();
    } else if (
      this.player.total < this.dealer.total &&
      this.dealer.total <= 21
    ) {
      this.lose();
    } else if (this.player.total === this.dealer.total) {
      this.tie();
    }

    return this;
  }

  win() {
    this.player.coins +=
      parseFloat(document.getElementById("pot-counter").innerText) +
      parseFloat(document.getElementById("pot-counter").innerText);
    document.getElementById("coin-counter").innerText = this.player.coins;
    document.getElementById("pot-counter").innerText = 0;
    document.getElementById("ui-text").innerText = "You Won!";

    document.getElementById("play-again").style.display = "";
    if (
      document.getElementById("play-again").getAttribute("listener") !== "true"
    ) {
      document.getElementById("play-again").addEventListener("click", () => {
        this.gameLoop();
      });
      document.getElementById("play-again").setAttribute("listener", "true");
      console.log('event "play again" added.');
    }

    return this;
  }

  lose() {
    document.getElementById("pot-counter").innerText = 0;
    document.getElementById("coin-counter").innerText = this.player.coins;
    document.getElementById("ui-text").innerText = "You Lost!";

    document.getElementById("play-again").style.display = "";
    if (
      document.getElementById("play-again").getAttribute("listener") !== "true"
    ) {
      document.getElementById("play-again").addEventListener("click", () => {
        this.gameLoop();
      });
      document.getElementById("play-again").setAttribute("listener", "true");
      console.log('event "play again" added.');
    }

    return this;
  }

  tie() {
    this.player.coins += parseFloat(
      document.getElementById("pot-counter").innerText
    );
    document.getElementById("coin-counter").innerText = this.player.coins;
    document.getElementById("pot-counter").innerText = 0;
    document.getElementById("ui-text").innerText = "Push!";

    document.getElementById("play-again").style.display = "";
    if (
      document.getElementById("play-again").getAttribute("listener") !== "true"
    ) {
      document.getElementById("play-again").addEventListener("click", () => {
        this.gameLoop();
      });
      document.getElementById("play-again").setAttribute("listener", "true");
      console.log('event "play again" added.');
    }

    return this;
  }

  // clears board to start new game
  clearBoard() {
    this.player.total, (this.dealer.total = 0);

    this.player.hand.splice(0, this.player.hand.length);
    this.dealer.hand.splice(0, this.dealer.hand.length);

    return this;
  }

  // starts game
  gameLoop() {
    this.clearBoard();
    console.log("activated");
    this.player.bet(10);
    this.setUpBoard();

    return this;
  }
}

let game = new Game();

// TODO MAKE WEBSITE LOOK NICE
