"use strict";

// 1.
function downloadFile(cb) {
  setTimeout(cb.bind(this, "Download complete!"), 1500);
  console.log("Downloading file...");
}

// downloadFile((msg) => console.log(msg));

function downloadFilePromise() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Download complete!"), 1500);
  });
}

// downloadFilePromise().then(console.log);

// 2.
function processData(arr, cb) {
  setTimeout(() => {
    console.log(arr.map((x) => cb(x)));
  }, 1000);
}

// Example usage:
// processData([1, 2, 3], (number) => number * 2);
// After 1 second, logs: [2, 4, 6]

function processDataPromise(arr, cb) {
  return new Promise((resolve) => {
    setTimeout(resolve(arr.map(cb)), 1000);
  });
}

// Example usage:
// processDataPromise([1, 2, 3], (number) => number * 2).then(
//   (processedNumbers) => {
//     console.log(processedNumbers);
//     // After 1 second, logs: [2, 4, 6]
//   },
// );

// 3.
// let flakyService = new Promise((resolve, reject) => {
//   let success = Math.round(Math.random());
//   if (success) {
//     resolve("Operation successful");
//   } else {
//     reject(new Error("Operation failed"));
//   }
// });

// flakyService.then(console.log).catch(console.error);

// 4.
// let someOperation = new Promise((resolve) => {
//   resolve("Operation complete");
// });
//
// someOperation.then(console.log).finally(() => console.log("Cleaning up..."));

// 5.
function makePromiseNumber(n) {
  return new Promise((resolve) => {
    resolve(n);
  });
}

// let promise1 = makePromiseNumber(1)
//   .then((n) => n * 2 + 5)
//   .then((n) => n * 2 + 5)
//   .then((n) => console.log(n * 2 + 5));

Promise.resolve(7)
  .then((n) => n * 2)
  .then((n) => n + 5)
  .then((n) => console.log(n));
