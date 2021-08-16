const game = {
  image: "s9.jpg",
  currentSentence: null,
  currentSentenceLetters: null,
  attempts: null,
  imgIndex: 0,
  sentencePlace: document.querySelector(".game__title"),
  attemptsPlace: document.querySelector(".game__attempts"),
  alphabetPlace: document.querySelector(".game__alphabet"),
  imagePlace: document.querySelector(".game__image"),
  categoryNames: ["Films", "Proverbs", "Animals", "Celebrities"],
  currentCategory: null,
  hiddenSentece: "",
  soundYes: new Audio("yes.wav"),
  soundNo: new Audio("no.wav"),
  sentences: {
    filmsList: [
      "The Godfather",
      "Casablanca",
      "Gladiator",
      "The Silence of the Lambs",
      "Forrest Gump",
      "Dirty Dancing",
    ],
    proverbsList: [
      "Love is blind",
      "East or west, home is best",
      "Time is money",
      "A friend to all is a friend to none",
    ],
    animalsList: [
      "Bengal Tiger",
      "Cheetah",
      "Giant Panda",
      "Giraffe",
      "Koala",
      "Red Fox",
      "Polar Bear",
      "Gray Wolf",
    ],
    celebritiesList: [
      "Cameron Diaz",
      "Cristiano Ronaldo",
      "Leonardo DiCaprio",
      "Adam Sandler",
      "Chuck Norris",
    ],
  },

  generateAlphabet() {
    const introdution = document.querySelector(".game__introdution");
    introdution.style.display = "none";
    this.alphabetPlace.style.display = "flex";
    let index = 0;
    const letterList = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    letterList.forEach((letter) => {
      const button = document.createElement("button");
      button.classList.add("letter");
      button.type = "button";
      button.dataset.letter = letter;
      button.dataset.index = index;
      button.innerText = letter;
      index++;

      this.alphabetPlace.appendChild(button);
    });
  },

  bindEvents() {
    this.alphabetPlace.addEventListener("click", (e) => {
      if (
        e.target.nodeName.toUpperCase() === "BUTTON" &&
        e.target.classList.contains("letter")
      ) {
        const letter = e.target.dataset.letter;
        this.checkLettersInSentence(letter.toUpperCase());
        e.target.disabled = true;
      }
    });
  },

  enableLetters() {
    const letters = this.alphabetPlace.querySelectorAll(".letter");
    letters.forEach((letter) => (letter.disabled = false));
  },

  disableLetters() {
    const letters = this.alphabetPlace.querySelectorAll(".letter");
    letters.forEach((letter) => (letter.disabled = true));
  },

  initBoard() {
    this.generateAlphabet();
    this.bindEvents();
    this.disableLetters();
    document
      .querySelector(".game__image img")
      .setAttribute("src", "/img/s0.jpg");
  },

  randomSentence() {
    let actualCat = this.currentCategory;
    actualCat = `${actualCat.toLowerCase()}List`;
    const max = this.sentences[actualCat].length - 1;

    const min = 0;
    const rand = Math.floor(Math.random() * (max - min + 1) + min);

    this.currentSentence = this.sentences[actualCat][rand].toUpperCase();

    this.currentSentenceLetters = Array.from(
      this.currentSentence.replace(/ /g, "")
    );

    this.sentenceWrite();
  },

  sentenceWrite() {
    this.sentencePlace.innerText = "";

    const letters = this.currentSentence;
    for (let i = 0; i < letters.length; i++) {
      if (letters[i] !== " ") {
        this.sentencePlace.innerText += "-";
      } else {
        this.sentencePlace.innerHTML += "_";
      }
    }
  },

  checkLettersInSentence(letter) {
    let title = Array.from(this.sentencePlace.textContent);

    if (this.currentSentence.includes(letter)) {
      for (let i = 0; i < this.currentSentence.length; i++) {
        if (this.currentSentence[i] === letter) {
          title[i] = letter;

          this.soundYes.play();
        }
      }
      let letterArray = this.currentSentenceLetters.map((el) => el);

      for (let i = 0; i < letterArray.length; i++) {
        if (letterArray[i] === letter) {
          letterArray.splice(i, 1);
        }
      }
      this.currentSentenceLetters = letterArray;

      this.sentencePlace.textContent = title.join("");

      if (this.currentSentenceLetters.length === 0) {
        this.gameComplete();
      }
    } else {
      this.imgIndex++;
      this.attempts--;
      this.showAttempts();
      this.soundNo.play();

      document
        .querySelector(".game__image img")
        .setAttribute("src", `/img/s${this.imgIndex}.jpg`);

      if (this.attempts <= 0) {
        this.gameOver();
      }
    }
  },

  showAttempts() {
    this.attemptsPlace.innerHTML = `You have still <b>${this.attempts}</b> chances`;
  },
  startGame(category) {
    this.currentCategory = category;
    this.initBoard();
    this.attempts = 9;
    this.randomSentence();
    this.showAttempts();
    this.enableLetters();
  },

  gameOver() {
    this.alphabetPlace.innerHTML = `<div class="final-description"><p>Sorry but you loose. The correct passward is ${this.currentSentence}.
    </p>
    <p> If you want play again click the button below!</p>
    </div> <button class="reset" onClick="location.reload()">Play again</button>
     `;
    this.disableLetters();
  },

  gameComplete() {
    this.alphabetPlace.innerHTML = `<div class="final-description"><p>Congratulations! You do it. The passward was ${this.currentSentence}.
    </p>
    <p> If you want play again click the button below!</p>
    </div> <button class="reset" onClick="location.reload()">Play again</button>
     `;

    this.disableLetters();
  },

  startClick() {
    const introdutionTitle = document.querySelector(".introdution__title");
    const categoryList = document.querySelector(".introdution__category-list");

    introdutionTitle.textContent = "Choose category the list:";

    this.categoryNames.map((category) => {
      const element = `<li class="introdution__category-item" data-category="${category}">${category}</li>`;
      categoryList.innerHTML += element;
    });

    const categoryElements = [
      ...document.querySelectorAll(".introdution__category-item"),
    ];

    categoryElements.forEach((item) =>
      item.addEventListener("click", () =>
        game.startGame(item.dataset.category)
      )
    );

    clickButton.style.display = "none";
  },
};

const clickButton = document.querySelector(".introdution__start");
clickButton.addEventListener("click", () => game.startClick());
