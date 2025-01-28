"use strict";
/* eslint max-lines-per-function: 0 */

class Calculator {
  constructor() {
    this.clearAll();
    this.accumulator = null;
    this.operation = null;
    this.overwriteRegister = true;
    this.operations = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b,
      "%": (a, b) => a % b,
    };
  }

  get operable() {
    return this.accumulator && this.operation;
  }

  // digits
  inputDigit(n) {
    if (this.overwriteRegister) {
      this.register = String(n);
      this.overwriteRegister = !+n;
    } else {
      this.register += String(n);
    }
  }

  // ops
  inputOperator(op) {
    this.history += `${this.history ? " " : ""}${this.register} ${op}`;

    let result = this.operable ? this.compute(this.operation) : this.register;
    this.clearRegister();
    this.register = result;

    this.operation = op;
    this.accumulator = this.register;
  }

  // actions
  inputEquals() {
    if (this.operable) {
      const result = this.compute(this.operation);
      this.clearAll();
      this.register = result;
    }
  }

  inputDecimal() {
    if (this.overwriteRegister) {
      this.register = "0.";
    } else if (!this.register.includes(".")) this.register += ".";
    this.overwriteRegister = false;
  }

  inputNEG() {
    if (this.register.startsWith("-")) {
      this.register = this.register.slice(1);
    } else {
      this.register = "-" + this.register;
    }
  }

  compute(op) {
    const [a, b] = [this.accumulator, this.register].map(parseFloat);
    const str = parseFloat(this.operations[op](a, b)).toPrecision(15);
    return str.replace(/\.?0+$/, "");
  }

  // clear actions
  clearRegister() {
    this.register = "0";
    this.overwriteRegister = true;
  }

  clearOperation() {
    this.operation = null;
  }

  clearHistory() {
    this.history = "";
  }

  clearAll() {
    this.clearRegister();
    this.clearOperation();
    this.clearHistory();
  }
}

class Controller {
  constructor() {
    this.calculator = new Calculator();
    this.controls = document.querySelector("#controls");
    this.history = document.querySelector("#history");
    this.register = document.querySelector("#register");
    this.keyCodes = new Map([
      ["ESCAPE", { type: "action", cmd: "CE" }],
      ["BACKSPACE", { type: "action", cmd: "CE" }],
      ["C", { type: "action", cmd: "C" }],
      ["N", { type: "action", cmd: "NEG" }],
      [".", { type: "action", cmd: "." }],
      ["=", { type: "action", cmd: "=" }],
      ["ENTER", { type: "action", cmd: "=" }],
      ["+", { type: "op", cmd: "+" }],
      ["-", { type: "op", cmd: "-" }],
      ["*", { type: "op", cmd: "*" }],
      ["/", { type: "op", cmd: "/" }],
      ["%", { type: "op", cmd: "%" }],
      ["0", { type: "digit", cmd: "0" }],
      ["1", { type: "digit", cmd: "1" }],
      ["2", { type: "digit", cmd: "2" }],
      ["3", { type: "digit", cmd: "3" }],
      ["4", { type: "digit", cmd: "4" }],
      ["5", { type: "digit", cmd: "5" }],
      ["6", { type: "digit", cmd: "6" }],
      ["7", { type: "digit", cmd: "7" }],
      ["8", { type: "digit", cmd: "8" }],
      ["9", { type: "digit", cmd: "9" }],
    ]);

    this.initHandlers();
  }

  render() {
    this.history.textContent = this.calculator.history;
    this.register.textContent = this.calculator.register;
  }

  translate(type, cmd) {
    switch (type) {
      case "digit":
        this.calculator.inputDigit(cmd);
        break;
      case "op":
        this.calculator.inputOperator(cmd);
        break;
      case "action":
        switch (cmd) {
          case "CE":
            this.calculator.clearRegister();
            break;
          case "C":
            this.calculator.clearAll();
            break;
          case "NEG":
            this.calculator.inputNEG();
            break;
          case ".":
            this.calculator.inputDecimal();
            break;
          case "=":
            this.calculator.inputEquals();
            break;
        }
        break;
      default:
        throw new Error("invalid button type/class");
    }
  }

  clickHandler(e) {
    const button = e.target;
    if (!button.matches("button")) return;
    this.translate(button.className, button.textContent);
    this.render();
  }

  keyboardInputHandler(e) {
    let code = e.key.toUpperCase();
    if (!this.keyCodes.has(code)) return;

    let { type, cmd } = this.keyCodes.get(code);
    this.translate(type, cmd);
    this.render();
  }

  initHandlers() {
    this.controls.addEventListener("click", this.clickHandler.bind(this));
    document.addEventListener("keydown", this.keyboardInputHandler.bind(this));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const controller = new Controller();
  controller.render();
});
