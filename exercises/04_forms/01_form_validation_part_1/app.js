"use strict";
function getLabel(input) {
  return input.labels[0].textContent;
}

function getValidationHint(input) {
  const validity = input.validity;
  if (validity.valueMissing) return `${getLabel(input)} is a required field.`;
  if (validity.tooShort)
    return `${getLabel(input)} must be at least ${input.getAttribute("minlength")} characters long.`;
  if (validity.patternMismatch)
    return `Please enter a valid ${getLabel(input).toLowerCase()}.`;
  return "Invalid input.";
}

function updateValidationHint(input) {
  input.classList.add("touched");

  const validationHint = input.nextElementSibling;
  let msg;
  if (!input.validity.valid) {
    msg = getValidationHint(input);
  }
  validationHint.textContent = msg;
}

function updateMessageBox(msgBox, form) {
  let msg = "";
  if (!form.checkValidity()) {
    msg = "Form cannot be submitted until all errors are corrected.";
    form.querySelectorAll("input").forEach(updateValidationHint);
  }

  msgBox.textContent = msg;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#signup-form");
  const msgBox = document.querySelector("#message-box");

  form.addEventListener("focusout", (e) => {
    const input = e.target;
    if (!input.matches("input")) return;
    updateValidationHint(input);
    updateMessageBox(msgBox, form);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    updateMessageBox(msgBox, form);
  });
});
