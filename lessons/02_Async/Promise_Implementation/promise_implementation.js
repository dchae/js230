"use strict";

/* eslint max-lines-per-function: "off" */
function addToTaskQueue(fn) {
  setTimeout(fn, 0);
}

class _Promise {
  static resolve(val) {
    if (val instanceof _Promise) {
      return val;
    } else {
      return new _Promise((resolve) => resolve(val));
    }
  }

  constructor(executor) {
    this.state = "pending";
    this.result = undefined;
    this.fulfillReactions = [];
    this.rejectReactions = [];
    this.isHandled = false;

    const resolve = (result) => {
      if (this.state === "pending") {
        this.result = result;
        this.state = "fulfilled";
        this.fulfillReactions.forEach(addToTaskQueue);
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        this.result = reason;
        this.state = "rejected";
        this.rejectReactions.forEach(addToTaskQueue);
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    return new _Promise((resolve, reject) => {
      let fulFillReaction = () => {
        try {
          let result =
            onFulfilled instanceof Function
              ? onFulfilled(this.result)
              : this.result;

          if (result instanceof _Promise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (e) {
          reject(e);
        }
      };

      let rejectReaction = () => {
        try {
          const result =
            onRejected instanceof Function
              ? onRejected(this.result)
              : this.result;

          if (result instanceof _Promise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (e) {
          reject(e);
        }
      };

      switch (this.state) {
        case "pending":
          this.fulfillReactions.push(fulFillReaction);
          this.rejectReactions.push(rejectReaction);
          break;
        case "fulfilled":
          fulFillReaction();
          break;
        case "rejected":
          rejectReaction();
          break;
        default:
          throw new Error("Invalid Promise state");
      }

      this.isHandled = true;
    });
  }

  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (value) => Promise.resolve(onFinally()).then(() => value),
      (reason) =>
        _Promise.resolve(onFinally()).then(() => {
          throw reason;
        }),
    );
  }
}

const server = ["Hello, World!"];

function loadAsset(id) {
  return new _Promise((resolve, reject) => {
    console.log("Requesting asset...");
    setTimeout(() => {
      // asset being downloaded
      let asset = server[id];
      if (asset) {
        resolve(asset);
      } else {
        reject(new Error("Failed to load asset"));
      }
    }, 1000);
  });
}

let asset = loadAsset(0)
  .then((result) => {
    console.log({ asset: result });
    console.log("Modifying asset...");
    return result.toUpperCase();
  })
  .then((result) => {
    console.log("New asset:");
    console.log({ asset: result });
    throw new Error("SOME ERROR");
  })
  .catch((error) => {
    console.error("(Caught) " + error);
    console.log("Replacing asset with default asset...");
    return "DEFAULT_ASSET";
  })
  .then((result) => console.log({ asset: result }))
  .finally(() => console.log("Cleaning up..."));
