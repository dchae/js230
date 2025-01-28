"use strict";

let todos = [
  { id: 1, title: "Homework" },
  { id: 2, title: "Shopping" },
  { id: 3, title: "Calling Mom" },
  { id: 4, title: "Coffee with John " },
];

document.addEventListener("DOMContentLoaded", () => {
  // populate todos
  const template = Handlebars.compile(
    document.querySelector("#todos-template").innerHTML,
  );
  const todosHTML = template(todos);
  const todosList = document.querySelector("#todos");
  todosList.innerHTML = todosHTML;

  const confirmDialog = document.querySelector("#confirm-dialog");
  todosList.addEventListener("click", (e) => {
    if (!e.target.matches("a.delete")) return;
    const id = e.target.dataset.id;
    confirmDialog.querySelector("input[name='id']").value = id;
    confirmDialog.showModal();
  });

  confirmDialog.addEventListener("submit", (e) => {
    let id = new FormData(e.target).get("id");
    todosList.querySelector(`[data-id="${id}"]`).closest("li").remove();
    confirmDialog.close();
  });

  const cancelButton = document.querySelector("#cancel");
  cancelButton.addEventListener("click", () => confirmDialog.close());
});
