"use strict";
/* eslint max-lines-per-function: "off" */

function inInput() {
  const active = document.activeElement;
  return active && ["INPUT", "TEXTAREA"].includes(active.tagName);
}

class Slideshow {
  constructor(photos) {
    this.templates = {};
    this.curIndex = 0;
    this.photos = photos;
    this.initHandlebars();
    this.slidesContainer = document.querySelector("#slides");
    this.renderSlides();
    this.slides = [...document.querySelectorAll(`#slides figure`)];
    this.renderCurrent();
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

    // update new comment form photo_id field value
    const photoIdInput = document.querySelector(
      "#comments input[name='photo_id']",
    );
    photoIdInput.value = photo.id;
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

  async actionHandler(e) {
    e.preventDefault();
    const button = e.target;
    if (button.tagName !== "A") return;

    const path = button.getAttribute("href");
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photo_id: button.dataset.id }),
    };
    const response = await fetch(path, opts);

    const total = (await response.json()).total;
    this.photo[button.dataset.property] = total;
    button.textContent = button.textContent.replace(/\d+/, total);
  }

  async newCommentHandler(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const path = form.getAttribute("action");
    const opts = {
      method: form.method,
      body: new URLSearchParams(new FormData(form)),
    };

    const response = await fetch(path, opts);
    const commentObj = await response.json();
    const commentHTML = this.templates["photo_comment"](commentObj);
    const commentsList = document.querySelector("#comments ul");
    commentsList.insertAdjacentHTML("beforeend", commentHTML);
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

    // add event listener for like and favorite button actions
    const header = document.querySelector("section > header");
    header.addEventListener("click", this.actionHandler.bind(this));

    // add event listener for new comment form;
    const commentForm = document.querySelector("#comments form");
    commentForm.addEventListener("submit", this.newCommentHandler.bind(this));
  }
}

// TODO: refactor with Slide class?

document.addEventListener("DOMContentLoaded", async () => {
  // get photos json data
  const photos = await fetch("/photos").then((res) => res.json());
  const slideshow = new Slideshow(photos);
});
