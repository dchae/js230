"use strict";

// pure js
function showOnlyArticle(block) {
  let articles = document.getElementsByTagName("article");
  for (let article of articles) {
    // if (article.getAttribute("data-block") === block) {
    if (article.dataset.block === block) {
      article.style.display = "block";
    } else {
      article.style.display = "none";
    }
  }
}

addEventListener("DOMContentLoaded", () => {
  const links = document.querySelector("ul");
  links.addEventListener("click", (e) => {
    e.preventDefault();
    // let block = e.target.getAttribute("data-block");
    let block = e.target.dataset.block;
    showOnlyArticle(block);
  });
});

// jQuery
// $(() => {
//   $("ul").on("click", "a", (e) => {
//     e.preventDefault();
//     const block = $(e.target).attr("data-block");
//     $("article")
//       .hide()
//       .filter(`[data-block=${$(e.target).attr("data-block")}]`)
//       .show();
//   });
// });
