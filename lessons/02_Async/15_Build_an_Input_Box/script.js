"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let textFieldDiv = document.querySelector(".text-field");
  let contentDiv = document.querySelector(".content");
  let cursorIntervalID;

  textFieldDiv.addEventListener("click", (event) => {
    event.stopPropagation();
    textFieldDiv.classList.add("focused");
    cursorIntervalID ??= setInterval(() => {
      textFieldDiv.classList.toggle("cursor");
    }, 500);
  });

  document.addEventListener("click", (event) => {
    textFieldDiv.classList.remove("focused");
    textFieldDiv.classList.remove("cursor");
    clearInterval(cursorIntervalID);
    cursorIntervalID = undefined;
  });

  document.addEventListener("keydown", (event) => {
    if (!textFieldDiv.classList.contains("focused")) return;

    if (event.key.length === 1) {
      contentDiv.textContent += event.key;
    } else if (event.key === "Backspace") {
      contentDiv.textContent = contentDiv.textContent.slice(0, -1);
    }
  });
});
