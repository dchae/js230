"use strict";

function startCounting(s) {
  let ms = s * 1000;
  let i = 1;
  let id = setInterval(() => console.log(i++), ms);
  return id;
}

function stopCounting(id) {
  clearTimeout(id);
}

let id = startCounting(1);

setTimeout(() => stopCounting(id), 5000);
