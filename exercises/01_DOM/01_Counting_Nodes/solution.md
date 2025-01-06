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
