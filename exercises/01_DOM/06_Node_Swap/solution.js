"use strict";

function nodeSwap(i, j) {
  let [a, b] = [i, j].map(id => document.getElementById(id));
  if (!a || !b || a.contains(b) || b.contains(a)) return undefined;

  let c = b.nextSibling;
  a.parentNode.insertBefore(b, a);
  b.parentNode.insertBefore(a, c);
  return true;
}


// const nodeSwap = (i,j,[a,b]=[i,j].map(id => document.getElementById(id)),c=b?.nextSibling,d) =>
//   ((a?.contains(b)-1) && b?.contains(a)-1) ? !!(a.parentNode.insertBefore(b, a), b.parentNode.insertBefore(a, c)) : d;

// at least one of the id attributes doesn't exist
console.log(nodeSwap(1, 20));
// => undefined

// at least one of the nodes is a "child" of the other
console.log(nodeSwap(1, 4));
// => undefined
console.log(nodeSwap(9, 3));
// => undefined

// one swap
console.log(nodeSwap(1, 2));

// multiple swaps
console.log(nodeSwap(3, 1));
console.log(nodeSwap(7, 9));
