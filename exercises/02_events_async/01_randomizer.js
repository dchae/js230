"use strict";

// function randomizer(...callbacks) {
//   callbacks.forEach((callback) => {
//     setTimeout(callback, Math.random() * callbacks.length * 2000);
//   });
//
//   let i = 1;
//   let id = setInterval(
//     () => (i > callbacks.length * 2 ? clearInterval(id) : console.log(i++)),
//     1000,
//   );
// }

// function randomizer(...cbs) {
//   let times = [...Array(cbs.length * 2 + 1)];
//   cbs.forEach((cb) => (times[Math.random() * cbs.length * 2] = cb));
//   for (let i in times) setTimeout(times[i] ?? (() => console.log(i)), i * 1000);
// }

// function randomizer(...callbacks) {
//   callbacks.forEach((callback, i) => {
//     i += 1;
//     setTimeout(callback, Math.random() * callbacks.length * 2000);
//     setTimeout(() => console.log(i), i * 1000);
//     setTimeout(() => console.log(callbacks.length + i), (callbacks.length + i) * 1000);
//   });
// }

const randomizer = (...cbs) =>
  cbs.map((cb, i, { l = length }) =>
    [Math.random() * l * 2, ++i, l + i].map((s, j) =>
      setTimeout(j ? () => console.log(s) : cb, s * 1000),
    ),
  );

function callback1() {
  console.log("callback1");
}

function callback2() {
  console.log("callback2");
}

function callback3() {
  console.log("callback3");
}

randomizer(callback1, callback2, callback3);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6
