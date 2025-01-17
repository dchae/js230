"use strict";

// async
async function cancelSchedule(scheduleId) {
  let response = await fetch(`/api/schedules/${scheduleId}`, {
    method: "DELETE",
  });
  if (!response.ok) alert(await response.text());
}

async function cancelBooking(bookingId) {
  let response = await fetch(`/api/bookings/${bookingId}`, { method: "PUT" });
  if (!response.ok) alert(await response.text());
}

// non-async
function cancelSchedule(scheduleId) {
  fetch(`/api/schedules/${scheduleId}`, { method: "DELETE" })
    .then((res) => res.text())
    .then((msg) => alert(msg || "Success"));
}

function cancelBooking(bookingId) {
  fetch(`/api/bookings/${bookingId}`, { method: "PUT" })
    .then((res) => res.text())
    .then((msg) => alert(msg || "Success"));
}

// function cancelBooking(bookingId) {
//   fetch(`/api/bookings/${bookingId}`, { method: "PUT" })
//     .then((res) => (res.ok ? "Success" : res.text()))
//     .then(alert);
// }
cancelBooking(3);
cancelSchedule(7);
cancelSchedule(8);
