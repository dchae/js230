"use strict";

function makePromise(type) {
  if (type === "throw") {
    return new Promise((resolve, reject) => {
      throw new Error("Oops, thrown!");
    });
  }

  if (type === "reject") {
    return new Promise((resolve, reject) => {
      reject(new Error("Oops, rejected!"));
    });
  }
}

function whichCatch(type) {
  try {
    const promise = makePromise(type);
    promise.catch((error) =>
      console.log("Caught error with .catch() handler:", error),
    );
  } catch (error) {
    console.log("Caught error with try..catch block:", error);
  }
}

whichCatch("throw");
whichCatch("reject");
