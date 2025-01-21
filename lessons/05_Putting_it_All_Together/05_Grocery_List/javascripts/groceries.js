"use strict";

// native DOM API implementation
// document.addEventListener("DOMContentLoaded", () => {
//   const form = document.querySelector("form");
//   const groceryList = document.querySelector("#grocery-list");
//
//   form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const formData = new FormData(form);
//     const name = formData.get("name");
//     const quantity = formData.get("quantity");
//     const li = document.createElement("li");
//     groceryList.appendChild(li).textContent = `${quantity || 1} ${name}`;
//     form.reset();
//   });
// });

// jQuery implementation
$(() => {
  $("form").on("submit", function (e) {
    e.preventDefault();
    const [name, quantity] = $(this)
      .serializeArray()
      .map(({ value }) => value);
    const $li = $(`<li>${quantity || 1} ${name}</li>`);
    $("#grocery-list").append($li);
    this.reset();
  });
});
