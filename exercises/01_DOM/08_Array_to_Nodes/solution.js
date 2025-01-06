"use strict";

// to actual HTMLElement Nodes
// function arrayToNodes([tag, children]) {
//   let node = document.createElement(tag);
//   if (children.length) node.append(...children.map(arrayToNodes));
//   return node;
// }

// const arrayToNodes = ([tag, children, node = document.createElement(tag)]) =>
//   (node.append(...children.map(arrayToNodes)), node);

var fn=([t,c,n=document.createElement(t)])=>(n.append(...c.map(fn)),n);

// Nested array of nodes
const nodes = [
  "BODY",
  [
    ["HEADER", []],
    ["MAIN", []],
    ["FOOTER", []],
  ],
];

let body = arrayToNodes(nodes);
// to modify the current DOM
document.body = body;
// to text
console.log(body.outerHTML);

// expected
// <body>
//   <header></header>
//   <main></main>
//   <footer></footer>
// </body>
