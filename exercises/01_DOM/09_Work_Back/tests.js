console.log(document.head.childNodes.length);

console.log(document.head.children[0].tagName);

console.log(document.head.textContent);
console.log(document.body.children.length);

console.log(document.body.childNodes.length);

console.log(document.querySelector("div").parentNode.parentNode.tagName);

console.log(
  document.querySelector("div section").children[2].nextElementSibling,
);

console.log(document.querySelectorAll("div").length);

var nodeA = document.body.firstElementChild;
console.log(document.querySelector("footer").children.length);

console.log(
  document
    .querySelector("body")
    .replaceChild(
      document.querySelector("footer"),
      document.body.firstElementChild,
    ).tagName,
);

console.log(document.body.appendChild(nodeA));

console.log(
  document
    .querySelector("section")
    .textContent.split("\n")
    .map(function (text) {
      return text.trim();
    })
    .filter(function (text) {
      return text.length > 0;
    }),
);

console.log(document.querySelector("section").children);

console.log(document.querySelector("section").textContent);
console.log(document.querySelector("span.emphasis").parentNode.tagName);
