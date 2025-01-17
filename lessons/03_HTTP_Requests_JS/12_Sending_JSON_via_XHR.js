"use strict";

// 1.
/*
POST /books http/1.1
Host: lsjs230-book-catalog.herokuapp.com
Content-Type: application/json; charset=utf-8
Accept: */ /*

{"title": "Eloquent JavaScript", "author": "Marijn Haverbeke"}
*/

const HOST_URL = "https://ls-230-web-store-demo.herokuapp.com";

function loadStore() {
  let request = new XMLHttpRequest();
  request.open("GET", HOST_URL + "/products");

  let divStore = document.getElementById("store");
  request.addEventListener("load", (event) => {
    let request = event.target;
    divStore.innerHTML = request.response;
  });

  request.send();

  divStore.addEventListener("click", divStoreLinkHandler);
  divStore.addEventListener("submit", divStoreFormSubmitHandler);
}

function divStoreLinkHandler(event) {
  let divStore = document.getElementById("store");
  let target = event.target;

  if (target.tagName !== "A") return;

  event.preventDefault();

  let request = new XMLHttpRequest();
  request.open("GET", HOST_URL + target.getAttribute("href"));

  request.addEventListener("load", (event) => {
    divStore.innerHTML = event.target.response;
  });

  request.send();
}

function divStoreFormSubmitHandler(event) {
  event.preventDefault();
  let form = event.target;

  let data = new FormData(form);

  let request = new XMLHttpRequest();
  request.open(form.method, HOST_URL + form.getAttribute("action"));
  request.setRequestHeader("Authorization", "token AUTH_TOKEN");

  request.addEventListener("load", (event) => {
    console.log(event.target.response);
  });

  request.send(data);
}

function addNewProduct(obj) {
  let request = new XMLHttpRequest();
  request.open("POST", HOST_URL + "/v1/products");
  request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  request.setRequestHeader("Authorization", "token AUTH_TOKEN");

  request.addEventListener("load", () => {
    console.log(request.response);
  });

  request.send(JSON.stringify(obj));
}

document.addEventListener("DOMContentLoaded", () => {
  loadStore();
});

let newProductData = {
  name: "Hang in there, you're doing great!",
  sku: "-dchae",
  price: 88888,
};
