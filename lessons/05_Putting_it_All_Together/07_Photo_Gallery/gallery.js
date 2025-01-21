"use strict";

$(() => {
  const $loupe = $("figure");
  const $thumbnails = $("ul");

  // clicking on a thumbnail should change what's displayed in the loupe
  $thumbnails.on("click", function (event) {
    let image = event.target;
    let $curDisplayed = $loupe.find("img");

    $curDisplayed.fadeOut(function () {
      const $newImg = $(image).clone().hide();
      $curDisplayed.replaceWith($newImg);
      $newImg.fadeIn();
    });

    // update selected border via "active" class
    $thumbnails.find("li").removeClass("active");
    $(image).closest("li").addClass("active");
  });
});
