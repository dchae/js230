"use strict";

// function sliceTree(startID, endID) {
//   function backtrack(cur, tar, path) {
//     if (cur.id == tar) return path;
//     for (let child of cur.children) {
//       path.push(child.tagName);
//       if (backtrack(child, endID, path)) return path;
//       path.pop();
//     }
//   }
//
//   let startNode = document.getElementById(startID);
//   return backtrack(startNode, endID, [startNode.tagName]);
// }

// function sliceTree(startID, endID) {
//   let res = [];
//   let cur = document.getElementById(endID);
//
//   while (cur && +res.at(-1)?.id !== startID) {
//     res.push(cur);
//     cur = cur.parentElement;
//   }
//
//   if (document.body.contains(cur) && res.length) return res.reverse().map(x => x.tagName);
// }

var sliceTree = (i,j,res=[document.getElementById(j)]) =>
  { while ((res[0]?.id ?? i) != i) res.unshift(res[0].parentNode); if (document.body.contains(res[0])) return res.map(x => x.tagName)};

var sliceTree = (i,j,res=[document.getElementById(j)]) =>
  (res[0]?.id ?? i) != i ? sliceTree(i,j,[res[0].parentNode].concat(res)) : document.body.contains(res[0]) ? res.map(x => x.tagName) : res[-1];

console.log(sliceTree(1, 1));
// => ["ARTICLE"]
console.log(sliceTree(1, 4));
// => ["ARTICLE", "HEADER", "SPAN", "A"]
console.log(sliceTree(1, 76));
// => undefined
console.log(sliceTree(2, 5));
// => undefined
console.log(sliceTree(5, 4));
// => undefined
console.log(sliceTree(1, 23));
// => ["ARTICLE", "FOOTER"]
console.log(sliceTree(1, 22));
// => ["ARTICLE", "MAIN", "SECTION", "P", "SPAN", "STRONG", "A"]
console.log(sliceTree(11, 19));
// => ["SECTION", "P", "SPAN", "STRONG", "A"]
