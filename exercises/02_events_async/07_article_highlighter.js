"use strict";

/* eslint max-lines-per-function: "off" */

// document.addEventListener("DOMContentLoaded", () => {
//   document.documentElement.style["scroll-behavior"] = "smooth";
//
//   function changeHighlighted(element) {
//     document.querySelector(".highlight")?.classList?.remove("highlight");
//     element.classList.add("highlight");
//   }
//
//   const navList = document.querySelector("header > ul");
//   const articles = document.getElementsByTagName("article");
//
//   navList.addEventListener(
//     "click",
//     (event) => {
//       let anchor = event.target;
//       let article = document.querySelector(anchor.getAttribute("href"));
//       changeHighlighted(article);
//       event.stopPropagation();
//     },
//     true,
//   );
//
//   for (let article of articles) {
//     article.addEventListener(
//       "click",
//       (event) => {
//         changeHighlighted(article);
//         event.stopPropagation();
//       },
//       true,
//     );
//   }
//
//   document.addEventListener("click", (event) => {
//     changeHighlighted(document.querySelector("main"));
//     event.stopPropagation();
//   });
// });

document.documentElement.style["scroll-behavior"] = "smooth";

function changeHighlighted(element) {
  document.querySelector(".highlight")?.classList?.remove("highlight");
  element.classList.add("highlight");
}

document.addEventListener("click", ({ target }) => {
  target =
    document.querySelector(target.getAttribute("href")) ??
    target.closest("article") ??
    document.querySelector("main");
  changeHighlighted(target);
});

// document.onclick = ({target}) => document.querySelector(".highlight")?.classList?.remove("highlight") ?? (document.querySelector(target.getAttribute("href")) ?? target.closest("article") ?? document.querySelector("main")).classList.add("highlight");
