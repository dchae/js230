"use strict";

let request = new XMLHttpRequest();
request.open("GET", "hts://api.github.com/repos/rails/rails");
request.responseType = "json";

request.addEventListener("load", () => {
  let data = request.response;
  console.log(request.status);
  if (data) console.log(data.open_issues);
});

request.addEventListener("error", () => {
  console.log("The request could not be completed");
});

request.send();
