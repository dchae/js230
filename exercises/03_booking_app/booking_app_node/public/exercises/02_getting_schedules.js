"use strict";
/* eslint camelcase: "off" */
/* eslint max-lines-per-function: "off" */

const HOST_URL = "http://localhost:3000";

async function retrieveSchedules() {
  try {
    let schedules = await apiGET("/api/schedules", {
      timeout: 5000,
      loadendHandler: () => alert("Request completed."),
    });

    if (schedules.length === 0) {
      alert("No schedules available for booking");
      return;
    }

    let tally = getTally(schedules.map(({ staff_id }) => staff_id));
    let result = [...tally.entries()]
      .map(([id, count]) => `staff ${id}: ${count}`)
      .join("\n");
    alert(result);
  } catch (e) {
    alert(e.message);
  }
}

// Further Exploration
// async function retrieveSchedules() {
//   let staffIds = (await apiGET("/api/staff_members")).map(({ id }) => id);
//   let schedules = await Promise.all(
//     staffIds.map((id) => apiGET(`/api/schedules/${id}`)),
//   );
//   let result = schedules
//     .filter(({ length }) => length)
//     .map(({ length }, i) => `staff ${staffIds[i]}: ${length}`)
//     .join("\n");
//
//   alert(result);
// }

// helpers
function apiGET(path, options = {}) {
  let { responseType, timeout, loadHandler, timeoutHandler, loadendHandler } =
    options;

  const timeoutMsg = "Request has timed out. Please try again.";

  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open("GET", HOST_URL + path);
    request.responseType = responseType ?? "json";
    request.timeout = timeout ?? 0;

    loadHandler ??= () => resolve(request.response);
    timeoutHandler ??= () => reject(new Error(timeoutMsg));

    request.onload = loadHandler.bind(this, resolve, reject);
    request.ontimeout = timeoutHandler.bind(this, resolve, reject);
    request.onloadend = loadendHandler?.bind(this, resolve, reject);

    request.send();
  });
}

function getTally(iter) {
  let tally = new Map();
  for (let key of iter) tally.set(key, (tally.get(key) ?? 0) + 1);
  return tally;
}

// execute on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  retrieveSchedules();
});
