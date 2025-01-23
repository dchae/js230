"use strict";
/* eslint max-lines-per-function: "off" */

let curIndex = 0;

// function getCurrentPhotoId() {
//   const currentlyDisplayed = document.querySelector(
//     "#slides figure:not([display='none'])",
//   );
//   return +currentlyDisplayed.dataset.id;
// }

function renderSlides(templates, photos) {
  const html = templates["photos"]({ photos });
  const slides = document.querySelector("#slides");
  slides.innerHTML = html;
}

function renderPhotoInfo(templates, photo) {
  const html = templates["photo_information"](photo);
  document.querySelector("section header").innerHTML = html;
}

async function renderComments(templates, photo) {
  const response = await fetch(`comments?photo_id=${photo.id}`);
  const comments = await response.json();

  const html = templates["photo_comments"]({ comments });
  const commentsList = document.querySelector("#comments ul");
  commentsList.innerHTML = html;
}

function stepSlideHandler(event, { forward, templates, photos }) {
  event.preventDefault();
  // fade in next slide
  const slides = document.querySelectorAll(`#slides figure`);
  const step = forward ? 1 : -1;
  const nextIndex = (curIndex + step + slides.length) % slides.length;

  slides[curIndex].classList.add("hidden");
  slides[nextIndex].classList.remove("hidden");
  curIndex = nextIndex;

  // update photo info + comments
  const photo = photos.find(({ id }) => id === +slides[curIndex].dataset.id);
  renderPhotoInfo(templates, photo);
  renderComments(templates, photo);
}

// refactor this trash
// add a state object or OOP? remove global curIndex somehow

document.addEventListener("DOMContentLoaded", async () => {
  // compile all templates
  let templates = {};
  document.querySelectorAll("[type='text/x-handlebars']").forEach((element) => {
    templates[element.id] = Handlebars.compile(element.innerHTML);
  });

  // register all partials
  document.querySelectorAll("[data-type='partial']").forEach((element) => {
    Handlebars.registerPartial("comment", element.innerHTML);
  });

  // get photos json data
  const photos = await fetch("/photos").then((res) => res.json());

  // render all slides
  renderSlides(templates, photos);

  // render photo_information template
  renderPhotoInfo(templates, photos[0]);
  // render comments
  renderComments(templates, photos[0]);

  // add event listeners for previous and next anchors
  document
    .querySelector("a.next")
    .addEventListener("click", (e) =>
      stepSlideHandler(e, { forward: true, templates, photos }),
    );
  document
    .querySelector("a.prev")
    .addEventListener("click", (e) =>
      stepSlideHandler(e, { forward: false, templates, photos }),
    );
});
