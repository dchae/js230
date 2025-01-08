"use strict";

// 1.
function basicCallback(cb, n) {
  setTimeout(cb.bind(this, n), 2000);
}

// Example usage:
// basicCallback((number) => {
//   console.log(number * 2);
// }, 5);
// After 2 seconds, logs: 10

// 2.
function downloadFile(cb) {
  setTimeout(cb.bind(this, "Download complete!"), 1500);
  console.log("Downloading file...");
}

// downloadFile((msg) => console.log(msg));

// 3.
function processData(arr, cb) {
  setTimeout(() => {
    console.log(arr.map((x) => cb(x)));
  }, 1000);
}

// Example usage:
// processData([1, 2, 3], (number) => number * 2);
// After 1 second, logs: [2, 4, 6]

// 4.
function waterfallOverCallbacks(cbs, n) {
  cbs.forEach((cb) => (n = cb(n)));
  console.log(n);
}

// Example usage:
// const double = (x) => x * 2;
// waterfallOverCallbacks([double, double, double], 1);
// Logs: 8


// 5.
function startCounter(cb) {
  let count = 1;
  const id = setInterval(() => {
    if (cb(count++)) clearInterval(id);
  }, 1000);
}

// Example usage:
startCounter((count) => {
  console.log(count);
  return count === 5;
});
// Logs 1, 2, 3, 4, 5, then stops
