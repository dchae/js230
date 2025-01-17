"use strict";

/* eslint camelcase: 0 */
/* eslint max-lines-per-function: 0 */
/* eslint max-statements: 0 */

async function main() {
  const bookingForm = document.getElementById("booking");
  const newStudentForm = document.getElementById("new-student-form");
  const scheduleSelect = document.getElementById("schedule-select");
  const schedules = await getSchedules();
  populateScheduleOptions(scheduleSelect, schedules);

  bookingForm.addEventListener("submit", submitBooking);
  newStudentForm.addEventListener("submit", newStudentSubmitHandler);
}

async function getSchedules() {
  let schedules = await fetch("/api/schedules").then((res) => res.json());
  let staff = await fetch("/api/staff_members").then((res) => res.json());
  schedules.forEach(
    (schedule) =>
      (schedule.staff_name = staff.find(
        (member) => member.id === schedule.staff_id,
      ).name),
  );
  return schedules.filter(({ student_email }) => !student_email);
}

function populateScheduleOptions(select, schedules) {
  schedules.forEach(({ staff_name, date, time, id }) => {
    let optionText = [staff_name, date, time].join(" | ");
    select.add(new Option(optionText, id));
  });
}

async function submitBooking(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const response = await submitForm(form);
  const newStudentForm = document.getElementById("new-student-form");

  if (response.ok) {
    alert("Booked");
    resetForms(form, newStudentForm);
  } else {
    let msg = await response.text();
    alert(msg);
    let bookingSequence = msg.trim().match(/\d+$/)?.at(0);
    newStudentForm.email.value = form.email.value;
    document.getElementById("booking-sequence").value = bookingSequence;
    document.getElementById("new-student-form-wrapper").hidden = false;
  }
}

function resetForms(primary, secondary) {
  primary.reset();
  secondary.reset();
  secondary.parentElement.hidden = true;
  const select = primary.querySelector("select");
  select.remove(select.selectedIndex);
}

async function newStudentSubmitHandler(event) {
  event.preventDefault();
  let response = await submitForm(event.currentTarget);
  let msg = await response.text();
  alert(msg);

  const bookingForm = document.getElementById("booking");
  if (response.ok) bookingForm.requestSubmit();
}

async function submitForm(form) {
  const method = form.method;
  const body = new FormData(form);
  return fetch(form.action, { method, body });
}

main();
