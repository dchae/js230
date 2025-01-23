"use strict";

// helpers
function shufflePop(arr) {
  let i = Math.floor(Math.random() * arr.length);
  [arr[i], arr[arr.length - 1]] = [arr[arr.length - 1], arr[i]];
  return arr.pop();
}

class Game {
  static #allowedGuessCount = 6;
  #wordBank = ["apple", "banana", "orange", "pear"];
  #word;

  constructor() {
    this.reset();
    this.initEventListeners();
  }

  reset() {
    this.displayReplayLink(false);

    this.#word = shufflePop(this.#wordBank);
    if (!this.#word) {
      this.displayMessage("Sorry, I've run out of words!");
      return;
    }

    this.gameOver = false;
    this.incorrectGuessCount = 0;
    this.guesses = new Set();

    // dom reset
    document.body.classList.remove("win", "lose");
    this.displayApples(0);
    this.displayMessage();
    this.initSpaces(this.#word);
    const guesses = document.querySelector("#guesses");
    guesses.replaceChildren();
  }

  // game methods
  guessedAll() {
    return new Set(this.#word).isSubsetOf(this.guesses);
  }

  validGuess(guess) {
    return /^[a-z]$/i.test(guess) && !this.guesses.has(guess) && !this.gameOver;
  }

  endGame({ win }) {
    this.gameOver = true;
    this.displayGameOver({ win });
  }

  // dom methods
  // event handlers
  guessHandler(e) {
    let guess = e.key.toLowerCase();
    if (!this.validGuess(guess)) return;

    this.guesses.add(guess);
    if (this.#word.includes(guess)) {
      this.displayCorrectLetters(guess);
    } else {
      this.displayIncorrectLetter(guess);
      this.incorrectGuessCount++;
      this.displayApples(this.incorrectGuessCount);
    }

    if (this.incorrectGuessCount >= Game.#allowedGuessCount) {
      this.endGame({ win: false });
    }

    if (this.guessedAll()) this.endGame({ win: true });
  }

  replayHandler(e) {
    e.preventDefault();
    this.reset();
  }

  // display methods
  displayCorrectLetters(char) {
    const spaces = document.querySelector("#spaces");
    let indices = [...this.#word].keys().filter((i) => this.#word[i] === char);
    for (let i of indices) spaces.children[i].textContent = char;
  }

  displayIncorrectLetter(char) {
    const guesses = document.querySelector("#guesses");
    let guess = document.createElement("span");
    guess.textContent = char;
    guesses.appendChild(guess);
  }

  displayApples(incorrectGuesses) {
    const apples = document.querySelector("#apples");
    if (incorrectGuesses < 0 || incorrectGuesses > 6) {
      throw new Error("Invalid number of apples to display");
    }

    let className = incorrectGuesses ? `guess_${incorrectGuesses}` : "";
    apples.className = className;
  }

  displayGameOver({ win }) {
    let msg;
    let bodyClass;

    if (win) {
      msg = "You win!";
      bodyClass = "win";
    } else {
      msg = "Sorry! You're out of guesses.";
      bodyClass = "lose";
    }

    document.body.classList.add(bodyClass);
    this.displayMessage(msg);
    this.displayReplayLink();
  }

  displayMessage(msg) {
    document.querySelector("#message").textContent = msg;
  }

  displayReplayLink(show = true) {
    const playAgain = document.querySelector("#replay");
    playAgain.hidden = !show;
  }

  // initialisation
  initSpaces(word) {
    const blanks = [...word].map((_) => document.createElement("span"));
    document.querySelector("#spaces").replaceChildren(...blanks);
  }

  initEventListeners() {
    document.addEventListener("keydown", (e) => this.guessHandler(e));
    document
      .querySelector("#replay")
      .addEventListener("click", (e) => this.replayHandler(e));
  }
}

document.addEventListener("DOMContentLoaded", () => new Game());
