"use strict";

let todos = [
  { id: 1, title: "Homework" },
  { id: 2, title: "Shopping" },
  { id: 3, title: "Calling Mom" },
  { id: 4, title: "Coffee with John " },
  { id: 5, title: "Study" },
  { id: 6, title: "Buy milk" },
  { id: 7, title: "Read a book" },
  { id: 8, title: "Work out" },
];

function populateTodos(todosList) {
  const template = Handlebars.compile(
    document.querySelector("#todos-template").innerHTML,
  );
  const todosHTML = template(todos);
  todosList.innerHTML = todosHTML;
}

function showConfirmDialog(confirmDialog, id) {
  confirmDialog.querySelector("input[name='id']").value = id;
  confirmDialog.showModal();
}

function removeTodo(id) {
  const li = document.querySelector(`#todos li[data-id="${id}"]`);
  li.remove();
}

function showContextMenu(id) {
  const contextMenu = document.querySelector("#context-menu");
  contextMenu.classList.remove("hidden");
  contextMenu.dataset.id = id;
  contextMenu.style.top = event.y + "px";
  contextMenu.style.left = event.x + "px";

  document.body.classList.add("no-scroll");
}

function hideContextMenu(contextMenu) {
  contextMenu.classList.add("hidden");
  document.body.classList.remove("no-scroll");
}

document.addEventListener("DOMContentLoaded", () => {
  const todosList = document.querySelector("#todos");
  const contextMenu = document.querySelector("#context-menu");
  const confirmDialog = document.querySelector("#confirm-dialog");
  const cancelButton = document.querySelector("#cancel");

  // populate todos
  populateTodos(todosList);

  // opening context menu
  todosList.addEventListener("contextmenu", (e) => {
    const id = e.target.closest("li")?.dataset?.id;
    if (!id) return;
    e.preventDefault();
    showContextMenu(id);
  });

  // closing context menu
  document.addEventListener("click", () => hideContextMenu(contextMenu));

  // clicking context menu items
  contextMenu.addEventListener("click", (e) => {
    if (!e.target.matches("#delete")) return;
    const id = contextMenu.dataset.id;
    showConfirmDialog(confirmDialog, id);
  });

  // confirm dialog for delete
  confirmDialog.addEventListener("submit", (e) => {
    const id = new FormData(e.target).get("id");
    removeTodo(id);
    confirmDialog.close();
  });

  cancelButton.addEventListener("click", () => confirmDialog.close());
});
