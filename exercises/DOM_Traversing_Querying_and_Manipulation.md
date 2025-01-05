# JS230 - Front-end Development with JavaScript > DOM Traversing, Querying, and Manipulation

## 01 - Counting Nodes

Snippet 1 will have 11 nodes, since there are 8 nodes in the shown html and 3 nodes are added automatically (html, head, body). Since the automatically created nodes do not add whitespace, the answer is 8 + 3.

```
html
├── head
└── body
    └── div
        ├── #text
        ├── p
        │   ├── #text
        │   ├── em
        │   │   └── #text
        │   └── #text
        └── #text
```

Snippet 2 will have 9 nodes, since there is no longer any whitespace between the `div` and `p` nodes.

```
html
├── head
└── body
    └── div
        └── p
            ├── #text
            ├── em
            │   └── #text
            └── #text
```

## 02 - Child Nodes

```js
let res = [];
function traverse(node) {
  let count = [...node.childNodes].reduce(
    (acc, child) => acc + 1 + traverse(child),
    0,
  );

  if (/\d+/.test(node.id)) {
    let direct = node.childNodes.length;
    let indirect = count - direct;
    res[+node.id] = [direct, indirect];
  }

  return count;
}

let start = document.getElementById("1");
traverse(start);
console.log(
  res.map((e, i) => `${String(i).padStart(2)}: ${e.join(", ")}`).join("\n"),
);
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
```

## 03 - Tracing the DOM Tree
