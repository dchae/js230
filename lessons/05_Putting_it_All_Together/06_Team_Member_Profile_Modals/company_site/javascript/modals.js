"use strict";

/* eslint max-lines-per-function: "off" */

document.addEventListener("DOMContentLoaded", () => {
  const modalWrapper = document.querySelector("#modal-wrapper");
  const modalClose = document.querySelector(".close");

  // if we click on a team portrait, it should toggle and populate the modal
  const teamPortraits = document.querySelector("ul.team-portraits");
  teamPortraits.addEventListener("click", (e) => {
    e.preventDefault();
    let clicked = e.target.closest("li");
    const figure = modalWrapper.querySelector("figure");
    figure.replaceWith(clicked.querySelector("figure").cloneNode(true));
    modalWrapper.classList.remove("hidden");
  });

  // clicking on the close button hides the modal
  modalClose.addEventListener("click", (e) => {
    e.preventDefault();
    modalWrapper.classList.add("hidden");
  });

  // clicking outside of the modal hides the modal
  modalWrapper.addEventListener("click", (e) => {
    // if we clicked outside the modal
    if (!e.target.closest("#modal")) {
      modalWrapper.classList.add("hidden");
    }
  });

  // pressing esc hides the modal
  document.addEventListener("keyup", (e) => {
    if (e.code !== "Escape") return;
    modalWrapper.classList.add("hidden");
  });
});
