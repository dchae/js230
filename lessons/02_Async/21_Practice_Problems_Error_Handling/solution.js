"use strict";

// 1.
function flakyService() {
  return new Promise((resolve, reject) => {
    let success = Math.round(Math.random());
    if (success) {
      resolve("Operation successful");
    } else {
      reject(new Error("Operation failed"));
    }
  });
}

// flakyService()
//   .then(console.log)
//   .catch((e) => console.log("(Caught) " + e));

// 2.
function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject({ error: "User not found" }), 500);
  });
}

// fetchUserData()
//   .catch(({ error }) => console.error(error))
//   .finally(() => console.log("Fetching complete"));

// 3.
function retryOperation(operationFunc, lim = 3) {
  function attempt(fn, attempts = lim - 1) {
    return fn().catch((e) => {
      console.error(`${e}`);
      if (!attempts) throw e;

      console.log(`Retrying... Attempts remaining: ${attempts}`);
      return attempt(fn, attempts - 1);
    });
  }

  return attempt(operationFunc)
    .then(console.log)
    .catch(() => {
      console.log("Operation failed");
    });
}

// Example usage:
// retryOperation(
//   () =>
//     new Promise((resolve, reject) => {
//       let chance = Math.random();
//       console.log(chance);
//       return chance < 0.33 ? resolve("Success!") : reject(new Error("Fail!"));
//     }),
// );

// 4.
function mockAsyncOp() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Operation succeeded");
      } else {
        reject("Operation failed");
      }
    }, 1000);
  });
}

// mockAsyncOp()
//   .then(console.log, console.log)
//   .finally(() => console.log("Operation attempted"));

// 5.
function loadData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = Math.round(Math.random());
      if (success) {
        resolve("Data loaded");
      } else {
        reject(new Error("Network error"));
      }
    }, 1000);
  }).catch((_) => "Using cached data");
}

loadData().then(console.log);
