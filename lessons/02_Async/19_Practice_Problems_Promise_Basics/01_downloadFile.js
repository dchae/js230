"use strict";

// 1.
function downloadFile(cb) {
  setTimeout(cb.bind(this, "Download complete!"), 1500);
  console.log("Downloading file...");
}

// downloadFile((msg) => console.log(msg));

function downloadFilePromise() {
  return new Promise((resolve, reject) => {
    console.log("Downloading file...");
    setTimeout(() => {
      resolve("Download complete!");
    }, 1500);
  });
}

// downloadFilePromise();

// 2.
function processData(arr, cb) {
  setTimeout(() => {
    console.log(arr.map((x) => cb(x)));
  }, 1000);
}

// processData([1, 2, 3], (number) => number * 2);
// After 1 second, logs: [2, 4, 6]

function processDataPromise(arr, cb) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(arr.map(cb));
    }, 1000);
  });
}

// Example usage:
processDataPromise([1, 2, 3], (number) => number * 2).then(
  (processedNumbers) => {
    console.log(processedNumbers);
    // After 1 second, logs: [2, 4, 6]
  },
);
