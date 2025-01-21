"use strict";

const ops = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    let inputs = [...document.querySelectorAll("input[type='number']")].map(
      (x) => +x.value,
    );
    let op = document.querySelector("#operator").value;
    document.querySelector("#result").textContent = ops[op](...inputs);
  });
});

// jQuery
// $(() => {
//   const $input1 = $("#first-number");
//   const $input2 = $("#second-number");
//   const $operator = $("#operator");
//   const $resultHeader = $("#result");
//
//   $("form").on("submit", (e) => {
//     e.preventDefault();
//     const op = ops[$operator.val()];
//     const res = op(+$input1.val(), +$input2.val());
//     $resultHeader.text(res);
//   });
// });
