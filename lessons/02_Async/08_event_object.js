"use strict";

// 1.
document.addEventListener("click", (event) => {
  let x = document.querySelector(".x");

  x.style.left = event.x + "px";
  x.style.top = event.y + "px";
});

// 2.
document.addEventListener("mousemove", (event) => {
  let x = document.querySelector(".x");

  x.style.left = event.x + "px";
  x.style.top = event.y + "px";
});

// 3.
document.addEventListener("keypress", (event) => {
  let x = document.querySelector(".x");
  let key = event.key;
  let oldColor = x.firstElementChild.style.background;
  let newColor =
    ["red", "green", "blue"].find((color) => color[0] === key) ?? oldColor;
  x.firstElementChild.style.background = newColor;
  x.lastElementChild.style.background = newColor;
});

// 4.
// with keyup
document.addEventListener("DOMContentLoaded", () => {
  const charLim = 140;
  let counter = document.querySelector(".counter");

  let textArea = document.querySelector(".composer > textarea");
  const updateCounter = () => {
    let charCount = textArea.value.trim().length;
    let remainingCharCount = charLim - charCount;

    counter.textContent = `${remainingCharCount} characters remaining`;
    textArea.classList.toggle("invalid", remainingCharCount < 0);
  };

  textArea.addEventListener("keyup", updateCounter);

  updateCounter();
});
