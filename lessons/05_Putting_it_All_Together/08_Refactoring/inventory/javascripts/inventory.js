"use strict";

/* eslint max-lines-per-function: "off" */
/* eslint camelcase: "off" */

class Inventory {
  constructor() {
    this.lastId = 0;
    this.collection = [];

    this.setDate();
    this.cacheTemplate();
    this.bindEvents();
  }

  setDate() {
    var date = new Date();
    document.querySelector("#order_date").textContent = date.toUTCString();
  }

  cacheTemplate() {
    let template = document.querySelector("#inventory_item");
    this.template = Handlebars.compile(template.innerHTML);
    template.remove();
  }

  add() {
    this.lastId++;
    let item = {
      id: this.lastId,
      name: "",
      stock_number: "",
      quantity: 1,
    };
    this.collection.push(item);

    return item;
  }

  remove(targetId) {
    this.collection = this.collection.filter(({ id }) => id !== targetId);
  }

  get(id) {
    return this.collection.find((item) => item.id === id);
  }

  update(item) {
    let id = this.findID(item);
    let itemObj = this.get(id);

    itemObj.name = item.querySelector("[name^=item_name]").value;
    itemObj.stock_number = item.querySelector(
      "[name^=item_stock_number]",
    ).value;
    itemObj.quantity = item.querySelector("[name^=item_quantity]").value;
  }

  newItem(e) {
    e.preventDefault();
    let item = this.add();
    let template = document.createElement("template");
    template.innerHTML = this.template(item);
    let tr = template.content.firstElementChild;

    document.querySelector("#inventory").append(tr);
  }

  findParent(e) {
    return e.target.closest("tr");
  }

  findID(item) {
    return +item.querySelector("input[type=hidden]").value;
  }

  deleteItem(e) {
    e.preventDefault();
    let item = this.findParent(e);
    item.remove();

    this.remove(this.findID(item));
  }

  updateItem(e) {
    let item = this.findParent(e);

    this.update(item);
  }

  bindEvents() {
    document
      .querySelector("#add_item")
      .addEventListener("click", this.newItem.bind(this));

    const inventory = document.querySelector("#inventory");

    inventory.addEventListener("click", (e) => {
      if (!e.target.matches("a.delete")) return;
      this.deleteItem(e);
    });

    inventory.addEventListener("focusout", (e) => {
      if (!e.target.matches("input")) return;
      this.updateItem(e);
    });
  }
}

let inventory;
document.addEventListener("DOMContentLoaded", () => {
  inventory = new Inventory();
});
