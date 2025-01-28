"use strict";

async function main() {
  const bookingsList = document.querySelector("ul");
  const dates = await getBookings();
  bookingsList.replaceChildren(...dates.map(toListElement));

  for (let booking of bookingsList.children) {
    booking.addEventListener("click", bookingClickHandler);
  }
}

async function getBookings(date) {
  let response = await fetch(["/api/bookings", date].filter(Boolean).join("/"));
  return response.json();
}

function toListElement(str) {
  let li = document.createElement("li");
  li.textContent = str;
  return li;
}

async function bookingClickHandler(event) {
  const listElement = event.currentTarget;
  // if listElement has booking information, toggle visibility
  let bookingInfo = listElement.querySelector("ul");
  if (bookingInfo) {
    bookingInfo.hidden = !bookingInfo.hidden;
  } else {
    // else add booking information list
    bookingInfo = document.createElement("ul");
    let date = listElement.textContent.trim();
    let data = await getBookings(date);
    data.forEach((booking) =>
      bookingInfo.appendChild(toListElement(booking.join(" | "))),
    );
    listElement.appendChild(bookingInfo);
  }
}

main();
