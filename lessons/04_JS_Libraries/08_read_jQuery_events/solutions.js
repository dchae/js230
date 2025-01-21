"use strict";

$(function () {
  const $p = $("p");
  let OUTPUT = "Your favorite fruit is";

  $("a").on("click", function (event) {
    event.preventDefault();
    let $anchor = $(this);
    $p.text(OUTPUT + $anchor.text());
  });

  $("form").on("submit", function (event) {
    event.preventDefault();
    let $input = $(this).find("input[type='text']");
    $p.text(OUTPUT + $input.val());
  });
});
