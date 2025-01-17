"use strict";

// create a new form
async function createScheduleForm(staff) {
  let form = document.createElement("form");
  form.method = "post";
  form.action = "/api/schedules";

  let staffNameLabel = document.createElement("label");
  staffNameLabel.for = "staff-name";
  staffNameLabel.textContent = "Staff Name: ";
  let staffSelect = document.createElement("select");
  staffSelect.name = "staff_id";

  staff.forEach(({ id, name }, key) => {
    staffSelect[key] = new Option(name, id);
  });

  let dateLabel = document.createElement("label");
  dateLabel.for = "date";
  dateLabel.textContent = "Date: ";
  let dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.name = "date";

  let timeLabel = document.createElement("label");
  timeLabel.for = "time";
  timeLabel.textContent = "Time: ";
  let timeInput = document.createElement("input");
  timeInput.type = "time";
  timeInput.name = "time";

  form.append(
    staffNameLabel,
    staffSelect,
    dateLabel,
    dateInput,
    timeLabel,
    timeInput,
  );

  return form;
}

async function submitForms(...forms) {
  let action = "/api/schedules";
  let method = "POST";
  let headers = { "Content-Type": "application/json" };
  let schedules = forms.map((form) =>
    Object.fromEntries(new FormData(form).entries()),
  );
  formatDates(schedules);
  let body = JSON.stringify({ schedules });

  let response = await fetch(action, { method, headers, body });
  if (response.ok) forms.forEach((form) => form.reset());
  alert(await response.text());
}

function formatDates(schedules) {
  for (let schedule of schedules) {
    if (!schedule.date) return;
    let [yyyy, mm, dd] = schedule.date.split("-");
    schedule.date = [mm, dd, yyyy.slice(-2)].join("-");
  }
}

async function addFormToList(staff) {
  let list = document.getElementById("form-list-wrapper");
  let fieldset = document.createElement("fieldset");
  let formLegend = document.createElement("legend");
  formLegend.textContent = `Schedule ${list.children.length + 1}`;
  fieldset.appendChild(formLegend);
  fieldset.appendChild(await createScheduleForm(staff));

  list.appendChild(fieldset);
}
// submit all forms

document.addEventListener("DOMContentLoaded", async function () {
  const staff = await fetch("/api/staff_members").then((res) => res.json());

  addFormToList(staff);

  let addScheduleButton = document.getElementById("add-form-button");
  addScheduleButton.addEventListener("click", () => addFormToList(staff));

  let submitButton = document.getElementById("submit-forms-button");
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    submitForms(...document.querySelectorAll("fieldset form"));
  });
});
