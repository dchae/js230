"use strict";

// function delegateEvent(parentElement, selector, eventType, callback) {
//   if (parentElement instanceof Element) {
//     parentElement.addEventListener(eventType, (event) => {
//       let delegateRecipients = [...parentElement.querySelectorAll(selector)];
//       if (delegateRecipients.includes(event.target)) {
//         callback(event);
//       }
//     });
//
//     return true;
//   }
// }

function delegateEvent(parentElement, selector, eventType, callback) {
  if (parentElement instanceof Element) {
    parentElement.addEventListener(eventType, (event) => {
      if (event.target.match(selector) && event.target !== parentElement) {
        callback(event);
      }
    });

    return true;
  }
}

// const delegateEvent = (p, s, t, cb) => p?.tagName && !p.addEventListener(t, (e) => { if (e.target.matches(s) && e.target !== p) cb(e)});

let callback;
let element1;
let element2;
let element3;

document.addEventListener("DOMContentLoaded", () => {
  // Possible elements for use with the scenarios
  element1 = document.querySelector("table");
  element2 = document.querySelector("main h1");
  element3 = document.querySelector("main");

  // Possible callback for use with the scenarios
  callback = ({ target, currentTarget }) => {
    alert(
      `Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`,
    );
  };

  // let test = delegateEvent(element1, 'p', 'click', callback);
  // let test = delegateEvent(element2, "p", "click", callback);
  // let test = delegateEvent(element2, "h1", "click", callback);
  // let test = delegateEvent(element3, "h1", "click", callback);
  let test = delegateEvent(element3, "aside p", "click", callback);
  // let test = delegateEvent(element2, "p", "click", callback);

  console.log(test);
});
