"use strict";

$(() => {
  const $form = $("form");
  $form.on("submit", function (event) {
    event.preventDefault();
    const char = $("#key").val();

    $(document)
      .off("keypress")
      .on("keypress", function (event) {
        if (event.key !== char) return;
        $("a").trigger("click");
      });
    this.reset();
  });

  $("a").on("click", function (event) {
    event.preventDefault();
    $("#accordion").slideToggle();
  });
});
