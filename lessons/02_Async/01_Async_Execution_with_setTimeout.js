"use strict";

// 1.
function delayLog() {
  for (let i = 1; i <= 10; i++) setTimeout(() => console.log(i), i * 1000);
}

delayLog();

// 2.
/*
setTimeout(() => {   // 1
  console.log('Once'); // 5
}, 1000);

setTimeout(() => {   // 2
  console.log('upon'); // 6
}, 3000);

setTimeout(() => { // 3
  console.log('a'); // 7
}, 2000);

setTimeout(() => { // 4
  console.log('time'); // 8
}, 4000);
*/

// 3.
// g (0), f (0 + time it takes for thread to finish), d (10), z (10), n (15), s(20), q (25)

// 4.
function afterNSeconds(fn, n) {
  let ms = n * 1000;
  setTimeout(fn, ms);
}
