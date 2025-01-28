"use strict";

class Stopwatch {
  constructor() {
    this.reset();
  }

  update() {
    if (this.startTime === null) return;

    const currentTime = Date.now();
    this.elapsed += currentTime - this.startTime;
    this.startTime = currentTime;
  }

  get() {
    this.update();
    return this.elapsed;
  }

  running() {
    return !this.startTime;
  }

  start() {
    this.startTime = Date.now();
  }

  stop() {
    this.update();
    this.startTime = null;
  }

  reset() {
    this.startTime = null;
    this.elapsed = 0;
  }
}

class App {
  constructor(stopwatch) {
    this.stopwatch = stopwatch;
    this.hours = document.querySelector("#hours");
    this.minutes = document.querySelector("#minutes");
    this.seconds = document.querySelector("#seconds");
    this.centiseconds = document.querySelector("#centiseconds");

    this.intervalId = null;
    this.intervalLengthMS = 10;

    this.startStopButton = document.querySelector("#start-stop");
    this.resetButton = document.querySelector("#reset");
  }

  init() {
    this.startStopButton.addEventListener("click", () => {
      if (this.stopwatch.running()) {
        this.startStopwatch();
        this.startStopButton.textContent = "Stop";
      } else {
        this.stopStopwatch();
        this.startStopButton.textContent = "Start";
      }
    });

    this.resetButton.addEventListener("click", () => {
      this.resetStopwatch();
      this.startStopButton.textContent = "Start";
    });
  }

  render() {
    const ms = this.stopwatch.get();
    const cs = Math.floor(ms / 10);
    const ss = Math.floor(ms / 1000);
    const mm = Math.floor(ss / 60);
    const hh = Math.floor(mm / 60);

    this.centiseconds.textContent = String(cs % 100).padStart(2, "0");
    this.seconds.textContent = String(ss % 60).padStart(2, "0");
    this.minutes.textContent = String(mm % 60).padStart(2, "0");
    this.hours.textContent = String(hh).padStart(2, "0");
  }

  startRenderLoop() {
    this.intervalId = setInterval(
      this.render.bind(this),
      this.intervalLengthMS,
    );
  }

  stopRenderLoop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  startStopwatch() {
    this.stopwatch.start();
    this.startRenderLoop();
  }

  stopStopwatch() {
    this.stopRenderLoop();
    this.stopwatch.stop();
  }

  resetStopwatch() {
    this.stopRenderLoop();
    this.stopwatch.reset();
    this.render();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const stopwatch = new Stopwatch();
  new App(stopwatch).init();
});
