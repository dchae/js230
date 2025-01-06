// let res = [];
// function traverse(node) {
//   let count = [...node.childNodes].reduce(
//     (acc, child) => acc + 1 + traverse(child),
//     0,
//   );
//
//   if (/\d+/.test(node.id)) {
//     let direct = node.childNodes.length;
//     let indirect = count - direct;
//     res[+node.id] = [direct, indirect];
//   }
//
//   return count;
// }
//
// let start = document.getElementById("1");
// traverse(start);
// console.log(
//   res.map((e, i) => `${String(i).padStart(2)}: ${e.join(", ")}`).join("\n"),
// );

var dfs = (n,r=[],ch=n.childNodes) =>
  (r[+n.id]=[[...ch].reduce((a,e)=>a+1+dfs(e,r),0),ch.length])[-!((n.id??0)-1)] ?? r.map(([x,y]) => [y,x-y]);

let res = dfs(document.getElementById("1"));
console.log(res.map((c, i) => `${i}: ${c.join()}`).join("\n"));
//  1: 9, 12
//  2: 2, 1
//  3: 1, 0
//  4: 3, 1
//  5: 1, 0
//  6: 1, 1
//  7: 1, 0
//  8: 1, 2
//  9: 1, 1
// 10: 1, 0
