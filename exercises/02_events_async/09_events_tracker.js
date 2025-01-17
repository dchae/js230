"use strict";

/* eslint max-lines-per-function: "off" */

class Tracker {
  #events;
  constructor() {
    this.#events = new Set();
  }

  add(event) {
    this.#events.add(event);
  }

  list() {
    return [...this.#events.values()];
  }

  elements() {
    return this.list().map((e) => e.target);
  }

  clear() {
    return this.#events.clear() ?? 0;
  }
}

let tracker = new Tracker();
function track(callback) {
  return (event) => (tracker.add(event), callback(event));
}

document.addEventListener("DOMContentLoaded", () => {
  const divRed = document.getElementById("red");
  const divBlue = document.getElementById("blue");
  const divOrange = document.getElementById("orange");
  const divGreen = document.getElementById("green");

  divRed.addEventListener(
    "click",
    track((event) => {
      document.body.style.background = "red";
    }),
  );

  divBlue.addEventListener(
    "click",
    track((event) => {
      event.stopPropagation();
      document.body.style.background = "blue";
    }),
  );

  divOrange.addEventListener(
    "click",
    track((event) => {
      document.body.style.background = "orange";
    }),
  );

  divGreen.addEventListener(
    "click",
    track((event) => {
      document.body.style.background = "green";
    }),
  );
});
