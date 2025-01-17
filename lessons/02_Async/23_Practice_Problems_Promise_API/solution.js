"use strict";

/* eslint prefer-promise-reject-errors: "off" */

function flakyService() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Operation successful");
    } else {
      reject("Operation failed");
    }
  });
}

function loadData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Data loaded");
      } else {
        reject("Network error");
      }
    }, 1000);
  });
}

// Promise.all([flakyService(), flakyService(), loadData()])
//   .then((values) => console.log(values))
//   .catch(() => console.log("One or more operations failed"));

// 2.
// const firstResource = new Promise((resolve) =>
//   setTimeout(() => resolve("First resource loaded"), 500),
// );
// const secondResource = new Promise((resolve) =>
//   setTimeout(() => resolve("Second resource loaded"), 1000),
// );
//
// Promise.race([firstResource, secondResource]).then(console.log);

// 3.
// const services = [flakyService(), flakyService(), flakyService()];

// Promise.allSettled(services).then((results) =>
//   results.forEach(({ value, reason }) => console.log(value ?? reason)),
// );

// 4.
// Promise.any(services).then(console.log, (e) =>
//   console.log("All services failed.", e),
// );

// 5.
function loadResource(url) {
  return fetch(url)
    .then((value) => value.json())
    .catch(() => "Failed to fetch.");
}

// loadResource("https://jsonplaceholder.typicode.com/todos/1").then(console.log);
// Success response

// loadResource("badUrl.xyz").then(console.log);
// Failed to fetch

// Fetched data: {userId: 1, id: 1, title: 'delectus aut autem', completed: false }
// Fetched data: Failed to fetch

// 6.
function loadMultipleResources(urls) {
  return Promise.allSettled(urls.map(loadResource));
}

loadMultipleResources([
  "https://jsonplaceholder.typicode.com/todos/1",
  "invalidUrl",
]).then((results) => {
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log("Fetched data:", result.value);
    } else {
      console.error(result.reason);
    }
  });
});
