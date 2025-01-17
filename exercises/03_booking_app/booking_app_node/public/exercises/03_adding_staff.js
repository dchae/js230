"use strict";

const HOST_URL = "http://localhost:3000";

// // helpers
// const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
// const isValidName = (name) => name.length > 3;
//
// function apiFormSubmit(form, options = {}) {
//   let { responseType, timeout, loadHandler, timeoutHandler, loadendHandler } =
//     options;
//
//   const timeoutMsg = "Request has timed out. Please try again.";
//   const path = form.getAttribute("action");
//   const data = new FormData(form);
//
//   return new Promise((resolve, reject) => {
//     const request = new XMLHttpRequest();
//     request.open(form.method, HOST_URL + path);
//     request.responseType = responseType ?? "json";
//     request.timeout = timeout ?? 0;
//
//     loadHandler ??= () => resolve(request.response);
//     timeoutHandler ??= () => reject(new Error(timeoutMsg));
//
//     request.onload = loadHandler.bind(this, resolve, reject);
//     request.ontimeout = timeoutHandler.bind(this, resolve, reject);
//     request.onloadend = loadendHandler?.bind(this, resolve, reject);
//
//     request.send(data);
//   });
// }
//
// async function addStaffFormSubmitHandler(event) {
//   event.preventDefault();
//
//   const form = event.currentTarget;
//   const emailInput = document.getElementById("email").value.trim();
//   const nameInput = document.getElementById("name").value.trim();
//   if (!isValidEmail(emailInput) || !isValidName(nameInput)) {
//     alert("Staff can not be created. Check your inputs");
//     return;
//   }
//
//   const msg = await apiFormSubmit(form).then(
//     ({ id }) => `Successfully created staff with id: ${id}`,
//     (e) => e.message,
//   );
//   form.reset();
//   alert(msg);
// }

// add handler on dom load (deferred)
const form = document.getElementById("add-staff-form");
// form.addEventListener("submit", addStaffFormSubmitHandler);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
  })
    .then((response) => (response.ok ? response.json() : response.text()))
    .then((r) => (r.id ? `Successfully created staff with id: ${r.id}` : r))
    .catch((e) => e.message)
    .then(alert)
    .finally(() => form.reset());
});
