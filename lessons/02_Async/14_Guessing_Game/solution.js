"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const msgBox = document.querySelector("main > p");
  const form = document.querySelector("main > form");
  const textBox = document.getElementById("guess");
  const guessButton = form.querySelector("input[type='submit']");
  const newGameLink = document.querySelector("main > a");
  let answer, guessCount;

  function initGame() {
    answer = Math.floor(Math.random() * 100 + 1);
    guessCount = 0;
    msgBox.textContent = "Guess a number from 1 to 100";

    textBox.value = "";
    guessButton.disabled = false;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let input = textBox.value.trim();
    let guess = parseInt(input, 10);

    let msg;
    if (/\D/.test(input) || guess < 1 || guess > 100) {
      msg = `Invalid guess. Try a number from 1 to 100!`;
    } else if (guess === answer) {
      msg = `You guessed it! It took you ${++guessCount} guess${guessCount === 1 ? "" : "es"}.`;
      guessButton.disabled = true;
    } else {
      msg = `My number is ${answer < guess ? "less" : "greater"} than ${guess}`;
      guessCount++;
    }

    msgBox.textContent = msg;
  });

  newGameLink.addEventListener("click", (event) => {
    event.preventDefault();
    initGame();
  });

  initGame();
});
