"use strict";

/* eslint max-lines-per-function: "off" */

// src: https://exploringjs.com/deep-js/ch_implementing-promises.html

function addToTaskQueue(...tasks) {
  tasks.forEach((task) => setTimeout(task, 0));
}

function isThenable(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.then === "function"
  );
}

class ToyPromise {
  #promiseState;
  #promiseResult;
  #fulfillmentTasks;
  #rejectionTasks;
  #alreadyResolved;

  constructor() {
    this.#promiseState = "pending";
    this.#fulfillmentTasks = [];
    this.#rejectionTasks = [];
    this.#alreadyResolved = false;
  }

  #runReactionSafely(resultPromise, reaction) {
    try {
      const returned = reaction(this.#promiseResult);
      resultPromise.resolve(returned);
    } catch (error) {
      resultPromise.reject(error);
    }
  }
  // returns a Promise that is resolved by the value returned
  // from its called argument
  then(onFulfilled, onRejected) {
    let resultPromise = new ToyPromise();

    const fulfillmentTask = () => {
      if (typeof onFulfilled === "function") {
        this.#runReactionSafely(resultPromise, onFulfilled);
      } else {
        resultPromise.resolve(this.#promiseResult);
      }
    };

    const rejectionTask = () => {
      if (typeof onRejected === "function") {
        const returned = onRejected(this.#promiseResult);
        resultPromise.resolve(returned);
      } else {
        resultPromise.reject(this.#promiseResult);
      }
    };

    if (this.#promiseState === "pending") {
      this.#fulfillmentTasks.push(fulfillmentTask);
      this.#rejectionTasks.push(rejectionTask);
    } else if (this.#promiseState === "fulfilled") {
      addToTaskQueue(fulfillmentTask);
    } else if (this.#promiseState === "rejected") {
      addToTaskQueue(rejectionTask);
    } else {
      throw new Error("Invalid Promise State");
    }

    return resultPromise;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  resolve(value) {
    if (this.#alreadyResolved) return this;
    this.#alreadyResolved = true;

    if (isThenable(value)) {
      value.then(
        (result) => this.#doFulfill(result),
        (error) => this.#doReject(error),
      );
    } else {
      this.#doFulfill(value);
    }

    return this;
  }

  #doFulfill(value) {
    if (isThenable(value)) {
      throw new Error("Cannot set promise result to Thenable value");
    }

    this.#promiseState = "fulfilled";
    this.#promiseResult = value;
    this.#clearAndEnqueueTasks(this.#fulfillmentTasks);
  }

  reject(error) {
    if (this.#alreadyResolved) return this;
    this.#alreadyResolved = true;

    this.#doReject(error);
    return this;
  }

  #doReject(error) {
    this.#promiseState = "rejected";
    this.#promiseResult = error;
    this.#clearAndEnqueueTasks(this.#rejectionTasks);
  }

  #clearAndEnqueueTasks(tasks) {
    this.#fulfillmentTasks = undefined;
    this.#rejectionTasks = undefined;
    addToTaskQueue(...tasks);
  }
}

// new ToyPromise()
//   .resolve("a")
//   .then((value) => {
//     console.log(value === "a");
//     throw "b"; // triggers a rejection
//   })
//   .catch((error) => {
//     console.log(error === "b");
//   });
