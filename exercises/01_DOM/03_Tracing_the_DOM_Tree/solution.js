// take element id and return the dom tree of the element as a 2d array

// function domTreeTracer(id, endId = "1") {
//   let res = [];
//   let curNode = document.getElementById(id);
//   let endNode = document.getElementById(endId);

//   while (curNode !== endNode.parentNode) {
//     curLevel = [...curNode.parentNode.children];
//     res.push(curLevel.map(node => node.tagName));
//     curNode = curNode.parentNode;
//   }

//   return res;
// }

// const domTreeTracer = (id, res = []) => {
//   let cur = document.getElementById(id);
//   let parent = cur.parentNode;

//   res.push([...parent.children].map((n) => n.tagName));
//   return cur.id === "1" ? res : domTreeTracer(parent.id, res);
// };

var domTreeTracer = (i, a = [], p = document.querySelector(`:has(>[id="${i}"])`)) =>
  (a.push([...p.children].map((n) => n.tagName)), i === "1" ? a : domTreeTracer(p.id, a));


console.log(JSON.stringify(domTreeTracer("1")));
console.log(JSON.stringify(domTreeTracer("2")));
console.log(JSON.stringify(domTreeTracer("22")));
