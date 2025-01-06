/* eslint strict: "off" */

function clickHandler(event) {
  if (event.target.tagName === "BUTTON") {
    let message = document.getElementById("message");
    message.textContent = `${event.target.textContent} was clicked!`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", clickHandler);
});
