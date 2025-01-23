"use strict";
/* eslint max-lines-per-function: "off" */

function inInput() {
  const active = document.activeElement;
  return active && ["INPUT", "TEXTAREA"].includes(active.tagName);
}

class Slideshow {
  constructor(photos) {
    this.templates = {};
    this.initHandlebars();
    this.curIndex = 0;
    this.photos = photos;
    this.slidesContainer = document.querySelector("#slides");
    this.renderSlides();
    this.slides = [...document.querySelectorAll(`#slides figure`)];
    this.initEventHandlers();
  }

  // photo() and slide() synchronisation depends on Handlebars template #each
  get photo() {
    return this.photos[this.curIndex];
  }

  get slide() {
    return this.slides[this.curIndex];
  }

  next(step = 1) {
    this.curIndex = this.curIndex + step + this.photos.length;
    this.curIndex %= this.photos.length;
    return this.photo;
  }

  renderSlides() {
    const photos = this.photos;
    const renderedHtml = this.templates["photos"]({ photos });
    this.slidesContainer.innerHTML = renderedHtml;
  }

  renderCurrent() {
    this.renderPhotoInfo(this.photo);
    this.renderComments(this.photo);
  }

  renderPhotoInfo(photo) {
    const renderedHtml = this.templates["photo_information"](photo);
    document.querySelector("section header").innerHTML = renderedHtml;
  }

  async renderComments(photo) {
    const response = await fetch(`comments?photo_id=${photo.id}`);
    const comments = await response.json();

    const renderedHtml = this.templates["photo_comments"]({ comments });
    const commentsList = document.querySelector("#comments ul");
    commentsList.innerHTML = renderedHtml;
  }

  nextHandler(e, step = 1) {
    e.preventDefault();
    // fade in next slide
    this.slide.classList.add("hidden");
    this.next(step);
    this.slide.classList.remove("hidden");

    // update photo info + comments
    this.renderCurrent();
  }

  prevHandler(e, step = -1) {
    this.nextHandler(e, step);
  }

  arrowKeyHandler(e) {
    if (inInput()) return;

    switch (e.key) {
      case "ArrowLeft":
        this.prevHandler(e);
        break;
      case "ArrowRight":
        this.nextHandler(e);
        break;
    }
  }

  initHandlebars() {
    // register all partials
    document.querySelectorAll("[data-type='partial']").forEach((element) => {
      Handlebars.registerPartial("comment", element.innerHTML);
    });

    // compile and remove all templates
    document
      .querySelectorAll("[type='text/x-handlebars']")
      .forEach((element) => {
        this.templates[element.id] = Handlebars.compile(element.innerHTML);
        element.remove();
      });
  }

  initEventHandlers() {
    // add event listeners for previous and next anchors
    const nextAnchor = document.querySelector("a.next");
    nextAnchor.addEventListener("click", this.nextHandler.bind(this));

    const prevAnchor = document.querySelector("a.prev");
    prevAnchor.addEventListener("click", this.prevHandler.bind(this));

    // add event listeners for left and right keys
    document.addEventListener("keydown", this.arrowKeyHandler.bind(this));
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // get photos json data
  const photos = await fetch("/photos").then((res) => res.json());
  const slideshow = new Slideshow(photos);

  slideshow.renderCurrent();
});
