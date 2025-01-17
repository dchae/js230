"use strict";
/* eslint max-lines-per-function: "off" */

import debounce from "./debounce.js";

class Autocomplete {
  // initialisation
  constructor(url, inputElement) {
    this.input = inputElement;
    this.url = url;

    this.listUI = null;
    this.overlay = null;
    this.bestMatchIndex = 0;
    this.previousValue = null;

    this.wrapInput();
    this.createUI();

    this.valueChanged = debounce(this.valueChanged.bind(this), 200);
    this.bindEvents();

    this.reset();
  }

  wrapInput() {
    let wrapper = document.createElement("div");
    wrapper.classList.add("autocomplete-wrapper");
    this.input.parentNode.appendChild(wrapper);
    wrapper.appendChild(this.input);
  }

  createUI() {
    let listUI = document.createElement("ul");
    listUI.classList.add("autocomplete-ui");
    this.input.parentNode.appendChild(listUI);
    this.listUI = listUI;

    let overlay = document.createElement("div");
    overlay.classList.add("autocomplete-overlay");
    overlay.style.width = `${this.input.clientWidth}px`;
    this.input.parentNode.appendChild(overlay);
    this.overlay = overlay;
  }

  // event handling
  bindEvents() {
    this.input.addEventListener("input", this.valueChanged);
    this.input.addEventListener("keydown", this.handleKeydown.bind(this));
    this.listUI.addEventListener("mousedown", this.handleMousedown.bind(this));
  }

  valueChanged() {
    let value = this.input.value;
    this.previousValue = value;

    if (value.length) {
      this.fetchMatches(value, (matches) => {
        this.visible = true;
        this.matches = matches;
        this.selectedIndex = null;
        this.draw();
      });
    } else {
      this.reset();
    }
  }

  handleKeydown(event) {
    switch (event.key) {
      case "ArrowDown":
        this.moveSelection(-1, 1);
        this.draw();
        break;
      case "ArrowUp":
        this.moveSelection(this.matches.length, -1);
        this.draw();
        break;
      case "Tab":
        event.preventDefault();
        this.input.value =
          this.matches[this.bestMatchIndex]?.name ?? this.input.value;
        this.reset();
        break;
      case "Enter":
        this.reset();
        break;
      case "Escape":
        this.input.value = this.previousValue;
        this.selectedIndex = null;
        this.draw();
        break;
    }
  }

  handleMousedown(event) {
    let selectedListItem = event.target;
    this.input.value = selectedListItem.textContent.trim();

    this.reset();
  }

  // helpers
  fetchMatches(query, callback) {
    let request = new XMLHttpRequest();
    request.addEventListener("load", () => {
      callback(request.response);
    });

    request.open("GET", "http://localhost:3000" + this.url + query);
    request.responseType = "json";
    request.send();
  }

  moveSelection(start, step) {
    this.selectedIndex ??= start;
    this.selectedIndex += this.matches.length + step;
    this.selectedIndex %= this.matches.length;
  }

  createOverlayChildren() {
    let bestMatch = this.matches[this.bestMatchIndex]?.name ?? "";
    let typedStr = this.input.value;
    let overlayStr = bestMatch.slice(typedStr.length);
    let typedHidden = document.createElement("span");
    typedHidden.textContent = typedStr;
    typedHidden.style.opacity = 0;
    return [typedHidden, overlayStr];
  }

  // rendering
  draw() {
    let listItems = this.matches.map(({ name }) => {
      let listItem = document.createElement("li");
      listItem.textContent = name;
      listItem.classList.add("autocomplete-ui-choice");
      return listItem;
    });

    if (this.selectedIndex !== null) {
      listItems[this.selectedIndex].classList.add("selected");
      this.input.value = this.matches[this.selectedIndex].name;
    }

    this.listUI.replaceChildren(...listItems);

    let overlayChildren = this.visible ? this.createOverlayChildren() : [];
    this.overlay.replaceChildren(...overlayChildren);
  }

  // state management
  reset() {
    this.visible = false;
    this.matches = [];
    this.selectedIndex = null;
    this.previousValue = null;
    this.draw();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const autocomplete = new Autocomplete(
    "/countries?matching=",
    document.querySelector("input"),
  );
});
