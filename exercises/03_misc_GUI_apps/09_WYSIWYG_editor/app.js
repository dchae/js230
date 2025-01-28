"use strict";
/* eslint max-lines-per-function: 0 */

class Editor {
  constructor() {
    this.controls = document.querySelector(".editor .controls");
    this.buttons = this.controls.children;
    this.textBox = document.querySelector(".editor .text-box");
    this.inputPrompts = new Map([["createLink", "Enter link url:"]]);
    this.initEventListeners();
  }

  requiresInput(cmd) {
    return this.inputPrompts.has(cmd);
  }

  prompt(cmd) {
    const msg = this.inputPrompts.get(cmd);
    return prompt(msg);
  }

  buttonHandler(e) {
    const button = e.target;
    if (!button.matches("button")) return;

    const cmd = button.id;
    let input;
    if (this.requiresInput(cmd)) {
      input = this.prompt(cmd);
      if (!input) return;
    }

    document.execCommand(cmd, false, input);
    this.textBox.focus();
  }

  updateAllButtonStatus() {
    for (let button of this.buttons) {
      const cmd = button.id;
      if (document.queryCommandState(cmd)) button.classList.add("active");
      else button.classList.remove("active");
    }
  }

  initEventListeners() {
    this.controls.addEventListener("click", this.buttonHandler.bind(this));
    document.addEventListener(
      "selectionchange",
      this.updateAllButtonStatus.bind(this),
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const editor = new Editor();
});
