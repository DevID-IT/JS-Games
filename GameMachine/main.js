// operations on a wallet
class Wallet {
  constructor(money) {
    let _money = money;

    //download level of money
    this.getWalletValue = () => _money;

    // check if user have enough money
    this.checkUserWallet = (value) => {
      if (_money >= value) return true;
      return false;
    };

    // change a value of wallet
    this.changeWalletValue = (value, type = "+") => {
      if (typeof value === "number" && !isNaN(value)) {
        if (type === "+") {
          return (_money += value);
        } else if (type === "-") {
          return (_money -= value);
        } else {
          throw new Error("Wrong type of operation");
        }
      } else {
        console.log(typeof value);
        throw new Error("Wrong value");
      }
    };
  }
}

// get statistics about games
class Statistics {
  constructor() {
    this.gameResults = [];
  }

  // object with game result - push into array
  addGameToStatistics(win, bid) {
    let gameResult = {
      win,
      bid,
    };
    this.gameResults.push(gameResult);
  }

  // count and return a number of wins, losses and games
  showGameStatistics() {
    let games = this.gameResults.length;
    let wins = this.gameResults.filter((result) => result.win).length;
    let losses = this.gameResults.filter((result) => !result.win).length;

    return [games, wins, losses];
  }
}

// random from options and draw it
class Draw {
  constructor() {
    this.options = ["cherries.png", "coconut.png", "lemons.png"];
    let _result = this.drawResult();
    this.getDrawResult = () => _result;
  }

  // method to random result in new game
  drawResult() {
    let images = [];
    for (let i = 0; i < this.options.length; i++) {
      const index = Math.floor(Math.random() * this.options.length);
      const image = this.options[index];
      images.push(image);
    }
    return images;
  }
}

// check it player win or not
class Result {
  // add money when user win
  static winMoney(result, bid) {
    if (result) return 2 * bid;
    else return 0;
  }
  // check if a combination give player a win
  static checkWinner(draw) {
    if (
      (draw[0] === draw[1] && draw[1] === draw[2]) ||
      (draw[0] !== draw[1] && draw[1] !== draw[2] && draw[0] !== draw[2])
    )
      return true;
    else return false;
  }
}
// apply all objects, methods to start
class Game {
  constructor(start) {
    this.stats = new Statistics();
    this.wallet = new Wallet(start);
    // listener on button to start game
    document
      .querySelector(".starter__button")
      .addEventListener("click", this.startGame.bind(this));

    this.amountOfMoney = document.querySelector(".results__wallet");
    this.windows = [...document.querySelectorAll(".windows__element")];
    this.inputBid = document.querySelector(".starter__input");
    this.resultPlace = document.querySelector(".results");
    this.resultOfGame = document.querySelector(".results__desctription");
    this.countGames = document.querySelector(".results__game-counter");
    this.countWins = document.querySelector(".results__wins-counter");
    this.countLosses = document.querySelector(".results__losses-counter");

    this.render();
  }

  // metthod for the window drawing
  render(
    windows = ["game.png", "game.png", "game.png"],
    money = this.wallet.getWalletValue(),
    result = "",
    stats = [0, 0, 0],
    bid = 0,
    wonMoney = 0
  ) {
    // draw result in windows
    this.windows.forEach((window, i) => {
      window.style.backgroundImage = `url(images/${windows[i]})`;
    });

    // game results
    this.amountOfMoney.textContent = `${money}$`;
    if (result) {
      result = `You win ${wonMoney}$.`;
    } else if (!result && result !== "") {
      result = `You lost ${bid}$.`;
    }

    this.resultOfGame.textContent = result;
    this.countGames.textContent = stats[0];
    this.countWins.textContent = stats[1];
    this.countLosses.textContent = stats[2];

    this.inputBid.value = "";
  }

  // check if there is a bid value
  startGame() {
    if (this.inputBid.value < 1) return alert("You have to put your bid!");
    const bid = Math.floor(this.inputBid.value);

    if (!this.wallet.checkUserWallet(bid)) {
      return alert("You haven't enough money to play or it is wrong value");
    }

    this.wallet.changeWalletValue(bid, "-");

    this.draw = new Draw();
    const windows = this.draw.getDrawResult();
    const win = Result.checkWinner(windows);
    const wonMoney = Result.winMoney(win, bid);
    this.wallet.changeWalletValue(wonMoney);
    this.stats.addGameToStatistics(win, bid);

    this.render(
      windows,
      this.wallet.getWalletValue(),
      win,
      this.stats.showGameStatistics(),
      bid,
      wonMoney
    );

    if (wonMoney != 0) {
      // this.resultPlace.classList.remove("results--loss");
      this.resultPlace.classList.add("results--win");
      setTimeout(() => {
        this.resultPlace.classList.remove("results--win");
        document.querySelector(".results__desctription").textContent =
          "Your actual wallet status";
      }, 2000);
    } else {
      // this.resultPlace.classList.remove("results--win");
      this.resultPlace.classList.add("results--loss");
      setTimeout(() => {
        this.resultPlace.classList.remove("results--loss");
        document.querySelector(".results__desctription").textContent =
          "Your actual wallet status";
      }, 2000);
    }
  }
}

// Start game
const game = new Game(500);
