const memoryGame = {
  tileCount: 16,
  tileOnRow: 4,
  divBoard: null,
  divScore: null,
  tiles: [],
  tilesChecked: [],
  moveCount: 0,
  tilePairs: 0,
  canGame: true,
  cardImages: [
    "ball.png",
    "earth.png",
    "diplom.png",
    "dolphin.png",
    "hat.png",
    "stop.png",
    "cherries.png",
    "coconut.png",
  ],

  startGame() {
    // clear the playground
    this.divBoard = document.querySelector(".game-board");
    this.divBoard.innerHTML = "";

    // clear score counter
    this.divScore = document.querySelector(".game-counter__span");
    this.divScore.innerHTML = 0;

    // clear all data for new game
    this.tiles = [];
    this.tilesChecked = [];
    this.moveCount = 0;
    this.canGet = true;
    this.tilePairs = 0;

    // new array with cards
    for (let i = 0; i < this.tileCount; i++) {
      this.tiles.push(Math.floor(i / 2));
    }

    //mix the array
    for (let i = this.tileCount - 1; i > 0; i--) {
      const swap = Math.floor(Math.random() * i);
      const temp = this.tiles[i];
      this.tiles[i] = this.tiles[swap];
      this.tiles[swap] = temp;
    }

    //add card into play board
    for (let i = 0; i < this.tileCount; i++) {
      const card = document.createElement("div");
      card.classList.add("card");
      this.divBoard.appendChild(card);

      card.dataset.cardType = this.tiles[i];
      card.dataset.index = i;

      card.addEventListener("click", (e) => this.cardClick(e));
    }
  },

  cardClick(e) {
    if (this.canGame) {
      //check if it's no index or the first time
      if (
        !this.tilesChecked[0] ||
        this.tilesChecked[0].dataset.index !== e.target.dataset.index
      ) {
        this.tilesChecked.push(e.target);
        e.target.style.backgroundImage = `url('./pictures/${
          this.cardImages[e.target.dataset.cardType]
        }')`;
        e.target.classList.add("card--active");
      }
      if (this.tilesChecked.length === 2) {
        this.canGame = false;
        if (
          this.tilesChecked[0].dataset.cardType ===
          this.tilesChecked[1].dataset.cardType
        ) {
          setTimeout(this.deleteTiles.bind(this), 1000);
        } else {
          setTimeout(this.resetTiles.bind(this), 1000);
        }
        this.moveCount++;
        this.divScore.innerText = this.moveCount;
      }
    }
  },

  deleteTiles() {
    this.canGame = true;
    this.tilesChecked.forEach((el) => {
      const emptyDiv = document.createElement("div");
      el.after(emptyDiv);
      el.remove();
    });
    this.tilesChecked = [];

    this.tilePairs++;

    if (this.tilePairs >= this.tileCount / 2) {
      $(".header").html("");
      $(".game-counter").hide();
      $(".game-board").addClass("game-board--done");
      $(".game-board").html(
        "<h1 class='game-board-win'>You win!<p class='game-board-description'>Done in " +
          this.moveCount +
          ' turns</p></h1><p class="game-board-description">If you want play again, click button below.</p><button class="reset-button" onclick="location.reload(), preventDefalut()">One more time!</button>'
      );
    }
  },
  resetTiles() {
    this.canGame = true;
    this.tilesChecked.forEach((el) => (el.style.backgroundImage = ""));
    this.tilesChecked = [];
    $(".card").removeClass("card--active");
  },
};
$(document).ready(function () {
  memoryGame.startGame();
});
